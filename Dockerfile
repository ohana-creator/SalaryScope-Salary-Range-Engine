# Stage 1: build
FROM node:20-alpine AS builder
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy code
COPY tsconfig.json ./
COPY prisma ./prisma
COPY src ./src

# Generate Prisma client
RUN npx prisma generate

# Compile TypeScript
RUN npx tsc

# Stage 2: production
FROM node:20-alpine
WORKDIR /app

# Copy build and node_modules
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY prisma ./prisma
COPY package.json ./

ENV NODE_ENV=production
EXPOSE 3000

CMD ["node", "dist/server.js"]
