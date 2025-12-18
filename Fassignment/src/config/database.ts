import mongoose from "mongoose";

export const databaseConnection = async (): Promise<void> => {
    try {
        const mongoUri = process.env.DATABASE_URI_LOCAL;
        if(!mongoUri) {
            throw new Error('MONGO is not defined in .env');
        }
        await mongoose.connect(mongoUri);
        console.log('MongoDB connected successfullys')
    } catch (error) {
        console.error('MongoDb connection failed', error);
        process.exit(1)
    }
}

// export const databaseconnection = async () => {
//   var db_url: NonNullable<string> = process.env.DATABASE_URL as string;
//   const db_username: NonNullable<string> = process.env
//     .DATABASE_USERNAME as string;
//   const db_password: NonNullable<string> = process.env
//     .DATABASE_PASSWORD as string;

//   try {
//     db_url = db_url
//       .replace("<db_username>", db_username)
//       .replace("<db_password>", db_password);
//     await mongoose
//       .connect(db_url, {})
//       .then((value) => {
//         console.log(`Our Database is Running`);
//       })
//       .catch((err) => console.log(err));
//   } catch (error) {
//     return error;
//   }
// };