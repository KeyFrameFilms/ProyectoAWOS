import multer from 'multer'
import path from 'path'
import { generateID } from '../lib/tokens.js'

// const storage = multer.diskStorage({
//     destination: function(req, file, cb){
//         cb(null, './src/public/img/uploads')
//     },
//     filename:function(req, file, cb){
//         cb(null,generateID()+path.extname(
//             file.originalname
//             ))
//     }
// })  

// const upload = multer({
//     storage
// })

// export default upload

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log('File Destination:', path.resolve('./src/public/img/uploads'));
        cb(null, './src/public/img/uploads');
    },
    filename: function (req, file, cb) {
        const fileName = generateID() + path.extname(file.originalname);
        console.log('File Name:', fileName);
        cb(null, fileName);
    },
});

const upload = multer({
    storage,
});

export default upload;
