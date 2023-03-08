#!/usr/bin/env bash

TYPE=${1}
VERSION=${2}
ENV=${3}
LIKE_PROD=${4:-${ENV}}
SHUTTERED=${5:-false}

RUN_DIR=`pwd`


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

TAG_VERSION=$(cat ${RUN_DIR}/${TYPE}/VERSION.yaml | awk '{print $2}')

if [ "${VERSION}" == "tag" ]; then
    CCD_DEF_VERSION=${TAG_VERSION}
    FILE_VERSION=${TAG_VERSION}
elif [ "${VERSION}" == "dev" ]; then
    CCD_DEF_VERSION="${TAG_VERSION}-dev"
    FILE_VERSION=${VERSION}
else
    CCD_DEF_VERSION="${TAG_VERSION}"
    FILE_VERSION=${VERSION}
fi

UPPERCASE_ENV=$(printf '%s\n' "${ENV}" | awk '{ print toupper($0) }')

if [ ${SHUTTERED} == true ]; then
  shutteredExclusion="*-nonshuttered.json"
  ccdDefinitionFile="CCD_${CASE_TYPE_XLSX_NAME}Definition_v${FILE_VERSION}_${UPPERCASE_ENV}_SHUTTERED.xlsx"
else
  shutteredExclusion="*-shuttered.json"
  ccdDefinitionFile="CCD_${CASE_TYPE_XLSX_NAME}Definition_v${FILE_VERSION}_${UPPERCASE_ENV}.xlsx"
fi

echo "Tag version: ${TAG_VERSION}, CCD Definitions Version: ${CCD_DEF_VERSION}, File Name: ${ccdDefinitionFile}"

docker build -t hmctspublic.azurecr.io/sscs/ccd-definition-importer-${TYPE}:latest -f ./docker/importer.Dockerfile ./${TYPE}

if [ ${ENV} == "local" ]; then
    EM_CCD_ORCHESTRATOR_URL="http://localhost:4623"
    SSCS_CCD_ORCHESTRATOR_URL="http://localhost:8070"
    TRIBUNALS_API_URL="http://localhost:8080"
    TYA_NOTIFICATIONS_API_URL="http://localhost:8081"
    BULK_SCAN_API_URL="http://localhost:8090"
    BULK_SCAN_ORCHESTRATOR_URL="http://localhost:8099"
elif [ ${ENV} == "aat" ] || [ ${ENV} == "demo" ] || [ ${ENV} == "prod" ] || [ ${ENV} == "perftest" ] || [ ${ENV} == "ithc" ]; then
    SSCS_CCD_ORCHESTRATOR_URL="http://sscs-ccd-callback-orchestrator-${ENV}.service.core-compute-${ENV}.internal"
    TRIBUNALS_API_URL="http://sscs-tribunals-api-${ENV}.service.core-compute-${ENV}.internal"
    TYA_NOTIFICATIONS_API_URL="http://sscs-tya-notif-${ENV}.service.core-compute-${ENV}.internal"
    BULK_SCAN_API_URL="http://sscs-bulk-scan-${ENV}.service.core-compute-${ENV}.internal"
    BULK_SCAN_ORCHESTRATOR_URL="http://sscs-bulk-scan-orchestrator-${ENV}.service.core-compute-${ENV}.internal"
else
        echo "${ENV} not recognised"
        exit 1
fi

if [ ${ENV} == "demo" ] || [ ${ENV} == "ithc" ]; then
    EM_CCD_ORCHESTRATOR_URL="http://em-ccd-orchestrator-demo.service.core-compute-demo.internal/"
elif [ ${ENV} == "aat" ] || [ ${ENV} == "perftest" ] || [ ${ENV} == "prod" ]; then
    EM_CCD_ORCHESTRATOR_URL="http://em-ccd-orchestrator-${ENV}.service.core-compute-${ENV}.internal"
fi

