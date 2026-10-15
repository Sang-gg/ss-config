// ========= ID ========= //
const mapping = {
  'Locket': ['Gold']
};

// ========= Cấu hình ========= //
const config = {
  entitlement: 'Gold',
  product_id: 'com.locket.premium.yearly',
  expires: '9999-12-31T23:59:59Z',
  purchase_date: '2024-07-28T01:04:17Z',
  original_purchase: '2024-07-28T01:04:18Z',
  store: 'app_store',
  message: 'Đã kích hoạt.'
};

// ========= Xử lý ========= //
var ua = $request.headers["User-Agent"] || $request.headers["user-agent"];
var obj = JSON.parse($response.body);

obj.Attention = config.message;

var subscription = {
  is_sandbox: false,
  ownership_type: "PURCHASED",
  billing_issues_detected_at: null,
  period_type: "normal",
  expires_date: config.expires,
  grace_period_expires_date: null,
  unsubscribe_detected_at: null,
  original_purchase_date: config.original_purchase,
  purchase_date: config.purchase_date,
  store: config.store
};

var entitlement = {
  grace_period_expires_date: null,
  purchase_date: config.purchase_date,
  product_identifier: config.product_id,
  expires_date: config.expires
};

const match = Object.keys(mapping).find(e => ua.includes(e));

if (match) {
  let [key, value] = mapping[match];
  if (value) {
    entitlement.product_identifier = value;
    obj.subscriber.subscriptions[value] = subscription;
  } else {
    obj.subscriber.subscriptions[config.product_id] = subscription;
  }
  obj.subscriber.entitlements[key] = entitlement;
} else {
  obj.subscriber.subscriptions[config.product_id] = subscription;
  obj.subscriber.entitlements.pro = entitlement;
}

$done({ body: JSON.stringify(obj) });