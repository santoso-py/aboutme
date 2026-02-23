import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight, Clock } from 'lucide-react';

// This is a browser-compatible way to load all markdown files in Vite
const postFiles = import.meta.glob('../posts/*.md', { query: '?raw', import: 'default', eager: true });

interface Post {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  thumbnail: string;
}

// Browser-safe custom frontmatter parser
const parseFrontmatter = (content: string) => {
  const match = content.match(/^---\r?\n([\s\S]+?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) return { data: {}, content };
  
  const yaml = match[1];
  const body = match[2];
  const data: Record<string, string> = {};
  
  yaml.split('\n').forEach(line => {
    const [key, ...val] = line.split(':');
    if (key && val) {
      data[key.trim()] = val.join(':').trim().replace(/^['"](.*)['"]$/, '$1');
    }
  });
  
  return { data, content: body };
};

const BlogList: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    try {
      const loadedPosts = Object.keys(postFiles).map((path) => {
        try {
          const rawModule = postFiles[path] as any;
          const rawString = typeof rawModule === 'string' ? rawModule : rawModule.default || '';
          
          const { data } = parseFrontmatter(rawString);
          const slug = path.split('/').pop()?.replace('.md', '') || '';
          
          return {
            slug,
            title: data.title || 'Untitled Post',
            date: data.date || 'No Date',
            excerpt: data.excerpt || 'No excerpt available...',
            thumbnail: data.thumbnail || ''
          };
        } catch (err) {
          console.error(`Error parsing markdown at ${path}:`, err);
          return null;
        }
      }).filter(post => post !== null) as Post[];

      setPosts(loadedPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
    } catch (globalErr) {
      console.error("Global blog loading error:", globalErr);
    }
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="pt-40 max-w-5xl mx-auto px-6 pb-40"
    >
      <div className="mb-24">
        <span className="text-[10px] font-black uppercase tracking-[0.6em] text-accent mb-4 block">Journal</span>
        <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none">
          Vibe <br/> Insights.
        </h2>
      </div>

      <div className="space-y-1">
        {posts.map((post, i) => (
          <Link 
            key={post.slug} 
            to={`/blog/${post.slug}`}
            className="group block border-b border-zinc-500/10 py-12 hover:border-accent transition-all relative overflow-hidden"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 relative z-10">
              <div className="space-y-4 max-w-2xl">
                <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest opacity-40">
                  <span className="text-accent">{post.date}</span>
                  <div className="w-1 h-1 rounded-full bg-zinc-500" />
                  <div className="flex items-center gap-1"><Clock size={10} /> 5 min read</div>
                </div>
                <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tighter group-hover:italic transition-all duration-700">
                  {post.title}
                </h3>
                <p className="text-zinc-500 text-lg font-light line-clamp-2">
                  {post.excerpt}
                </p>
              </div>
              <ArrowRight size={48} className="opacity-10 group-hover:opacity-100 group-hover:text-accent transition-all transform group-hover:translate-x-4" />
            </div>
            
            {/* Hover Background Image (Subtle) */}
            <div 
              className="absolute top-0 right-0 w-64 h-full opacity-0 group-hover:opacity-[0.03] transition-opacity pointer-events-none bg-cover bg-center"
              style={{ backgroundImage: `url(${post.thumbnail})` }}
            />
          </Link>
        ))}
      </div>
    </motion.div>
  );
};

export default BlogList;
