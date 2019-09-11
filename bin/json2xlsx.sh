#!/usr/bin/env bash

TYPE=${1}
VERSION=${2}

docker run -ti --rm --name json2xlsx \
  -v $(pwd)/releases:/tmp \
  hmctspublic.azurecr.io/sscs/ccd-definition-importer-${TYPE}:${VERSION} \
  sh -c "cd /opt/ccd-definition-processor && yarn json2xlsx -D /data/sheets -o /tmp/sscs-ccd-${TYPE}-${VERSION}.xlsx"

