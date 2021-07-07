FROM hmctspublic.azurecr.io/base/node:12-alpine as base
USER hmcts
COPY --chown=hmcts:hmcts package.json ./
RUN yarn install --production && yarn cache clean
COPY index.js ./
CMD ["yarn", "start"]
EXPOSE 3000