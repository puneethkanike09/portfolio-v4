import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Password from '@/models/Password';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { currentPassword, newPassword } = body;

        await dbConnect();

        // Find the password in the database
        let passwordData = await Password.findOne({});

        // If no password is set, create the default one
        if (!passwordData) {
            passwordData = new Password({ password: 'admin123' });
        }

        // Check if the current password matches
        if (passwordData.password !== currentPassword) {
            return NextResponse.json({ error: 'Current password is incorrect' }, { status: 401 });
        }

        // Update the password
        passwordData.password = newPassword;
        passwordData.lastUpdated = new Date();
        await passwordData.save();

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Change password error:', error);
        return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
    }
}