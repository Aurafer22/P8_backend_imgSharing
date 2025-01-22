const cloudinary = require('cloudinary').v2

const deleteImgCloud = (url) => {
  let urlSplit = url.split('/')
  let folderProyect = urlSplit.at(-3)
  let folderName = urlSplit.at(-2)
  let imgName = urlSplit.at(-1).split('.')[0]
  const public_id = `${folderProyect}/${folderName}/${imgName}`
  cloudinary.uploader.destroy(public_id, (error, result) => {
    if (error) {
      console.log(`Error al borrar la imagen en cloudinary: ${error}`)
    }
    if (result) {
      console.log('La imagen se ha borrado correctamente')
    }
  })
}

module.exports = { deleteImgCloud }
