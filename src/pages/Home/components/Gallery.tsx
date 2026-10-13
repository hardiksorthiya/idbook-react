import { useEffect, useRef, type RefObject } from "react";
import { FaArrowUp } from "react-icons/fa";

import Heading from "../../Common/Heading";

import "../../../assets/css/Home/Gallery.css";

import Image1 from "../../../assets/images/step1.webp";
import Image2 from "../../../assets/images/step2a.webp";
import Image3 from "../../../assets/images/step2b.webp";
import Image4 from "../../../assets/images/step2c.webp";
import Image5 from "../../../assets/images/step2d.webp";
import Image6 from "../../../assets/images/3dvisual.webp";
import Image7 from "../../../assets/images/slider.png";

type GallerySize = "sm" | "md" | "lg" | "xl";
type GalleryAlign = "start" | "center" | "end";

type GalleryItem = {
  id: number;
  image: string;
  alt: string;
  size: GallerySize;
  align: GalleryAlign;
};

const topRow: GalleryItem[] = [
  { id: 1, image: Image1, alt: "Bedroom seating", size: "sm", align: "center" },
  { id: 2, image: Image7, alt: "Open living room", size: "lg", align: "start" },
  { id: 3, image: Image2, alt: "Wardrobe and bath", size: "md", align: "end" },
  { id: 4, image: Image6, alt: "Bedroom interior", size: "lg", align: "start" },
  { id: 5, image: Image4, alt: "Lounge seating", size: "md", align: "center" },
  { id: 6, image: Image5, alt: "Interior detail", size: "sm", align: "end" },
];

const bottomRow: GalleryItem[] = [
  { id: 7, image: Image5, alt: "Room detail", size: "md", align: "center" },
  { id: 8, image: Image3, alt: "Kitchen", size: "sm", align: "center" },
  { id: 9, image: Image2, alt: "Dressing area", size: "md", align: "end" },
  { id: 10, image: Image4, alt: "Living space", size: "xl", align: "center" },
  { id: 11, image: Image1, alt: "Bedroom", size: "md", align: "start" },
  { id: 12, image: Image6, alt: "Accent bedroom", size: "sm", align: "center" },
];

const GalleryRow = ({
  items,
  rowRef,
  className,
}: {
  items: GalleryItem[];
  rowRef: RefObject<HTMLDivElement | null>;
  className: string;
}) => (
  <div className={className} ref={rowRef}>
    {items.map((item) => (
      <div
        key={item.id}
        className={`sorath-gallery-item is-${item.size} align-${item.align}`}
      >
        <img src={item.image} alt={item.alt} />
      </div>
    ))}
  </div>
);

const Gallery = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const topRowRef = useRef<HTMLDivElement>(null);
  const bottomRowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const top = topRowRef.current;
    const bottom = bottomRowRef.current;
    if (!section || !top || !bottom) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;

    const update = () => {
      cancelAnimationFrame(frame);

      frame = requestAnimationFrame(() => {
        const rect = section.getBoundingClientRect();
        const progress =
          (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
        const clamped = Math.min(1, Math.max(0, progress));
        const shift = (clamped - 0.5) * Math.min(140, window.innerWidth * 0.08);

        top.style.transform = `translate3d(${-shift}px, 0, 0)`;
        bottom.style.transform = `translate3d(${shift}px, 0, 0)`;
      });
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <section className="sorath-gallery" ref={sectionRef}>
      <div className="container-fluid sorath-container-fluid">
        <Heading
          badge="Our Gallery"
          title="Explore Our Latest"
          highlight="Interior Work"
          breakBeforeHighlight
        />
      </div>

      <div className="sorath-gallery-viewport">
        <GalleryRow
          items={topRow}
          rowRef={topRowRef}
          className="sorath-gallery-row sorath-gallery-row-top"
        />
        <GalleryRow
          items={bottomRow}
          rowRef={bottomRowRef}
          className="sorath-gallery-row sorath-gallery-row-bottom"
        />
      </div>

      <div className="sorath-gallery-footer">
        <a
          href="/shop"
          className="sorath-primary-btn sorath-hero-shop-btn primary-btn-2"
        >
          <span>Shop Now</span>

          <span className="sorath-hero-shop-arrow">
            <FaArrowUp />
          </span>
        </a>
      </div>
    </section>
  );
};

export default Gallery;
