#!/usr/bin/env bash
docker build --no-cache -f ../docker/xlsx2json.Dockerfile -t xlsx2json .
echo `pwd`
docker run -v `pwd`/data:/data xlsx2json
../bin/template-urls.sh
