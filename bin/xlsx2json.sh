#!/usr/bin/env bash

cp $1 data/sscs-ccd.xlsx
docker build --no-cache -f ../docker/xlsx2json.Dockerfile -t xlsx2json .
echo `pwd`
docker run -v `pwd`/data:/data xlsx2json
../bin/template-urls.sh
