import mongoose from 'mongoose';

const educationSchema = new mongoose.Schema({
    sectionTitle: {
        type: String,
        required: true,
    },
    sectionDescription: {
        type: String,
        required: true,
    },
    education: [{
        icon: {
            type: String,
            required: true,
        },
        degree: {
            type: String,
            required: true,
        },
        institution: {
            type: String,
            required: true,
        },
        year: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        }
    }]
});

const Education = mongoose.models.Education || mongoose.model('Education', educationSchema);

export default Education;