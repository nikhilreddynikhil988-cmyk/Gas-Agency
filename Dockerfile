# Multi-stage Dockerfile for Node + Create React App

### Builder: install deps and build React app
FROM node:18-alpine AS builder
WORKDIR /app

# Copy root package files and install server deps (will be re-run in final stage for production-only install)
COPY package*.json ./
COPY client/package*.json ./client/

RUN npm install --silent

# Copy full project and build the client
COPY . .
WORKDIR /app/client
RUN npm install --silent && npm run build

### Production image
FROM node:18-alpine
WORKDIR /app

ENV NODE_ENV=production

# Copy server files and install production dependencies
COPY package*.json ./
RUN npm install --production --silent

# Copy built client from builder
COPY --from=builder /app/client/build ./client/build

# Copy server source files
COPY . .

EXPOSE 5000

CMD ["node", "server.js"]
