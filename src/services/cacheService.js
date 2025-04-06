/**
 * Cache Service
 * Provides utilities for caching API responses and other data
 */

// Default cache duration in milliseconds (30 minutes)
const DEFAULT_CACHE_DURATION = 30 * 60 * 1000;

// In-memory cache store
const memoryCache = new Map();

/**
 * Set an item in the cache
 * @param {string} key - The cache key
 * @param {any} value - The value to cache
 * @param {number} duration - Cache duration in milliseconds (default: 30 minutes)
 */
export const setCacheItem = (key, value, duration = DEFAULT_CACHE_DURATION) => {
  const now = new Date().getTime();
  const item = {
    value,
    expiry: now + duration,
    timestamp: now
  };
  
  // Store in memory cache
  memoryCache.set(key, item);
  
  // Also store in localStorage for persistence across page refreshes
  try {
    localStorage.setItem(`cache_${key}`, JSON.stringify(item));
  } catch (error) {
    console.warn('Failed to store item in localStorage:', error);
  }
};

/**
 * Get an item from the cache
 * @param {string} key - The cache key
 * @returns {any|null} - The cached value or null if not found or expired
 */
export const getCacheItem = (key) => {
  // First try memory cache (faster)
  if (memoryCache.has(key)) {
    const item = memoryCache.get(key);
    const now = new Date().getTime();
    
    // Check if the item is expired
    if (now < item.expiry) {
      return item.value;
    }
    
    // Remove expired item
    memoryCache.delete(key);
  }
  
  // Then try localStorage
  try {
    const itemStr = localStorage.getItem(`cache_${key}`);
    if (!itemStr) return null;
    
    const item = JSON.parse(itemStr);
    const now = new Date().getTime();
    
    // Check if the item is expired
    if (now < item.expiry) {
      // Restore to memory cache for faster access next time
      memoryCache.set(key, item);
      return item.value;
    }
    
    // Remove expired item
    localStorage.removeItem(`cache_${key}`);
  } catch (error) {
    console.warn('Failed to retrieve item from localStorage:', error);
  }
  
  return null;
};

/**
 * Remove an item from the cache
 * @param {string} key - The cache key
 */
export const removeCacheItem = (key) => {
  memoryCache.delete(key);
  try {
    localStorage.removeItem(`cache_${key}`);
  } catch (error) {
    console.warn('Failed to remove item from localStorage:', error);
  }
};

/**
 * Clear all cached items
 */
export const clearCache = () => {
  memoryCache.clear();
  
  try {
    // Only clear cache-related items from localStorage
    Object.keys(localStorage)
      .filter(key => key.startsWith('cache_'))
      .forEach(key => localStorage.removeItem(key));
  } catch (error) {
    console.warn('Failed to clear localStorage cache:', error);
  }
};

/**
 * Get cache statistics
 * @returns {Object} - Cache statistics
 */
export const getCacheStats = () => {
  const stats = {
    memorySize: memoryCache.size,
    localStorageSize: 0,
    oldestItem: null,
    newestItem: null,
    averageAge: 0
  };
  
  try {
    // Count cache items in localStorage
    stats.localStorageSize = Object.keys(localStorage)
      .filter(key => key.startsWith('cache_'))
      .length;
    
    // Calculate age statistics
    const now = new Date().getTime();
    let oldestTimestamp = now;
    let newestTimestamp = 0;
    let totalAge = 0;
    let count = 0;
    
    memoryCache.forEach((item, key) => {
      const age = now - item.timestamp;
      totalAge += age;
      count++;
      
      if (item.timestamp < oldestTimestamp) {
        oldestTimestamp = item.timestamp;
        stats.oldestItem = { key, age: Math.round(age / 1000) };
      }
      
      if (item.timestamp > newestTimestamp) {
        newestTimestamp = item.timestamp;
        stats.newestItem = { key, age: Math.round(age / 1000) };
      }
    });
    
    if (count > 0) {
      stats.averageAge = Math.round((totalAge / count) / 1000);
    }
  } catch (error) {
    console.warn('Failed to calculate cache statistics:', error);
  }
  
  return stats;
};

/**
 * Cached fetch function
 * @param {string} url - The URL to fetch
 * @param {Object} options - Fetch options
 * @param {number} cacheDuration - Cache duration in milliseconds
 * @returns {Promise<any>} - The response data
 */
export const cachedFetch = async (url, options = {}, cacheDuration = DEFAULT_CACHE_DURATION) => {
  const cacheKey = `fetch_${url}_${JSON.stringify(options)}`;
  
  // Try to get from cache first
  const cachedData = getCacheItem(cacheKey);
  if (cachedData) {
    return cachedData;
  }
  
  // If not in cache or expired, fetch from network
  try {
    const response = await fetch(url, options);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Cache the response
    setCacheItem(cacheKey, data, cacheDuration);
    
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};
