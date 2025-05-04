import mongoose, { Schema } from 'mongoose';

const SkillSchema = new Schema({
    iconType: String,
    title: String,
    description: String,
});

const SkillsSchema = new Schema({
    sectionTitle: String,
    sectionDescription: String,
    skills: [SkillSchema],
});

export default mongoose.models.Skills || mongoose.model('Skills', SkillsSchema);