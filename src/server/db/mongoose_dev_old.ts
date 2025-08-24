// import "server-only";

// import mongoose from "mongoose";

// const uri = process.env.MONGODB_URI!;
// //eslint-disable-next-line
// const cached = (global as any).mongoose || { conn: null, promise: null }; // For local Dev! Delete for Prod

// export async function connectMongoose() {
//     //Dev
//     if (cached.conn) return cached.conn;
//     if (!cached.promise) {
//         cached.promise = mongoose.connect(uri, {
//             maxPoolSize: 70,
//             serverSelectionTimeoutMS: 5000,
//         });
//         mongoose.connection.on("error", (err) => console.error("Mongo error:", err));
//     }
//     cached.conn = await cached.promise;
//     //eslint-disable-next-line
//     (global as any).mongoose = cached;
//     return cached.conn;

//     //Prod
//     // if (mongoose.connection.readyState === 1) {
//     //     return;
//     // }
//     // if (mongoose.connection.readyState === 2) {
//     //     return;
//     // }
//     // await mongoose.connect(uri, {
//     //     maxPoolSize: 10,
//     //     serverSelectionTimeoutMS: 5000,
//     // });
// }
