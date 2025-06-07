import { NextRequest, NextResponse } from 'next/server';
import { db } from '../db';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id: idParam } = await params;
  const id = parseInt(idParam);
  const post = db.posts.find(p => p.id === id);
  
  if (!post) {
    return new NextResponse('Post not found', { status: 404 });
  }
  
  return NextResponse.json(post);
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id: idParam } = await params;
  const id = parseInt(idParam);
  const { title, content } = await request.json();
  const index = db.posts.findIndex(p => p.id === id);
  
  if (index === -1) {
    return new NextResponse('Post not found', { status: 404 });
  }
  
  if (!title || !content) {
    return new NextResponse('Missing required fields', { status: 400 });
  }
  
  db.posts[index] = { ...db.posts[index], title, content };
  return NextResponse.json(db.posts[index]);
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id: idParam } = await params;
  const id = parseInt(idParam);
  const initialLength = db.posts.length;
  db.posts = db.posts.filter(p => p.id !== id);
  
  if (db.posts.length === initialLength) {
    return new NextResponse('Post not found', { status: 404 });
  }
  
  return new NextResponse(null, { status: 204 });
}