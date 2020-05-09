import axios from 'axios';

export default {
  
  // Gets the active room with the given Code
  getActiveRoom: function(code) {
    return axios.get('/api/rooms/active/' + code);
  },
  // Gets the room with the given Room Code and is active
  getRoomByCode: function(code) {
    return axios.get('/api/rooms/code/' + code);
  },
  toggleCorrect: (roomId,userId,questionId,value)=>{
    return axios.put(`/api/rooms/correct?roomId=${roomId}&userId=${userId}&questionId=${questionId}&value=${value}` );
  },
  // Deletes the answer with the given id
  // deleteAnswer: function(roomId,user,round,question) {
  //   return axios.delete(`/api/rooms/answer?roomId=${roomId}&user=${user}&round=${round}&question=${question}`);
  // },
  createRoom: function() {
    return axios.post('/api/rooms/create');
  },
  populateRooms: function() {
    return axios.get('/api/rooms/populate');
  },
  //toggle active room
  toggleRoomActive: function(state, id) {
    return axios.put(`/api/rooms/active/${state}/${id}`)
  },
  // add for testing
  getFirstRoom: ()=>{
    return axios.get('/api/rooms/')
  },
  // Saves a answer to the database
  saveAnswer: function(answerData) {
    return axios.put("/api/rooms/answer", answerData);
  },
  sendBroadcast: (_id,broadcast)=>{
    return axios.put(`/api/rooms/${_id}/broadcast/`,broadcast);
  },
  deleteAnswer: (roomId,userId,questionId)=>{
    return axios.delete(`/api/rooms/answer?roomId=${roomId}&userId=${userId}&questionId=${questionId}`)
  },
  //Edit points
  editPoints: (roomId,userId,questionId, points) => {
    return axios.put(`/api/rooms/points?roomId=${roomId}&userId=${userId}&questionId=${questionId}&points=${points}`)
  },
  // Register User
  register: function(userRegData) {
    return axios.post(`/api/users/register`, userRegData);
  },
  // Login User
  login: function(userData) {
    return axios.post(`/api/users/login`, userData);
  },
  logout: function() {
    return axios.post('/api/users/logout');
  },
  isAuthenticated: function() {
    return axios.get(`api/users/auth`);
  },
  newQuestion: (roomId,roundNum)=>{
    return axios.put(`/api/rooms/${roomId}/${roundNum}/question`)
  },
  newRound: (roomId)=>{
    return axios.put(`/api/rooms/${roomId}/round`)
  },
  gameSummary: (roomCode) => {
    return axios.get(`/api/rooms/${roomCode}/summary`)
  },
  sendPassEmail: emailInfo => {
    return axios.post('/api/users/sendpassemail', emailInfo);
  },
  resetPass: (userData) => {
    return axios.post('/api/users/resetpass', userData);
  }
};
