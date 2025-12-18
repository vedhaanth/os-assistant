const redis = require('redis');

class RedisService {
  constructor() {
    this.isConnected = false;
    this.inMemoryCache = new Map();

    try {
      this.client = redis.createClient({
        url: process.env.REDIS_URL || 'redis://localhost:6379'
      });

      this.client.on('error', (err) => {
        console.error('Redis Client Error:', err);
        this.isConnected = false;
      });

      this.client.on('connect', () => {
        console.log('Redis connected successfully');
        this.isConnected = true;
      });

      this.client.on('ready', () => {
        this.isConnected = true;
      });

      this.client.on('end', () => {
        this.isConnected = false;
      });

      this.client.connect().catch((err) => {
        console.error('Failed to connect to Redis:', err);
        this.isConnected = false;
      });
    } catch (error) {
      console.error('Redis initialization error:', error);
      this.isConnected = false;
    }
  }

  async get(key) {
    if (this.isConnected) {
      try {
        const value = await this.client.get(key);
        return value ? JSON.parse(value) : null;
      } catch (error) {
        console.error('Redis GET Error:', error);
        // Fallback to in-memory cache
        return this.inMemoryCache.get(key) || null;
      }
    } else {
      // Use in-memory cache when Redis is not available
      return this.inMemoryCache.get(key) || null;
    }
  }

  async set(key, value, expirationInSeconds = 3600) {
    if (this.isConnected) {
      try {
        await this.client.set(key, JSON.stringify(value), {
          EX: expirationInSeconds
        });
        // Also store in in-memory cache for consistency
        this.inMemoryCache.set(key, value);
        return true;
      } catch (error) {
        console.error('Redis SET Error:', error);
        // Fallback to in-memory cache only
        this.inMemoryCache.set(key, value);
        return false; // Indicate Redis failed but in-memory worked
      }
    } else {
      // Use in-memory cache when Redis is not available
      this.inMemoryCache.set(key, value);
      return true;
    }
  }

  async delete(key) {
    if (this.isConnected) {
      try {
        await this.client.del(key);
        // Also remove from in-memory cache
        this.inMemoryCache.delete(key);
        return true;
      } catch (error) {
        console.error('Redis DELETE Error:', error);
        // Still remove from in-memory cache
        this.inMemoryCache.delete(key);
        return false; // Indicate Redis failed but in-memory worked
      }
    } else {
      // Remove from in-memory cache when Redis is not available
      this.inMemoryCache.delete(key);
      return true;
    }
  }

  generateSearchKey(params) {
    const sortedParams = Object.keys(params)
      .sort()
      .reduce((acc, key) => {
        if (params[key] !== undefined && params[key] !== null && params[key] !== '') {
          acc[key] = params[key];
        }
        return acc;
      }, {});

    return `search:${JSON.stringify(sortedParams)}`;
  }
}

module.exports = new RedisService();