FROM nginx:alpine

WORKDIR /usr/share/nginx/html

COPY ./public ./

CMD ["node", "./build/server.js"]