import { useEffect, useRef, useState } from "react";
import "../../../assets/css/Home/Counter.css";

const counterData = [
  {
    id: 1,
    number: 22,
    suffix: "+",
    title: "Years experience",
    description: "Improving homes with expert craftsmanship for years",
  },
  {
    id: 2,
    number: 189,
    suffix: "+",
    title: "Total product",
    description: "Improving homes with expert craftsmanship for years",
  },
  {
    id: 3,
    number: 265,
    suffix: "+",
    title: "Our Clients",
    description: "Improving homes with expert craftsmanship for years",
  },
  {
    id: 4,
    number: 328,
    suffix: "+",
    title: "Client satisfaction",
    description: "Improving homes with expert craftsmanship for years",
  },
];

const Counter = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [startCount, setStartCount] = useState(false);
  const [counts, setCounts] = useState(counterData.map(() => 0));

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStartCount(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!startCount) return;

    const duration = 1800;
    const startTime = performance.now();
    let animationFrame = 0;

    const animate = (currentTime: number) => {
      const progress = Math.min((currentTime - startTime) / duration, 1);

      // Smooth ease-out animation
      const easedProgress = 1 - Math.pow(1 - progress, 4);

      setCounts(
        counterData.map((item) =>
          Math.round(item.number * easedProgress)
        )
      );

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [startCount]);

  return (
    <section className="sorath-counter" ref={sectionRef}>
      <div className="container-fluid sorath-container-fluid">
        <div className="row g-4">
          {counterData.map((item, index) => (
            <div className="col-12 col-sm-6 col-lg-3" key={item.id}>
              <div className="sorath-counter-item">
                <div className="sorath-counter-number">
                  {counts[index]}
                  {item.suffix}
                </div>

                <div className="sorath-counter-content">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Counter;