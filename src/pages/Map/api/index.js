// import { polygon } from "leaflet";
import url from "../../../config"
import http from "../../../services/httpService"

const getFields = () => {
  return http.get(`${url}/main/fields/1`)
}

const getFieldById = (id, indexes, the_date, analysisIds) => {
  return http.post(`${url}/main/fields/analysis/image/${id}`, {
    the_date,
    indexes,
    analysisIds
  })
}

const getChartsData = (fieldId, from, to, indexes) => {
  return http.post(`${url}/main/fields/analysis`, {
    fieldId,
    from,
    to,
    indexes
  })
}

const api = { getFields, getFieldById, getChartsData }

export default api
