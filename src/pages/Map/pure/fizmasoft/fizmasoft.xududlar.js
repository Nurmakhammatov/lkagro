/* eslint-disable */

import F from "./fizmasoft"
let index = 0
F.Xududlar = F.Class.extend({
  options: {},
  initialize: function (options) {
    F.setOptions(this, options)
  },
  addTo: function (map) {
    this._map = map
    this._fg = L.featureGroup().addTo(this._map)
    return this
  },
  drawXududlar: function (data) {
    L.geoJSON(data.way, {
      style: (feature) => {
        return { color: this._getRandColor(), opacity: 1, fillOpacity: 0.4 }
      }
    })
      .bindPopup(function (layer) {
        return layer.feature.properties.name
      })
      .addTo(this._fg)
  },
  removeXududlar: function () {
    this._fg.clearLayers()
  },
  _getRandColor: function () {
    if (index === 12) index = 0
    // const letters = "0123456789ABCDEF"
    // let color = "#"
    // for (let i = 0; i < 6; i++) {
    //   color += letters[Math.floor(Math.random() * 16)]
    // }
    // return color
    let color = ""
    const colors = ["#34568B", "#FF6F61", "#6B5B95", "#88B04B", "#fe4a49", "#fed766", "#651e3e", "#0392cf", "#d11141", "#ee4035", "#29a8ab", "#ff3377"]
    color = colors[index]
    index++
    return color
  }
})

F.xududlar = function (options) {
  return new F.Xududlar(options)
}
