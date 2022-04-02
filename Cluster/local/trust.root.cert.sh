#!/usr/bin/env sh

# exit when any command fails
set -e

echo "Trusting certificates"

# trust dev root CA
openssl x509 -inform DER -in /https/root-cert.cer -out /https/root-cert.crt
cp /https/root-cert.crt /usr/local/share/ca-certificates/
update-ca-certificates
