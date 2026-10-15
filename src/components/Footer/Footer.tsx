import { useEffect, useRef } from "react";
import { FiMail } from "react-icons/fi";
import {
  FaFacebookF,
  FaPinterestP,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";

import "../../assets/css/Common/Footer.css";

import FooterBg from "../../assets/images/step1b.webp";
import Logo from "../../assets/images/logo.webp";

const Footer = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    const ctx = canvas?.getContext("2d");

    if (!canvas || !parent || !ctx) return;

    let width = 0;
    let height = 0;
    let animationFrame = 0;
    let particles: {
      x: number;
      y: number;
      baseX: number;
      baseY: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
    }[] = [];

    const mouse = { x: -1000, y: -1000, radius: 100 };

    const createParticles = () => {
      particles = [];

      const textCanvas = document.createElement("canvas");
      textCanvas.width = width;
      textCanvas.height = height;

      const textCtx = textCanvas.getContext("2d");
      if (!textCtx) return;

      const text = "IDbook";
      let fontSize = 100;

      textCtx.font = `900 ${fontSize}px Poppins, sans-serif`;

      const measure = textCtx.measureText(text);
      const textHeight =
        measure.actualBoundingBoxAscent + measure.actualBoundingBoxDescent;

      fontSize *= Math.min(
        (width * 0.94) / measure.width,
        (height * 0.9) / textHeight
      );

      textCtx.font = `900 ${fontSize}px Poppins, sans-serif`;
      textCtx.textAlign = "center";
      textCtx.textBaseline = "middle";
      textCtx.fillStyle = "#000";
      textCtx.fillText(text, width / 2, height / 2);

      const pixels = textCtx.getImageData(0, 0, width, height).data;
      const gap = width < 480 ? 3 : width < 992 ? 4 : 5;

      for (let y = 0; y < height; y += gap) {
        for (let x = 0; x < width; x += gap) {
          if (pixels[(y * width + x) * 4 + 3] > 80) {
            particles.push({
              x,
              y,
              baseX: x,
              baseY: y,
              vx: 0,
              vy: 0,
              size: Math.random() * 0.8 + 0.7,
              alpha: Math.random() * 0.35 + 0.5,
            });
          }
        }
      }
    };

    const resizeCanvas = () => {
      const rect = parent.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;

      width = Math.floor(rect.width);
      height = Math.floor(rect.height);

      if (!width || !height) return;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = "100%";
      canvas.style.height = "100%";

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      mouse.radius = Math.max(36, Math.min(140, width * 0.08));

      createParticles();
    };

    const moveMouse = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = event.clientX - rect.left;
      mouse.y = event.clientY - rect.top;
    };

    const moveTouch = (event: TouchEvent) => {
      const touch = event.touches[0];
      if (!touch) return;

      const rect = canvas.getBoundingClientRect();
      mouse.x = touch.clientX - rect.left;
      mouse.y = touch.clientY - rect.top;
    };

    const resetMouse = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((particle) => {
        const dx = particle.x - mouse.x;
        const dy = particle.y - mouse.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouse.radius) {
          const angle = Math.atan2(dy, dx);
          const force = (mouse.radius - distance) / mouse.radius;

          particle.vx += Math.cos(angle) * force * 8;
          particle.vy += Math.sin(angle) * force * 8;
        }

        particle.vx += (particle.baseX - particle.x) * 0.025;
        particle.vy += (particle.baseY - particle.y) * 0.025;

        particle.vx *= 0.82;
        particle.vy *= 0.82;

        particle.x += particle.vx;
        particle.y += particle.vy;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(190, 190, 190, ${particle.alpha})`;
        ctx.fill();
      });

      animationFrame = requestAnimationFrame(animate);
    };

    resizeCanvas();
    animate();

    window.addEventListener("resize", resizeCanvas);
    canvas.addEventListener("mousemove", moveMouse);
    canvas.addEventListener("mouseleave", resetMouse);
    canvas.addEventListener("touchmove", moveTouch, { passive: true });
    canvas.addEventListener("touchend", resetMouse);

    const observer = new ResizeObserver(resizeCanvas);
    observer.observe(parent);

    document.fonts?.ready.then(resizeCanvas);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resizeCanvas);
      canvas.removeEventListener("mousemove", moveMouse);
      canvas.removeEventListener("mouseleave", resetMouse);
      canvas.removeEventListener("touchmove", moveTouch);
      canvas.removeEventListener("touchend", resetMouse);
      observer.disconnect();
    };
  }, []);

  const navLinks = [
    { label: "About", href: "/about" },
    { label: "Shop", href: "/shop" },
    { label: "Blog", href: "/blog" },
    { label: "Gallery", href: "/gallery" },
    { label: "Contact", href: "/contact" },
  ];

  const legalLinks = [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms & Conditions", href: "/terms" },
    { label: "FAQ", href: "/faq" },
  ];

  const socialLinks = [
    { label: "Facebook", href: "#", icon: <FaFacebookF /> },
    { label: "Pinterest", href: "#", icon: <FaPinterestP /> },
    { label: "LinkedIn", href: "#", icon: <FaLinkedinIn /> },
    { label: "Instagram", href: "#", icon: <FaInstagram /> },
  ];

  return (
    <footer
      className="sorath-footer"
      data-aos="fade-up"
      style={{ backgroundImage: `url(${FooterBg})` }}
    >
      <div className="sorath-footer-shade" />

      <div className="container-fluid sorath-container-fluid sorath-footer-main">
        <div className="row align-items-center gy-4">
          <div className="col-lg-4">
            <a href="/" className="sorath-footer-logo">
              <img src={Logo} alt="IDbook" />
            </a>

            <a
              href="mailto:support@example.com"
              className="sorath-footer-mail"
            >
              <FiMail />
              support@example.com
            </a>
          </div>

          <div className="col-lg-8">
            <nav className="sorath-footer-nav" aria-label="Footer navigation">
              {navLinks.map((link) => (
                <a href={link.href} key={link.label}>
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>

      <div className="sorath-footer-copyright">
        <div className="container-fluid sorath-container-fluid">
          <div className="row align-items-center gy-3">
            <div className="col-lg-4">
              <nav className="sorath-footer-legal" aria-label="Legal links">
                {legalLinks.map((link) => (
                  <a href={link.href} key={link.label}>
                    {link.label}
                  </a>
                ))}
              </nav>
            </div>

            <div className="col-lg-4 text-lg-center">
              <p>© 2026 IDbook. All Rights Reserved.</p>
            </div>

            <div className="col-lg-4">
              <div className="sorath-footer-social">
                {socialLinks.map((social) => (
                  <a
                    href={social.href}
                    key={social.label}
                    aria-label={social.label}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="sorath-footer-text">
        <canvas ref={canvasRef} />
      </div>
    </footer>
  );
};

export default Footer;