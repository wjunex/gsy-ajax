import axios from "axios";

const ajax = function () {
  const request = async (option) => {
    return new Promise((resolve, reject) => {
      axios
        .request(options)
        .then(async (res) => {
          let { data } = res;
          return resolve(data);
        })
        .catch(async (error) => {
          reject(error);
        });
    });
  };
}