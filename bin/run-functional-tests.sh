#!/bin/bash
set -ex

echo "Running Functional tests on ${ENVIRONMENT} env"

if [ ${ENVIRONMENT} == "preview" ]; then
  yarn test:preview
else
  yarn test:aat
fi