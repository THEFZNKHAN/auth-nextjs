import mongoose from "mongoose";

export const connect = async () => {
    try {
        mongoose.connect(process.env.MONGO_URI!);
        const connection = mongoose.connection;

        connection.on("connected", () => {
            console.log("MongoDB connected successfully");
        });

        connection.on("error", (err) => {
            console.log(
                "MongoDb connection error. Please make sure MongoDb is running" +
                    err
            );
            process.exit();
        });
    } catch (error) {
        console.log("Something went wrong");
        console.log(error);
    }
};
