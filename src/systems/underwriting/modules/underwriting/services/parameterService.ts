// Parameter Service
export const ParameterService = {
  // Get all underwriting parameters
  getParameters: async () => {
    try {
      const response = await fetch('/api/underwriting/parameters');
      const data = await response.json();
      return data.parameters;
    } catch (error) {
      console.error('Error fetching parameters:', error);
      throw error;
    }
  },

  // Get a parameter by ID
  getParameter: async (id: string) => {
    try {
      const response = await fetch(`/api/underwriting/parameters/${id}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error fetching parameter ${id}:`, error);
      throw error;
    }
  },

  // Update a parameter
  updateParameter: async (id: string, parameter: { value: number }) => {
    try {
      const response = await fetch(`/api/underwriting/parameters/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(parameter),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error updating parameter ${id}:`, error);
      throw error;
    }
  },

  // Reset parameters to defaults
  resetParameters: async () => {
    try {
      const response = await fetch('/api/underwriting/parameters/reset', {
        method: 'POST',
      });
      const data = await response.json();
      return data.parameters;
    } catch (error) {
      console.error('Error resetting parameters:', error);
      throw error;
    }
  },
};
