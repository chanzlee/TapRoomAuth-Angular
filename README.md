# AuthDemo

project to demo authorization using fake backend and JWTs.

# Specifications

* JWTs have a header, a payload and a digital signature. coded from jwt.io and decoded through angular-2-jwt dependency.

* client: show/hide elements for users based on logged in status and roles. Protect routes using guards

* Server: protect API request using AuthHttp injection.