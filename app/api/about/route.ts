import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import About from '@/models/About';

export async function GET() {
    try {
        console.log('GET /api/about: Connecting to database...');
        await dbConnect();
        console.log('GET /api/about: Connected to database, finding data...');
        const aboutData = await About.findOne({});
        console.log('GET /api/about: Query result:', aboutData);

        if (!aboutData) {
            console.log('GET /api/about: No data found, returning default data');
            // Return default data if no data exists in DB
            return NextResponse.json({
                name: 'Puneeth K',
                description: 'My approach is rooted in creating intuitive, responsive designs that not only look stunning but also perform flawlessly across all devices. I thrive on the challenge of turning complex problems into elegant, user-centric solutions. Whether it is building a sleek new website from scratch or enhancing an existing application with innovative features, I collaborate closely with clients to transform their vision into reality.',
                location: 'Guruvayanakere, Belthangadi',
                email: 'reachout.puneeth@gmail.com',
                experience: '0.3 Years',
                imageUrl: '/images/about/about.png'
            });
        }

        console.log('GET /api/about: Returning data from database');
        return NextResponse.json(aboutData);
    } catch (error) {
        console.error('GET /api/about: Error:', error);
        return NextResponse.json({ error: 'Failed to fetch about data' }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        const body = await request.json();
        await dbConnect();

        const aboutData = await About.findOne({});

        if (aboutData) {
            // Update existing record
            aboutData.name = body.name;
            aboutData.description = body.description;
            aboutData.location = body.location;
            aboutData.email = body.email;
            aboutData.experience = body.experience;
            if (body.imageUrl) aboutData.imageUrl = body.imageUrl;

            await aboutData.save();
            return NextResponse.json(aboutData);
        } else {
            // Create new record
            const newAbout = new About(body);
            await newAbout.save();
            return NextResponse.json(newAbout);
        }
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update about data' }, { status: 500 });
    }
}