import { Request } from 'express'
const multer = require('multer')
const storage = multer.diskStorage({
  destination: function (req: Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) {
    cb(null, '../../images/')
  },
  filename: function (req: Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) {
    cb(null, Date.now() + file.originalname)
  }
})

const fileFilter = (req: Request, file: Express.Multer.File, cb: (error: Error | null, extension: boolean) => void) => {
    if((file.mimetype).includes('jpeg') || (file.mimetype).includes('png') || (file.mimetype).includes('jpg')){
        cb(null, true);
    } else{
        cb(null, false);
    }

}

const upload = multer({
  storage: storage,
  limits: {
      fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter,
})

export default upload;