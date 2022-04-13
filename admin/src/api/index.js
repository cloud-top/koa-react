import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://127.0.0.1:3000',
  timeout: 5000,
});

instance.interceptors.request.use(
  (config) => {
    return config;
  },
  (err) => {
    console.log(err);
  }
);

instance.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {
    console.log(err);
  }
);

async function http(option = {}) {
  let result;
  if (option.method === 'get' || option.method === 'delete') {
    await instance[option.method](option.path, {
      params: option.params,
    })
      .then((res) => {
        result = res;
      })
      .catch((e) => {
        result = e;
      });
  } else if (option.method === 'post' || option.method === 'put') {
    await instance[option.method](option.path, option.params)
      .then((res) => {
        result = res;
      })
      .catch((e) => {
        result = e;
      });
  }
  return result;
}

export default http;
