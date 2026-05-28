# EstateLens — production container
FROM node:20-slim

WORKDIR /app

# Install deps first (better layer caching)
COPY package*.json ./
RUN npm install

# Copy source and build (frontend + bundled server)
COPY . .
RUN npm run build

ENV NODE_ENV=production
# Most hosts inject PORT automatically; default to 3000 locally.
ENV PORT=3000
EXPOSE 3000

CMD ["npm", "start"]
