import '../../../assets/css/Blog/Blog.css';
import BlogCard from '../../Common/BlogCard';

import Post1 from '../../../assets/images/blog/post-1.jpg';
import Post2 from '../../../assets/images/blog/post-2.png';
import Post3 from '../../../assets/images/blog/post-3.png';
import Post4 from '../../../assets/images/blog/post-4.png';

const posts = [
  {
    image: Post1,
    category: 'Living Room',
    date: 'Sep 12, 2026',
    title: 'Mastering Warm Minimalism: Inside a Modern Earth-Toned Living Sanctuary',
    description: 'Fluted wood, soft architectural light, and low sculptural seating shape a warm living room.',
    link: '/blog',
  },
  {
    image: Post2,
    category: 'Kitchen',
    date: 'Sep 18, 2026',
    title: 'Harmonious Living: Inside an Open-Concept Modern Dining and Kitchen Suite',
    description: 'A marble dining table, olive kit-kat tiles, and a glowing breakfast bar share one open room.',
    link: '/blog',
  },
  {
    image: Post3,
    category: 'Bedroom',
    date: 'Sep 24, 2026',
    title: 'Quiet Luxury in the Bedroom: A Masterclass in Walnut, Concrete, and Fluted Millwork',
    description: 'Walnut slats, a channel-tufted bed, and quiet cove lighting settle a grey stone bedroom.',
    link: '/blog',
  },
  {
    image: Post4,
    category: 'Bathroom',
    date: 'Oct 2, 2026',
    title: 'Modern Spa Serenity: Inside a Luxury Bathroom with Exotic Stone and Fluted Millwork',
    description: 'A glowing capsule mirror, teal stone, and fluted ash millwork turn the bathroom into a spa.',
    link: '/blog',
  },
];

const BlogGrid = () => {
  return (
    <section className="sorath-blog-page">
      <div className="container-fluid sorath-container-fluid">
        <div className="row gy-5">
          {posts.map((post) => (
            <div className="col-lg-4 col-md-6" key={post.title}>
              <BlogCard {...post} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogGrid;
