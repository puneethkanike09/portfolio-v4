import mongoose from 'mongoose';

const AboutSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    experience: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
        default: '/images/about/about.png'
    }
});

export default mongoose.models.About || mongoose.model('About', AboutSchema);