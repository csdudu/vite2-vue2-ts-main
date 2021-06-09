import request from './request';
const http = (url, data, method = 'GET') => {
  const obj = {
    url,
    method,
  };
  method === 'GET' ? (obj.params = data) : (obj.data = data);
  return request(obj);
};
export default http;
