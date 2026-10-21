import { Link } from 'react-router-dom';
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
      <Link to={link} className="sorath-blog-image">
        <img src={image} alt={title} loading="lazy" />
        <span className="sorath-blog-category">{category}</span>
      </Link>

      <div className="sorath-blog-meta">
        <span>{date}</span>
        <span>
          By <strong>{author}</strong>
        </span>
      </div>

      <h3>
        <Link to={link}>{title}</Link>
      </h3>

      <p>{description}</p>

      <Link to={link} className="sorath-primary-btn primary-btn-2 sorath-blog-more">
        <span>Read More</span>
        <span>
          <FiArrowRight />
        </span>
      </Link>
    </article>
  );
};

export default BlogCard;
