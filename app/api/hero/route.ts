import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Hero from '@/models/Hero';

export async function GET() {
    try {
        console.log('GET /api/hero: Connecting to database...');
        await dbConnect();
        console.log('GET /api/hero: Connected to database, finding data...');
        const heroData = await Hero.findOne({});
        console.log('GET /api/hero: Query result:', heroData);

        if (!heroData) {
            console.log('GET /api/hero: No data found, returning default data');
            // Return default data if no data exists in DB
            return NextResponse.json({
                name: 'Puneeth K',
                mainPhrase: 'I build things for the Web',
                description: 'I specialize in building responsive and dynamic web applications using the MERN stack. I bring ideas to life through code.',
                resumeUrl: '/files/puneethResume.pdf',
                blurAmount: 5,
                borderColor: 'black',
                animationDuration: 2,
                pauseBetweenAnimations: 1
            });
        }

        console.log('GET /api/hero: Returning data from database');
        return NextResponse.json(heroData);
    } catch (error) {
        console.error('GET /api/hero: Error:', error);
        return NextResponse.json({ error: 'Failed to fetch hero data' }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        const body = await request.json();
        await dbConnect();

        const heroData = await Hero.findOne({});

        if (heroData) {
            // Update existing record
            heroData.name = body.name;
            heroData.mainPhrase = body.mainPhrase;
            heroData.description = body.description;
            if (body.resumeUrl) heroData.resumeUrl = body.resumeUrl;
            if (body.blurAmount !== undefined) heroData.blurAmount = body.blurAmount;
            if (body.borderColor) heroData.borderColor = body.borderColor;
            if (body.animationDuration !== undefined) heroData.animationDuration = body.animationDuration;
            if (body.pauseBetweenAnimations !== undefined) heroData.pauseBetweenAnimations = body.pauseBetweenAnimations;

            await heroData.save();
            return NextResponse.json(heroData);
        } else {
            // Create new record
            const newHero = new Hero(body);
            await newHero.save();
            return NextResponse.json(newHero);
        }
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update hero data' }, { status: 500 });
    }
}