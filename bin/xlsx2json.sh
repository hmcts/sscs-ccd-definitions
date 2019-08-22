#!/usr/bin/env bash
docker build --no-cache -f xlsx2json.Dockerfile -t xlsx2json .
docker run -v `pwd`:/data xlsx2json
sudo rm sheets/Change\ History.json
ME=$(whoami)
sudo chown $ME:$ME sheets/*