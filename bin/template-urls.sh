#!/usr/bin/env bash

if [[ "$OSTYPE" == "darwin"* ]]; then
  sed -i '' 's/http:\/\/em-ccd-orchestrator-aat.service.core-compute-aat.internal/\${EM_CCD_ORCHESTRATOR_URL}/g' `pwd`/data/sheets/*.json
  sed -i '' 's/http:\/\/sscs-ccd-callback-orchestrator-aat.service.core-compute-aat.internal/\${SSCS_CCD_ORCHESTRATOR_URL}/g' `pwd`/data/sheets/*.json
  sed -i '' 's/http:\/\/sscs-tribunals-api-aat.service.core-compute-aat.internal/\${TRIBUNALS_API_URL}/g' `pwd`/data/sheets/*.json
  sed -i '' 's/http:\/\/sscs-tya-notif-aat.service.core-compute-aat.internal/\${TYA_NOTIFICATIONS_API_URL}/g' `pwd`/data/sheets/*.json
  sed -i '' 's/http:\/\/sscs-bulk-scan-aat.service.core-compute-aat.internal/\${BULK_SCAN_API_URL}/g' `pwd`/data/sheets/*.json
  sed -i '' 's/http:\/\/bulk-scan-orchestrator-aat.service.core-compute-aat.internal/\${BULK_SCAN_ORCHESTRATOR_URL}/g' `pwd`/data/sheets/*.json
else
  sed -i 's/http:\/\/em-ccd-orchestrator-aat.service.core-compute-aat.internal/\${EM_CCD_ORCHESTRATOR_URL}/g' `pwd`/data/sheets/*.json
  sed -i 's/http:\/\/sscs-ccd-callback-orchestrator-aat.service.core-compute-aat.internal/\${SSCS_CCD_ORCHESTRATOR_URL}/g' `pwd`/data/sheets/*.json
  sed -i 's/http:\/\/sscs-tribunals-api-aat.service.core-compute-aat.internal/\${TRIBUNALS_API_URL}/g' `pwd`/data/sheets/*.json
  sed -i 's/http:\/\/sscs-tya-notif-aat.service.core-compute-aat.internal/\${TYA_NOTIFICATIONS_API_URL}/g' `pwd`/data/sheets/*.json
  sed -i 's/http:\/\/sscs-bulk-scan-aat.service.core-compute-aat.internal/\${BULK_SCAN_API_URL}/g' `pwd`/data/sheets/*.json
  sed -i 's/http:\/\/bulk-scan-orchestrator-aat.service.core-compute-aat.internal/\${BULK_SCAN_ORCHESTRATOR_URL}/g' `pwd`/data/sheets/*.json
fi
