import axios from "axios";

const callApi = async (url, payload, type) => {
  const response = await axios.type(url, JSON.stringify(payload));
  console.log(response, "<--------------------------------");
};

export default callApi;
