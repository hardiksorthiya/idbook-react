import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Breadcrumb from '../Common/Breadcrumb';
import DesignFloatButton from '../Common/DesignFloatButton';
import BlogCard from '../Common/BlogCard';
import Breadcrumbimage from '../../assets/images/page-header-bg.png';
import Fallback from '../../assets/images/step1.webp';
import '../../assets/css/Blog/Blog.css';
import { getBlog } from '../../../services/blog';
import type { BlogDetail as BlogDetailType, BlogItem } from '../../../types/blog';

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

const BlogDetail = () => {
  const { slug } = useParams();
  const [post, setPost] = useState<BlogDetailType | null>(null);
  const [note, setNote] = useState('');

  useEffect(() => {
    if (!slug) {
      setPost(null);
      setNote('Open a story from the blog.');
      return;
    }

    let stop = false;
    setNote('Loading...');

    getBlog(slug)
      .then((item) => {
        if (stop) return;
        setPost(item);
        setNote('');
      })
      .catch((error) => {
        if (stop) return;
        setPost(null);
        setNote(error instanceof Error ? error.message : 'Could not load this story.');
      });

    return () => {
      stop = true;
    };
  }, [slug]);

  const related = (post?.related_posts || []).map(toCard);

  return (
    <>
      <Header />
      <Breadcrumb title={post?.title || 'Blog Details'} background={Breadcrumbimage} />

      {post ? (
        <section className="sorath-blog-detail">
          <div className="container-fluid sorath-container-fluid">
            <article className="sorath-blog-detail-article">
              {post.image_url ? (
                <div className="sorath-blog-detail-cover">
                  <img src={post.image_url} alt={post.title} />
                </div>
              ) : null}

              <div className="sorath-blog-detail-meta">
                <span>{post.published_at}</span>
                <span>
                  By <strong>{post.author}</strong>
                </span>
                {post.tags?.length ? (
                  <span className="sorath-blog-detail-tags">
                    {post.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </span>
                ) : null}
              </div>

              <h1 className="sorath-blog-detail-title">{post.title}</h1>

              <div
                className="sorath-blog-detail-content"
                dangerouslySetInnerHTML={{ __html: post.details }}
              />
            </article>

            {related.length > 0 ? (
              <div className="sorath-blog-detail-related">
                <h2>Related Posts</h2>
                <div className="row gy-5">
                  {related.map((item) => (
                    <div className="col-lg-4 col-md-6" key={item.id}>
                      <BlogCard {...item} />
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </section>
      ) : (
        <section className="sorath-blog-detail">
          <div className="container-fluid sorath-container-fluid">
            <p className="text-center">{note}</p>
          </div>
        </section>
      )}

      <Footer />
      <DesignFloatButton />
    </>
  );
};

export default BlogDetail;
