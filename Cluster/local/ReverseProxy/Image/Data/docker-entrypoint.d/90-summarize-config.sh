#!/usr/bin/env sh
set -ex

echo "Validating resulting configuration..."
nginx -T
