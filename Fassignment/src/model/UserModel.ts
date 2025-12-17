import mongoose, {Schema} from "mongoose";
import { UserInterface } from "../types";

const userSchema: Schema<UserInterface> = new Schema ({
    name: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true
    },
    age: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        required: true,
        enum: ['male', 'female']
    },
    isActive: {
        type: Boolean,
        required: true
    },
    role: {
        type: String,
        required: true,
        enum: ['admin', 'student'],
        default: 'student'
    },
    password: {
        type: String,
        required: true
    }
},
{timestamps: true}
);

export const UserModel = mongoose.models.User || mongoose.model<UserInterface>('User', userSchema);