import mongoose, { Schema } from 'mongoose';

const PasswordSchema = new Schema({
    password: {
        type: String,
        required: true,
        default: 'admin123' // Default password
    },
    lastUpdated: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.models.Password || mongoose.model('Password', PasswordSchema);