from pathlib import Path
import re, json

brands = ['TCL','Hisense','CHiQ','Samsung','LG','Global Star','Black Ark']

# entries: brand, model, sizes, technology, generation, verification, market
E=[]
def add(b, model, sizes=None, tech='', gen='UNKNOWN', ver='PARTIALLY_VERIFIED', market='GLOBAL'):
    E.append(dict(brand=b,model=model,sizes=sizes or [],technology=tech,generation=gen,verification=ver,market=market))

# TCL
for model,sizes,tech,gen in [
 ('C655',['43','50','55','65','75','85'],'QLED / QLED PRO / 4K','CURRENT'),
 ('C6K',['50','55','65','75','85','98'],'QD-Mini LED / QLED','CURRENT'),
 ('C855',['65','75','85'],'QD-Mini LED / QLED PRO','PREVIOUS'),
 ('C755',['50','55','65','75','85','98'],'QD-Mini LED','PREVIOUS'),
 ('P6K',['50','55','65','75'],'4K LED / HDR','CURRENT'),
 ('V6C',['43','50','55','65','75'],'4K LED / HDR','CURRENT'),
 ('S5K',['50'],'QLED / FHD','CURRENT'),
 ('S5400',['43'],'FHD LED / Smart TV','PREVIOUS'),
]: add('TCL',model,sizes,tech,gen)
for m in ['C645','P635','P745']: add('TCL',m,gen='LEGACY')

# Hisense
for m in ['32A4QS','40A4QS','43A4QS']: add('Hisense',m,ver='VERIFIED')
for m in ['43A6N','43A6Q','50A6N','50A6Q','55A6N','55A6Q','65A6N','65A6Q','75A6N','75A6Q','85A6N']: add('Hisense',m,gen='CURRENT',ver='VERIFIED')
for m in ['40A5200F','32A5200F']: add('Hisense',m,gen='PREVIOUS',ver='VERIFIED')
add('Hisense','32Q4Q',ver='VERIFIED')
for m in ['43Q6N','50Q6N','55Q6N','65Q6N','75Q6N','85Q6N']: add('Hisense',m,gen='CURRENT',ver='VERIFIED')
add('Hisense','85Q7Q',gen='CURRENT',ver='VERIFIED')
add('Hisense','55U6N',gen='CURRENT',ver='VERIFIED')
for m in ['55U7N','65U7N','75U7N','85U7N']: add('Hisense',m,gen='CURRENT',ver='VERIFIED')
add('Hisense','65A85LEVS',gen='CURRENT',ver='VERIFIED')

# CHiQ
add('CHiQ','G5000',['32'],'', 'PREVIOUS')
for m,s in [('L32G7V',['32']),('G7P',['32','43','75']),('32G4500',['32']),('U43G7H',['43']),('43G7P',['43']),('U50G7H',['50']),('U55G7H',['55']),('U65G7H',['65'])]: add('CHiQ',m,s,gen='PREVIOUS')
for m in ['55Q6N','55Q7N','65Q7N','85Q8N']: add('CHiQ',m,gen='CURRENT')

# Samsung families, source gives family names not exact regional SKUs
for m in ['U7000H','U7020H','U8000H','U8020H']: add('Samsung',m,gen='CURRENT',tech='Crystal UHD')
add('Samsung','Q5F',gen='CURRENT',tech='QLED')
for m in ['QN70H','QN73H','QN80H','QN1EH','QN60H']: add('Samsung',m,gen='CURRENT',tech='Neo QLED')
for m in ['S83H','S85H','S90H','S93H','S95H','S99H']: add('Samsung',m,gen='CURRENT',tech='OLED')
for m in ['R85H','R95H']: add('Samsung',m,gen='CURRENT',tech='Micro RGB')
for m in ['U7000F','U8000F']: add('Samsung',m,gen='PREVIOUS',tech='Crystal UHD')
for m in ['Q6F','Q7F','Q8F']: add('Samsung',m,gen='PREVIOUS',tech='QLED')
for m in ['QN70F','QN80F','QN85F','QN90F','QN900F','QN950F']: add('Samsung',m,gen='PREVIOUS',tech='Neo QLED')
for m in ['S85F','S90F','S95F']: add('Samsung',m,gen='PREVIOUS',tech='OLED')
add('Samsung','The Frame LS03F',gen='PREVIOUS',tech='Lifestyle')
for m in ['DU7000','DU8000']: add('Samsung',m,gen='PREVIOUS',tech='Crystal UHD')
for m in ['Q60D','Q70D','Q80D']: add('Samsung',m,gen='PREVIOUS',tech='QLED')
for m in ['QN85D','QN90D','QN95D','QN800D','QN900D']: add('Samsung',m,gen='PREVIOUS',tech='Neo QLED')
for m in ['S85D','S90D','S95D']: add('Samsung',m,gen='PREVIOUS',tech='OLED')
add('Samsung','The Frame LS03D',gen='PREVIOUS',tech='Lifestyle')
add('Samsung','CU8000',gen='LEGACY',tech='Crystal UHD')
for m in ['Q60C','Q70C']: add('Samsung',m,gen='LEGACY',tech='QLED')
for m in ['QN90C','QN95C','QN800C','QN900C']: add('Samsung',m,gen='LEGACY',tech='Neo QLED')
add('Samsung','The Frame LS03C',gen='LEGACY',tech='Lifestyle')

