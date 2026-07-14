#!/usr/bin/env bash
set -e
echo "--- Installing server dependencies ---"
npm install
echo "--- Building server ---"
npm run build
echo "--- Installing client dependencies ---"
cd client && npm install && cd ..
echo "--- Building client ---"
cd client && npm run build && cd ..
echo "--- Build complete ---"
