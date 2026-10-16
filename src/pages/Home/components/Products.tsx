import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

import "swiper/css";

import "../../../assets/css/Home/Products.css";
import Heading from "../../Common/Heading";
import ProductCard from "../../Common/ProductCard";
import Shop1 from "../../../assets/images/shop/shop-1.png";
import { getProducts } from "../../../../services/products";
import type { ProductItem } from "../../../../types/product";

type CardProduct = {
  id: number;
  image: string;
  hoverImage: string;
  name: string;
  price: string;
  mrp: string;
  discount: number;
  categories: string[];
  dimensions: string;
  link: string;
  productId: number;
};

const toCard = (item: ProductItem): CardProduct => ({
  id: item.id,
  image: item.thumb_url || item.main_image_url || Shop1,
  hoverImage: item.main_image_url || item.thumb_url || Shop1,
  name: item.name,
  price: `₹${Number(item.price).toLocaleString("en-IN")}`,
  mrp: Number(item.mrp_price) > Number(item.price) ? `₹${Number(item.mrp_price).toLocaleString("en-IN")}` : "",
  discount: item.discount_percentage,
  categories: item.primary_category ? [item.primary_category.name] : [],
  dimensions: item.room_dimensions,
  link: `/product/${item.slug}`,
  productId: item.id,
});

const Products = () => {
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [products, setProducts] = useState<CardProduct[]>([]);
  const [note, setNote] = useState("Loading...");

  useEffect(() => {
    let stop = false;

    getProducts()
      .then((list) => {
        if (stop) return;
        const featured = list.filter((item) => item.is_featured).map(toCard);
        setProducts(featured);
        setNote(featured.length ? "" : "No featured products yet.");
      })
      .catch((error) => {
        if (stop) return;
        setProducts([]);
        setNote(error instanceof Error ? error.message : "Could not load products.");
      });

    return () => {
      stop = true;
    };
  }, []);

  const sliderProducts = products.length > 1 ? [...products, ...products] : products;

  return (
    <section className="sorath-products" data-aos="fade-up">
      <div className="container-fluid sorath-container-fluid">
        <Heading
          badge="Our Products"
          title="Creative"
          highlight="Products That"
          afterHighlight="Define Our Style"
          description="Our collection showcases a diverse range of products, from beautifully crafted residential pieces to functional and stylish commercial interiors."
        />

        {note ? <p className="text-center">{note}</p> : null}
      </div>

      {products.length > 0 && (
        <>
          <div className="sorath-products-slider">
            <Swiper
              modules={[Autoplay]}
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
              onSlideChange={(swiper) => {
                setActiveIndex(swiper.realIndex % products.length);
              }}
              slidesPerView={1.35}
              spaceBetween={20}
              centeredSlides
              loop={products.length > 1}
              grabCursor
              speed={700}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              breakpoints={{
                768: {
                  slidesPerView: 2.15,
                  spaceBetween: 20,
                },
                1200: {
                  slidesPerView: 3.6,
                  spaceBetween: 24,
                },
              }}
              className="sorath-products-swiper"
            >
              {sliderProducts.map((product, index) => (
                <SwiperSlide key={`${product.id}-${index}`}>
                  <ProductCard {...product} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div className="sorath-products-controls">
            <button
              type="button"
              className="sorath-products-prev"
              aria-label="Previous products"
              onClick={() => swiperRef.current?.slidePrev()}
            >
              <FiArrowLeft />
            </button>

            <div className="sorath-products-pagination">
              {products.map((product, index) => (
                <button
                  key={product.id}
                  type="button"
                  className={activeIndex === index ? "is-active" : ""}
                  aria-label={`Show ${product.name}`}
                  onClick={() => swiperRef.current?.slideToLoop(index)}
                />
              ))}
            </div>

            <button
              type="button"
              className="sorath-products-next"
              aria-label="Next products"
              onClick={() => swiperRef.current?.slideNext()}
            >
              <FiArrowRight />
            </button>
          </div>
        </>
      )}
    </section>
  );
};

export default Products;
