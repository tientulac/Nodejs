# Dockerfile  
FROM node:16.15.0  
ENV NODE_ENV=production

WORKDIR ./bin/

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --production

COPY . .

CMD ["node","server.js"]