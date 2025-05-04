import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import dbConnect from '@/lib/mongodb';
import Password from '@/models/Password';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { password } = body;

        await dbConnect();

        // Find the password in the database
        const passwordData = await Password.findOne({});

        // If no password is set, create the default one
        if (!passwordData) {
            const newPassword = new Password({ password: 'admin123' });
            await newPassword.save();

            // Check if the provided password matches the default
            if (password === 'admin123') {
                const cookieStore = await cookies();
                cookieStore.set('admin_authenticated', 'true', {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    maxAge: 60 * 60 * 24, // 1 day
                    path: '/',
                });

                return NextResponse.json({ success: true });
            }
        } else {
            // Check if the provided password matches the stored one
            if (password === passwordData.password) {
                const cookieStore = await cookies();
                cookieStore.set('admin_authenticated', 'true', {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    maxAge: 60 * 60 * 24, // 1 day
                    path: '/',
                });

                return NextResponse.json({ success: true });
            }
        }

        return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
    }
}