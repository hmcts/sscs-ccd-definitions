#!/usr/bin/env bash

DEFINITION_VERSION="dev-1.0"

# Create the importer image with a version number
docker build --no-cache -t hmctspublic.azurecr.io/sscs/ccd-definition-importer:$DEFINITION_VERSION -f importer.Dockerfile .

# Create the spreadsheet using the importer image created above
docker run -ti --rm --name json2xlsx \
  -v $(pwd)/releases:/tmp \
  hmctspublic.azurecr.io/sscs/ccd-definition-importer:$DEFINITION_VERSION \
  sh -c "cd /opt/ccd-definition-processor && yarn json2xlsx -D /data/sheets -o /tmp/sscs-ccd.xlsx"

