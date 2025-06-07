import { NextResponse } from 'next/server';
import { db } from './db';

export const dynamic = 'force-dynamic'; // Ensure dynamic handling

export async function GET() {
  return NextResponse.json(db.posts);
}

export async function POST(request: Request) {
  const { title, content } = await request.json();
  
  if (!title || !content) {
    return new NextResponse('Missing required fields', { status: 400 });
  }
  
  const newPost = { id: db.nextId++, title, content };
  db.posts.push(newPost);
  return NextResponse.json(newPost, { status: 201 });
}