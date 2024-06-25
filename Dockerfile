# this Dockerfile was created from template.
# https://v2.vuejs.org/v2/cookbook/dockerize-vuejs-app

# basic docker image
FROM node:18

# create the current working directory
WORKDIR /server

# copy both 'package.json' and 'package-lock.json' (if available)
COPY package*.json ./

# install project dependencies
RUN npm install
RUN npm install -g pm2

# copy project files and folders to the current working directory (i.e. 'app' folder)
COPY . .

# expose the port on which the app will run
EXPOSE 5000

# start the app
CMD [ "pm2", "start", "src/app.js"]
