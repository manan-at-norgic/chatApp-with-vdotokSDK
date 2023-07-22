import axios from "axios";
import env from "../../config";

export default {
  fetchGroups: async (token) => {
    let payload = { auth_token: token };
    let response = await axios.post(`${env.url}AllGroups`, payload);
    return response;
  },
  findString: (e) => {
    let lowered = e.username.toLowerCase(),
      loweredS = search.toLowerCase();
    // e.username.indexOf(search) > -1
    if (lowered.indexOf(loweredS) > -1) {
      return true;
    } else {
      return false;
    }
  },
};
