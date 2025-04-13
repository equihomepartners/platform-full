import { Document } from '../types';

// Document Service
export const DocumentService = {
  // Get all documents for an application
  getDocuments: async (applicationId: string): Promise<Document[]> => {
    try {
      const response = await fetch(`/api/underwriting/applications/${applicationId}/documents`);
      const data = await response.json();
      return data.documents;
    } catch (error) {
      console.error(`Error fetching documents for application ${applicationId}:`, error);
      throw error;
    }
  },

  // Get a document by ID
  getDocument: async (id: string): Promise<Document> => {
    try {
      const response = await fetch(`/api/underwriting/documents/${id}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error fetching document ${id}:`, error);
      throw error;
    }
  },

  // Upload a document
  uploadDocument: async (applicationId: string, file: File, type: string, name: string): Promise<Document> => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('type', type);
      formData.append('name', name);

      const response = await fetch(`/api/underwriting/applications/${applicationId}/documents`, {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error uploading document for application ${applicationId}:`, error);
      throw error;
    }
  },

  // Update a document
  updateDocument: async (id: string, document: Partial<Document>): Promise<Document> => {
    try {
      const response = await fetch(`/api/underwriting/documents/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(document),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error updating document ${id}:`, error);
      throw error;
    }
  },

  // Delete a document
  deleteDocument: async (id: string): Promise<void> => {
    try {
      await fetch(`/api/underwriting/documents/${id}`, {
        method: 'DELETE',
      });
    } catch (error) {
      console.error(`Error deleting document ${id}:`, error);
      throw error;
    }
  },

  // Generate a term sheet
  generateTermSheet: async (applicationId: string): Promise<Document> => {
    try {
      const response = await fetch(`/api/underwriting/applications/${applicationId}/term-sheet`, {
        method: 'POST',
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error generating term sheet for application ${applicationId}:`, error);
      throw error;
    }
  },
};
