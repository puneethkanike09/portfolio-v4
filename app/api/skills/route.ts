import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Skills from '@/models/Skills';


export async function GET() {
    try {
        console.log('GET /api/skills: Connecting to database...');
        await dbConnect();
        console.log('GET /api/skills: Connected to database, finding data...');
        const skillsData = await Skills.findOne({});
        console.log('GET /api/skills: Query result:', skillsData);

        if (!skillsData) {
            console.log('GET /api/skills: No data found, returning default data');
            // Return default data if no data exists in DB
            return NextResponse.json({
                sectionTitle: "My Skills",
                sectionDescription: "With expertise in various web development technologies, I bring a comprehensive approach to every project.",
                skills: [
                    {
                        iconType: "Code",
                        title: "JavaScript (ES6+)",
                        description: "Proficient in modern JavaScript development, including ES6+ features.",
                    },
                    {
                        iconType: "Globe",
                        title: "Next.js",
                        description: "Experienced in building server-side rendered React applications with Next.js.",
                    },
                    {
                        iconType: "Layers",
                        title: "React",
                        description: "Skilled in creating dynamic and interactive user interfaces with React.",
                    },
                    {
                        iconType: "Terminal",
                        title: "Node.js",
                        description: "Experience with server-side development using Node.js.",
                    },
                    {
                        iconType: "FileCode",
                        title: "TypeScript",
                        description: "Proficient in using TypeScript for statically typed JavaScript development.",
                    },
                    {
                        iconType: "Monitor",
                        title: "Angular",
                        description: "Experienced in building robust web applications using the Angular framework.",
                    },
                    {
                        iconType: "Database",
                        title: "MongoDB",
                        description: "Skilled in designing and managing NoSQL databases with MongoDB.",
                    },
                    {
                        iconType: "Palette",
                        title: "Tailwind CSS",
                        description: "Proficient in using Tailwind CSS for utility-first CSS styling.",
                    },
                ]
            });
        }

        console.log('GET /api/skills: Returning data from database');
        return NextResponse.json(skillsData);
    } catch (error) {
        console.error('GET /api/skills: Error:', error);
        return NextResponse.json({ error: 'Failed to fetch skills data' }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        const body = await request.json();
        await dbConnect();

        const skillsData = await Skills.findOne({});

        if (skillsData) {
            // Update existing record
            skillsData.sectionTitle = body.sectionTitle;
            skillsData.sectionDescription = body.sectionDescription;
            skillsData.skills = body.skills;

            await skillsData.save();
            return NextResponse.json(skillsData);
        } else {
            // Create new record
            const newSkills = new Skills(body);
            await newSkills.save();
            return NextResponse.json(newSkills);
        }
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update skills data' }, { status: 500 });
    }
}