# LG
for m in ['QNED93','QNED87','QNED86','QNED85','QNED83','QNED81','QNED80','QNED8E','QNED72','QNED71','QNED70']:
    add('LG',m,gen='CURRENT',tech='QNED')
add('LG','QNED EVO MINI LED',gen='CURRENT',tech='QNED EVO MINI LED')
for m in ['OLED55B5','OLED55C5','OLED55G5','OLED65B5','OLED65C5','OLED65G5','OLED77C5','OLED77G5','OLED83C5','OLED83G5','OLED97M5']:
    add('LG',m,gen='PREVIOUS',tech='OLED',ver='VERIFIED')
for m in ['43UT8000','50UT8000','55UT8000','65UT8000','75UT8000','86UT8000']:
    add('LG',m,gen='PREVIOUS',tech='UHD',ver='VERIFIED')
for m in ['43QNED75','50QNED75','50QNED85','55QNED70A6A','55QNED80A6A','55QNED85','55QNED92','65QNED70A6A','65QNED80A6A','65QNED85','65QNED92','75QNED70A6A','75QNED80A6A','75QNED85','75QNED92','86QNED70A6A','86QNED80A6A','86QNED85']:
    add('LG',m,gen='PREVIOUS',tech='QNED',ver='VERIFIED')
for m in ['43UR7300','43UR8000','50UR7500','55UR8000','65UR8000','75UR8000','86UR8000']: add('LG',m,gen='PREVIOUS',tech='UHD',ver='VERIFIED')
for m in ['43NANO75','50NANO77']: add('LG',m,gen='PREVIOUS',tech='NanoCell',ver='VERIFIED')
for m in ['55QNED75','55QNED80','65QNED80','65QNED85','75QNED80','75QNED85','86QNED80','86QNED85']: add('LG',m,gen='PREVIOUS',tech='QNED',ver='VERIFIED')
for m in ['OLED55B4','OLED55C4','OLED65B4','OLED65C4']: add('LG',m,gen='PREVIOUS',tech='OLED',ver='VERIFIED')
for m in ['OLED55B3','OLED55C3']: add('LG',m,gen='LEGACY',tech='OLED',ver='VERIFIED')
for m in ['UR7300','UR8000']: add('LG',m,gen='LEGACY',tech='UHD',ver='PARTIALLY_VERIFIED')

# Global Star
for m in ['GS-2219A','GS-24D5','GS-26D5 T2','GS-2624D','32UK50','32UK64','42UK64','43LK50','75QD75','85QD85']:
    add('Global Star',m,gen='UNKNOWN',ver='PARTIALLY_VERIFIED')
for m in ['22 inch Digital LED','24 inch AC/DC Digital LED','32 inch Frameless Digital TV','32 inch VIDAA Smart','40 inch Frameless Digital','40 inch Frameless Android Smart','43 inch QLED Satellite TV','50 inch 4K UHD Android TV','55 inch Smart TV','55 inch 4K UHD Android Smart TV','65 inch 4K UHD Android Smart TV']:
    add('Global Star',m,gen='UNKNOWN',ver='UNVERIFIED')

# Black Ark
for m in ['22 inch Analog Frameless TV','24 inch Digital LED TV','32 inch Digital LED HD TV','32 inch Android Smart TV','40 inch Digital Frameless TV','43 inch FHD Smart LED TV','50 inch UHD 4K Smart Android TV','55 inch 4K Android Smart TV','65 inch 4K Android Smart TV']:
    add('Black Ark',m,gen='UNKNOWN',ver='UNVERIFIED')
for m in ['P40S10','T43D10']:
    add('Black Ark',m,gen='UNKNOWN',ver='PARTIALLY_VERIFIED')

# normalize unique brand/model
seen=set(); out=[]
for x in E:
    k=(x['brand'].lower(),x['model'].lower())
    if k not in seen:
        seen.add(k); out.append(x)
E=out

# Write JSON and TS
Path('/mnt/data/tvwork/tv-master-catalog.json').write_text(json.dumps({'version':'1.0','lastVerified':'2026-08-28','brands':brands,'entries':E},indent=2))

def slug(s):
    return re.sub(r'-+','-',re.sub(r'[^a-z0-9]+','-',s.lower())).strip('-')

