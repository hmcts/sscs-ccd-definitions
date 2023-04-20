# ---- Base image - order important ----
FROM hmcts/ccd-definition-processor:latest as base

# ----        Runtime image         ----
FROM hmcts/ccd-definition-importer:latest as runtime

RUN apk add --no-cache curl jq zip unzip git
COPY --from=base --chown=hmcts:hmcts . .
COPY --chown=hmcts:hmcts ./benefit/data /data
COPY --chown=hmcts:hmcts ./benefit/data/ccd-template.xlsx /opt/ccd-definition-processor/data

# ----        To pass through Jenkins pipeline         ----
COPY package.json yarn.lock ./
COPY --chown=hmcts:hmcts /benefit /
ADD --chown=hmcts:hmcts ./config "/config"
RUN chown -R hmcts:hmcts /data /config && \
    chmod -R 777 /data /config

USER hmcts
RUN yarn install --production && yarn cache clean
COPY --chown=hmcts:hmcts index.js ./
ENV NODE_CONFIG_DIR="/config"
CMD ["yarn", "start"]
EXPOSE 3000

