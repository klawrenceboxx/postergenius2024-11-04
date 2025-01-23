import mongoose from "mongoose";

interface Connection {
  isConnected: number;
}

const connection: Connection = { isConnected: 0 };

const connectDb = async (): Promise<void> => {
  if (connection.isConnected) {
    console.log("Already connected to the database.");
    return;
  }

  if (mongoose.connections.length > 0) {
    connection.isConnected = mongoose.connections[0].readyState;

    if (connection.isConnected === 1) {
      console.log("Using existing database connection.");
      return;
    }

    await mongoose.disconnect();
  }

  const db = await mongoose.connect(process.env.MONGODB_URL || "");

  connection.isConnected = db.connections[0].readyState;
  console.log("New connection established with the database.");
};

const disconnectDb = async (): Promise<void> => {
  if (process.env.NODE_ENV === "production") {
    if (connection.isConnected) {
      await mongoose.disconnect();
      connection.isConnected = 0;
      console.log("Disconnected from the database.");
    }
  } else {
    console.log("Not disconnecting from the database in development mode.");
  }
};

const db = { connectDb, disconnectDb };
export default db;
