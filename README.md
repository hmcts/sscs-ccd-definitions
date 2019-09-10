# SSCS CCD Definitions

## Converting an XLSX definition to JSON

When a new version of the definition XLSX gets uploaded to Confluence, this is how to update the JSON in this repo:

There are two SSCS CCD definition case types, benefit and bulkscan. Move into the directory of the one you need, e.g.

    cd benefit

Download the XLSX for AAT from Confluence and update the JSON:

    ../bin/xlsx2json.sh ~/Downloads/CCD_SSCSDefinition_v5.1.21_AAT.xlsx
    
* Raise a PR
* Get it approved and merged
* Pull latest master branch

Then, tag the master branch with the definition version:

    git tag 5.1.21
    git push --tags
    
This will trigger an Azure Pipeline which will build the new benefit definition importer image and store it in the Azure Container Registry (ACR). In this case, the image will be called

    hmctspublic.azurecr.io/sscs/ccd-definition-importer-benefit:5.1.21

## Load a CCD definition to your local environment

Once version 5.1.21 appears in the ACR, you can run the following command to upload it to your local CCD Docker environment.

    ../bin/upload-ccd-definition-to-env.sh local benefit 5.1.21
