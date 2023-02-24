FROM node:16-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install --force
# If you are building your code for production
# RUN npm ci --only=production

RUN npm install -g serve
# Bundle app source
COPY . .
ARG REACT_APP_API_BASE_URL
ARG REACT_APP_PORT
ENV REACT_APP_API_BASE_URL $REACT_APP_API_BASE_URL
ENV PORT $REACT_APP_PORT
RUN npm run build

EXPOSE $REACT_APP_PORT
# CMD [ "node", "index.js" ]
ENTRYPOINT [ "serve", "-s", "build" ]