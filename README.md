# SSCS CCD Definitions

## Release process - quick reference

### 1. Modify the benefit and/or bulk-scan definition(s)

You can do this either by modifying JSON files directly, or converting to XLSX and then back again. See below for details.

### 2. Bump the definition version

Each definition (benefit and bulk-scan) has a VERSION.yaml file. Update the definition version in this file. Make sure this version is also bumped
in the CaseType.json file for the definition you are changing.

### 3. Create a pull request

Create a pull request with your changes.

### 4. Get approval and merge

Reviewers should check that the definition as stated in the CaseType.json file matches the one in the VERSION.yaml file for each definition.

### 5. Tag and release

Find the latest tag for this repository. Create a new tag based of the old one, and push the tag. This will now trigger the Azure Pipeline which will
create the new docker definition import images for whichever definitions have a new version in the VERSION.yaml file.

### 6. Apply to AAT and Production

Once the ACR images have been created, a designated QA team member can create the spreadsheets for AAT and PROD.

1. Move into the directory of the definition in question (./benefit or ./bulk-scan) and run:

```
    ../bin/json2xlsx.sh
```

This will create a file named sscs-ccd.xlsx in the ./releases directory.

2. Copy this file to a working directory somewhere, and clone it so that you have one for AAT and one for PROD.

3. Edit the CaseType tab to have the correct version number for each environment.

4. Edit the UserProfile tab to add a list of users for each environment.

5. Upload the spreadsheets to the [SSCS CCD Definitions](https://tools.hmcts.net/confluence/display/SSCS/SSCS+Case+Definitions+Page+2) Confluence page.

6. Follow the regular process for uploading the definitions to the respective environments.

## Developing locally using XLSX files

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

Put the spreadsheet, named sscs-ccd.xlsx into the data directory.

```
../bin/xlsx2json.sh
```

This will then regenerate the file in the data/sheets directory.

Then, use steps 2 and 3 above.
