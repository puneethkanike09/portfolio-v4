import { NextResponse } from 'next/server';
import { Footer } from '@/models/footer';
import dbConnect from '@/lib/mongodb';


export async function GET() {
    try {
        await dbConnect();
        const footerData = await Footer.findOne({});
        return NextResponse.json(footerData || {
            socialLinks: [],
            copyrightText: ''
        });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch footer data' }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        const body = await request.json();
        await dbConnect();

        const footerData = await Footer.findOne({});

        if (footerData) {
            footerData.socialLinks = body.socialLinks;
            footerData.copyrightText = body.copyrightText;
            await footerData.save();
            return NextResponse.json(footerData);
        } else {
            const newFooter = new Footer(body);
            await newFooter.save();
            return NextResponse.json(newFooter);
        }
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update footer data' }, { status: 500 });
    }
}