// multerMiddleware.ts
// import { Request } from 'express';
// import multer from 'multer';
// import { v2 as cloudinary } from 'cloudinary';
// import config from "~/config";
// // Configure Multer storage
// const storage = multer.memoryStorage();
// const upload = multer({ storage });
// // Upload middleware
// export const uploadMiddleware = upload.single('image');
// // Cloudinary configuration
// cloudinary.config({
//     cloud_name: config.cloudinary_name,
//     api_key: config.cloudinary_api_key,
//     api_secret: config.cloudinary_api_secret,
// });
// // Helper function to upload image to Cloudinary
// export const uploadToCloudinary = (file: Express.Multer.File) => {
//     return new Promise<string>((resolve, reject) => {
//         cloudinary.uploader.upload_stream(
//             { folder: 'kitalefilmweek' },
//             (error, result) => {
//                 if (result) {
//                     resolve(result.secure_url);
//                 } else {
//                     reject(error);
//                 }
//             }
//         ).end(file.buffer);
//     });
// };
//# sourceMappingURL=multer.middleware.js.map