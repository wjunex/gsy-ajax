import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

class Ajax {
  async request(options: AxiosRequestConfig): Promise<any> {
    try {
      const res: AxiosResponse = await axios.request(options);
      return res.data;
    } catch (error) {
      throw error;
    }
  }
}

export default Ajax;