case ${ENV} in
  local)
    MYA_LINK="http://dockerhost:3000/sign-in?tya=\${subscriptions.appellantSubscription.tya}"
    MYA_REPRESENTATIVE_LINK="http://dockerhost:3000/sign-in?tya=\${subscriptions.representativeSubscription.tya}"
    MYA_APPOINTEE_LINK="http://dockerhost:3000/sign-in?tya=\${subscriptions.appointeeSubscription.tya}"
    TYA_LINK="http://dockerhost:3000/validate-surname/\${subscriptions.appellantSubscription.tya}/trackyourappeal"
    TYA_APPOINTEE_LINK="http://dockerhost:3000/validate-surname/\${subscriptions.appointeeSubscription.tya}/trackyourappeal"
  ;;
  demo)
    TYA_LINK="https://sscs-tya-frontend-${ENV}.service.core-compute-${ENV}.internal/validate-surname/\${subscriptions.appellantSubscription.tya}/trackyourappeal"
    TYA_APPOINTEE_LINK="https://sscs-tya-frontend-${ENV}.service.core-compute-${ENV}.internal/validate-surname/\${subscriptions.appointeeSubscription.tya}/trackyourappeal"
    MYA_LINK="https://sscs-cor.demo.platform.hmcts.net/sign-in?tya=\${subscriptions.appellantSubscription.tya}"
    MYA_REPRESENTATIVE_LINK="https://sscs-cor.demo.platform.hmcts.net/sign-in?tya=\${subscriptions.representativeSubscription.tya}"
    MYA_APPOINTEE_LINK="https://sscs-cor.demo.platform.hmcts.net/sign-in?tya=\${subscriptions.appointeeSubscription.tya}"
  ;;
  perftest)
    TYA_LINK="https://sscs-tya-frontend-${ENV}.service.core-compute-${ENV}.internal/validate-surname/\${subscriptions.appellantSubscription.tya}/trackyourappeal"
    TYA_APPOINTEE_LINK="https://sscs-tya-frontend-${ENV}.service.core-compute-${ENV}.internal/validate-surname/\${subscriptions.appointeeSubscription.tya}/trackyourappeal"
    MYA_LINK="http://sscs-cor-frontend-${ENV}.service.core-compute-${ENV}.internal/sign-in?tya=\${subscriptions.appellantSubscription.tya}"
    MYA_REPRESENTATIVE_LINK="http://sscs-cor-frontend-${ENV}.service.core-compute-${ENV}.internal/sign-in?tya=\${subscriptions.representativeSubscription.tya}"
    MYA_APPOINTEE_LINK="http://sscs-cor-frontend-${ENV}.service.core-compute-${ENV}.internal/sign-in?tya=\${subscriptions.appointeeSubscription.tya}"
  ;;
  ithc)
    TYA_LINK="https://sscs-tya-frontend-${ENV}.service.core-compute-${ENV}.internal/validate-surname/\${subscriptions.appellantSubscription.tya}/trackyourappeal"
    TYA_APPOINTEE_LINK="https://sscs-tya-frontend-${ENV}.service.core-compute-${ENV}.internal/validate-surname/\${subscriptions.appointeeSubscription.tya}/trackyourappeal"
    MYA_LINK="http://sscs-cor-frontend-${ENV}.service.core-compute-${ENV}.internal/sign-in?tya=\${subscriptions.appellantSubscription.tya}"
    MYA_REPRESENTATIVE_LINK="http://sscs-cor-frontend-${ENV}.service.core-compute-${ENV}.internal/sign-in?tya=\${subscriptions.representativeSubscription.tya}"
    MYA_APPOINTEE_LINK="http://sscs-cor-frontend-${ENV}.service.core-compute-${ENV}.internal/sign-in?tya=\${subscriptions.appointeeSubscription.tya}"
  ;;
  aat)
    TYA_LINK="http://track-appeal.aat.platform.hmcts.net/validate-surname/\${subscriptions.appellantSubscription.tya}/trackyourappeal"
    TYA_APPOINTEE_LINK="http://track-appeal.aat.platform.hmcts.net/validate-surname/\${subscriptions.appointeeSubscription.tya}/trackyourappeal"
    MYA_LINK="http://sscs-cor.aat.platform.hmcts.net/sign-in?tya=\${subscriptions.appellantSubscription.tya}"
    MYA_REPRESENTATIVE_LINK="http://sscs-cor.aat.platform.hmcts.net/sign-in?tya=\${subscriptions.representativeSubscription.tya}"
    MYA_APPOINTEE_LINK="http://sscs-cor.aat.platform.hmcts.net/sign-in?tya=\${subscriptions.appointeeSubscription.tya}"
    ;;
  prod)
    TYA_LINK="https://www.track-benefit-appeal.service.gov.uk/validate-surname/\${subscriptions.appellantSubscription.tya}/trackyourappeal"
    TYA_APPOINTEE_LINK="https://www.track-benefit-appeal.service.gov.uk/validate-surname/\${subscriptions.appointeeSubscription.tya}/trackyourappeal"
    MYA_LINK="https://www.manage.appeal-benefit-decision.service.gov.uk/sign-in?tya=\${subscriptions.appellantSubscription.tya}"
    MYA_REPRESENTATIVE_LINK="https://www.manage.appeal-benefit-decision.service.gov.uk/sign-in?tya=\${subscriptions.representativeSubscription.tya}"
    MYA_APPOINTEE_LINK="https://www.manage.appeal-benefit-decision.service.gov.uk/sign-in?tya=\${subscriptions.appointeeSubscription.tya}"

  ;;
  *)
    echo "${ENV} not recognised"
    exit 1 ;;
