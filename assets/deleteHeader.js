// ========= deleteHeader ========= //
const version = 'V1.0.2';

function setHeaderValue(headers, key, value) {
  var lower = key.toLowerCase();
  if (lower in headers) {
    headers[lower] = value;
  } else {
    headers[key] = value;
  }
}

var modifiedHeaders = $request.headers;
setHeaderValue(modifiedHeaders, "X-RevenueCat-ETag", "");

$done({ headers: modifiedHeaders });