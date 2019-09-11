#!/usr/bin/env bash

TYPE=${1}
VERSION=${2}
ENV=${3}

az acr login --name hmctspublic --subscription 8999dec3-0104-4a27-94ee-6588559729d1

if [ -z "${VERSION}" ] || [ -z "${TYPE}" ] || [ -z "${ENV^^}" ]; then
    echo "Usage create-xlsx.sh [type] [version] [env]"
    exit 1
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

case ${ENV,,} in
  local)
    EM_CCD_ORCHESTRATOR_URL="http://dockerhost:4623"
    SSCS_CCD_ORCHESTRATOR_URL="http://dockerhost:8070"
    TRIBUNALS_API_URL="http://dockerhost:8080"
    TYA_NOTIFICATIONS_API_URL="http://dockerhost:8091"
    BULK_SCAN_API_URL="http://dockerhost:8090"
    BULK_SCAN_ORCHESTRATOR_URL="http://dockerhost:8099"
    COR_BACKEND_URL="http://dockerhost:1234"
  ;;
  saat|sprod|aat|ithc|prod|demo)
    EM_CCD_ORCHESTRATOR_URL="http://em-ccd-orchestrator-${ENV,,}.service.core-compute-${ENV,,}.internal"
    SSCS_CCD_ORCHESTRATOR_URL="http://sscs-ccd-callback-orchestrator-${ENV,,}.service.core-compute-${ENV,,}.internal"
    TRIBUNALS_API_URL="http://sscs-tribunals-api-${ENV,,}.service.core-compute-${ENV,,}.internal"
    TYA_NOTIFICATIONS_API_URL="http://sscs-tya-notif-${ENV,,}.service.core-compute-${ENV,,}.internal"
    BULK_SCAN_API_URL="http://sscs-bulk-scan-${ENV,,}.service.core-compute-${ENV,,}.internal"
    BULK_SCAN_ORCHESTRATOR_URL="http://sscs-bulk-scan-orchestrator-${ENV,,}.service.core-compute-${ENV,,}.internal"
    COR_BACKEND_URL="http://sscs-cor-backend-${ENV,,}.service.core-compute-${ENV,,}.internal"
  ;;
  *)
    echo "${ENV} not recognised"
    exit 1 ;;
esac

docker run -ti --rm --name json2xlsx \
  -v $(pwd)/releases:/tmp \
  -e "EM_CCD_ORCHESTRATOR_URL=${EM_CCD_ORCHESTRATOR_URL}" \
  -e "SSCS_CCD_ORCHESTRATOR_URL=${SSCS_CCD_ORCHESTRATOR_URL}" \
  -e "TRIBUNALS_API_URL=${TRIBUNALS_API_URL}" \
  -e "TYA_NOTIFICATIONS_API_URL=${TYA_NOTIFICATIONS_API_URL}" \
  -e "BULK_SCAN_API_URL=${BULK_SCAN_API_URL}" \
  -e "BULK_SCAN_ORCHESTRATOR_URL=${BULK_SCAN_ORCHESTRATOR_URL}" \
  hmctspublic.azurecr.io/sscs/ccd-definition-importer-${TYPE}:${VERSION} \
  sh -c "cd /opt/ccd-definition-processor && yarn json2xlsx -D /data/sheets -o /tmp/CCD_${CASE_TYPE_XLSX_NAME}Definition_v${VERSION}_${ENV^^}.xlsx"
