FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5000
# Seed the database (idempotent - skips if users already exist) then start the server.
CMD ["sh", "-c", "node seed.js || true; node server.js"]
