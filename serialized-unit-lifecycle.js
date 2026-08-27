// Centralized application-side serialized-unit lifecycle guard.
// PostgreSQL remains the final enforcement layer; callers must run this inside their transaction.
const TRANSITIONS = {
  'In Stock': new Set(['Reserved','Sold','Transferred','Damaged','Lost','Returned','Service','Voided']),
  'Reserved': new Set(['In Stock','Sold','Returned','Service','Damaged','Lost']),
  'Sold': new Set(['In Stock','Returned','Service']),
  'Transferred': new Set(['In Stock','Lost']),
  'Returned': new Set(['In Stock','Sold','Service','Damaged','Lost']),
  'Service': new Set(['In Stock','Sold','Returned','Damaged','Lost']),
  'Damaged': new Set(['Service','In Stock','Lost']),
  'Lost': new Set(['In Stock','Service','Damaged'])
};

export async function transitionSerializedUnit(client, {
  unitId, toStatus, actorId = null, locationId, reason = 'Physical-unit lifecycle change',
  sourceType = 'SerializedUnit', sourceId = null, soldAt = false, clearLocation = false
}) {
  const unit = (await client.query('SELECT * FROM serialized_units WHERE id=$1 FOR UPDATE', [unitId])).rows[0];
  if (!unit) throw new Error('Physical inventory unit not found');
  if (unit.status === toStatus && locationId === undefined && !soldAt && !clearLocation) return unit;
  if (unit.status !== toStatus && !TRANSITIONS[unit.status]?.has(toStatus)) {
    throw new Error(`Cannot move physical unit from ${unit.status} to ${toStatus}`);
  }
  if (toStatus === 'Voided' && unit.status !== 'In Stock') throw new Error('Only an In Stock unit can be voided');
  await client.query("SELECT set_config('app.actor_id',$1,true)", [actorId ? String(actorId) : '']);
  const sets = ['status=$1','updated_at=now()'];
  const values = [toStatus];
  if (locationId !== undefined || clearLocation) { sets.push(`location_id=$${values.length+1}`); values.push(clearLocation ? null : locationId); }
  if (soldAt) sets.push('sold_at=now()');
  const updated = (await client.query(`UPDATE serialized_units SET ${sets.join(',')} WHERE id=$${values.length+1} RETURNING *`, [...values, unit.id])).rows[0];
  // The existing DB trigger creates the history row. Enrich that new row with business context.
  await client.query(`UPDATE serialized_unit_status_history SET reason=$1,source_type=$2,source_id=$3,actor_id=COALESCE(actor_id,$4)
    WHERE id=(SELECT id FROM serialized_unit_status_history WHERE serialized_unit_id=$5 ORDER BY created_at DESC,id DESC LIMIT 1)`,
    [reason, sourceType, sourceId, actorId || null, unit.id]);
  return updated;
}
