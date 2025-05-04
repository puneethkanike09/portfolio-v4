import mongoose from 'mongoose';

const footerSchema = new mongoose.Schema({
    socialLinks: [{
        platform: String,
        url: String,
        icon: String
    }],
    copyrightText: String
});

export const Footer = mongoose.models.Footer || mongoose.model('Footer', footerSchema);