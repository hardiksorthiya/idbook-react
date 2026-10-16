import { FiArrowRight } from 'react-icons/fi';
import '../../assets/css/Home/Blog.css';

type BlogCardProps = {
  image: string;
  category: string;
  date: string;
  title: string;
  description: string;
  link: string;
  author?: string;
};

const BlogCard = ({
  image,
  category,
  date,
  title,
  description,
  link,
  author = 'IDBook',
}: BlogCardProps) => {
  return (
    <article className="sorath-blog-card">
      <a href={link} className="sorath-blog-image">
        <img src={image} alt={title} loading="lazy" />
        <span className="sorath-blog-category">{category}</span>
      </a>

      <div className="sorath-blog-meta">
        <span>{date}</span>
        <span>
          By <strong>{author}</strong>
        </span>
      </div>

      <h3>
        <a href={link}>{title}</a>
      </h3>

      <p>{description}</p>

      <a href={link} className="sorath-primary-btn primary-btn-2 sorath-blog-more">
        <span>Read More</span>
        <span>
          <FiArrowRight />
        </span>
      </a>
    </article>
  );
};

export default BlogCard;
