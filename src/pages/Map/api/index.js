import url from "../../../config";
import http from "../../../services/httpService";

const getFields = () => {
  return http.get(`${url}/main/fields/1`);
};
const getFieldById = (id) => {
  return http.post(`${url}/main/fields/analysis/image/${id}`);
};
const getChartsData = (fieldId, from, to, indexes) => {
 return http.post(`${url}/main/fields/analysis`, {
   fieldId,
   from,
   to,
   indexes,
 });
};

const api = { getFields, getFieldById, getChartsData };

export default api;
