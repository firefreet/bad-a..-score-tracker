import axios from 'axios';

export default {
  // Gets the room with the given id
  getRoom: function(roomId) {
    return axios.get('/api/rooms/' + roomId);
  },
  
  // Deletes the answer with the given id
  // deleteAnswer: function(roomId,user,round,question) {
  //   return axios.delete(`/api/rooms/answer?roomId=${roomId}&user=${user}&round=${round}&question=${question}`);
  // },


  // Saves a answer to the database
  saveAnswer: function(answerData) {
    return axios.put('/api/rooms/answer', answerData);
  }
};
