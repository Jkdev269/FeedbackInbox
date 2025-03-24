// Purpose: Connect to the MongoDB database using mongoose.
import mongoose from "mongoose";
type ConnectionObject={
    isConnected?:number;
}
const connection:ConnectionObject={};
async function dbConnect():Promise<void>{
    if(connection.isConnected){
        return;
    }
    try {
        const db=await mongoose.connect(process.env.MONGODB_URI as string)
        connection.isConnected=db.connections[0].readyState;
        console.log("Connected to database");
    } catch (error) {
        console.log("Error connecting to database",error);
        process.exit(1);
    }
}
export default dbConnect;