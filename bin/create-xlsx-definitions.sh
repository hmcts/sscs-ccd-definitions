#!/usr/bin/env bash

DEFINITION_VERSION=$1

az login
az acr login --name hmctspublic --subscription 8999dec3-0104-4a27-94ee-6588559729d1

if [ -z "$DEFINITION_VERSION" ]; then
    echo "Usage create-xlsx-definitions.sh [version]"
    exit 1
fi

CURRENT_DIR=${PWD##*/}

case $CURRENT_DIR in
    "benefit" )
        CASE_TYPE_XLSX_NAME="SSCS"
        CASE_TYPE_IMAGE_NAME="benefit" ;;
    "bulkscan" )
        CASE_TYPE_XLSX_NAME="BulkScanning"
        CASE_TYPE_IMAGE_NAME="bulkscan" ;;
    * )
        echo "Please run from the ./benefit or ./bulk-scan directory"
        exit 1
esac

# Create the spreadsheet using the importer image created above
docker run -ti --rm --name json2xlsx \
  -v $(pwd)/releases:/tmp \
  hmctspublic.azurecr.io/sscs/ccd-definition-importer-${CASE_TYPE_IMAGE_NAME}:$DEFINITION_VERSION \
  sh -c "cd /opt/ccd-definition-processor && yarn json2xlsx -D /data/sheets -o /tmp/sscs-ccd.xlsx"

mkdir -p output

cp releases/sscs-ccd.xlsx output/CCD_${CASE_TYPE_XLSX_NAME}Definition_v${DEFINITION_VERSION}_AAT.xlsx
cp releases/sscs-ccd.xlsx output/CCD_${CASE_TYPE_XLSX_NAME}Definition_v${DEFINITION_VERSION}_PROD.xlsx