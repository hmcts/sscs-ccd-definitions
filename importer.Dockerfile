# ---- Base image - order important ----
FROM hmcts/ccd-definition-processor:latest as base

# ----        Runtime image         ----
FROM hmcts/ccd-definition-importer:latest as runtime
RUN apk add --no-cache curl jq zip unzip git
COPY --from=base . .
COPY ./sheets /data/sheets

CMD cd /opt/ccd-definition-processor && yarn json2xlsx -D /data -o /sscs-ccd.xlsx && "/wait" && "/scripts/upload-definition.sh"
