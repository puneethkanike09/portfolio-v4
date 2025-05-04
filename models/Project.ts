import mongoose, { Schema } from 'mongoose';

const ProjectSchema = new Schema({
    sectionTitle: {
        type: String,
        required: true,
    },
    sectionDescription: {
        type: String,
        required: true,
    },
    projects: [{
        id: {
            type: Number,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        images: {
            type: [String],
            default: [],
        },
        description: {
            type: String,
            required: true,
        },
        tags: {
            type: [String],
            default: [],
        },
        websiteUrl: {
            type: String,
            default: '',
        },
        githubUrl: {
            type: String,
            default: '',
        },
    }],
});

export default mongoose.models.Project || mongoose.model('Project', ProjectSchema);