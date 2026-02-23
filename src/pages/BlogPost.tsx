import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Calendar, Share2, ArrowUpRight } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const postFiles = import.meta.glob('../posts/*.md', { query: '?raw', import: 'default', eager: true });

// Robust frontmatter parser
const parseFrontmatter = (raw: string) => {
  const parts = raw.split('---');
  if (parts.length >= 3) {
    const yaml = parts[1];
    const body = parts.slice(2).join('---').trim();
    const data: Record<string, string> = {};
    
    yaml.split('\n').forEach(line => {
      const [key, ...val] = line.split(':');
      if (key && val.length > 0) {
        data[key.trim()] = val.join(':').trim().replace(/^['"](.*)['"]$/, '$1');
      }
    });
    return { data, content: body };
  }
  return { data: {}, content: raw };
};

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<{ data: any; content: string } | null>(null);

  useEffect(() => {
    try {
      const postPath = `../posts/${slug}.md`;
      const rawModule = postFiles[postPath] as any;
      const rawContent = typeof rawModule === 'string' ? rawModule : rawModule?.default || '';

      if (rawContent) {
        const { data, content } = parseFrontmatter(rawContent);
        setPost({ data, content });
        window.scrollTo(0, 0);
      }
    } catch (err) {
      console.error(`Error loading blog post:`, err);
    }
  }, [slug]);

  if (!post) return <div className="pt-40 text-center opacity-20 uppercase font-black tracking-widest">Post Not Found</div>;

  return (
    <div className="pt-40 pb-40 px-6 max-w-4xl mx-auto relative z-10">
      <Link to="/blog" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest opacity-40 hover:opacity-100 hover:text-accent transition-all mb-16">
        <ArrowLeft size={14} /> Back to Journal
      </Link>

      <header className="mb-20 space-y-8">
        <div className="flex items-center gap-6 text-[10px] font-black uppercase tracking-[0.3em] opacity-40">
          <div className="flex items-center gap-2 text-accent"><Calendar size={12} /> {post.data.date}</div>
          <div className="flex items-center gap-2"><Clock size={12} /> 5 Min Read</div>
        </div>
        <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-[0.9]">{post.data.title}</h1>
        {post.data.thumbnail && (
          <div className="aspect-[21/9] rounded-[3rem] overflow-hidden border border-zinc-500/10 shadow-2xl mt-12">
            <img src={post.data.thumbnail} alt={post.data.title} className="w-full h-full object-cover" />
          </div>
        )}
      </header>

      <article className="prose prose-zinc dark:prose-invert prose-lg max-w-none 
        prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tighter prose-headings:text-zinc-900 dark:prose-headings:text-white
        prose-p:text-zinc-500 dark:prose-p:text-zinc-400 prose-p:leading-[1.8] prose-p:font-light prose-p:my-10
        prose-strong:text-accent prose-strong:font-black
        prose-ul:list-disc dark:prose-ul:marker:text-accent prose-ul:marker:text-accent prose-ul:pl-6
        prose-ol:list-decimal dark:prose-ol:marker:text-accent prose-ol:marker:text-accent prose-ol:pl-6
        prose-li:text-zinc-500 dark:prose-li:text-zinc-400 prose-li:my-3
        prose-table:border-collapse prose-table:w-full prose-table:my-12 prose-table:border prose-table:border-zinc-500/20
        prose-th:border prose-th:border-zinc-500/20 prose-th:p-4 prose-th:bg-accent/5 prose-th:text-accent prose-th:font-black prose-th:uppercase prose-th:text-xs
        prose-td:border prose-td:border-zinc-500/20 prose-td:p-4 prose-td:text-sm
        prose-img:rounded-[2.5rem] prose-img:border prose-img:border-zinc-500/10 prose-img:shadow-2xl prose-img:mx-auto prose-img:my-20
        prose-code:text-accent prose-code:bg-accent/5 prose-code:px-2 prose-code:py-0.5 prose-code:rounded-lg prose-code:before:content-none prose-code:after:content-none
        prose-a:text-accent prose-a:no-underline hover:prose-a:underline
      ">
        <ReactMarkdown 
          remarkPlugins={[remarkGfm]}
          components={{
            a: ({ node, ...props }) => {
              if (props.href?.startsWith('btn:')) {
                return <a href={props.href.replace('btn:', '')} target="_blank" className="inline-flex items-center gap-3 px-8 py-4 bg-accent text-white rounded-2xl font-black text-xs uppercase tracking-[0.3em] no-underline hover:scale-105 transition-all my-8">{props.children} <ArrowUpRight size={16} /></a>;
              }
              return <a className="text-accent underline underline-offset-4 font-bold" {...props} />;
            }
          }}
        >
          {post.content}
        </ReactMarkdown>
      </article>

      <footer className="mt-32 pt-12 border-t border-zinc-500/10 flex justify-between items-center">
        <div className="text-[10px] font-black uppercase tracking-widest opacity-40">
          Sharing is caring //
        </div>
        <div className="flex gap-8">
          <button className="text-[10px] font-black uppercase tracking-widest hover:text-accent transition-all">Twitter</button>
          <button className="text-[10px] font-black uppercase tracking-widest hover:text-accent transition-all">LinkedIn</button>
        </div>
      </footer>
    </div>
  );
};

export default BlogPost;
