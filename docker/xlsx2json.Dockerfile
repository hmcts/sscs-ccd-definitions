# ---- Base image - order important ----
FROM hmctspublic.azurecr.io/ccd/definition-processor:pr-305-8872ea2 as base

# ----        Runtime image         ----
FROM hmcts/ccd-definition-importer:latest as runtime
COPY --from=base . .
RUN apk add --no-cache curl jq zip unzip git
CMD cd /opt/ccd-definition-processor && mkdir -p /data/sheets && yarn xlsx2json -D /data/sheets -i /data/sscs-ccd.xlsx
