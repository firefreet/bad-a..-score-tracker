import axios from 'axios';

export default {

  // Creates a new random 4 digit room number
  createRoom: () => {
    return axios.put('/api/rooms/create');
  },
  
  // Gets the room with the given id
  getRoom: function(roomId) {
    return axios.get('/api/rooms/' + roomId);
  },
  toggleCorrect: (roomId,userId,questionId,value)=>{
    return axios.put(`/api/rooms/correct?roomId=${roomId}&userId=${userId}&questionId=${questionId}&value=${value}` );
  },
  // Deletes the answer with the given id
  // deleteAnswer: function(roomId,user,round,question) {
  //   return axios.delete(`/api/rooms/answer?roomId=${roomId}&user=${user}&round=${round}&question=${question}`);
  // },

  // add for testing
  getFirstRoom: ()=>{
    return axios.get('/api/rooms/')
  },

  // Saves a answer to the database
  saveAnswer: function(answerData) {
    return axios.put("/api/rooms/answer", answerData);
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
  },
  test: function() {
    return axios.get('api/users/test');
  }
};
