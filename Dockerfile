

FROM node
#ENV NODE_ENV production
RUN mkdir /app
WORKDIR /app
COPY package.json /app
RUN npm install --registry=https://registry.npm.taobao.org
#RUN npm install --production --silent && mv node_modules ../
COPY . /app
EXPOSE 5000
CMD ["node", "bin/www"]
