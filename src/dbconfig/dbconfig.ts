import mongoose from "mongoose";

export async function connect() {
    try {
        mongoose.connect(process.env.MONGO_URI!);
        const connection = mongoose.connection;
        connection.on("connected", () => {
            console.log("MongoDB Connected Successfully");
        });
        connection.on("error", (err) => {
            console.log("Error while connecting to MongoDB. Please Make sure", err);
            process.exit();
        });
    } catch (e) {
        console.log("Something Went Wrong");
        console.log(e);
    }
}