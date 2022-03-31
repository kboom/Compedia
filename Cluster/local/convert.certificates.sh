
#!/usr/bin/env bash
cd /work/Certs
for fn in *.pfx; do
_certName_=$(basename $fn .pfx)
openssl pkcs12 -in $fn -nocerts -nodes -out $_certName_.rsa -passin pass:password
openssl pkcs12 -in $fn -clcerts -nokeys -out $_certName_.crt -passin pass:password
done