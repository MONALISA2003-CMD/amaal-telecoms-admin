import crypto from 'crypto';

/**
 * Provider-neutral payment boundary.
 *
 * Phase 1 deliberately does not hard-code a gateway. Set the variables below
 * when Amaal selects a provider. The checkout/order/payment records remain the
 * source of truth; the provider adapter can be completed later without changing
 * the public checkout contract.
 */
export function paymentConfig(){
  return {
    provider:String(process.env.PAYMENT_PROVIDER||'').trim(),
    apiUrl:String(process.env.PAYMENT_API_URL||'').trim(),
    apiKey:String(process.env.PAYMENT_API_KEY||'').trim(),
    publicKey:String(process.env.PAYMENT_PUBLIC_KEY||'').trim(),
    webhookSecret:String(process.env.PAYMENT_WEBHOOK_SECRET||'').trim(),
    returnUrl:String(process.env.PAYMENT_RETURN_URL||process.env.APP_BASE_URL||'').trim(),
    callbackUrl:String(process.env.PAYMENT_CALLBACK_URL||'').trim(),
    currency:String(process.env.PAYMENT_CURRENCY||'UGX').trim().toUpperCase(),
    country:String(process.env.PAYMENT_COUNTRY||'UG').trim().toUpperCase()
  };
}

export function paymentStatus(){
  const c=paymentConfig();
  return {
    provider:c.provider||null,
    configured:Boolean(c.provider&&c.apiUrl&&c.apiKey),
    publicConfigured:Boolean(c.provider&&c.publicKey),
    currency:c.currency,
    country:c.country
  };
}

export function paymentReference(prefix='WEBPAY'){
  return `${prefix}-${crypto.randomUUID().slice(0,12).toUpperCase()}`;
}

/**
 * Creates a provider-neutral session descriptor. No external request is made
 * until a concrete provider adapter is selected and its API variables are set.
 */
export function createPaymentSession({order,payment,customer,method}){
  const c=paymentConfig();
  return {
    status:'Pending',
    provider:c.provider||null,
    configured:Boolean(c.provider&&c.apiUrl&&c.apiKey),
    method,
    currency:order.currency||c.currency,
    amount:Number(payment.amount),
    reference:payment.reference,
    orderNo:order.order_no,
    customer:{name:customer?.name||order.shipping_name,email:customer?.email||order.shipping_email||'',phone:customer?.phone||order.shipping_phone},
    returnUrl:c.returnUrl||null,
    callbackUrl:c.callbackUrl||null,
    message:c.provider&&c.apiUrl&&c.apiKey
      ? 'Payment gateway credentials are configured. Provider-specific checkout can be enabled without changing the Amaal order contract.'
      : 'Payment gateway is not connected yet. The order and payment intent are safely recorded as Pending until the provider API variables are supplied.'
  };
}
