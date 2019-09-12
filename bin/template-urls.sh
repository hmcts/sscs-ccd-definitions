#!/usr/bin/env bash

SHEETS_DIR=`pwd`/data/sheets

if [[ "$OSTYPE" == "darwin"* ]]; then
  sed -i '' 's/http:\/\/em-ccd-orchestrator-aat.service.core-compute-aat.internal/\${CCD_DEF_EM_CCD_ORCHESTRATOR_URL}/g' ${SHEETS_DIR}/*.json
  sed -i '' 's/http:\/\/sscs-ccd-callback-orchestrator-aat.service.core-compute-aat.internal/\${CCD_DEF_SSCS_CCD_ORCHESTRATOR_URL}/g' ${SHEETS_DIR}/*.json
  sed -i '' 's/http:\/\/sscs-tribunals-api-aat.service.core-compute-aat.internal/\${CCD_DEF_TRIBUNALS_API_URL}/g' ${SHEETS_DIR}/*.json
  sed -i '' 's/http:\/\/sscs-tya-notif-aat.service.core-compute-aat.internal/\${CCD_DEF_TYA_NOTIFICATIONS_API_URL}/g' ${SHEETS_DIR}/*.json
  sed -i '' 's/http:\/\/sscs-bulk-scan-aat.service.core-compute-aat.internal/\${CCD_DEF_BULK_SCAN_API_URL}/g' ${SHEETS_DIR}/*.json
  sed -i '' 's/http:\/\/bulk-scan-orchestrator-aat.service.core-compute-aat.internal/\${CCD_DEF_BULK_SCAN_ORCHESTRATOR_URL}/g' ${SHEETS_DIR}/*.json
  sed -i '' 's/http:\/\/sscs-cor-backend-aat.service.core-compute-aat.internal/\${CCD_DEF_COR_BACKEND_URL}/g' ${SHEETS_DIR}/*.json
else
  sed -i 's/http:\/\/em-ccd-orchestrator-aat.service.core-compute-aat.internal/\${CCD_DEF_EM_CCD_ORCHESTRATOR_URL}/g' ${SHEETS_DIR}/*.json
  sed -i 's/http:\/\/sscs-ccd-callback-orchestrator-aat.service.core-compute-aat.internal/\${CCD_DEF_SSCS_CCD_ORCHESTRATOR_URL}/g' ${SHEETS_DIR}/*.json
  sed -i 's/http:\/\/sscs-tribunals-api-aat.service.core-compute-aat.internal/\${CCD_DEF_TRIBUNALS_API_URL}/g' ${SHEETS_DIR}/*.json
  sed -i 's/http:\/\/sscs-tya-notif-aat.service.core-compute-aat.internal/\${CCD_DEF_TYA_NOTIFICATIONS_API_URL}/g' ${SHEETS_DIR}/*.json
  sed -i 's/http:\/\/sscs-bulk-scan-aat.service.core-compute-aat.internal/\${CCD_DEF_BULK_SCAN_API_URL}/g' ${SHEETS_DIR}/*.json
  sed -i 's/http:\/\/bulk-scan-orchestrator-aat.service.core-compute-aat.internal/\${CCD_DEF_BULK_SCAN_ORCHESTRATOR_URL}/g' ${SHEETS_DIR}/*.json
  sed -i 's/http:\/\/sscs-cor-backend-aat.service.core-compute-aat.internal/\${CCD_DEF_COR_BACKEND_URL}/g' ${SHEETS_DIR}/*.json
fi

if [ `pwd` == "benefit" ]; then
    # Remove all AssignTo lines and replace with a template var
    sed '/FL_AssignTo/d' ${SHEETS_DIR}/FixedLists.json | sed 's/\[/\[${CCD_DEF_FIXED_LIST_USERS},/' > ${SHEETS_DIR}/FixedLists_Temp.json
    cp ${SHEETS_DIR}/FixedLists_Temp.json ${SHEETS_DIR}/FixedLists.json
    rm ${SHEETS_DIR}/FixedLists_Temp.json

    # Remove comma from last row, if it exists
    sed "$(( $( wc -l < ${SHEETS_DIR}/FixedLists.json) -1 ))s/,$//" ${SHEETS_DIR}/FixedLists.json
fi
