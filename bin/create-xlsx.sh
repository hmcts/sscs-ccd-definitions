#!/usr/bin/env bash

TYPE=${1}
VERSION=${2}
ENV=${3}

RUN_DIR=`pwd`

az acr login --name hmctspublic --subscription 8999dec3-0104-4a27-94ee-6588559729d1

if [ -z "${VERSION}" ] || [ -z "${TYPE}" ] || [ -z "${ENV}" ]; then
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

case ${ENV} in
  local)
    EM_CCD_ORCHESTRATOR_URL="http://dockerhost:4623"
    SSCS_CCD_ORCHESTRATOR_URL="http://dockerhost:8070"
    TRIBUNALS_API_URL="http://dockerhost:8080"
    TYA_NOTIFICATIONS_API_URL="http://dockerhost:8091"
    BULK_SCAN_API_URL="http://dockerhost:8090"
    BULK_SCAN_ORCHESTRATOR_URL="http://dockerhost:8099"
    COR_BACKEND_URL="http://dockerhost:1234"
    MYA_LINK="http://dockerhost:3000/sign-in?tya=\${subscriptions.appellantSubscription.tya}"
    MYA_APPOINTEE_LINK="http://dockerhost:3000/sign-in?tya=\${subscriptions.appointeeSubscription.tya}"
  ;;
  aat|prod|demo)
    EM_CCD_ORCHESTRATOR_URL="http://em-ccd-orchestrator-${ENV}.service.core-compute-${ENV}.internal"
    SSCS_CCD_ORCHESTRATOR_URL="http://sscs-ccd-callback-orchestrator-${ENV}.service.core-compute-${ENV}.internal"
    TRIBUNALS_API_URL="http://sscs-tribunals-api-${ENV}.service.core-compute-${ENV}.internal"
    TYA_NOTIFICATIONS_API_URL="http://sscs-tya-notif-${ENV}.service.core-compute-${ENV}.internal"
    BULK_SCAN_API_URL="http://sscs-bulk-scan-${ENV}.service.core-compute-${ENV}.internal"
    BULK_SCAN_ORCHESTRATOR_URL="http://sscs-bulk-scan-orchestrator-${ENV}.service.core-compute-${ENV}.internal"
    COR_BACKEND_URL="http://sscs-cor-backend-${ENV}.service.core-compute-${ENV}.internal"
    MYA_LINK="http://sscs-cor-frontend-${ENV}.service.core-compute-${ENV}.internal/sign-in?tya=\${subscriptions.appellantSubscription.tya}"
    MYA_APPOINTEE_LINK="http://sscs-cor-frontend-${ENV}.service.core-compute-${ENV}.internal/sign-in?tya=\${subscriptions.appointeeSubscription.tya}"
  ;;
  *)
    echo "${ENV} not recognised"
    exit 1 ;;
esac

case ${ENV} in
  aat|demo|local)
    TYA_LINK="https://sscs-tya-frontend-aat.service.core-compute-aat.internal/validate-surname/\${subscriptions.appellantSubscription.tya}/trackyourappeal"
    TYA_APPOINTEE_LINK="https://sscs-tya-frontend-aat.service.core-compute-aat.internal/validate-surname/\${subscriptions.appointeeSubscription.tya}/trackyourappeal"
  ;;
  prod)
    TYA_LINK="https://www.track-benefit-appeal.service.gov.uk/validate-surname/\${subscriptions.appellantSubscription.tya}/trackyourappeal"
    TYA_APPOINTEE_LINK="https://www.track-benefit-appeal.service.gov.uk/validate-surname/\${subscriptions.appointeeSubscription.tya}/trackyourappeal"
  ;;
  *)
    echo "${ENV} not recognised"
    exit 1 ;;
esac

if [ ${ENV} == "prod" ]; then
    FIXED_LISTS_SUFFIX="PROD"
else
    FIXED_LISTS_SUFFIX="AAT"
fi

if [ ${TYPE} == "benefit" ]; then
  FIXED_LIST_USERS=$(cat ${RUN_DIR}/${TYPE}/FixedLists_AssignTo_${FIXED_LISTS_SUFFIX}.txt)
else
  FIXED_LIST_USERS=" "
fi

UPPERCASE_ENV=$(printf '%s\n' "${ENV}" | awk '{ print toupper($0) }')

docker run -ti --rm --name json2xlsx \
  -v $(pwd)/releases:/tmp \
  -e "CCD_DEF_EM_CCD_ORCHESTRATOR_URL=${EM_CCD_ORCHESTRATOR_URL}" \
  -e "CCD_DEF_SSCS_CCD_ORCHESTRATOR_URL=${SSCS_CCD_ORCHESTRATOR_URL}" \
  -e "CCD_DEF_TRIBUNALS_API_URL=${TRIBUNALS_API_URL}" \
  -e "CCD_DEF_TYA_NOTIFICATIONS_API_URL=${TYA_NOTIFICATIONS_API_URL}" \
  -e "CCD_DEF_BULK_SCAN_API_URL=${BULK_SCAN_API_URL}" \
  -e "CCD_DEF_BULK_SCAN_ORCHESTRATOR_URL=${BULK_SCAN_ORCHESTRATOR_URL}" \
  -e "CCD_DEF_COR_BACKEND_URL=${COR_BACKEND_URL}" \
  -e "CCD_DEF_TYA_LINK=${TYA_LINK}" \
  -e "CCD_DEF_TYA_APPOINTEE_LINK=${TYA_APPOINTEE_LINK}" \
  -e "CCD_DEF_MYA_LINK=${MYA_LINK}" \
  -e "CCD_DEF_MYA_APPOINTEE_LINK=${MYA_APPOINTEE_LINK}" \
  -e "CCD_DEF_FIXED_LIST_USERS=${FIXED_LIST_USERS}" \
  -e "CCD_DEF_E=${UPPERCASE_ENV}" \
  hmctspublic.azurecr.io/sscs/ccd-definition-importer-${TYPE}:${VERSION} \
  sh -c "cd /opt/ccd-definition-processor && yarn json2xlsx -D /data/sheets -o /tmp/CCD_${CASE_TYPE_XLSX_NAME}Definition_v${VERSION}_${UPPERCASE_ENV}.xlsx"
