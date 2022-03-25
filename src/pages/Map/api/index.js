import url from "../../../config";
import http from "../../../services/httpService";

const getFields = () => {
  return http.get(`${url}/main/fields/1`);
};
const getFieldById = (id) => {
  return http.get(`${url}/main/fields/analysis/${id}`);
};

const api = { getFields, getFieldById };

export default api;
