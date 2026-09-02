export type CommerceItem={
  id:string;
  variantId?:string;
  name:string;
  brand?:string;
  slug?:string;
  price:number;
  qty:number;
  cartItemId?:string;
  imageUrl?:string;
  available?:number;
  variantName?:string;
};
export type ServerCart={cartId:string|null;items:CommerceItem[];subtotal:number;itemCount:number;currency:string};
export const CART_KEY='amaal_cart_v3';
export const GUEST_CART_KEY='amaal_guest_cart_v1';
export const WISHLIST_KEY='amaal_wishlist_v1';
export const RECENT_KEY='amaal_recent_v1';
export const ORDER_KEY='amaal_orders_v1';
export const money=(n:number)=>`UGX ${Math.max(0,n).toLocaleString('en-UG')}`;
export function read<T>(key:string,fallback:T):T{try{return JSON.parse(localStorage.getItem(key)||'null')??fallback}catch{return fallback}}
export function write<T>(key:string,value:T){try{localStorage.setItem(key,JSON.stringify(value));window.dispatchEvent(new Event('amaal-commerce-updated'))}catch{}}
export function guestToken(){if(typeof window==='undefined')return '';let token=localStorage.getItem(GUEST_CART_KEY);if(!token){token=`${crypto.randomUUID()}${crypto.randomUUID().replace(/-/g,'')}`;localStorage.setItem(GUEST_CART_KEY,token)}return token}
const apiBase=()=>process.env.NEXT_PUBLIC_API_BASE_URL||process.env.AMAAL_API_BASE_URL||'';
async function cartRequest(path:string,init:RequestInit={}):Promise<ServerCart>{const headers=new Headers(init.headers);headers.set('Content-Type','application/json');headers.set('X-Amaal-Guest-Cart-Token',guestToken());const r=await fetch(`${apiBase()}${path}`,{...init,headers});const data=await r.json().catch(()=>({}));if(!r.ok)throw new Error(data?.error||'Shopping bag action failed.');return data;}
export async function syncServerCart():Promise<ServerCart>{const data=await cartRequest('/api/public/cart',{cache:'no-store'});if(typeof window!=='undefined'&&data.cartId)localStorage.setItem('amaal_cart_server_id',data.cartId);return data}
export async function addServerCart(variantId:string,quantity=1):Promise<ServerCart>{const data=await cartRequest('/api/public/cart/items',{method:'POST',body:JSON.stringify({variantId,quantity})});if(typeof window!=='undefined'&&data.cartId)localStorage.setItem('amaal_cart_server_id',data.cartId);return data}
export async function updateServerCart(itemId:string,quantity:number):Promise<ServerCart>{return cartRequest(`/api/public/cart/items/${itemId}`,{method:'PATCH',body:JSON.stringify({quantity})})}
export async function removeServerCart(itemId:string):Promise<ServerCart>{return cartRequest(`/api/public/cart/items/${itemId}`,{method:'DELETE'})}
export async function clearServerCart():Promise<ServerCart>{return cartRequest('/api/public/cart/clear',{method:'POST'})}
export function serverCartToLegacy(data:ServerCart):CommerceItem[]{return data.items.map(x=>({...x,id:x.productId||x.variantId||x.cartItemId||x.id,variantId:x.variantId,qty:x.quantity,price:x.unit_price,name:x.name,brand:x.brand_name,slug:x.slug,cartItemId:x.item_id,imageUrl:x.image_url,available:x.available,variantName:x.variant_name}))}
export async function addCart(item:Omit<CommerceItem,'qty'>,qty=1){try{const data=await addServerCart(String(item.variantId||item.id),qty);write(CART_KEY,serverCartToLegacy(data));return data}catch(error){const items=getCart();const existing=items.find(x=>x.id===item.id&&x.variantId===item.variantId);if(existing)existing.qty+=qty;else items.push({...item,qty});write(CART_KEY,items);throw error}}
export async function getServerCartSafe():Promise<ServerCart|null>{try{return await syncServerCart()}catch{return null}}
export function getCart():CommerceItem[]{return read(CART_KEY,[])}
export async function removeCart(id:string){const item=getCart().find(x=>x.id===id||x.cartItemId===id);if(item?.cartItemId){try{const data=await removeServerCart(item.cartItemId);write(CART_KEY,serverCartToLegacy(data));return data}catch{}}write(CART_KEY,getCart().filter(x=>x.id!==id&&x.cartItemId!==id))}
export async function updateCart(id:string,qty:number){const item=getCart().find(x=>x.id===id||x.cartItemId===id);if(item?.cartItemId){try{const data=await updateServerCart(item.cartItemId,qty);write(CART_KEY,serverCartToLegacy(data));return data}catch{}}write(CART_KEY,getCart().map(x=>(x.id===id||x.cartItemId===id)?{...x,qty:Math.max(1,Math.min(99,qty))}:x))}
export async function clearCart(){try{const data=await clearServerCart();write(CART_KEY,[]);if(typeof window!=='undefined')localStorage.removeItem('amaal_cart_server_id');return data}catch{write(CART_KEY,[])}}
export async function mergeGuestCartWithCustomer(customerToken:string){const guest=guestToken();const headers=new Headers({'Content-Type':'application/json','X-Amaal-Customer-Token':customerToken,'X-Amaal-Guest-Cart-Token':guest});const r=await fetch(`${apiBase()}/api/public/cart/merge`,{method:'POST',headers,body:JSON.stringify({guestToken:guest})});if(!r.ok)return null;const data=await r.json();write(CART_KEY,serverCartToLegacy(data));return data}
export async function trackCommerce(eventType:string,data:Record<string,unknown>={}){try{await fetch(`${apiBase()}/api/public/commerce/event`,{method:'POST',headers:{'Content-Type':'application/json','X-Amaal-Guest-Cart-Token':guestToken()},body:JSON.stringify({eventType,...data})})}catch{}}
export function getWishlist():string[]{return read(WISHLIST_KEY,[])}
export function toggleWishlist(id:string){const s=new Set(getWishlist());s.has(id)?s.delete(id):s.add(id);write(WISHLIST_KEY,[...s]);trackCommerce('wishlist',{productId:id});return s.has(id)}
export function rememberProduct(id:string){const list=read<string[]>(RECENT_KEY,[]).filter(x=>x!==id);list.unshift(id);write(RECENT_KEY,list.slice(0,8));trackCommerce('product_view',{productId:id})}
export function getLocalOrders(){return read<any[]>(ORDER_KEY,[])}
export function saveLocalOrder(order:any){const rows=getLocalOrders().filter(x=>x.orderNo!==order.orderNo);rows.unshift(order);write(ORDER_KEY,rows.slice(0,20))}
