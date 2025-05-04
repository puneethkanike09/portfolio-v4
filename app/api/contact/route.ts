import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Contact from '@/models/Contact';

export async function GET() {
    try {
        console.log('GET /api/contact: Connecting to database...');
        await dbConnect();
        console.log('GET /api/contact: Connected to database, finding data...');
        const contactData = await Contact.findOne({});
        console.log('GET /api/contact: Query result:', contactData);

        if (!contactData) {
            console.log('GET /api/contact: No data found, returning default data');
            return NextResponse.json({
                rotatingTexts: ['Hiring', 'Web Development'],
                formActionUrl: 'https://formspree.io/f/mwpejavr',
            });
        }

        console.log('GET /api/contact: Returning data from database');
        return NextResponse.json(contactData);
    } catch (error) {
        console.error('GET /api/contact: Error:', error);
        return NextResponse.json({ error: 'Failed to fetch contact data' }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        const body = await request.json();
        await dbConnect();

        const contactData = await Contact.findOne({});

        if (contactData) {
            // Update existing record
            contactData.rotatingTexts = body.rotatingTexts || contactData.rotatingTexts;
            contactData.formActionUrl = body.formActionUrl || contactData.formActionUrl;
            await contactData.save();
            return NextResponse.json(contactData);
        } else {
            // Create new record
            const newContact = new Contact(body);
            await newContact.save();
            return NextResponse.json(newContact);
        }
    } catch (error) {
        console.error('PUT /api/contact: Error:', error);
        return NextResponse.json({ error: 'Failed to update contact data' }, { status: 500 });
    }
}