# ---- Base image - order important ----
FROM hmctspublic.azurecr.io/ccd/definition-processor:latest as base

# ----        Runtime image         ----
FROM hmctspublic.azurecr.io/ccd/definition-importer:latest as runtime

# Create hmcts user and group
USER root
RUN addgroup -g 1001 -S hmcts && \
    adduser -u 1001 -S hmcts -G hmcts -s /bin/sh

# Set Yarn cache folder and fix permissions
ENV YARN_CACHE_FOLDER=/opt/yarn_cache
RUN mkdir -p ${YARN_CACHE_FOLDER} && \
    chown -R 1001:1001 ${YARN_CACHE_FOLDER} && \
    chmod -R 777 ${YARN_CACHE_FOLDER}

# Create node_modules folder and fix permissions
RUN mkdir -p /node_modules && \
    chown -R 1001:1001 /node_modules && \
    chmod -R 777 /node_modules

# Create .cache folder and fix permissions
RUN mkdir -p /.cache && \
    chown -R 1001:1001 /.cache && \
    chmod -R 777 /.cache

RUN apk add --no-cache curl jq zip unzip git
COPY --from=base --chown=1001:1001 . .
COPY --chown=1001:1001 ./benefit/data /data
COPY --chown=1001:1001 ./benefit/data/ccd-template.xlsx /opt/ccd-definition-processor/data

# ----        To pass through Jenkins pipeline         ----
COPY package.json yarn.lock ./
COPY --chown=1001:1001 /benefit /
ADD --chown=1001:1001 ./config "/config"
RUN chown -R 1001:1001 /data /config && \
    chmod -R 777 /data /config

USER 1001
RUN yarn install --production && yarn cache clean
COPY --chown=1001:1001 index.js ./
ENV NODE_CONFIG_DIR="/config"
CMD ["yarn", "start"]
EXPOSE 3000

