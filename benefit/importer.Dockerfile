# ---- Base image - order important ----
FROM hmcts/ccd-definition-processor:latest as base

# ----        Runtime image         ----
FROM hmcts/ccd-definition-importer:latest as runtime
RUN \
    # DNS problem workaround
    # https://github.com/gliderlabs/docker-alpine/issues/386
    printf "nameserver 8.8.8.8\nnameserver 9.9.9.9\nnameserver 1.1.1.1" > /etc/resolv.conf \
    \
    && apk add --no-cache bash
RUN apk add --no-cache curl jq zip unzip git
COPY --from=base . .
COPY ./data /data
COPY ./data/ccd-template.xlsx /opt/ccd-definition-processor/data

CMD cd /opt/ccd-definition-processor && yarn json2xlsx -D /data/sheets -o /sscs-ccd.xlsx && "/wait" && "/scripts/upload-definition.sh"
