import React, { useState } from "react"
import { DragDrop } from "@uppy/react"
import Uppy from "@uppy/core"
import thumbnailGenerator from "@uppy/thumbnail-generator"

const ImageUpload = () => {
  const [img, setImg] = useState(null)
  const [prevImg, setPrevImg] = useState(null)

  const uppy = new Uppy({
    meta: { type: "avatar" },
    restrictions: { maxNumberOfFiles: 1 },
    autoProceed: true
  })

  uppy.use(thumbnailGenerator)
  uppy.on("thumbnail:generated", (file, preview) => {
    setPrevImg(preview)
  })
  uppy.on("file-added", function (file) {
    const reader = new FileReader()
    reader.readAsDataURL(file.data)
    reader.onloadend = function () {
      const base64data = reader.result
      setImg(base64data)
    }
  })
  return (
    <>
      {img !== null ? (
        <div className="mx-2 mt-2 mb-2" style={{ overflow: "hidden", marginBottom: "1em" }}>
          <img className="rounded" src={prevImg} alt="avatar" style={{ width: "100%" }} />
        </div>
      ) : (
        <div className="mb-2 mx-2">
          <span style={{ fontSize: 20, display: "flex" }} className="text-danger pt-1"></span>
          <DragDrop
            // note={intl.formatMessage({ id: "SetUserPhotoNote" })}
            restrictions={{
              allowedFileType: [
                // ".geojson",
                // ".kmz",
                // ".kml",
                // ".shp",
                // ".shx",
                // ".dbf",
                "application/zip"
              ]
            }}
            locale={{
              strings: {
                // browse: `<p>${"Hello"}</p>`,
                // dropHereOr: "user_photoInfo",
              }
            }}
            uppy={uppy}
          />
        </div>
      )}
    </>
  )
}

export default ImageUpload
