# SSCS CCD Definitions

## Modify and Release Process

#### 1. Modify the benefit and/or bulk-scan definition(s)

You can do this either by modifying JSON files directly, or converting to XLSX and then back again. See [Updating the Definitions](#udpating) for details.

#### 2. Bump the definition version

Each definition (benefit and bulk-scan) has a VERSION.yaml file. Update the definition version in this file. Make sure this version is also bumped
in the CaseType.json file for the definition you are changing.

#### 3. Create a pull request

Create a pull request with your changes.

#### 4. Get approval and merge

Reviewers should check that the definition as stated in the CaseType.json file matches the one in the VERSION.yaml file for each definition.

#### 5. Tag and release

Find the latest tag for this repository. Create a new tag based of the old one, and push the tag. This will now trigger the Azure Pipeline which will
create the new docker definition import images for whichever definitions have a new version in the VERSION.yaml file.

#### 6. Apply to AAT and Production

Once the ACR images have been created, a designated QA team member can create the spreadsheets for AAT and PROD.

1. Move into the directory of the definition in question (./benefit or ./bulk-scan) and run:

```
    ../bin/create-xlsx-definitions.sh [version]
```

This will create two files in the ./output directory, one for AAT and one for PROD.

#### Example:

```
cd benefit
../bin/create-xlsx-definitions.sh 5.1.15

Import...
 loading workbook: ./data/ccd-template.xlsx
  importing sheet data from AuthorisationCaseEvent.json file
  importing sheet data from AuthorisationCaseField.json file
  importing sheet data from AuthorisationCaseState.json file
  ...
  ...

cd output
ls -la

drwxrwxr-x 2 chrismoreton chrismoreton   4096 Aug 30 11:42 .
drwxrwxr-x 5 chrismoreton chrismoreton   4096 Aug 30 11:42 ..
-rw-r--r-- 1 chrismoreton chrismoreton 182634 Aug 30 11:42 CCD_SSCSDefinition_v5.1.15_AAT.xlsx
-rw-r--r-- 1 chrismoreton chrismoreton 182634 Aug 30 11:42 CCD_SSCSDefinition_v5.1.15_PROD.xlsx

```

2. Edit the CaseType tab to have the correct version number for each environment.

3. Edit the UserProfile tab to add a list of users for each environment.

4. Upload the spreadsheets to the [SSCS CCD Definitions](https://tools.hmcts.net/confluence/display/SSCS/SSCS+Case+Definitions+Page+2) Confluence page.

5. Follow the regular process for uploading the definitions to the respective environments.

<a name="udpating"></a>
## Updating the Definitions

### 1. Modify the JSON data

There are two SSCS CCD definition case types. Move into the directory of the one you need.

    sscs-ccd-definitions
    |- benefit
    |- bulk-scan
    
Everything in this README file now assumes that you are in your chosen directory.
        
The JSON files are in the directory data/sheets. There is a JSON file for each CCD definition spreadsheet tab.

### 2. Build the importer image

When the JSON file changes are ready to be tested locally, run the following command to build a local Docker image that will contain the JSON files plus some scripts to convert the JSON to XLSX.

```
docker build --no-cache -t hmctspublic.azurecr.io/sscs/ccd-definition-importer:dev -f ../docker/importer.Dockerfile .
```

### 3. Import definition to local environment

The following command will load the definition to your local environment.

```
../bin/upload-ccd-definition-to-env.sh [env] [tag]
```

To load the definition we created above into the local environment, run:

```
../bin/upload-ccd-definition-to-env.sh local dev
```

## Making edits using XLSX rather than JSON

If you don't enjoy working with JSON defintions, you can make spreadsheet changes in the old-school way using the following process.

#### 1. Generate the spreadsheet from the current JSON

```
../bin/json2xlsx.sh
```

This will create a file called sscs-ccd.xlsx in the ./releases directory, which will be created if it doesn't exist.

#### 2. Make changes to the spreadsheet

Make changes to the definition as you would normally.

#### 3. Convert the spreadsheet back to JSON

Put the spreadsheet, named sscs-ccd.xlsx into the ./data directory and run the xlsx2json.sh script, i.e.

```
cp ./releases/sscs-ccd.xlsx ./data/sscs-ccd.xlsx
../bin/xlsx2json.sh
```

This will then regenerate the files in the data/sheets directory.
