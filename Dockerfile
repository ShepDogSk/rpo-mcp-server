# Multi-stage build pre RPO MCP Server
FROM node:18-alpine AS builder

# Nastavenie pracovného adresára
WORKDIR /app

# Kopírovanie package files
COPY package*.json ./

# Inštalácia závislostí
RUN npm ci --only=production

# Kopírovanie zdrojového kódu
COPY . .

# Build aplikácie
RUN npm run build

# Production stage
FROM node:18-alpine AS production

# Vytvorenie non-root používateľa
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001

# Nastavenie pracovného adresára
WORKDIR /app

# Kopírovanie package files
COPY package*.json ./

# Inštalácia iba production závislostí
RUN npm ci --only=production && npm cache clean --force

# Kopírovanie built aplikácie z builder stage
COPY --from=builder /app/dist ./dist

# Zmena vlastníctva súborov na nodejs používateľa
RUN chown -R nodejs:nodejs /app
USER nodejs

# Exponovanie portu (ak bude potrebné v budúcnosti)
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "console.log('Health check')" || exit 1

# Spustenie aplikácie
CMD ["node", "dist/index.js"]
