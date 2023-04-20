# ---- Base image - order important ----
FROM hmctspublic.azurecr.io/ccd/definition-processor:pr-305-8872ea2 as base
RUN yarn -v && echo 'initial base'
USER root
RUN usermod -s /bin/sh hmcts
RUN corepack enable
RUN yarn -v && echo 'base post corepack'
# ----        Runtime image         ----
FROM hmctspublic.azurecr.io/ccd/definition-importer:latest as runtime
RUN apk add --no-cache curl jq zip unzip git
COPY --from=base . .
run yarn -v echo 'post copy'
COPY ./benefit/data /data
COPY ./benefit/data/ccd-template.xlsx /opt/ccd-definition-processor/data

# ----        To pass through Jenkins pipeline         ----
COPY package.json yarn.lock ./
COPY /benefit /
ADD ./config "/config"
RUN yarn install --production && yarn cache clean
COPY index.js ./
ENV NODE_CONFIG_DIR="/config"
CMD ["yarn", "start"]
EXPOSE 3000
