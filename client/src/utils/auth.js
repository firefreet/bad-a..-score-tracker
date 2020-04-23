import API from './API';

export default {
  isAuth: async function () {
    try {
      let res = await API.isAuthenticated()
      console.log(res.data);
      return res.data;
    }
    catch (err) {
      console.log(err.response);
    }  
}
    
}
