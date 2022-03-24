/* eslint-disable */
import F from "./fizmasoft"
import "../leaflet/leaflet.bounce"
import "../styles/fizmasoft/fizmasoft.alarm.css"
import "../leaflet/leaflet.reactwindow"
import "./fizmasoft.nearerstPolice"
import moment from "moment"
const token = JSON.parse(localStorage.getItem("access_token"))

const copyToClipboard = (text) => {
  if (window.clipboardData && window.clipboardData.setData) {
    return window.clipboardData.setData("Text", text)
  } else if (document.queryCommandSupported && document.queryCommandSupported("copy")) {
    let textarea = document.createElement("textarea")
    textarea.textContent = text
    textarea.style.position = "fixed"
    document.body.appendChild(textarea)
    textarea.select()
    try {
      return document.execCommand("copy")
    } finally {
      document.body.removeChild(textarea)
    }
  }
}

F.Alarm = F.Class.extend({
  options: {},
  initialize: function (options) {
    F.setOptions(this, options)
  },
  addTo: function (map) {
    this._radius = 1000
    this._map = map
    this.nearestPolice = F.nearestPolice().addTo(this._map)
    this._fg = L.featureGroup().addTo(this._map)
    this._icon = L.AwesomeMarkers.icon({
      prefix: "fa",
      icon: "fa-user-circle",
      markerColor: "red"
    })
    return this
  },
  startAlarm: function (alarm, callback, imageLightbox, intl, imageLightboxCar) {
    const notificationId = alarm.data.notification.type_id
    const latlng = notificationId === 1 || notificationId === 4 ? alarm.data.alertData.location : alarm.data.alertData[0].location
    const [result] = notificationId === 1 || notificationId === 4 ? alarm.data.alertData.results : alarm.data.alertData
    const searchUrl = alarm.data.alertData.takenImg
    this._map.flyTo(latlng, 11)
    L.circle(latlng, this._radius, { color: "red" }).addTo(this._fg)
    L.marker(latlng, { icon: this._icon })
      .addTo(this._fg)
      .bindPopup(
        () =>
          notificationId === 1
            ? this.ntfacePopup(result, searchUrl, callback, imageLightbox, intl)
            : notificationId === 4
            ? this.ivssPopup(alarm.data.alertData, searchUrl, callback, imageLightbox, intl, { className: "test" })
            : this.carPopup(result, callback, imageLightbox, intl, imageLightboxCar, notificationId),
        { maxWidth: "100%" }
      )
      .openPopup()
    this.nearestPolice.inspektor(latlng, this._radius, intl)
    this.nearestPolice.iib(latlng, this._radius, intl)
  },
  endAlarm: function () {
    this._fg.clearLayers()
    this.nearestPolice.remove()
  },
  carPopup: function (result, callback, imageLightbox, intl, imageLightboxCar, notificationId) {
    let invoice = 0
    if (result?.violationList) {
      result?.violationList?.map((v) => {
        if (v.invoice !== "") {
          const matches = v?.invoice.match(/(\d+)/)
          invoice += Number(matches[0])
        }
      })
    }
    const container = L.DomUtil.create("div", "table container-info glass-container")
    const imagesDiv = L.DomUtil.create("div", "search-found-div", container)
    let imgDiv
    let details
    imgDiv = L.DomUtil.create("div", "image-container", imagesDiv)
    const img1 = L.DomUtil.create("img", "image-car", imgDiv)
    img1.src = `${result.mainPhoto}?token=${token}`
    L.DomEvent.on(img1, "click", () => imageLightboxCar(result.mainPhoto))
    const detailsContainer = L.DomUtil.create("tbody", "details-container", container)
    L.DomUtil.create("h3", "alarm-title", detailsContainer).innerHTML = notificationId === 3 ? intl.formatMessage({ id: "LochinKozDebtTitle" }) : intl.formatMessage({ id: "LochinKozInfo" })
    details = L.DomUtil.create("tr", "tr-border d-flex justify-content-center align-items-center", detailsContainer)
    L.DomUtil.create("h6", "table-data", details).innerHTML = result.objectName
    details = L.DomUtil.create("tr", "tr-border d-flex justify-content-between", detailsContainer)
    L.DomUtil.create("h6", "table-data w-30", details).innerHTML = `${intl.formatMessage({ id: "LochinKozSearchCarNumber" })}:`
    L.DomUtil.create("h6", "table-data w-70", details).innerHTML = result.carNumber
    details = L.DomUtil.create("tr", "tr-border d-flex justify-content-between", detailsContainer)
    L.DomUtil.create("h6", "table-data w-30", details).innerHTML = `${intl.formatMessage({ id: "FuqaroDate" })}:`
    L.DomUtil.create("h6", "table-data w-70", details).innerHTML = result.theDate
    if (notificationId === 3) {
      details = L.DomUtil.create("tr", "tr-border d-flex justify-content-between", detailsContainer)
      L.DomUtil.create("h6", "table-data w-30", details).innerHTML = `${intl.formatMessage({ id: "TableTotal" })}:`
      L.DomUtil.create("h6", "table-data w-70", details).innerHTML = `${new Intl.NumberFormat().format(invoice)} сум`
    }

    const btnContainer = L.DomUtil.create("div", "d-flex justify-content-between", detailsContainer)
    const moreBtn = L.DomUtil.create("button", "btn-primary mx-auto info-btn", btnContainer)
    moreBtn.innerHTML = intl.formatMessage({ id: "OnListMore" })
    L.DomEvent.on(moreBtn, "click", () => callback())
    if (notificationId === 3) {
      const debtBtn = L.DomUtil.create("button", "btn-primary mx-auto info-btn", btnContainer)
      debtBtn.innerHTML = `${intl.formatMessage({ id: "LochinKozDebt" })} - ${result.violationList.length}`

      L.DomEvent.on(debtBtn, "click", () => {
        L.control.reactWindow({
          modalCls: "modal-dialog-centered modal-sm",
          title: intl.formatMessage({ id: "LochinKozDebt" }),
          carDebtHeight: true,
          content: (
            <>
              {result.violationList.map((d, index) => (
                <div key={index} style={{ borderBottom: "2px solid gray" }} className="my-1">
                  <div className="d-flex justify-content-between">
                    <h6>{intl.formatMessage({ id: "Car owner" })}:</h6>
                    <h6 style={{ textAlign: "end" }}>{d.car_owner}</h6>
                  </div>
                  <div className="d-flex justify-content-between">
                    <h6>{intl.formatMessage({ id: "FuqaroDate" })}:</h6>
                    <h6 style={{ textAlign: "end" }}>{d.the_date && moment(d.the_date).format("DD.MM.YYYY")}</h6>
                  </div>
                  <div className="d-flex justify-content-between">
                    <h6>{intl.formatMessage({ id: "LochinKozCarModel" })}:</h6>
                    <h6 style={{ textAlign: "end" }}>{d.model}</h6>
                  </div>
                  <div className="d-flex justify-content-between">
                    <h6>{intl.formatMessage({ id: "LochinKozModda" })}:</h6>
                    <h6 style={{ textAlign: "end" }}>{d.modda}</h6>
                  </div>
                  <div className="d-flex justify-content-between">
                    <h6>{intl.formatMessage({ id: "LochinKozInvoice" })}:</h6>
                    <h6 style={{ textAlign: "end" }}>{d.invoice}</h6>
                  </div>
                  <div className="d-flex justify-content-between">
                    <h6>{intl.formatMessage({ id: "LochinKozResolution" })}:</h6>
                    <h6 style={{ textAlign: "end" }}>{d.resolution}</h6>
                  </div>
                </div>
              ))}
            </>
          ),
          visible: true
        })
      })
    }

    return container
  },

  ntfacePopup: function (result, searchUrl, callback, imageLightbox, intl) {
    const container = L.DomUtil.create("div", "table container-info glass-container")
    const imagesDiv = L.DomUtil.create("div", "search-found-div", container)
    let imgDiv
    let details
    imgDiv = L.DomUtil.create("div", "image-container", imagesDiv)
    L.DomUtil.create("h4", "alarm-title", imgDiv).innerHTML = intl.formatMessage({ id: "NtfsUserSearched" })
    const img1 = L.DomUtil.create("img", "image-searched ", imgDiv)

    imgDiv = L.DomUtil.create("div", "", imagesDiv)
    L.DomUtil.create("h4", "alarm-title", imgDiv).innerHTML = intl.formatMessage({ id: "NtfsUserFound" })
    const img2 = L.DomUtil.create("img", "image-found ", imgDiv)
    img1.src = `${result.searchedImg}?token=${token}`
    img2.src = `${result.pPhoto}?token=${token}`
    L.DomEvent.on(img1, "click", () => imageLightbox([img1.src, img2.src]))
    L.DomEvent.on(img2, "click", () => imageLightbox([img1.src, img2.src]))
    const detailsContainer = L.DomUtil.create("tbody", "details-container", container)
    L.DomUtil.create("h3", "alarm-title", detailsContainer).innerHTML = intl.formatMessage({ id: "LochinKozInfo" })
    details = L.DomUtil.create("tr", "tr-border d-flex justify-content-between align-items-center text-center", detailsContainer)
    const copyText = (L.DomUtil.create("h6", "table-data text-center", details).innerHTML = result.fullName)
    const copyBtn = L.DomUtil.create("i", "fas fa-copy cursor-pointer", details)
    L.DomEvent.on(copyBtn, "click", () => {
      // navigator?.clipboard?.writeText(copyText)
      copyToClipboard(copyText)
      copyBtn.style.color = "#7367f0"
      setTimeout(() => {
        copyBtn.style.color = "#6e6b7b"
      }, 2000)
    })
    details = L.DomUtil.create("tr", "tr-border d-flex justify-content-between", detailsContainer)
    L.DomUtil.create("h6", "table-data", details).innerHTML = `${intl.formatMessage({ id: "NtfsDateOfBirth" })}:`
    L.DomUtil.create("h6", "table-data", details).innerHTML = result.pDateBirth
    details = L.DomUtil.create("tr", "tr-border d-flex justify-content-between", detailsContainer)
    L.DomUtil.create("h6", "table-data", details).innerHTML = `${intl.formatMessage({ id: "NtfsSearchPassport" })}:`
    L.DomUtil.create("h6", "table-data", details).innerHTML = result.pPsp
    details = L.DomUtil.create("tr", "tr-border d-flex justify-content-between", detailsContainer)
    L.DomUtil.create("h6", "table-data", details).innerHTML = `${intl.formatMessage({ id: "NtfsSearchSimilarity" })}:`
    L.DomUtil.create("h6", "table-data", details).innerHTML = result.similarity + "%"
    const moreBtn = L.DomUtil.create("button", "btn-primary mx-auto info-btn", detailsContainer)
    moreBtn.innerHTML = intl.formatMessage({ id: "OnListMore" })
    L.DomEvent.on(moreBtn, "click", () => callback())
    return container
  },

  ivssPopup: function (data, searchUrl, callback, imageLightbox, intl) {
    const [result] = data.results
    const container = L.DomUtil.create("div", "table container-info glass-container")
    if (data.ordinary) container.style.width = "400px"
    const imagesContainer = L.DomUtil.create("div", "", container)
    L.DomUtil.create("h4", "alarm-title mb-1", imagesContainer).innerHTML = data.database_name
    const imagesDiv = L.DomUtil.create("div", "search-found-div", imagesContainer)
    let imgDiv
    let details
    imgDiv = L.DomUtil.create("div", "image-container", imagesDiv)
    imgDiv = L.DomUtil.create("div", "", imagesDiv)
    L.DomUtil.create("h4", "alarm-title", imgDiv).innerHTML = "IVSS"
    const img1 = L.DomUtil.create("img", "image-searched", imgDiv)
    imgDiv = L.DomUtil.create("div", "", imagesDiv)

    const arrowLeft = L.DomUtil.create("i", "fa fa-arrow-left text-danger", imgDiv)
    imgDiv = L.DomUtil.create("div", "", imagesDiv)
    arrowLeft.style.cssText = `
    font-size: 20px;
    margin: 0px 5px;
    display: flex;
    justify-content: center;
    align-items: center;
  `
    imgDiv = L.DomUtil.create("div", "", imagesDiv)
    L.DomUtil.create("h4", "alarm-title", imgDiv).innerHTML = intl.formatMessage({ id: "NtfsUserSearched" })
    const img2 = L.DomUtil.create("img", "image-found", imgDiv)
    imgDiv = L.DomUtil.create("div", "", imagesDiv)
    if (data.ordinary) {
      const arrowRight = L.DomUtil.create("i", "fa fa-arrow-right text-success", imgDiv)
      imgDiv = L.DomUtil.create("div", "", imagesDiv)
      arrowRight.style.cssText = `
      font-size: 20px;
      margin: 0px 5px;
      display: flex;
      justify-content: center;
      align-items: center;
    `
    }
    if (data.ordinary) {
      imgDiv = L.DomUtil.create("div", "", imagesDiv)
      L.DomUtil.create("h4", "alarm-title", imgDiv).innerHTML = "AVIR"
    }
    const img3 = L.DomUtil.create("img", `image-found ${!data.ordinary && "d-none"}`, imgDiv)
    L.DomEvent.on(img3, "click", () => imageLightbox([img1.src, img2.src, img3.src]))
    if (data.ordinary) img3.src = `${data?.ordinary?.pPhoto}?token=${token}`
    img1.src = `${result.img}?token=${token}`
    img2.src = `${searchUrl}?token=${token}`
    L.DomEvent.on(img1, "click", () => imageLightbox([img1.src, img2.src, data.ordinary ? img3?.src : null]))
    L.DomEvent.on(img2, "click", () => imageLightbox([img1.src, img2.src, data.ordinary ? img3?.src : null]))

    const detailsContainer = L.DomUtil.create("div", "", container)
    detailsContainer.style.cssText = `
    display: flex;
    justify-content: space-between;
    font-size: 10px;
    `
    const detailsContainerLeft = L.DomUtil.create("tbody", `details-container ${data.ordinary ? "w-50" : "w-100"}`, detailsContainer)
    detailsContainerLeft.style.margin = "0px 10px"
    L.DomUtil.create("h3", "alarm-title mt-1 table-data-alarm-header", detailsContainerLeft).innerHTML = intl.formatMessage({ id: "LochinKozInfo" })
    details = L.DomUtil.create("tr", "tr-border d-flex justify-content-between align-items-center text-center", detailsContainerLeft)
    const copyText = (L.DomUtil.create("h6", "table-data-alarm-header text-center", details).innerHTML = result.fullname)
    const copyBtn = L.DomUtil.create("i", "fas fa-copy cursor-pointer", details)
    L.DomEvent.on(copyBtn, "click", () => {
      copyToClipboard(copyText)
      copyBtn.style.color = "#7367f0"
      setTimeout(() => {
        copyBtn.style.color = "#6e6b7b"
      }, 2000)
    })
    details = L.DomUtil.create("tr", "tr-border d-flex justify-content-between", detailsContainerLeft)
    L.DomUtil.create("h6", "table-data-alarm-header", details).innerHTML = `${intl.formatMessage({ id: "FuqaroDetailBirthday" })}:`
    L.DomUtil.create("h6", "table-data-alarm", details).innerHTML = result.birthday
    details = L.DomUtil.create("tr", "tr-border d-flex justify-content-between", detailsContainerLeft)
    L.DomUtil.create("h6", "table-data-alarm-header", details).innerHTML = `${intl.formatMessage({ id: "FuqaroDetailPassport" })}:`
    L.DomUtil.create("h6", "table-data-alarm", details).innerHTML = result.passport
    details = L.DomUtil.create("tr", "tr-border d-flex justify-content-between", detailsContainerLeft)
    L.DomUtil.create("h6", "table-data-alarm-header", details).innerHTML = `${intl.formatMessage({ id: "NtfsSearchSimilarity" })}:`
    L.DomUtil.create("h6", "table-data-alarm", details).innerHTML = result.similarity + "%"
    details = L.DomUtil.create("tr", "tr-border d-flex justify-content-between", detailsContainerLeft)
    L.DomUtil.create("h6", "table-data-alarm-header", details).innerHTML = `${intl.formatMessage({ id: "District" })}:`
    L.DomUtil.create("h6", "table-data-alarm", details).innerHTML = data.region
    details = L.DomUtil.create("tr", "tr-border d-flex justify-content-between", detailsContainerLeft)
    L.DomUtil.create("h6", "table-data-alarm-header", details).innerHTML = `${intl.formatMessage({ id: "NtfsSearchAddress" })}:`
    L.DomUtil.create("h6", "table-data-alarm", details).innerHTML = data.address
    details = L.DomUtil.create("tr", "tr-border d-flex justify-content-between", detailsContainerLeft)
    L.DomUtil.create("h6", "table-data-alarm-header", details).innerHTML = `${intl.formatMessage({ id: "NtfsUserObject" })}:`
    L.DomUtil.create("h6", "table-data-alarm", details).innerHTML = data.object_name
    details = L.DomUtil.create("tr", "tr-border d-flex justify-content-between", detailsContainerLeft)
    L.DomUtil.create("h6", "table-data-alarm-header", details).innerHTML = `${intl.formatMessage({ id: "InspektorTableDate" })}:`
    L.DomUtil.create("h6", "table-data-alarm", details).innerHTML = result.the_date
    details = L.DomUtil.create("tr", "tr-border d-flex justify-content-between", detailsContainerLeft)
    L.DomUtil.create("h6", "table-data-alarm-header", details).innerHTML = "IVSS:"
    L.DomUtil.create("h6", "table-data-alarm", details).innerHTML = result.ivss_address
    if (data.ordinary) {
      L.DomUtil.create("div", "horizontal-line-alarm", detailsContainer)
      const detailsContainerRight = L.DomUtil.create("tbody", "details-container border-0 w-50", detailsContainer)
      detailsContainerRight.style.margin = "0px 10px"
      L.DomUtil.create("h3", "alarm-title mt-1 table-data-alarm", detailsContainerRight).innerHTML = intl.formatMessage({ id: "LochinKozInfo" })
      details = L.DomUtil.create("tr", "tr-border d-flex justify-content-between align-items-center text-center", detailsContainerRight)
      const copyTextRight = (L.DomUtil.create("h6", "table-data-alarm text-center", details).innerHTML = data?.ordinary?.pName + " " + data?.ordinary?.pSurname + " " + data?.ordinary?.pPatronym)
      const copyBtnRight = L.DomUtil.create("i", "fas fa-copy cursor-pointer", details)
      L.DomEvent.on(copyBtnRight, "click", () => {
        copyToClipboard(copyTextRight)
        copyBtnRight.style.color = "#7367f0"
        setTimeout(() => {
          copyBtnRight.style.color = "#6e6b7b"
        }, 2000)
      })
      details = L.DomUtil.create("tr", "tr-border d-flex justify-content-between", detailsContainerRight)
      L.DomUtil.create("h6", "table-data-alarm-header", details).innerHTML = `${intl.formatMessage({ id: "FuqaroDetailBirthday" })}:`
      L.DomUtil.create("h6", "table-data-alarm", details).innerHTML = data?.ordinary?.pDateBirth
      details = L.DomUtil.create("tr", "tr-border d-flex justify-content-between", detailsContainerRight)
      L.DomUtil.create("h6", "table-data-alarm-header", details).innerHTML = `${intl.formatMessage({ id: "FuqaroDetailPassport" })}:`
      L.DomUtil.create("h6", "table-data-alarm", details).innerHTML = data?.ordinary?.pPsp
      details = L.DomUtil.create("tr", "tr-border d-flex justify-content-between", detailsContainerRight)
      L.DomUtil.create("h6", "table-data-alarm-header", details).innerHTML = `${intl.formatMessage({ id: "NtfsSearchSimilarity" })}:`
      L.DomUtil.create("h6", "table-data-alarm", details).innerHTML = data?.ordinary?.similarity + "%"
      details = L.DomUtil.create("tr", "tr-border d-flex justify-content-between", detailsContainerRight)
      L.DomUtil.create("h6", "table-data-alarm-header", details).innerHTML = `${intl.formatMessage({ id: "NtfsSearchAddress" })}:`
      L.DomUtil.create("h6", "table-data-alarm", details).innerHTML = data?.ordinary?.pAddress
      details = L.DomUtil.create("tr", "tr-border d-flex justify-content-between", detailsContainerRight)
      L.DomUtil.create("h6", "table-data-alarm-header", details).innerHTML = `${intl.formatMessage({ id: "FuqaroDetailPlaceOfBirth" })}:`
      L.DomUtil.create("h6", "table-data-alarm", details).innerHTML = data?.ordinary?.pPlaceBirth
    }
    const actions = L.DomUtil.create("div", "d-flex mt-1 justify-content-between", container)
    const videoBtn = L.DomUtil.create("button", "btn-primary info-btn", actions)
    videoBtn.innerHTML = intl.formatMessage({ id: "PerimeterVideo" })
    const moreBtn = L.DomUtil.create("button", "btn-primary info-btn", actions)
    moreBtn.innerHTML = intl.formatMessage({ id: "FACE_DETECTION" })
    L.DomEvent.on(moreBtn, "click", () => callback(img2.src, data.database_name, null, null))
    L.DomEvent.on(videoBtn, "click", () => this.videoPlay(data.results[0]), this)
    if (data.ordinary) {
      const moreBtnRight = L.DomUtil.create("button", "btn-primary info-btn", actions)
      moreBtnRight.innerHTML = intl.formatMessage({ id: "FuqaroInfo" })
      L.DomEvent.on(moreBtnRight, "click", () => callback(null, null, data.ordinary?.pcitizen, data.ordinary?.pLiveAddress))
    }

    return container
  },

  videoPlay: function (data) {
    const [start, end] = this.correctTime(data.the_date)
    F.stream({ ipAddress: data.ivss_address, port: "37777", login: "admin", password: "parol12345" }).playback(data.channel_id, start, end)
  },

  correctTime: function (time) {
    let [d, t] = time.split(" ")
    d = d.split(".").reverse().join("-")
    // const t = time.split(" ").join("T").split(".").join("-")
    const date = [d, t].join("T")
    const start = new Date(date),
      end = new Date(date)
    start.setSeconds(start.getSeconds() - 10)
    end.setSeconds(end.getSeconds() + 10)
    start.setHours(start.getHours() + 5)
    end.setHours(end.getHours() + 5)
    return [start, end]
  }
})

F.alarm = function (options) {
  return new F.Alarm(options)
}
