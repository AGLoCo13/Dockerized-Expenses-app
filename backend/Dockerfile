# Build Stage
FROM node:18-alpine AS builder
WORKDIR /usr/src/app/
COPY package*.json ./
RUN npm install
COPY . .

# Production Stage
FROM node:18-alpine
WORKDIR /usr/src/app/
COPY --from=builder /usr/src/app .
EXPOSE 5000
CMD ["npm", "start", "server.js"]