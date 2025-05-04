import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Project from '@/models/Project';

export async function GET() {
    try {
        console.log('GET /api/projects: Connecting to database...');
        await dbConnect();
        console.log('GET /api/projects: Connected to database, finding data...');
        const projectData = await Project.findOne({});
        console.log('GET /api/projects: Query result:', projectData);

        if (!projectData) {
            console.log('GET /api/projects: No data found, returning default data');
            // Return default data if no data exists in DB
            return NextResponse.json({
                sectionTitle: "Featured Projects",
                sectionDescription: "A selection of my most notable web development projects across various technologies and domains.",
                projects: [
                    {
                        id: 1,
                        title: "Portfolio Website",
                        category: "web",
                        image: "/images/projects/project1-main.jpg",
                        images: [
                            "/images/projects/project1-main.jpg",
                            "/images/projects/project1-detail1.jpg",
                            "/images/projects/project1-detail2.jpg"
                        ],
                        description: "A responsive portfolio website built with Next.js and Tailwind CSS, featuring dynamic content management.",
                        tags: ["React", "Next.js", "Tailwind CSS"],
                        websiteUrl: "https://example.com",
                        githubUrl: "https://github.com/username/repo"
                    },
                    {
                        id: 2,
                        title: "E-commerce Platform",
                        category: "web",
                        image: "/images/projects/project2-main.jpg",
                        images: [
                            "/images/projects/project2-main.jpg",
                            "/images/projects/project2-detail1.jpg"
                        ],
                        description: "A full-featured e-commerce platform with product management, cart functionality, and payment integration.",
                        tags: ["MongoDB", "Express", "React", "Node.js"],
                        websiteUrl: "https://example.com/ecommerce",
                        githubUrl: "https://github.com/username/ecommerce"
                    }
                ]
            });
        }

        console.log('GET /api/projects: Returning data from database');
        return NextResponse.json(projectData);
    } catch (error) {
        console.error('GET /api/projects: Error:', error);
        return NextResponse.json({ error: 'Failed to fetch projects data' }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        const body = await request.json();
        await dbConnect();

        const projectData = await Project.findOne({});

        if (projectData) {
            // Update existing record
            projectData.sectionTitle = body.sectionTitle;
            projectData.sectionDescription = body.sectionDescription;
            projectData.projects = body.projects;

            await projectData.save();
            return NextResponse.json(projectData);
        } else {
            // Create new record
            const newProject = new Project(body);
            await newProject.save();
            return NextResponse.json(newProject);
        }
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update projects data' }, { status: 500 });
    }
}