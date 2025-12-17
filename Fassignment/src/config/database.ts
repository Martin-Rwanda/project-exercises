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