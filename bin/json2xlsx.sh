#!/usr/bin/env bash

DEFINITION_VERSION=dev

docker build --no-cache -t hmctspublic.azurecr.io/sscs/ccd-definition-importer:$DEFINITION_VERSION -f importer.Dockerfile .
docker run -ti --rm --name json2xlsx \
  -v $(pwd)/releases:/tmp \
  hmctspublic.azurecr.io/sscs/ccd-definition-importer:$DEFINITION_VERSION \
  sh -c "cd /opt/ccd-definition-processor && yarn json2xlsx -D /data/sheets -o /tmp/sscs-ccd-$DEFINITION_VERSION.xlsx"
