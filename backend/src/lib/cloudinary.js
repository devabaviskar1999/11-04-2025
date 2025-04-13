import {v2 as cloudinary} from "cloudinary"
import {config} from "dotenv"

config();  //! why we configured it here because we can use cloudinary anywhere in our project like it has seperate dotenv file config , no need to depend on index.js file where we have configured the dotenv file and all

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})


export {cloudinary} 

