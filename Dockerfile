FROM node:10.13.0
RUN mkdir -p /customer
WORKDIR /customer
COPY package.json /customer
RUN npm install
COPY . /customer
CMD ["npm", "start"]
