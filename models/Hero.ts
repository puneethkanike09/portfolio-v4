import mongoose, { Schema } from 'mongoose';

const HeroSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    mainPhrase: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    resumeUrl: {
        type: String,
        default: '/files/puneethResume.pdf',
    },
    blurAmount: {
        type: Number,
        default: 5,
    },
    borderColor: {
        type: String,
        default: 'black',
    },
    animationDuration: {
        type: Number,
        default: 2,
    },
    pauseBetweenAnimations: {
        type: Number,
        default: 1,
    },
    projectsButtonText: {
        type: String,
        default: 'View Projects',
    },
    projectsButtonLink: {
        type: String,
        default: '#projects',
    },
    contactButtonText: {
        type: String,
        default: 'Get in Touch',
    },
    contactButtonLink: {
        type: String,
        default: '#contact',
    },
    resumeButtonText: {
        type: String,
        default: 'Resume',
    }
});

export default mongoose.models.Hero || mongoose.model('Hero', HeroSchema);