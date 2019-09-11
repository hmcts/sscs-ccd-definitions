# SSCS CCD Definitions

## Converting an XLSX definition to JSON

When a new version of the definition XLSX gets uploaded to Confluence, this is how to update the JSON in this repo:

There are two SSCS CCD definition case types, benefit and bulkscan. Move into the directory of the one you need, e.g.

    cd benefit

Download the XLSX for AAT from Confluence and update the JSON:

    ../bin/xlsx2json.sh ~/Downloads/CCD_SSCSDefinition_v5.1.21_AAT.xlsx
    
Update the version file

Open benefit/VERSION.yaml and modify the version number. This file will be used by the Azure Pipeline to create a docker importer image tagged with the specified version number.
    
* Raise a PR
* Get it approved and merged
* Pull latest master branch

Then, tag the master branch. Find the latest tag and bump by one. This tag does not relate to the version of either the benefit or bulkscan definitions. It is only the version
of this repository and does have any effect outside of that.

    git tag 1.0.18
    git push --tags
    
When a new tag is pushed, it will trigger an Azure Pipeline which will build the new benefit definition importer image and store it in the Azure Container Registry (ACR). In this case, the image will be called

    hmctspublic.azurecr.io/sscs/ccd-definition-importer-benefit:5.1.21

## Load a CCD definition to your local environment

Once version 5.1.21 appears in the ACR, you can run the following command to upload it to your local CCD Docker environment.

    ../bin/upload-ccd-definition-to-env.sh benefit 5.1.21 local
    
## Create AAT and PROD spreadsheets from a Definition Version

Once the image has been created, you can create AAT and PROD versions of the spreadsheet.

Move to the root of this repository, then run:

    ./bin/create-xlsx.sh benefit 5.2.02 aat
    ./bin/create-xlsx.sh benefit 5.2.02 prod
    
This would create a file named sscs-ccd-benefit-5.1.21.xlsx in the ./releases directory relative to the directory in which you ran the command.
