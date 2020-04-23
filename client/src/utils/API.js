import axios from "axios";

export default {
  // Gets the room with the given id
  getRoom: function(roomId) {
    return axios.get("/api/rooms/" + roomId);
  },
  // Deletes the book with the given id
  deleteAnswer: function(roomId,user,round,question) {
    return axios.delete(`/api/answer?roomId=${roomId}&user=${user}&round=${round}&question=${question}`);
  },
  // Saves a book to the database
  saveAnswer: function(answerData) {
    return axios.post("/api/answer", answerData);
  },
  // Register User
  register: function(userRegData) {
    return axios.post(`/api/users/register`, userRegData);
  },
  // Login User
  login: function(userData) {
    return axios.post(`/api/users/login`, userData);
  },
  isAuthenticated: function() {
    return axios.get(`api/users/auth`);
  }
};
