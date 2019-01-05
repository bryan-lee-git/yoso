import axios from "axios";

export default {
  //Get all Purchases for a User.
  getPurchases: function() {
    return axios.get(`/api/purchases`);
  },
  // Get a specific User purchase.
  getPurchase: function(id) {
    return axios.get(`/api/purchases/${id}`);
  },
  // Create a new purchase.
  createPurchase: function() {
    return axios.post(`/api/purchase`);
  },
  // Edit a specific purchase.
  updatePurchase: function(id) {
    return axios.put(`/api/purchase/${id}`);
  },
  // Delete a specific purchase.
  deletePurchase: function(id) {
    return axios.delete(`/api/purchase/${id}`);
  }
};