#!/bin/bash

#Checkout specific branch pf  civil camunda bpmn definition
git clone git@github.com:hmcts/sscs-ccd-e2e-tests.git
cd sscs-ccd-e2e-tests

echo "Switch to ${branchName} branch on civil-ccd-definition"
git checkout master
cd ..

#Copy ccd definition files  to civil-ccd-def which contians ccd def files
# cp -r ./civil-ccd-definition/ccd-definition .
# cp -r ./civil-ccd-definition/e2e .
# cp -r ./civil-ccd-definition/package.json .
# cp -r ./civil-ccd-definition/yarn.lock .
# cp -r ./civil-ccd-definition/codecept.conf.js .
# cp -r ./civil-ccd-definition/saucelabs.conf.js .
# echo *
# rm -rf ./civil-ccd-definition