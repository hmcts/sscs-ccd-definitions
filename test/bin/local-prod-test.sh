#!/bin/sh

echo "\nCreating local prod ccd definition\n"
cd ../sscs-ccd-definitions/benefit
docker build -t hmctspublic.azurecr.io/sscs/ccd-definition-importer-benefit:dev -f ../docker/importer.Dockerfile .
cd ..
./bin/create-xlsx.sh benefit dev local prod

echo "\nUploading local prod ccd definition\n"
cd ../sscs-docker
./bin/ccd-import-definition.sh ../sscs-ccd-definitions/releases/CCD_SSCSDefinition_vdev_LOCAL.xlsx


echo "\nRunning tests against local prod ccd definition\n"
cd ../sscs-ccd-e2e-tests
TEST_E2E_USE_PROXY=false TEST_E2E_URL_GATEWAY='http://localhost:3453' TEST_E2E_URL_WEB='http://localhost:3451' TEST_JUDGE_USERNAME='judge@example.com' TEST_JUDGE_PASSWORD='Pa55word11' TEST_DWP_USERNAME='dwpuser@example.com' TEST_DWP_PASSWORD='Pa55word11' TEST_CASEOFFICER_USERNAME='local.test@example.com' TEST_CASEOFFICER_PASSWORD='Pa55word11' yarn test:prod

echo "\nComplete\n"
