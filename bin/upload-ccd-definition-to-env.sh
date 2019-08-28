#!/bin/bash
set -e

cd "$( dirname "${BASH_SOURCE[0]}" )"

function require () {
  local command=${1}
  local installMessage=${2}
  hash ${command} 2>/dev/null || {
    logError "${command} is not installed. ${installMessage}. Aborting."
    exit 1
  }
}

function keyVaultRead() {
  az keyvault secret show --vault-name sscs-vault --name ${1} --query value -o tsv
}

if [[ ${1} = "-v" ]]; then
  export CURL_OPTS='-v'
  shift
else
  export CURL_OPTS='--fail --silent'
fi

if [ -z "${1}" ]
  then
    echo "Usage: ./upload-definition-to-env.docker.sh [env] [version]\n"
    exit 1
fi

require az "On mac run \`brew install azure-cli\`"
require python3 "On mac run \`brew install python3\`"
require jq "On mac run \`brew install jq\`"

az account show &> /dev/null || {
    echo "Please run \`az login\` and follow the instructions first"
    exit 1
}

ENV=${1}
VERSION=${2}

PROXY=http://proxyout.reform.hmcts.net:8080
IDAM_URI="http://idam-api-idam-${ENV}.service.core-compute-idam-${ENV}.internal"
AUTH_PROVIDER_BASE_URL="http://rpe-service-auth-provider-${ENV}.service.core-compute-${ENV}.internal"
CCD_STORE_BASE_URL="http://ccd-definition-store-api-${ENV}.service.core-compute-${ENV}.internal"
EM_CCD_ORCHESTRATOR_URL="http://em-ccd-orchestrator-${ENV}.service.core-compute-${ENV}.internal"
SSCS_CCD_ORCHESTRATOR_URL="http://sscs-ccd-callback-orchestrator-${ENV}.service.core-compute-${ENV}.internal"
TRIBUNALS_API_URL="http://sscs-tribunals-api-${ENV}.service.core-compute-${ENV}.internal"
TYA_NOTIFICATIONS_API_URL="http://sscs-tya-notif-${ENV}.service.core-compute-${ENV}.internal"
BULK_SCAN_API_URL="http://sscs-bulk-scan-${ENV}.service.core-compute-${ENV}.internal"
BULK_SCAN_ORCHESTRATOR_URL="http://sscs-bulk-scan-orchestrator-${ENV}.service.core-compute-${ENV}.internal"


MICROSERVICE=ccd_gw

# Good for Mac and Windows for Linux, you'll need to find it first - jump into a container and run
# netstat -nr | grep '^0\.0\.0\.0' | awk '{print $2}')
# It's probably 172.17.0.1
DOCKER_HOST_IP="host.docker.internal"
#DOCKER_HOST_IP=172.17.0.1

case ${ENV} in
  local)
    PROXY=""
    IDAM_URI='http://'${DOCKER_HOST_IP}':5000'
    IMPORTER_USERNAME=ccd.docker.default@hmcts.net
    IMPORTER_PASSWORD=Pa55word11
    CLIENT_SECRET=ccd_gateway_secret
    REDIRECT_URI=http://localhost:3451/oauth2redirect
    CCD_STORE_BASE_URL='http://'${DOCKER_HOST_IP}':4451'
    AUTH_PROVIDER_BASE_URL='http://'${DOCKER_HOST_IP}':4502'
    EM_CCD_ORCHESTRATOR_URL="http://rpa-em-ccd-orchestrator:8060"
    SSCS_CCD_ORCHESTRATOR_URL="http://dockerhost:8070"
    TRIBUNALS_API_URL="http://dockerhost:8080"
    TYA_NOTIFICATIONS_API_URL="http://dockerhost:8081"
    BULK_SCAN_API_URL="http://dockerhost:8090"
    BULK_SCAN_ORCHESTRATOR_URL="http://dockerhost:8582"
    MICROSERVICE=ccd_gw
  ;;
  *)
    echo "$env not recognised"
    exit 1 ;;
esac

echo "Importing: ${VERSION}"

docker run \
  --name sscs-ccd-importer-to-env \
  --rm \
  -e "http_proxy=${PROXY}" \
  -e "https_proxy=${PROXY}" \
  -e "VERBOSE=${VERBOSE:-true}" \
  -e "AUTH_PROVIDER_BASE_URL=${AUTH_PROVIDER_BASE_URL}" \
  -e "MICROSERVICE=${MICROSERVICE}" \
  -e "IDAM_URI=${IDAM_URI}" \
  -e "IMPORTER_USERNAME=${IMPORTER_USERNAME}" \
  -e "IMPORTER_PASSWORD=${IMPORTER_PASSWORD}" \
  -e "CLIENT_ID=ccd_gateway" \
  -e "REDIRECT_URI=${REDIRECT_URI}" \
  -e "CLIENT_SECRET=${CLIENT_SECRET}" \
  -e "CCD_STORE_BASE_URL=${CCD_STORE_BASE_URL}" \
  -e "CCD_DEF_FILENAME=sscs-ccd.xlsx" \
  -e "EM_CCD_ORCHESTRATOR_URL=${EM_CCD_ORCHESTRATOR_URL}" \
  -e "SSCS_CCD_ORCHESTRATOR_URL=${SSCS_CCD_ORCHESTRATOR_URL}" \
  -e "TRIBUNALS_API_URL=${TRIBUNALS_API_URL}" \
  -e "TYA_NOTIFICATIONS_API_URL=${TYA_NOTIFICATIONS_API_URL}" \
  -e "BULK_SCAN_API_URL=${BULK_SCAN_API_URL}" \
  -e "USER_ROLES=citizen, caseworker-sscs, caseworker-sscs-systemupdate, caseworker-sscs-anonymouscitizen, caseworker-sscs-callagent, caseworker-sscs-judge, caseworker-sscs-clerk, caseworker-sscs-dwpresponsewriter, caseworker-sscs-registrar, caseworker-sscs-superuser, caseworker-sscs-teamleader, caseworker-sscs-panelmember, caseworker-sscs-bulkscan" \
  hmctspublic.azurecr.io/sscs/ccd-definition-importer:${VERSION}

echo Finished
