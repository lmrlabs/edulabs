import mongoose from 'mongoose';

const connection: { isConnected?: number } = {};

export const dbConnect = async () => {
  if (connection.isConnected) {
    return;
  }

  const db = await mongoose.connect(process.env.MONGOACCESSKEY as string);


  connection.isConnected = db.connections[0].readyState;
};
