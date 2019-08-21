# SSCS CCD Definitions

# Converting Excel to Json

First, build the docker image.

```
docker build --no-cache -f xlsx2json.Dockerfile -t xlsx2json .
```

Then, copy your CCD definition to a file called sscs-ccd.xlsx and run:

```
docker run -v `pwd`:/data xlsx2json
```

The JSON files will be output to a directory called 'sheets'.

# Converting JSON to Excel

Create an importer Docker image.

```
docker build --no-cache -t hmctspublic.azurecr.io/sscs/ccd-definition-importer:dev -f importer.Dockerfile .
```

Extract the XLSX file.

```
docker run -ti --rm --name json2xlsx \
  -v $(pwd)/releases:/tmp \
  hmctspublic.azurecr.io/sscs/ccd-definition-importer:dev \
  sh -c "cd /opt/ccd-definition-processor && yarn json2xlsx -D /data/sheets -o /tmp/sscs-ccd.xlsx"
```

This will output the XLSX file to the 'releases' directory.
