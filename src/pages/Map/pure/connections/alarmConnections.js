import "../fizmasoft/fizmasoft.alarm"
import F from "../fizmasoft/fizmasoft"

const connectToMap = (map) => {
  const alarmObj = F.alarm().addTo(map)

  function startAlarm(alarm, cb, imageLightbox, intl, imageLightboxCar) {
    alarmObj.startAlarm(alarm, cb, imageLightbox, intl, imageLightboxCar)
  }
  function removeAlarm() {
    alarmObj.endAlarm()
  }

  return { startAlarm, removeAlarm }
}

const alarmConnections = { connectToMap }

export default alarmConnections
