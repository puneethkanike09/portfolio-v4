import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Experience from '@/models/Experience';

export async function GET() {
    try {
        console.log('GET /api/experience: Connecting to database...');
        await dbConnect();
        console.log('GET /api/experience: Connected to database, finding data...');
        const experienceData = await Experience.findOne({});
        console.log('GET /api/experience: Query result:', experienceData);

        if (!experienceData) {
            console.log('GET /api/experience: No data found, returning default data');
            // Return default data if no data exists in DB
            return NextResponse.json({
                sectionTitle: "Professional Experience",
                sectionDescription: "My career journey in the world of web development.",
                experiences: [
                    {
                        period: "Jan 2025 - Present",
                        title: "Software Engineer",
                        company: "The Web People",
                        description:
                            "Developing and maintaining web applications using modern technologies. Collaborating with cross-functional teams to deliver high-quality products.",
                        tags: ["Web Development", "Team Collaboration", "Project Management"],
                    },
                    {
                        period: "Jun 2024 - Aug 2024",
                        title: "MERN Developer Intern",
                        company: "Codelab Systems",
                        description:
                            "Assisted in developing full-stack applications using the MERN stack. Contributed to code reviews and participated in agile development processes.",
                        tags: ["MERN Stack", "Full-Stack Development", "Agile Methodologies"],
                    },
                    {
                        period: "May 2024 - Jun 2024",
                        title: "React Developer Intern",
                        company: "RDL Technologies",
                        description:
                            "Worked on building user interfaces using React.js. Collaborated with designers to implement responsive and interactive web components.",
                        tags: ["React.js", "UI Development", "Responsive Design"],
                    },
                ]
            });
        }

        console.log('GET /api/experience: Returning data from database');
        return NextResponse.json(experienceData);
    } catch (error) {
        console.error('GET /api/experience: Error:', error);
        return NextResponse.json({ error: 'Failed to fetch experience data' }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        const body = await request.json();
        await dbConnect();

        const experienceData = await Experience.findOne({});

        if (experienceData) {
            // Update existing record
            experienceData.sectionTitle = body.sectionTitle;
            experienceData.sectionDescription = body.sectionDescription;
            experienceData.experiences = body.experiences;

            await experienceData.save();
            return NextResponse.json(experienceData);
        } else {
            // Create new record
            const newExperience = new Experience(body);
            await newExperience.save();
            return NextResponse.json(newExperience);
        }
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update experience data' }, { status: 500 });
    }
}