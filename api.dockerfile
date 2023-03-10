FROM node:16-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .
ARG API_PORT
ARG APP_ORIGIN
ENV PORT $API_PORT
ENV APP_ORIGIN $APP_ORIGIN
EXPOSE $API_PORT
# CMD [ "node", "index.js" ]
CMD [ "npm", "start" ]