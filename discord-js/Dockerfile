# Use Node.js 20 Alpine for smaller image size
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Set environment variables
ENV NODE_ENV=production \
    NPM_CONFIG_LOGLEVEL=warn

# Create non-root user
RUN addgroup -g 1001 -S botuser && \
    adduser -S -D -H -u 1001 -h /app -s /sbin/nologin -G botuser -g botuser botuser

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production && \
    npm cache clean --force

# Copy bot code
COPY index.js ./

# Change ownership to non-root user
RUN chown -R botuser:botuser /app

# Switch to non-root user
USER botuser

# Health check (checks if node process is running)
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD pgrep -f "node.*index.js" || exit 1

# Run the bot
CMD ["node", "index.js"]
