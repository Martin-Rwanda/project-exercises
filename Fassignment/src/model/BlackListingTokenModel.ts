import mongoose, {Schema} from "mongoose";

const BlackListedTokenSchema = new Schema({
    token: {
        type: String,
        required: true
    },
    expiresAt: {
        type: Date,
        required: true
    },
},
{ timestamps: true}
);

BlackListedTokenSchema.index(
    {expiresAt: 1},
    {expireAfterSeconds:0}
);

export const BlackListedToken = mongoose.models.BlackListedToken || mongoose.model('BlackListedToken', BlackListedTokenSchema);