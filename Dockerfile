FROM node:16.14.0-alpine3.15

ENV HOST=0.0.0.0

WORKDIR /app

RUN apk add python3 g++ make nano

ADD . /app
RUN : \
  && yarn install \
  && yarn build  \
  && yarn cache clean

ENTRYPOINT ["yarn", "start"]
