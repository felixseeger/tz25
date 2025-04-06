/**
 * HTTP Service
 * A wrapper around fetch with caching capabilities
 */

import { cachedFetch, getCacheItem, setCacheItem, removeCacheItem } from './cacheService';

// Default cache durations in milliseconds
const CACHE_DURATIONS = {
  SHORT: 5 * 60 * 1000,       // 5 minutes
  MEDIUM: 30 * 60 * 1000,     // 30 minutes
  LONG: 2 * 60 * 60 * 1000,   // 2 hours
  DAY: 24 * 60 * 60 * 1000    // 24 hours
};

// Base API URL
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

/**
 * Create request options with default headers
 * @param {Object} options - Request options
 * @returns {Object} - Request options with default headers
 */
const createRequestOptions = (options = {}) => {
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...options.headers
    }
  };
  
  return { ...defaultOptions, ...options };
};

/**
 * Make a GET request with caching
 * @param {string} url - The URL to fetch
 * @param {Object} options - Request options
 * @param {Object} cacheOptions - Cache options
 * @returns {Promise<any>} - The response data
 */
export const get = async (url, options = {}, cacheOptions = {}) => {
  const fullUrl = url.startsWith('http') ? url : `${API_BASE_URL}${url}`;
  const requestOptions = createRequestOptions({ ...options, method: 'GET' });
  
  // Determine cache duration based on the provided option or default to MEDIUM
  const cacheDuration = cacheOptions.duration || CACHE_DURATIONS.MEDIUM;
  
  // Skip cache if explicitly requested
  if (cacheOptions.skipCache) {
    const response = await fetch(fullUrl, requestOptions);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  }
  
  // Use cached fetch with the specified duration
  return cachedFetch(fullUrl, requestOptions, cacheDuration);
};

/**
 * Make a POST request
 * @param {string} url - The URL to fetch
 * @param {Object} data - The data to send
 * @param {Object} options - Request options
 * @returns {Promise<any>} - The response data
 */
export const post = async (url, data, options = {}) => {
  const fullUrl = url.startsWith('http') ? url : `${API_BASE_URL}${url}`;
  const requestOptions = createRequestOptions({
    ...options,
    method: 'POST',
    body: JSON.stringify(data)
  });
  
  const response = await fetch(fullUrl, requestOptions);
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  
  // Invalidate related cache entries if needed
  if (options.invalidateCache) {
    if (Array.isArray(options.invalidateCache)) {
      options.invalidateCache.forEach(cacheKey => removeCacheItem(cacheKey));
    } else if (typeof options.invalidateCache === 'string') {
      removeCacheItem(options.invalidateCache);
    }
  }
  
  return await response.json();
};

/**
 * Make a PUT request
 * @param {string} url - The URL to fetch
 * @param {Object} data - The data to send
 * @param {Object} options - Request options
 * @returns {Promise<any>} - The response data
 */
export const put = async (url, data, options = {}) => {
  const fullUrl = url.startsWith('http') ? url : `${API_BASE_URL}${url}`;
  const requestOptions = createRequestOptions({
    ...options,
    method: 'PUT',
    body: JSON.stringify(data)
  });
  
  const response = await fetch(fullUrl, requestOptions);
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  
  // Invalidate related cache entries if needed
  if (options.invalidateCache) {
    if (Array.isArray(options.invalidateCache)) {
      options.invalidateCache.forEach(cacheKey => removeCacheItem(cacheKey));
    } else if (typeof options.invalidateCache === 'string') {
      removeCacheItem(options.invalidateCache);
    }
  }
  
  return await response.json();
};

/**
 * Make a DELETE request
 * @param {string} url - The URL to fetch
 * @param {Object} options - Request options
 * @returns {Promise<any>} - The response data
 */
export const del = async (url, options = {}) => {
  const fullUrl = url.startsWith('http') ? url : `${API_BASE_URL}${url}`;
  const requestOptions = createRequestOptions({
    ...options,
    method: 'DELETE'
  });
  
  const response = await fetch(fullUrl, requestOptions);
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  
  // Invalidate related cache entries if needed
  if (options.invalidateCache) {
    if (Array.isArray(options.invalidateCache)) {
      options.invalidateCache.forEach(cacheKey => removeCacheItem(cacheKey));
    } else if (typeof options.invalidateCache === 'string') {
      removeCacheItem(options.invalidateCache);
    }
  }
  
  return await response.json();
};

/**
 * Prefetch and cache a URL
 * @param {string} url - The URL to prefetch
 * @param {Object} options - Request options
 * @param {number} cacheDuration - Cache duration in milliseconds
 * @returns {Promise<any>} - The response data
 */
export const prefetch = async (url, options = {}, cacheDuration = CACHE_DURATIONS.LONG) => {
  const fullUrl = url.startsWith('http') ? url : `${API_BASE_URL}${url}`;
  const requestOptions = createRequestOptions({ ...options, method: 'GET' });
  
  try {
    const response = await fetch(fullUrl, requestOptions);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    
    const data = await response.json();
    
    // Cache the response
    const cacheKey = `fetch_${fullUrl}_${JSON.stringify(requestOptions)}`;
    setCacheItem(cacheKey, data, cacheDuration);
    
    return data;
  } catch (error) {
    console.error('Prefetch error:', error);
    throw error;
  }
};

// Export cache durations for use in other modules
export { CACHE_DURATIONS };
