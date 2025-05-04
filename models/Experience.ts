import mongoose, { Schema } from 'mongoose';

const ExperienceItemSchema = new Schema({
    period: String,
    title: String,
    company: String,
    description: String,
    tags: [String],
});

const ExperienceSchema = new Schema({
    sectionTitle: String,
    sectionDescription: String,
    experiences: [ExperienceItemSchema],
});

export default mongoose.models.Experience || mongoose.model('Experience', ExperienceSchema);