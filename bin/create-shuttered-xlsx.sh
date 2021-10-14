#!/usr/bin/env bash

TYPE=${1}
VERSION=${2}
ENV=${3}
LIKE_PROD=${4:-${ENV}}

./bin/create-xlsx.sh ${TYPE} ${VERSION} ${ENV} ${LIKE_PROD} true
