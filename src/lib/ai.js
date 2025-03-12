import api from './api';

export const ai = {
  /**
   * Analyze text using AI
   * @param {string} text - The text to analyze
   * @param {Object} options - Analysis options
   * @returns {Promise<Object>} - Analysis results
   */
  async analyzeText(text, options = {}) {
    try {
      const response = await api.post('/api/ai/analyze-text', {
        text,
        ...options
      });
      return response.data;
    } catch (error) {
      console.error('Error analyzing text:', error);
      throw new Error(error.response?.data?.message || 'Failed to analyze text');
    }
  },

  /**
   * Process an image using AI
   * @param {File} imageFile - The image file to process
   * @param {Object} options - Processing options
   * @returns {Promise<Object>} - Processing results
   */
  async processImage(imageFile, options = {}) {
    try {
      const formData = new FormData();
      formData.append('image', imageFile);
      
      if (options.detectionType) {
        formData.append('detectionType', options.detectionType);
      }
      
      if (options.confidence) {
        formData.append('confidence', options.confidence);
      }
      
      const response = await api.post('/api/ai/process-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      return response.data;
    } catch (error) {
      console.error('Error processing image:', error);
      throw new Error(error.response?.data?.message || 'Failed to process image');
    }
  },

  /**
   * Analyze a document using AI
   * @param {File} documentFile - The document file to analyze
   * @param {Object} options - Analysis options
   * @returns {Promise<Object>} - Analysis results
   */
  async analyzeDocument(documentFile, options = {}) {
    try {
      const formData = new FormData();
      formData.append('document', documentFile);
      
      if (options.extractText) {
        formData.append('extractText', options.extractText);
      }
      
      if (options.extractEntities) {
        formData.append('extractEntities', options.extractEntities);
      }
      
      if (options.summarize) {
        formData.append('summarize', options.summarize);
      }
      
      const response = await api.post('/api/ai/analyze-document', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      return response.data;
    } catch (error) {
      console.error('Error analyzing document:', error);
      throw new Error(error.response?.data?.message || 'Failed to analyze document');
    }
  },

  /**
   * Send a message to the AI chatbot
   * @param {string} message - The user message
   * @param {Array} history - Chat history
   * @returns {Promise<Object>} - Chatbot response
   */
  async chatMessage(message, history = []) {
    try {
      const response = await api.post('/api/ai/chat', {
        message,
        history
      });
      return response.data;
    } catch (error) {
      console.error('Error sending chat message:', error);
      throw new Error(error.response?.data?.message || 'Failed to get response from AI');
    }
  },

  /**
   * Generate text using AI
   * @param {string} prompt - The text prompt
   * @param {Object} options - Generation options
   * @returns {Promise<Object>} - Generated text
   */
  async generateText(prompt, options = {}) {
    try {
      const response = await api.post('/api/ai/generate-text', {
        prompt,
        ...options
      });
      return response.data;
    } catch (error) {
      console.error('Error generating text:', error);
      throw new Error(error.response?.data?.message || 'Failed to generate text');
    }
  },

  /**
   * Get predictions using AI
   * @param {string} type - The prediction type
   * @param {Object} data - Input data for prediction
   * @returns {Promise<Object>} - Prediction results
   */
  async getPredictions(type, data = {}) {
    try {
      const response = await api.post(`/api/ai/predictions/${type}`, data);
      return response.data;
    } catch (error) {
      console.error('Error getting predictions:', error);
      throw new Error(error.response?.data?.message || 'Failed to get predictions');
    }
  },

  /**
   * Get AI metrics and stats
   * @returns {Promise<Object>} - AI metrics data
   */
  async getMetrics() {
    try {
      const response = await api.get('/api/ai/metrics');
      return response.data;
    } catch (error) {
      console.error('Error getting AI metrics:', error);
      throw new Error(error.response?.data?.message || 'Failed to get AI metrics');
    }
  }
}; 