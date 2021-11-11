#!/usr/bin/env bash

TYPE=${1}
ENV=${2}
LIKE_PROD=${3:-${ENV}}

RUN_DIR=`pwd`
COMMON_VERSION=$(cat ${RUN_DIR}/benefit/SSCS_COMMON_VERSION.txt)

if [ -z "${TYPE}" ] || [ -z "${ENV}" ]; then
    echo "Usage create-xlsx.sh [type] [env]"
    exit 1
fi

if [ ${ENV} == "preview" ]; then
    ENV="aat"
fi

TIMESTAMP=$(printf '%s\n' "$LAST_COMMIT_TIMESTAMP")
SUBSCRIPTION=$(printf '%s\n' "$REGISTRY_SUBSCRIPTION")
COMMIT_LABEL=$(printf '%s\n' "$GIT_COMMIT" | awk '{ print substr($0,0,7) }')
echo "ENV is $ENV"
echo "COMMIT_LABEL is $COMMIT_LABEL"
echo "TIMESTAMP is $TIMESTAMP"
echo "BRANCH_NAME is $BRANCH_NAME"
echo "SUBSCRIPTION is $SUBSCRIPTION"

#az acr login --name hmctspublic --subscription 8999dec3-0104-4a27-94ee-6588559729d1
#LATEST_TAG=$(az acr repository show-tags -n hmctspublic --repository sscs/ccd-definitions --subscription 8999dec3-0104-4a27-94ee-6588559729d1 --orderby time_desc -o tsv --query "[]")

if [ "$BRANCH_NAME" == "staging" ]; then
  LATEST_TAG="$BRANCH_NAME-${COMMIT_LABEL}-$LAST_COMMIT_TIMESTAMP"
elif [[ "$BRANCH_NAME" == "master" || "$BRANCH_NAME" == "demo" || "$BRANCH_NAME" == "ithc" || "$BRANCH_NAME" == "perftest" ]]; then
   LATEST_TAG="aat-${COMMIT_LABEL}-$LAST_COMMIT_TIMESTAMP"
else
  LATEST_TAG="This-is-probably-a-PR-so-fail-here-branch-name-is-${BRANCH_NAME}"
fi
echo "Latest tag from repo $LATEST_TAG"

case ${TYPE} in
    "benefit" )
        CASE_TYPE_XLSX_NAME="SSCS" ;;
    "bulkscan" )
        CASE_TYPE_XLSX_NAME="BulkScanning" ;;
    * )
        echo "Type must be benefit or bulkscan"
        exit 1
esac

if [ ${ENV} == "local" ]; then
    EM_CCD_ORCHESTRATOR_URL="http://host.docker.internal:4623"
    SSCS_CCD_ORCHESTRATOR_URL="http://host.docker.internal:8070"
    TRIBUNALS_API_URL="http://host.docker.internal:8080"
    TYA_NOTIFICATIONS_API_URL="http://host.docker.internal:8081"
    BULK_SCAN_API_URL="http://host.docker.internal:8090"
    BULK_SCAN_ORCHESTRATOR_URL="http://host.docker.internal:8099"
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
    EM_CCD_ORCHESTRATOR_URL="http://em-ccdorc-demo.service.core-compute-demo.internal/"
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
    MYA_LINK="http://sscs-cor-frontend-${ENV}.service.core-compute-${ENV}.internal/sign-in?tya=\${subscriptions.appellantSubscription.tya}"
    MYA_REPRESENTATIVE_LINK="http://sscs-cor-frontend-${ENV}.service.core-compute-${ENV}.internal/sign-in?tya=\${subscriptions.representativeSubscription.tya}"
    MYA_APPOINTEE_LINK="http://sscs-cor-frontend-${ENV}.service.core-compute-${ENV}.internal/sign-in?tya=\${subscriptions.appointeeSubscription.tya}"
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

if [ ${ENV} == "prod" ]; then
    FIXED_LISTS_SUFFIX="PROD"
else
    FIXED_LISTS_SUFFIX="AAT"
fi

if [ ${TYPE} == "benefit" ]; then
  PIP_DECISION_NOTICE_QUESTIONS=$(curl https://raw.githubusercontent.com/hmcts/sscs-common/$COMMON_VERSION/src/main/resources/reference-data/pip-decision-notice-questions.txt)
  ESA_DECISION_NOTICE_QUESTIONS=$(curl https://raw.githubusercontent.com/hmcts/sscs-common/$COMMON_VERSION/src/main/resources/reference-data/esa-decision-notice-questions.txt)
  UC_DECISION_NOTICE_QUESTIONS=$(curl https://raw.githubusercontent.com/hmcts/sscs-common/$COMMON_VERSION/src/main/resources/reference-data/uc-decision-notice-questions.txt)
  LANGUAGES=$(curl https://raw.githubusercontent.com/hmcts/sscs-common/$COMMON_VERSION/src/main/resources/reference-data/languages.txt)
fi

UPPERCASE_ENV=$(printf '%s\n' "${ENV}" | awk '{ print toupper($0) }')

if [ ${ENV} == "prod" ] || [ ${LIKE_PROD} == "prod" ]; then
  excludedFilenamePatterns="-e *-nonprod.json,*-shuttered.json"
else
  excludedFilenamePatterns="-e *-prod.json,*-shuttered.json"
fi

docker run -i --rm --name json2xlsx \
  -u $(id -u):$(id -g) \
  -v $(pwd)/src/test/resources/ccd_definition:/tmp \
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
  -e "CCD_DEF_PIP_DECISION_NOTICE_QUESTIONS=${PIP_DECISION_NOTICE_QUESTIONS}" \
  -e "CCD_DEF_ESA_DECISION_NOTICE_QUESTIONS=${ESA_DECISION_NOTICE_QUESTIONS}" \
  -e "CCD_DEF_UC_DECISION_NOTICE_QUESTIONS=${UC_DECISION_NOTICE_QUESTIONS}" \
  -e "CCD_DEF_LANGUAGES=${LANGUAGES}" \
  -e "CCD_DEF_E=${UPPERCASE_ENV}" \
  hmctspublic.azurecr.io/sscs/ccd-definitions:${LATEST_TAG} \
  sh -c "cd /opt/ccd-definition-processor && yarn json2xlsx -D /data/sheets ${excludedFilenamePatterns} -o /tmp/CCD_${CASE_TYPE_XLSX_NAME}Definition_${UPPERCASE_ENV}.xlsx"
