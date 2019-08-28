# SSCS CCD Definitions

## Process for developing locally using XLSX files

### 1. Modify the JSON data

There are two SSCS CCD definition case types. Move into the directory of the one you need.

    sscs-ccd-definitions
    |- benefit
    |- bulk-scan
    
Everything in this README file now assumes that you are in your chosen directory.
        
The JSON files are in the directory data/sheets. There is a JSON file for each CCD definition spreadsheet tab.

### Update the definition version

When the JSON file changes are ready to be imported, modify the version of the definition by editing the value in CaseType.json.

```
[
    {
        "LiveFrom": "01/01/2018", 
        "ID": "Benefit", 
        "Name": "SSCS Case v5.1.12_AAT", 
    ...
```

### 2. Build the importer image

This command will build a local Docker image that will container the JSON files plus some scripts to convert the JSON to XLSX.

```
docker build --no-cache -t hmctspublic.azurecr.io/sscs/ccd-definition-importer:dev -f ../docker/importer.Dockerfile .
```

### 3. Import definition to local environment

The following command will load the definition to your local environment.

There are two parameters:

* Environment: Use local for development
* Image tag: The tag given to the Docker image to be used to create the spreadsheet

The 'dev' in the command below refers to the 'dev' tag added to the image in the previous command.

```
../bin/upload-ccd-definition-to-env.sh local dev
```

## Making edits using XLSX rather than JSON

If you don't enjoy working with JSON defintions, you can make spreadsheet changes in the old-school way using the following process.

### Generate the spreadsheet from the current JSON

```
../bin/json2xlsx.sh
```

This will create a file called sscs-ccd.xlsx in the ./releases directory, which will be created if it doesn't exist.

### Make changes to the spreadsheet

Make changes to the definition as you would normally.

### Convert the spreadsheet back to JSON

```
../bin/xlsx2json.sh
```

This will then regenerate the file in the data/sheets directory.

Then, use steps 2 and 3 above.
