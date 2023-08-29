import mongoose from "mongoose";

let isConnected = false;

export const connectToDb = async () => {
    mongoose.set('strictQuery', true);
    if (isConnected){
        console.log('mongodb already connected')
        return
    }
    try {
        await mongoose.connect(process.env.MONGODB_URI, {dbname: "share_prompt", useNewUrlParser: true, useUnifiedTopology: true})
        isConnected = true
        console.log('mongodb is connected')
    } catch (error) {
        console.log('mongodb connection error ', error)
    }
}






