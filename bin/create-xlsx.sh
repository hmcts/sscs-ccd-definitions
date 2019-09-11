#!/usr/bin/env bash

TYPE=${1}
VERSION=${2}
LITTLE_ENV=${3,,}
BIG_ENV=${3^^}

az acr login --name hmctspublic --subscription 8999dec3-0104-4a27-94ee-6588559729d1

if [ -z "${VERSION}" ] || [ -z "${TYPE}" ] || [ -z "${BIG_ENV}" ]; then
    echo "Usage create-xlsx.sh [type] [version] [env]"
    exit 1
fi

if [ ${BIG_ENV} != "PROD" ] && [ ${BIG_ENV} != "AAT" ]; then
    echo "Environment must be AAT or PROD"
fi

case ${TYPE} in
    "benefit" )
        CASE_TYPE_XLSX_NAME="SSCS" ;;
    "bulkscan" )
        CASE_TYPE_XLSX_NAME="BulkScanning" ;;
    * )
        echo "Type must be benefit or bulkscan"
        exit 1
esac

docker run -ti --rm --name json2xlsx \
  -v $(pwd)/releases:/tmp \
  -e "EM_CCD_ORCHESTRATOR_URL=http://em-ccd-orchestrator-${LITTLE_ENV}.service.core-compute-${LITTLE_ENV}.internal" \
  -e "SSCS_CCD_ORCHESTRATOR_URL=http://sscs-ccd-callback-orchestrator-${LITTLE_ENV}.service.core-compute-${LITTLE_ENV}.internal" \
  -e "TRIBUNALS_API_URL=http://sscs-tribunals-api-${LITTLE_ENV}.service.core-compute-${LITTLE_ENV}.internal" \
  -e "TYA_NOTIFICATIONS_API_URL=http://sscs-tya-notif-${LITTLE_ENV}.service.core-compute-${LITTLE_ENV}.internal" \
  -e "BULK_SCAN_API_URL=http://sscs-bulk-scan-${LITTLE_ENV}.service.core-compute-${LITTLE_ENV}.internal" \
  -e "BULK_SCAN_ORCHESTRATOR_URL=http://sscs-bulk-scan-orchestrator-${LITTLE_ENV}.service.core-compute-${LITTLE_ENV}.internal" \
  hmctspublic.azurecr.io/sscs/ccd-definition-importer-${TYPE}:${VERSION} \
  sh -c "cd /opt/ccd-definition-processor && yarn json2xlsx -D /data/sheets -o /tmp/CCD_${CASE_TYPE_XLSX_NAME}Definition_v${VERSION}_${BIG_ENV}.xlsx"
