FROM node:8.1

# Create app directory
RUN mkdir -p /usr/src/app
RUN mkdir -p /usr/src/app/dist
WORKDIR /usr/src/app
#
## Install app dependencies
COPY package.json /usr/src/app/
RUN npm install

# Bundle app source
COPY . /usr/src/app
RUN chmod +x /usr/src/app/startup.sh

ENV NODE_ENV development

EXPOSE 5001

CMD [ "/usr/src/app/startup.sh"]