ts='''// Canonical TV catalogue imported from MASTER TELEVISION PRODUCT CATALOG v1.0 (2026-08-28).\n// Prices and physical inventory are intentionally excluded.\nexport type TVCatalogEntry = { brand:string; model:string; sizes:string[]; technology:string; generation:string; verificationStatus:'VERIFIED'|'PARTIALLY_VERIFIED'|'UNVERIFIED'|'RETIRED'; market:'UGANDA'|'EAST_AFRICA'|'AFRICA'|'GLOBAL'; };\nexport const tvMasterBrands = '''+json.dumps(brands,indent=2)+''' as const;\nexport const tvMasterCatalog: TVCatalogEntry[] = '''+json.dumps([dict(brand=x['brand'],model=x['model'],sizes=x['sizes'],technology=x['technology'],generation=x['generation'],verificationStatus=x['verification'],market=x['market']) for x in E],indent=2)+''' ;\n'''
Path('/mnt/data/tvwork/apps/business-admin/data/tv-master-catalogue.ts').write_text(ts)

# SQL additive idempotent sync
sql=[]
sql.append('-- Amaal Telecoms Master Television Product Catalog v1.0 — additive/idempotent sync.\n')
sql.append("INSERT INTO brands(name,slug,status) VALUES " + ','.join("('%s','%s','Active')"%(b,slug(b)) for b in brands) + " ON CONFLICT(slug) DO UPDATE SET name=EXCLUDED.name,status='Active',updated_at=now();")
sql.append("INSERT INTO product_categories(name,slug,status) VALUES ('Televisions','televisions','Active') ON CONFLICT(slug) DO NOTHING;")
sql.append("INSERT INTO product_categories(parent_id,name,slug,status) SELECT p.id,'Television Models','television-models','Active' FROM product_categories p WHERE p.slug='televisions' ON CONFLICT(slug) DO NOTHING;")
for x in E:
    pslug=slug(x['brand']+' '+x['model']+' TV')
    name=f"{x['brand']} {x['model']} TV"
    spec={'catalog_source':'MASTER_TELEVISION_PRODUCT_CATALOG','catalog_version':'1.0','manufacturer_model':x['model'],'screen_sizes':x['sizes'],'display_technology':x['technology'],'generation':x['generation'],'market_status':x['market']+'_VERIFIED' if x['market']!='GLOBAL' else 'UNVERIFIED','verification_status':x['verification'],'catalog_status':'ACTIVE'}
    sj=json.dumps(spec,separators=(',',':')).replace("'","''")
    desc=f"Canonical television catalog record from Amaal Telecoms Master Television Product Catalog v1.0. Exact regional SKU verification status: {x['verification']}."
    # Preserve existing prices/visibility/featured and only update identity/spec fields.
    sql.append("INSERT INTO products(name,slug,brand_id,category_id,product_type,short_description,description,specifications,status,website_visibility,featured) SELECT %s,%s,b.id,c.id,'TV',%s,%s,%s::jsonb,'Active','Hidden',false FROM brands b,product_categories c WHERE b.name=%s AND c.slug='television-models' ON CONFLICT(slug) DO UPDATE SET name=EXCLUDED.name,brand_id=EXCLUDED.brand_id,category_id=EXCLUDED.category_id,product_type='TV',short_description=EXCLUDED.short_description,description=EXCLUDED.description,specifications=products.specifications || EXCLUDED.specifications,updated_at=now();" % tuple("'"+v.replace("'","''")+"'" for v in [name,pslug,desc,desc,sj,x['brand']]))
    if x['sizes']:
        for size in x['sizes']:
            sku=slug(x['brand']+' '+x['model']+' '+size+' inch tv').upper()
            vname=f"{x['model']} {size} inch"
            sql.append("INSERT INTO product_variants(product_id,sku,variant_name,size,cost_price,selling_price,wholesale_price,track_inventory,serialized,status) SELECT p.id,%s,%s,%s,0,0,0,true,false,'Active' FROM products p WHERE p.slug=%s ON CONFLICT(sku) DO UPDATE SET variant_name=EXCLUDED.variant_name,size=EXCLUDED.size,status='Active',updated_at=now();" % tuple("'"+v.replace("'","''")+"'" for v in [sku,vname,size+' inch',pslug]))
    else:
        sku=slug(x['brand']+' '+x['model']+' tv').upper()
        sql.append("INSERT INTO product_variants(product_id,sku,variant_name,size,cost_price,selling_price,wholesale_price,track_inventory,serialized,status) SELECT p.id,%s,%s,'',0,0,0,true,false,'Active' FROM products p WHERE p.slug=%s ON CONFLICT(sku) DO UPDATE SET variant_name=EXCLUDED.variant_name,status='Active',updated_at=now();" % tuple("'"+v.replace("'","''")+"'" for v in [sku,x['model'],pslug]))
Path('/mnt/data/tvwork/tv-master-catalogue-sync.sql').write_text('\n'.join(sql)+'\n')
print('entries',len(E),'brands',len(brands),'variants',sum(len(x['sizes']) or 1 for x in E))
