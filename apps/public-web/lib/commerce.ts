export type CommerceItem={
  id:string;
  variantId?:string;
  name:string;
  brand?:string;
  slug?:string;
  price:number;
  qty:number;
};
export const CART_KEY='amaal_cart_v2';
export const WISHLIST_KEY='amaal_wishlist_v1';
export const RECENT_KEY='amaal_recent_v1';
export const ORDER_KEY='amaal_orders_v1';
export const money=(n:number)=>`UGX ${Math.max(0,n).toLocaleString('en-UG')}`;
export function read<T>(key:string,fallback:T):T{try{return JSON.parse(localStorage.getItem(key)||'null')??fallback}catch{return fallback}}
export function write<T>(key:string,value:T){try{localStorage.setItem(key,JSON.stringify(value));window.dispatchEvent(new Event('amaal-commerce-updated'))}catch{}}
export function getCart():CommerceItem[]{return read(CART_KEY,[])}
export function addCart(item:Omit<CommerceItem,'qty'>,qty=1){const items=getCart();const existing=items.find(x=>x.id===item.id&&x.variantId===item.variantId);if(existing)existing.qty+=qty;else items.push({...item,qty});write(CART_KEY,items)}
export function removeCart(id:string){write(CART_KEY,getCart().filter(x=>x.id!==id))}
export function updateCart(id:string,qty:number){write(CART_KEY,getCart().map(x=>x.id===id?{...x,qty:Math.max(1,Math.min(99,qty))}:x))}
export function clearCart(){write(CART_KEY,[])}
export function getWishlist():string[]{return read(WISHLIST_KEY,[])}
export function toggleWishlist(id:string){const s=new Set(getWishlist());s.has(id)?s.delete(id):s.add(id);write(WISHLIST_KEY,[...s]);return s.has(id)}
export function rememberProduct(id:string){const list=read<string[]>(RECENT_KEY,[]).filter(x=>x!==id);list.unshift(id);write(RECENT_KEY,list.slice(0,8))}
export function getLocalOrders(){return read<any[]>(ORDER_KEY,[])}
export function saveLocalOrder(order:any){const rows=getLocalOrders().filter(x=>x.orderNo!==order.orderNo);rows.unshift(order);write(ORDER_KEY,rows.slice(0,20))}
