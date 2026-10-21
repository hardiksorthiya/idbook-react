import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

import Heading from "../../Common/Heading";
import BlogCard from "../../Common/BlogCard";
import "../../../assets/css/Home/Blog.css";
import Fallback from "../../../assets/images/step1.webp";
import { getBlogs } from "../../../../services/blog";
import type { BlogItem } from "../../../../types/blog";

const toCard = (item: BlogItem) => ({
  id: item.id,
  image: item.image_url || Fallback,
  category: item.tags?.[0] || "Blog",
  date: item.published_at,
  title: item.title,
  description: item.summary,
  link: `/blog/${item.slug}`,
  author: item.author,
});

const Blog = () => {
  const [blogs, setBlogs] = useState<ReturnType<typeof toCard>[]>([]);
  const [note, setNote] = useState("");

  useEffect(() => {
    let stop = false;

    getBlogs(1, 6)
      .then(({ items }) => {
        if (stop) return;
        setBlogs(items.map(toCard));
        setNote(items.length ? "" : "No stories yet.");
      })
      .catch((error) => {
        if (stop) return;
        setNote(error instanceof Error ? error.message : "Could not load stories.");
      });

    return () => {
      stop = true;
    };
  }, []);

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

        {note ? <p className="text-center">{note}</p> : null}

        {blogs.length > 0 && (
          <Swiper
            modules={[Autoplay]}
            slidesPerView={1}
            spaceBetween={20}
            loop={blogs.length > 1}
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
                <BlogCard
                  image={blog.image}
                  category={blog.category}
                  date={blog.date}
                  title={blog.title}
                  description={blog.description}
                  link={blog.link}
                  author={blog.author}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </section>
  );
};

export default Blog;
