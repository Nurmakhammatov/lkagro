import axios from "axios"
import _ from "lodash"
import React, { useState, useEffect } from "react"
import { injectIntl } from "react-intl"
import ReactPaginate from "react-paginate"
import PerfectScrollbar from "react-perfect-scrollbar"
import { Button, Input, Table } from "reactstrap"
import Spinner from "reactstrap/lib/Spinner"
import Passport from "../../../../../components/Passport/Passport"
import useJwt from "@src/auth/jwt/useJwt"
import { Save } from "react-feather"
import RangeDatePicker from "../../../../../components/DateTimeInput/RangeDatePicker"
import moment from "moment"
const config = useJwt.jwtConfig
const token = localStorage.getItem("access_token")

const OrdinaryPeople = ({ intl, radius, geojson, isLine }) => {
  const [loading, setLoading] = useState(true)
  const [xlxLoading, setXlxLoading] = useState(false)
  const [limit, setLimit] = useState(15)
  const [offset, setOffset] = useState(0)
  const [tableData, setTableData] = useState()
  const [isModal, setIsModal] = useState(false)
  const [pcitizen, setPcitizen] = useState(null)
  const [address, setAddress] = useState(null)
  const [kadastr, setKadastr] = useState(null)
  const [active, setActive] = useState("")
  const [fullname, setFullname] = useState(null)
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [passportNumber, setPassportNumber] = useState(null)

  const fetchPolygonData = async () => {
    const { data } = await axios.post(`${config.url}/foreign/xatlov/ordinary-people-in-polygon`, {
      radius,
      geojson: isLine ? geojson.features[0] : geojson,
      limit,
      offset,
      fullname: fullname ? fullname : undefined,
      passportNumber: passportNumber ? passportNumber : undefined,
      from: startDate ? moment(startDate).format("YYYY-MM-DD") : undefined,
      to: endDate ? moment(endDate).format("YYYY-MM-DD") : undefined
    })
    return data
  }

  const fetchData = async () => {
    setLoading(true)

    const data = await fetchPolygonData()
    setTableData(data.data)
    setLoading(false)
  }
  useEffect(() => {
    fetchData()
  }, [offset])

  const handlePagination = (page) => {
    setOffset(page.selected * limit)
  }

  const handleRowClick = (data) => {
    setActive(data.pcitizen)
    setPcitizen(data.pcitizen)
    setAddress(data.address)
    setKadastr(data.kadastr_raqami)
    setIsModal(true)
  }

  const handleExcel = async () => {
    setXlxLoading(true)
    try {
      const { data } = await axios.post(`${config.url}/foreign/xatlov/ordinary-people/excel`, {
        radius,
        geojson: isLine ? geojson.features[0] : geojson,
        fullname: fullname ? fullname : undefined,
        passportNumber: passportNumber ? passportNumber : undefined,
        from: startDate ? moment(startDate).format("YYYY-MM-DD") : undefined,
        to: endDate ? moment(endDate).format("YYYY-MM-DD") : undefined
      })
      const time = setInterval(async () => {
        const { data: res } = await axios.get(`${config.url}/foreign/xatlov/ordinary-people/excel/state?id=${data.id}`)
        if (res.isFinished) {
          setXlxLoading(false)
          clearInterval(time)
          window.open(`${res.fileUrl}?token=${JSON.parse(token)}`)
          // window.open(`${config.url}/foreign/xatlov/ordinary-people/excel/state?id=${data.id}&download=true&token=${token}`)
        }
      }, 5000)
    } catch {
      setXlxLoading(false)
    }
  }
  return (
    <PerfectScrollbar>
      {isModal && <Passport openModal={isModal} setOpenModal={setIsModal} kadastr={kadastr} pcitizen={pcitizen} address={address} />}
      <div className="d-flex justify-content-start align-items-center mb-1">
        <Input onChange={(e) => setFullname(e.target.value)} className="w-25 mr-1" placeholder={intl.formatMessage({ id: "NtfsSearchName" })} />
        <Input onChange={(e) => setPassportNumber(e.target.value)} className="mr-1" style={{ width: "10%" }} placeholder={intl.formatMessage({ id: "NtfsSearchPassport" })} />
        <RangeDatePicker style={{ margin: "0px 10px" }} format="d.MM.y" calendar={false} clear={false} startDate={startDate} endDate={endDate} setStartDate={setStartDate} setEndDate={setEndDate} />
        <Button onClick={fetchData} className="mx-1" color="primary">
          {intl.formatMessage({ id: "NavSearch" })}
        </Button>
      </div>
      {tableData && (
        <div style={{ display: "flex", justifyContent: "space-between", margin: "0 10px 20px 10px" }}>
          <div>
            <strong>{intl.formatMessage({ id: "TableTotal" })}:</strong> <em>{new Intl.NumberFormat().format(tableData.count)}</em>
          </div>
          {_.map(tableData.stats, (val, key) => (
            <div key={key}>
              <strong>{intl.formatMessage({ id: key })}: </strong>
              <em>{new Intl.NumberFormat().format(val)}</em>
            </div>
          ))}
        </div>
      )}
      {loading ? (
        <Spinner style={{ position: "absolute", top: "50%", left: "50%" }} />
      ) : (
        <Table hover className="table-sm">
          <thead style={{ position: "sticky", top: 0 }}>
            <tr>
              <th style={{ position: "sticky", top: 0 }}>#</th>
              <th style={{ position: "sticky", top: 0 }}>{intl.formatMessage({ id: "InspektorTableName" })}</th>
              <th style={{ position: "sticky", top: 0 }}>{intl.formatMessage({ id: "FuqaroBirthDay" })}</th>
              <th style={{ position: "sticky", top: 0 }}>{intl.formatMessage({ id: "NtfsPassportNumber" })}</th>
              <th style={{ position: "sticky", top: 0 }}>{intl.formatMessage({ id: "NtfsInfoModalAddress" })}</th>
            </tr>
          </thead>
          <tbody style={{ height: 100 }}>
            {tableData.people.map((fuqaro, i) => (
              <tr style={{ backgroundColor: active === fuqaro.pcitizen ? "rgb(115,103,240,0.5)" : "" }} onClick={() => handleRowClick(fuqaro)} key={i}>
                <td>{offset + i + 1}</td>
                <td>{fuqaro.fullname}</td>
                <td>{fuqaro.birthday}</td>
                <td>{fuqaro.passport_raqami}</td>
                <td>{fuqaro.address}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      <div style={{ position: "absolute", bottom: 0, right: 0, display: "flex", width: "100%", justifyContent: "space-between" }}>
        <Button onClick={() => handleExcel()} color="primary">
          {xlxLoading ? <Spinner /> : <Save />}
        </Button>
        <ReactPaginate
          pageCount={tableData ? tableData.count / limit : 0}
          onPageChange={handlePagination}
          nextLabel={""}
          breakLabel={"..."}
          pageRangeDisplayed={5}
          marginPagesDisplayed={2}
          activeClassName={"active"}
          pageClassName={"page-item"}
          previousLabel={""}
          breakClassName="page-item"
          breakLinkClassName="page-link"
          nextLinkClassName={"page-link"}
          nextClassName={"page-item next-item"}
          previousClassName={"page-item prev-item"}
          previousLinkClassName={"page-link"}
          pageLinkClassName={"page-link"}
          containerClassName={"pagination react-paginate no-navigation"}
        />
      </div>
    </PerfectScrollbar>
  )
}

export default injectIntl(OrdinaryPeople)
