import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

import "swiper/css";

import "../../../assets/css/Home/Products.css";
import Heading from "../../Common/Heading";
import ProductCard from "../../Common/ProductCard";

import ProductImage1 from "../../../assets/images/step1.webp";
import ProductImage2 from "../../../assets/images/step1.webp";
import ProductImage3 from "../../../assets/images/step1.webp";
import ProductImage4 from "../../../assets/images/step1.webp";

const products = [
  {
    id: 1,
    image: ProductImage1,
    hoverImage: ProductImage2,
    name: "Luxury Skyline Sofa",
    price: "$1,240",
    categories: ["Living Room", "Sofa"],
    dimensions: `16'-5" × 12'-6"`,
    link: '#',
  },
  {
    id: 2,
    image: ProductImage2,
    hoverImage: ProductImage3,
    name: "Bohemian Armchair",
    price: "$680",
    categories: ["Living Room", "Chair"],
    dimensions: `8'-2" × 7'-4"`,
    link: '#',
  },
  {
    id: 3,
    image: ProductImage3,
    hoverImage: ProductImage4,
    name: "Vintage Glamour Lamp",
    price: "$320",
    categories: ["Lighting", "Lamp"],
    dimensions: `4'-0" × 3'-6"`,
    link: '#',
  },
  {
    id: 4,
    image: ProductImage4,
    hoverImage: ProductImage1,
    name: "Titan Office Chair",
    price: "$890",
    categories: ["Office", "Chair"],
    dimensions: `6'-5" × 5'-2"`,
    link: '#',
  },
];

const sliderProducts = [...products, ...products];

const Products = () => {
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="sorath-products">
      <div className="container-fluid sorath-container-fluid">
        {/* Section Heading */}
        <Heading
          badge="Our Products"
          title="Creative"
          highlight="Products That"
          afterHighlight="Define Our Style"
          description="Our collection showcases a diverse range of products, from beautifully crafted residential pieces to functional and stylish commercial interiors."
        />
      </div>

      {/* Product Slider */}
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
          loop
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

      {/* Slider Controls */}
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
    </section>
  );
};

export default Products;
