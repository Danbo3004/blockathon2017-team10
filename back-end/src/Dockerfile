FROM node:8.1.2

# Set environment variables
ENV appDir /app

RUN npm install -g pm2
RUN npm install -g fuge
RUN npm install -g json-server
RUN npm install -g bcrypt --unsafe

# Set the work directory
VOLUME /app
WORKDIR ${appDir}

#Expose the port
EXPOSE 8789

# RUN pm2 deploy ecosystem.config.js production setup
RUN ls -la /app

CMD ["json-server", "--watch", "/app/fake/db.json"]