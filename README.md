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

