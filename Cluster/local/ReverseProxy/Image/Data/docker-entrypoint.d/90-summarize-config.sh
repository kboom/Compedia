#!/bin/sh
set -e

echo "Validating resulting configuration..."
nginx -T
