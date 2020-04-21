import axios from "axios";

export default {
  // send Contact
  sendContact: function(contactData) {
    return axios.post("/api/mandrill/contact", contactData);
  }

};