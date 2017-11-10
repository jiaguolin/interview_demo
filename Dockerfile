

FROM node
#ENV NODE_ENV production
RUN mkdir /app
WORKDIR /app
COPY package.json /app
RUn cd /app
RUN npm install 
#RUN npm install --production --silent && mv node_modules ../
COPY . /app
EXPOSE 8080
CMD ["node", "bin/www"]
