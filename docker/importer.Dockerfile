# ---- Base image - order important ----
FROM hmcts/ccd-definition-processor:latest as base

# ----        Runtime image         ----
FROM hmcts/ccd-definition-importer:latest as runtime
RUN apk add --no-cache curl jq zip unzip git bash
COPY --from=base . .
COPY ./data /data
COPY ./data/ccd-template.xlsx /opt/ccd-definition-processor/data
COPY ./data/other-benefit.sh /opt/ccd-definition-processor/bin
RUN chmod 755 /opt/ccd-definition-processor/bin/other-benefit.sh
RUN /opt/ccd-definition-processor/bin/other-benefit.sh

CMD cd /opt/ccd-definition-processor && yarn json2xlsx -D /data/sheets -e *-prod.json -o /sscs-ccd.xlsx && "/wait" && "/scripts/upload-definition.sh"
