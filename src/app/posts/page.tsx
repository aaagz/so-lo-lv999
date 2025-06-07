import Link from 'next/link';
import { Post } from '@/app/types';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

async function getPosts(): Promise<Post[]> {
  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : 'http://localhost:3000';

  const res = await fetch(`${baseUrl}/api/posts`);
  if (!res.ok) throw new Error('Failed to fetch posts');
  return res.json();
}

export default async function PostsPage() {
  const posts = await getPosts();

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Posts</h1>
        <Link href="/posts/new" className="bg-blue-500 text-white px-4 py-2 rounded">
          New Post
        </Link>
      </div>

      <ul className="space-y-4">
        {posts.map((post) => (
          <li key={post.id} className="border-b pb-4">
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p className="text-gray-600 mt-2">{post.content.slice(0, 100)}...</p>
            <div className="mt-2 space-x-2">
              <Link href={`/posts/${post.id}`} className="text-blue-500 hover:underline">
                View
              </Link>
              <Link href={`/posts/${post.id}/edit`} className="text-green-500 hover:underline">
                Edit
              </Link>
              <button className="text-red-500 hover:underline">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}