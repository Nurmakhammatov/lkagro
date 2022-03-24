/*eslint-disable*/
import axios from "axios"
import Inspektor from "../../routes/InspektorlarRoute/map"
import useJwt from "@src/auth/jwt/useJwt"
import GUVD from "../../routes/GUVDRoute/map"
const config = useJwt.jwtConfig

const endpoint = `${config.url}/notifications`

F.NearestPolice = F.Class.extend({
  options: {},
  initialize: function (options) {
    F.setOptions(this, options)
  },
  addTo: function (map) {
    this._map = map
    this._fg = L.featureGroup().addTo(this._map)
    return this
  },
  inspektor: async function (coordinates, radius, intl) {
    this._inspektors = new Inspektor(this._fg)
    const { data } = await axios.post(`${endpoint}/nearest-inspectors`, { coordinates, radius })
    this._inspektors.placeMarkers(data.data, null, intl)
  },
  iib: async function (coordinates, radius, intl) {
    this._iibs = new GUVD(this._fg)
    const { data } = await axios.post(`${endpoint}/nearest-iibs`, { coordinates, radius })
    this._iibs.placeMarkers(data.data, intl)
  },
  remove: function () {
    this._fg.clearLayers()
  }
})

F.nearestPolice = function (options) {
  return new F.NearestPolice(options)
}
