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
  }
};
