/**
 * API utility for making HTTP requests
 * This is a simple implementation that can be expanded as needed
 */

// Base URL for API requests
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

/**
 * Makes a GET request to the specified endpoint
 * @param {string} endpoint - The API endpoint to call
 * @param {Object} params - Query parameters
 * @returns {Promise<any>} - The response data
 */
const get = async (endpoint, params = {}) => {
  const url = new URL(`${BASE_URL}${endpoint}`);
  Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
  
  const response = await fetch(url.toString(), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  
  if (!response.ok) {
    throw new Error(`API error: ${response.statusText}`);
  }
  
  return response.json();
};

/**
 * Makes a POST request to the specified endpoint
 * @param {string} endpoint - The API endpoint to call
 * @param {Object} data - The data to send
 * @returns {Promise<any>} - The response data
 */
const post = async (endpoint, data = {}) => {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  
  if (!response.ok) {
    throw new Error(`API error: ${response.statusText}`);
  }
  
  return response.json();
};

/**
 * Makes a PUT request to the specified endpoint
 * @param {string} endpoint - The API endpoint to call
 * @param {Object} data - The data to send
 * @returns {Promise<any>} - The response data
 */
const put = async (endpoint, data = {}) => {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  
  if (!response.ok) {
    throw new Error(`API error: ${response.statusText}`);
  }
  
  return response.json();
};

/**
 * Makes a DELETE request to the specified endpoint
 * @param {string} endpoint - The API endpoint to call
 * @returns {Promise<any>} - The response data
 */
const del = async (endpoint) => {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  
  if (!response.ok) {
    throw new Error(`API error: ${response.statusText}`);
  }
  
  return response.json();
};

const api = {
  get,
  post,
  put,
  delete: del
};

export default api; 