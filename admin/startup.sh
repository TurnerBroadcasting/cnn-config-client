#!/usr/bin/env bash

if [[ "${NODE_ENV}" == "development" ]]; then
  npm start -s
elif [[ "${NODE_ENV}" == "production" ]]; then
  npm run build
else
  echo "NODE_ENV value didn't match expectations: ${NODE_ENV}"
  exit 1
fi
