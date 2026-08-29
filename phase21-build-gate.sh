#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/apps/business-admin"

node_major="$(node -p 'process.versions.node.split(".")[0]')"
if [ "$node_major" != "24" ]; then
  echo "BLOCKED: Business Admin requires Node 24.x; detected $(node --version)." >&2
  exit 2
fi

if [ ! -d node_modules ]; then
  echo "BLOCKED: node_modules is absent. Run npm ci with network access first." >&2
  exit 2
fi

npm run lint
npm test
npm run build
npm run test:e2e
