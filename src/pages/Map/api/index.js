import url from "../../../config";
import http from "../../../services/httpService";

const getFields = () => {
  return http.get(`${url}/main/fields/1`);
};
const getFieldById = (id) => {
  return http.post(`${url}/main/fields/analysis/image/${id}`);
};
const getChartsData = (fieldId, from, to, indexes) => {
  http.post(`${url}/main/fields/analysis`, {
    fieldId: 1,
    from: "2021-04-14",
    to: "2021-04-14",
    indexes: ["ndvi", "mndvi"],
  });
};

const api = { getFields, getFieldById, getChartsData };

export default api;
