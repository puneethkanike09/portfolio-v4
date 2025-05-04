import mongoose, { Schema } from 'mongoose';

const ContactSchema = new Schema({
    rotatingTexts: {
        type: [String],
        default: ['Hiring', 'Web Development'],
        required: true,
    },
    formActionUrl: {
        type: String,
        default: 'https://formspree.io/f/mwpejavr',
        required: true,
    },
});

export default mongoose.models.Contact || mongoose.model('Contact', ContactSchema);