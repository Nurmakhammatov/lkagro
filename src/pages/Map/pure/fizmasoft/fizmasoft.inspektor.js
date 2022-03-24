/*eslint-disable*/
import F from "./fizmasoft"
import GLightbox from "glightbox"
import "../../../../../../node_modules/glightbox/dist/css/glightbox.css"
import "../styles/fizmasoft/fizmasoft.alarm.css"

const token = localStorage.getItem("access_token")?.replaceAll('"', "")

F.Inspektor = F.Class.extend({
  options: {},
  initialize: function (options) {
    this._idList = []
    F.setOptions(this, options)
  },
  addTo: function (map) {
    this._map = map
    this._fg = L.featureGroup().addTo(this._map)
    this._icon = L.AwesomeMarkers.icon({
      prefix: "flaticon",
      icon: "flaticon-police-1",
      markerColor: "#004d40"
    })
    return this
  },
  addPoint: function (data) {
    if (!this._idList || this._idList?.length !== data.length) this._newMarkers(data)
    else this._changeMarkerPoints(data)
  },

  _newMarkers: function (data) {
    let marker
    this.removePoints()
    data.forEach((d) => {
      if (d.selected) {
        marker = L.marker(d.coordinates, { icon: this._icon })
          .addTo(this._fg)
          .bindPopup(() => this._renderPopup(d))
        this._idList.push({ id: d.id, leaflet: marker._leaflet_id })
      }
    })
  },

  _changeMarkerPoints: function (data) {
    for (let d = 0; d < data.length; d++) {
      if (!data[d].selected) return this._newMarkers(data)
      const [item] = this._idList.filter((i) => i.id === data[d].id)
      if (data[d].coordinates) {
        const marker = this._fg.getLayer(item?.leaflet)
        marker?.setLatLng(data[d].coordinates)
      }
    }
  },

  _renderPopup: function (d) {
    const container = F.DomUtil.create("div", "table container-info")
    container.style.cssText = `
      display: flex;
      flex-direction: column;
     justify-content: center;
     align-items: center;
     text-align: center;
    `
    const img = F.DomUtil.create("img", "", container)
    img.src = `${d.avatar}?token=${token}`
    img.style.cssText = `
      width: 150px;
      height: 150px;
      object-fit: cover;
      margin-bottom: 10px;
      cursor: pointer;
    `
    L.DomEvent.on(img, "click", () => this.handleImagePreview(d.avatar), this)
    let details
    const detailsContainer = L.DomUtil.create("tbody", "details-container", container)
    details = L.DomUtil.create("tr", "d-flex justify-content-center align-items-center", detailsContainer)
    L.DomUtil.create("h6", "table-data w-30", details).innerHTML = "Унвони:"
    L.DomUtil.create("h6", "table-data w-70", details).innerHTML = d.position
    details = L.DomUtil.create("tr", "tr-border d-flex justify-content-between", detailsContainer)
    L.DomUtil.create("h6", "table-data w-30", details).innerHTML = "Исми:"
    L.DomUtil.create("h6", "table-data w-70", details).innerHTML = d.full_name
    details = L.DomUtil.create("tr", "tr-border d-flex justify-content-between", detailsContainer)
    L.DomUtil.create("h6", "table-data w-30", details).innerHTML = "Туман:"
    L.DomUtil.create("h6", "table-data w-70", details).innerHTML = d.district.name
    details = L.DomUtil.create("tr", "d-flex justify-content-between", detailsContainer)
    L.DomUtil.create("h6", "table-data w-30", details).innerHTML = "ГОМ:"
    L.DomUtil.create("h6", "table-data w-70", details).innerHTML = d.gom.name
    details = L.DomUtil.create("tr", "d-flex justify-content-between", detailsContainer)
    L.DomUtil.create("h6", "table-data w-30", details).innerHTML = "Маҳалла:"
    L.DomUtil.create("h6", "table-data w-70", details).innerHTML = d.mfy.name
    details = L.DomUtil.create("tr", "tr-border d-flex justify-content-between", detailsContainer)
    L.DomUtil.create("h6", "table-data w-30", details).innerHTML = "Username:"
    L.DomUtil.create("h6", "table-data w-70", details).innerHTML = d.username
    return container
  },

  handleImagePreview: function (avatar) {
    const myGallery = GLightbox({
      elements: [
        {
          href: avatar,
          type: "image"
        }
      ]
    })
    myGallery.open()
  },

  removePoints: function () {
    this._idList = []
    this._fg.clearLayers()
  },
  bounceMarker: function (id) {
    const [marker] = this._idList.filter((i) => i.id === id)
    if (marker) this._fg.getLayer(marker.leaflet)?.bounce(1)
  }
})

F.inspektor = function (options) {
  return new F.Inspektor(options)
}
