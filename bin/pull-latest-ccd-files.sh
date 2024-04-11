#!/bin/bash

#Checkout ccd definition project
git clone git@github.com:hmcts/sscs-ccd-e2e-tests.git
cd sscs-ccd-e2e-tests

# mkdir e2e-tests

echo "Switch to Master branch on sscs-ccd-definition"
git checkout master

# cd ..

#Copy ccd definition files  to sscs-ccd-def which contians ccd def files

# cp -r ./sscs-ccd-e2e-tests/e2e ./e2e-tests/
# cp -r ./sscs-ccd-e2e-tests/dist ./e2e-tests/
# cp -r ./sscs-ccd-e2e-tests/config ./e2e-tests/
# cp -r ./sscs-ccd-e2e-tests/package.json ./e2e-tests/
# cp -r ./sscs-ccd-e2e-tests/yarn.lock ./e2e-tests/
# cp -r ./sscs-ccd-e2e-tests/tsconfig-base.json .

# echo *

# rm -rf ./sscs-ccd-e2e-tests