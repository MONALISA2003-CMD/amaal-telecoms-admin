'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function SaleActions({
  saleId,
  status,
  canVoid,
  canFinanceSync,
}: {
  saleId: string;
  status: string;
  canVoid: boolean;
  canFinanceSync: boolean;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState('');
  const [message, setMessage] = useState('');

  async function run(path: string, method = 'POST') {
    setBusy(path);
    setMessage('');
    try {
      const response = await fetch(path, { method });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error || 'The action could not be completed.');
      setMessage('Action completed successfully.');
      router.refresh();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'The action could not be completed.');
    } finally {
      setBusy('');
    }
  }

  const operational = ['Completed', 'Paid', 'Partially Paid'].includes(status);

  return <div className="detailActions">
    {canVoid && operational && <button className="dangerAction" disabled={!!busy} onClick={() => { if (window.confirm('Void this sale using the existing business approval rules?')) run(`/api/sales/${saleId}/void`); }}> {busy.includes('/void') ? 'Voiding…' : 'Void sale'} </button>}
    {canFinanceSync && operational && <button className="softActionButton" disabled={!!busy} onClick={() => run(`/api/sales/${saleId}/finance-sync`)}> {busy.includes('finance-sync') ? 'Syncing…' : 'Sync to Finance'} </button>}
    {message && <span className="actionMessage" role="status">{message}</span>}
  </div>;
}
