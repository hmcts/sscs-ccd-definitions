# ---- Base image - order important ----
FROM hmcts/ccd-definition-processor:latest as base

# ----        Runtime image         ----
FROM hmcts/ccd-definition-importer:latest as runtime

# ----     To test     -------
USER hmcts
COPY --chown=hmcts:hmcts package.json yarn.lock ./
COPY /benefit /
ADD ./config "/config"
RUN yarn install --production && yarn cache clean
COPY index.js ./
ENV NODE_CONFIG_DIR="/config"

# ---- To build prod version image, pass --build-arg exclude=nonprod
ARG exclude=prod
ENV EXCLUSION=*-$exclude.json

RUN apk add --no-cache curl jq zip unzip git
COPY --from=base . .
COPY ./benefit/data /data
COPY ./benefit/data/ccd-template.xlsx /opt/ccd-definition-processor/data

CMD ["yarn", "start"]
EXPOSE 3000
