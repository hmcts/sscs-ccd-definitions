#!/usr/bin/env bash
docker build --no-cache -t hmctspublic.azurecr.io/sscs/ccd-definition-importer:dev -f importer.Dockerfile .
docker run -ti --rm --name json2xlsx \
  -v $(pwd)/releases:/tmp \
  hmctspublic.azurecr.io/sscs/ccd-definition-importer:dev \
  sh -c "cd /opt/ccd-definition-processor && yarn json2xlsx -D /data/sheets -o /tmp/sscs-ccd.xlsx"
