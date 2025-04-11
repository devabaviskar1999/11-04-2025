import mongoose from "mongoose";

export const MongoConnection = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Mongodb connected: ${connection.connection.host}`);
  } catch (error) {
    console.log("Error : Mongodb Connection error");
  }
};
