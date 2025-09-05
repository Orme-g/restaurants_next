import "server-only";

//Development
import mongoose, { Mongoose } from "mongoose";
const uri = process.env.MONGODB_URI!;
if (!uri) {
    throw new Error("MONGODB_URI not found in env");
}
interface MongooseCache {
    conn: Mongoose | null;
    promise: Promise<Mongoose> | null;
}
// eslint-disable-next-line
let cached: MongooseCache = (global as any).mongoose;
if (!cached) {
    // eslint-disable-next-line
    cached = (global as any).mongoose = { conn: null, promise: null };
}

export async function connectMongoose() {
    if (cached.conn) {
        return cached.conn;
    }
    if (!cached.promise) {
        cached.promise = mongoose
            .connect(uri, {
                maxPoolSize: 10,
                serverSelectionTimeoutMS: 3000,
            })
            .then((mong) => {
                console.log("MongoDB connected in dev mode");
                return mong;
            })
            .catch((error) => {
                console.log("Connection error", error);
                throw error;
            });
    }
    cached.conn = await cached.promise;
    return cached.conn;
}

// Production

// import mongoose from "mongoose";
// const uri = process.env.MONGODB_URI!;
// if (!uri) {
//     throw new Error("MONGODB_URI not found in env");
// }
// let isConnected = false;
// export async function connectMongoose() {
//     if (isConnected) return mongoose.connection;
//     try {
//         await mongoose.connect(uri, {
//             maxPoolSize: 100,
//             minPoolSize: 10,
//             maxIdleTimeMS: 30000,
//             serverSelectionTimeoutMS: 5000,
//             socketTimeoutMS: 30000,
//             retryWrites: true,
//         });
//         isConnected = true;
//         console.log("MongoDB successfully connected");

//         mongoose.connection.on("error", (error) => {
//             console.error("Mongoose connection error:", error);
//         });
//         mongoose.connection.on("disconnected", () => {
//             console.warn("MongoDB disconnected. Reconnectiong...");
//             attemptReconnect();
//         });
//         mongoose.connection.on("reconnected", () => {
//             console.log("MongoDB reconnected");
//         });
//         return mongoose.connection;
//     } catch (error) {
//         console.error("MongoDB connection failed");
//         if (error instanceof Error) {
//             throw new Error(error.message);
//         }
//     }
// }
// // Reconnection
// let reconnectAttempts = 0;
// const maxReconnects = 10;
// const reconnectDelay = 10000;
// async function attemptReconnect() {
//     if (reconnectAttempts >= maxReconnects) {
//         console.error("Max reconnect attempts reached. Cannot connect to Database");
//         process.exit(1);
//     }
//     reconnectAttempts++;
//     console.log(`Reconnection attempt ${reconnectAttempts} from ${maxReconnects}`);
//     setTimeout(async () => {
//         try {
//             await connectMongoose();
//             reconnectAttempts = 0;
//         } catch (error) {
//             console.error("Reconnection failed:", error);
//             attemptReconnect();
//         }
//     }, reconnectDelay);
// }