esac

if [ ${ENV} == "prod" ] || [ ${LIKE_PROD} == "prod" ]; then
  excludedFilenamePatterns="-e *-nonprod.json,${shutteredExclusion}"
else
  excludedFilenamePatterns="-e *-prod.json,${shutteredExclusion}"
fi

echo ${excludedFilenamePatterns}

docker run --rm --name json2xlsx \
  -v $(pwd)/releases:/tmp \
  -e "CCD_DEF_EM_CCD_ORCHESTRATOR_URL=${EM_CCD_ORCHESTRATOR_URL}" \
  -e "CCD_DEF_SSCS_CCD_ORCHESTRATOR_URL=${SSCS_CCD_ORCHESTRATOR_URL}" \
  -e "CCD_DEF_TRIBUNALS_API_URL=${TRIBUNALS_API_URL}" \
  -e "CCD_DEF_TYA_NOTIFICATIONS_API_URL=${TYA_NOTIFICATIONS_API_URL}" \
  -e "CCD_DEF_BULK_SCAN_API_URL=${BULK_SCAN_API_URL}" \
  -e "CCD_DEF_BULK_SCAN_ORCHESTRATOR_URL=${BULK_SCAN_ORCHESTRATOR_URL}" \
  -e "CCD_DEF_TYA_LINK=${TYA_LINK}" \
  -e "CCD_DEF_TYA_APPOINTEE_LINK=${TYA_APPOINTEE_LINK}" \
  -e "CCD_DEF_MYA_LINK=${MYA_LINK}" \
  -e "CCD_DEF_MYA_REPRESENTATIVE_LINK=${MYA_REPRESENTATIVE_LINK}" \
  -e "CCD_DEF_MYA_APPOINTEE_LINK=${MYA_APPOINTEE_LINK}" \
  -e "CCD_DEF_ENV=${UPPERCASE_ENV}" \
  -e "CCD_DEF_VERSION=${CCD_DEF_VERSION}" \
  hmctspublic.azurecr.io/sscs/ccd-definition-importer-${TYPE}:latest \
  sh -c "cd /opt/ccd-definition-processor && yarn json2xlsx -D /data/sheets ${excludedFilenamePatterns} -o /tmp/${ccdDefinitionFile}"
