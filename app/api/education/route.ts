import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Education from '@/models/Education';

export async function GET() {
    try {
        console.log('GET /api/education: Connecting to database...');
        await dbConnect();
        console.log('GET /api/education: Connected to database, finding data...');
        const educationData = await Education.findOne({});
        console.log('GET /api/education: Query result:', educationData);

        if (!educationData) {
            console.log('GET /api/education: No data found, returning default data');
            return NextResponse.json({
                sectionTitle: "Education",
                sectionDescription: "My academic background in computer applications.",
                education: [
                    {
                        icon: "GraduationCap",
                        degree: "MCA (Master of Computer Applications)",
                        institution: "St Joseph Engineering College, Mangaluru",
                        year: "Feb 2023 - Aug 2024",
                        description: "Specialized in advanced computer applications with a CGPA of 8.57."
                    },
                    {
                        icon: "GraduationCap",
                        degree: "BCA (Bachelor of Computer Applications)",
                        institution: "SDM Degree College, Ujire",
                        year: "Jan 2020 - Sep 2022",
                        description: "Foundation in computer applications with a CGPA of 7.15."
                    }
                ]
            });
        }

        console.log('GET /api/education: Returning data from database');
        return NextResponse.json(educationData);
    } catch (error) {
        console.error('GET /api/education: Error:', error);
        return NextResponse.json({ error: 'Failed to fetch education data' }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        const body = await request.json();
        await dbConnect();

        const educationData = await Education.findOne({});

        if (educationData) {
            // Update existing record
            educationData.sectionTitle = body.sectionTitle;
            educationData.sectionDescription = body.sectionDescription;
            educationData.education = body.education;

            await educationData.save();
            return NextResponse.json(educationData);
        } else {
            // Create new record
            const newEducation = new Education(body);
            await newEducation.save();
            return NextResponse.json(newEducation);
        }
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update education data' }, { status: 500 });
    }
}