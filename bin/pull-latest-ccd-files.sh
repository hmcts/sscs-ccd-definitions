#!/bin/bash

#Checkout ccd definition project
git clone git@github.com:hmcts/sscs-ccd-e2e-tests.git
cd sscs-ccd-e2e-tests

echo "Switch to Master branch on civil-ccd-definition"
git checkout master