FROM node:18.13.0-alpine

RUN apk add --no-cache git

RUN mkdir /front-task-management-1
ENV FRONT_ROOT /front-task-management-1
WORKDIR $FRONT_ROOT

COPY package.json yarn.lock $FRONT_ROOT/
RUN yarn install --frozen-lockfile --ignore-optional

COPY . $FRONT_ROOT

CMD ["yarn", "start"]