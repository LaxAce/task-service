# Stage 1: Build
FROM node:18 AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Build TypeScript → dist/
RUN npm run build


# Stage 2: Production
FROM node:18-slim

WORKDIR /app

# Copy only what we need
COPY package*.json ./

# Install only production deps
RUN npm install --omit=dev

# Copy built files only
COPY --from=build /app/dist ./dist

ENV PORT=8080
EXPOSE 8080

USER node

CMD ["node", "dist/index.js"]