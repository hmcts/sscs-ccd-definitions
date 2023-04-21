# ---- Base image - order important ----
FROM hmctspublic.azurecr.io/ccd/definition-processor:latest as base

# ----        Runtime image         ----
FROM hmctspublic.azurecr.io/ccd/definition-importer:latest as runtime

USER root

RUN apk add --no-cache curl jq zip unzip git
COPY --from=base . .
COPY ./benefit/data /data
COPY ./benefit/data/ccd-template.xlsx /opt/ccd-definition-processor/data
COPY package.json yarn.lock ./
COPY ./benefit /
ADD ./config "/config"
RUN mkdir -p /opt/yarn_cache/v6/.tmp /node_modules && \
    chown -R 1001:1001 /data /config /opt/yarn_cache/v6/.tmp /node_modules && \
    chmod -R 777 /data /config /opt/yarn_cache/v6/.tmp /node_modules

USER 1001
RUN yarn install
CMD ["yarn", "start"]

