import { notFound } from 'next/navigation';
import { Post } from '@/app/types';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

async function getPost(id: string): Promise<Post> {
  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : 'http://localhost:3000';

  const res = await fetch(`${baseUrl}/api/posts/${id}`);
  if (!res.ok) {
    if (res.status === 404) notFound();
    throw new Error('Failed to fetch post');
  }
  return res.json();
}

export default async function PostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await getPost(id);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex justify-between items-start mb-6">
        <h1 className="text-3xl font-bold">{post.title}</h1>
        <div className="space-x-2">
          <a
            href={`/posts/${post.id}/edit`}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Edit
          </a>
        </div>
      </div>

      <div className="prose max-w-none">
        <p className="text-gray-600 mb-4">
          {new Date(post.createdAt || Date.now()).toLocaleDateString()}
        </p>
        <p>{post.content}</p>
      </div>
    </div>
  );
}