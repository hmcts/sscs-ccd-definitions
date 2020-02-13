#!/usr/bin/env bash

XLSX=${1}

if [[ ${XLSX} != *"_AAT"* ]]; then
    echo "Please use the AAT version of the CCD definition."
    exit
fi

cp ${XLSX} data/sscs-ccd1.xlsx
docker build --no-cache -f ./xlsx2json.Dockerfile -t xlsx2json .
echo `pwd`
docker run -v `pwd`/data:/data xlsx2json
../bin/template-urls.sh
rm data/sheets/Change\ History.json
