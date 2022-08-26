#!/usr/bin/env bash

SHEETS_DIR=`pwd`/data/sheets

if [[ "$OSTYPE" == "darwin"* ]]; then
  sed -i '' 's/http:\/\/em-ccd-orchestrator-aat.service.core-compute-aat.internal/\${CCD_DEF_EM_CCD_ORCHESTRATOR_URL}/g' ${SHEETS_DIR}/*.json
  sed -i '' 's/http:\/\/sscs-ccd-callback-orchestrator-aat.service.core-compute-aat.internal/\${CCD_DEF_SSCS_CCD_ORCHESTRATOR_URL}/g' ${SHEETS_DIR}/*.json
  sed -i '' 's/http:\/\/sscs-tribunals-api-aat.service.core-compute-aat.internal/\${CCD_DEF_TRIBUNALS_API_URL}/g' ${SHEETS_DIR}/*.json
  sed -i '' 's/http:\/\/sscs-tya-notif-aat.service.core-compute-aat.internal/\${CCD_DEF_TYA_NOTIFICATIONS_API_URL}/g' ${SHEETS_DIR}/*.json
  sed -i '' 's/http:\/\/sscs-hearings-api-aat.service.core-compute-aat.internal/\${CCD_DEF_HEARINGS_API_URL}/g' ${SHEETS_DIR}/*.json
  sed -i '' 's/http:\/\/sscs-bulk-scan-aat.service.core-compute-aat.internal/\${CCD_DEF_BULK_SCAN_API_URL}/g' ${SHEETS_DIR}/*.json
  sed -i '' 's/http:\/\/bulk-scan-orchestrator-aat.service.core-compute-aat.internal/\${CCD_DEF_BULK_SCAN_ORCHESTRATOR_URL}/g' ${SHEETS_DIR}/*.json
  sed -i '' 's/https:\/\/sscs-tya-frontend-aat.service.core-compute-aat.internal/validate-surname/\${subscriptions.appellantSubscription.tya}/trackyourappeal/g' ${SHEETS_DIR}/*.json
else
  sed -i 's/http:\/\/em-ccd-orchestrator-aat.service.core-compute-aat.internal/\${CCD_DEF_EM_CCD_ORCHESTRATOR_URL}/g' ${SHEETS_DIR}/*.json
  sed -i 's/http:\/\/sscs-ccd-callback-orchestrator-aat.service.core-compute-aat.internal/\${CCD_DEF_SSCS_CCD_ORCHESTRATOR_URL}/g' ${SHEETS_DIR}/*.json
  sed -i 's/http:\/\/sscs-tribunals-api-aat.service.core-compute-aat.internal/\${CCD_DEF_TRIBUNALS_API_URL}/g' ${SHEETS_DIR}/*.json
  sed -i 's/http:\/\/sscs-tya-notif-aat.service.core-compute-aat.internal/\${CCD_DEF_TYA_NOTIFICATIONS_API_URL}/g' ${SHEETS_DIR}/*.json
  sed -i 's/http:\/\/sscs-hearings-api-aat.service.core-compute-aat.internal/\${CCD_DEF_HEARINGS_API_URL}/g' ${SHEETS_DIR}/*.json
  sed -i 's/http:\/\/sscs-bulk-scan-aat.service.core-compute-aat.internal/\${CCD_DEF_BULK_SCAN_API_URL}/g' ${SHEETS_DIR}/*.json
  sed -i 's/http:\/\/bulk-scan-orchestrator-aat.service.core-compute-aat.internal/\${CCD_DEF_BULK_SCAN_ORCHESTRATOR_URL}/g' ${SHEETS_DIR}/*.json
  sed -i 's/https:\/\/sscs-tya-frontend-aat.service.core-compute-aat.internal/validate-surname/\${subscriptions.appellantSubscription.tya}/trackyourappeal/g' ${SHEETS_DIR}/*.json
fi

if [ `pwd` == "benefit" ]; then

    # Remove comma from last row, if it exists
    sed "$(( $( wc -l < ${SHEETS_DIR}/FixedLists.json) -1 ))s/,$//" ${SHEETS_DIR}/FixedLists.json
fi
