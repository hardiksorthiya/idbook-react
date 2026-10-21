import { useEffect, useState } from 'react';
import '../../../assets/css/Blog/Blog.css';
import BlogCard from '../../Common/BlogCard';
import Fallback from '../../../assets/images/step1.webp';
import { getBlogs } from '../../../../services/blog';
import type { BlogItem, BlogMeta } from '../../../../types/blog';

const toCard = (item: BlogItem) => ({
  id: item.id,
  image: item.image_url || Fallback,
  category: item.tags?.[0] || 'Blog',
  date: item.published_at,
  title: item.title,
  description: item.summary,
  link: `/blog/${item.slug}`,
  author: item.author,
});

const BlogGrid = () => {
  const [posts, setPosts] = useState<ReturnType<typeof toCard>[]>([]);
  const [meta, setMeta] = useState<BlogMeta | null>(null);
  const [page, setPage] = useState(1);
  const [note, setNote] = useState('Loading...');

  useEffect(() => {
    let stop = false;
    setNote('Loading...');

    getBlogs(page, 9)
      .then(({ items, meta: nextMeta }) => {
        if (stop) return;
        setPosts(items.map(toCard));
        setMeta(nextMeta || null);
        setNote(items.length ? '' : 'No stories yet.');
      })
      .catch((error) => {
        if (stop) return;
        setPosts([]);
        setNote(error instanceof Error ? error.message : 'Could not load stories.');
      });

    return () => {
      stop = true;
    };
  }, [page]);

  return (
    <section className="sorath-blog-page">
      <div className="container-fluid sorath-container-fluid">
        {note ? <p className="text-center">{note}</p> : null}

        <div className="row gy-5">
          {posts.map((post) => (
            <div className="col-lg-4 col-md-6" key={post.id}>
              <BlogCard {...post} />
            </div>
          ))}
        </div>

        {meta && meta.last_page > 1 && (
          <div className="d-flex justify-content-center gap-3 mt-5">
            <button type="button" disabled={page <= 1} onClick={() => setPage(page - 1)}>
              Previous
            </button>
            <span>{page} / {meta.last_page}</span>
            <button type="button" disabled={page >= meta.last_page} onClick={() => setPage(page + 1)}>
              Next
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogGrid;
