import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

import Heading from "../../Common/Heading";
import "../../../assets/css/Home/Blog.css";

import BlogImage1 from "../../../assets/images/step1.webp";
import BlogImage2 from "../../../assets/images/step1.webp";
import BlogImage3 from "../../../assets/images/step1.webp";

const blogs = [
  {
    id: 1,
    image: BlogImage1,
    category: "Kitchen",
    date: "Sep 18, 2026",
    title: "Harmonious Living: Inside an Open-Concept Modern Dining and Kitchen Suite",
    description:
      "A marble dining table, olive kit-kat tiles, and a glowing breakfast bar share one open room.",
    link: "/blog/harmonious-living",
  },
  {
    id: 2,
    image: BlogImage2,
    category: "Bedroom",
    date: "Sep 24, 2026",
    title: "Quiet Luxury in the Bedroom: A Masterclass in Walnut, Concrete, and Fluted Millwork",
    description:
      "Walnut slats, a channel-tufted bed, and quiet cove lighting settle a grey stone bedroom.",
    link: "/blog/quiet-luxury-bedroom",
  },
  {
    id: 3,
    image: BlogImage3,
    category: "Bathroom",
    date: "Oct 2, 2026",
    title: "Modern Spa Serenity: Inside a Luxury Bathroom with Exotic Stone and Fluted Millwork",
    description:
      "A glowing capsule mirror, teal stone, and fluted ash millwork turn the bathroom into a spa.",
    link: "/blog/modern-spa-serenity",
  },
   {
    id: 4,
    image: BlogImage3,
    category: "Bathroom",
    date: "Oct 2, 2026",
    title: "Modern Spa Serenity: Inside a Luxury Bathroom with Exotic Stone and Fluted Millwork",
    description:
      "A glowing capsule mirror, teal stone, and fluted ash millwork turn the bathroom into a spa.",
    link: "/blog/modern-spa-serenity",
  },
];

const Blog = () => {
  return (
    <section className="sorath-blog">
      <div className="container-fluid sorath-container-fluid">
        <Heading
          badge="Our Blog"
          title="Explore"
          highlight="Our Latest Stories"
          afterHighlight="And Ideas"
          description=""
        />

        <Swiper
          modules={[Autoplay]}
          slidesPerView={1}
          spaceBetween={20}
          loop
          speed={1000}
          autoplay={{
            delay: 1500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          breakpoints={{
            576: { slidesPerView: 2, spaceBetween: 20 },
            992: { slidesPerView: 3, spaceBetween: 20 },
          }}
          className="sorath-blog-swiper"
        >
          {blogs.map((blog) => (
            <SwiperSlide key={blog.id}>
              <article className="sorath-blog-card">
                <a href={blog.link} className="sorath-blog-image">
                  <img src={blog.image} alt={blog.title} loading="lazy" />
                  <span className="sorath-blog-category">
                    {blog.category}
                  </span>
                </a>

                <div className="sorath-blog-meta">
                  <span>{blog.date}</span>
                  <span>
                    By <strong>IDBook</strong>
                  </span>
                </div>

                <h3>
                  <a href={blog.link}>{blog.title}</a>
                </h3>

                <p>{blog.description}</p>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Blog;