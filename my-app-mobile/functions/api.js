import axios from "axios";

export const apiPost = async (url, data, headers) => {
  try {
    const response = await axios.post(url, data, { headers });
    return { data: response.data, error: null };
  } catch (error) {
    return { data: null, error };
  }
};

export const apiGet = async (url, headers) => {
  try {
    const response = await axios.get(url, { headers });
    return { data: response.data, error: null };
  } catch (error) {
    return { data: null, error };
  }
};
