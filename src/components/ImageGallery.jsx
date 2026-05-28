import React, { useState, useRef } from "react";
import "./ImageGallery.css";

export const ImageGallery = ({ images = [] }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [zoomStyle, setZoomStyle] = useState({ display: "none" });
  const scrollContainerRef = useRef(null);

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, clientWidth } = scrollContainerRef.current;
    const index = Math.round(scrollLeft / clientWidth);
    setActiveIndex(index);
  };

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.pageX - left - window.scrollX) / width) * 100;
    const y = ((e.pageY - top - window.scrollY) / height) * 100;
    setZoomStyle({
      display: "block",
      backgroundImage: `url(${images[activeIndex]})`,
      backgroundPosition: `${x}% ${y}%`,
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle({ display: "none" });
  };

  if (!images.length) return null;

  return (
    <div className="gallery-container">
      <div
        className="main-image-viewport"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <img
          src={images[activeIndex]}
          alt="Product Main View"
          className="main-image"
        />
        <div className="zoom-overlay" style={zoomStyle} />
      </div>

      {/* Mobile-first Swipe Tracking container */}
      <div
        className="thumbnails-scroll"
        ref={scrollContainerRef}
        onScroll={handleScroll}
      >
        {images.map((img, idx) => (
          <div
            key={idx}
            className={`thumbnail-wrapper ${idx === activeIndex ? "active" : ""}`}
            onClick={() => {
              setActiveIndex(idx);
              scrollContainerRef.current?.scrollTo({
                // left: idx * scrollContainerRef.current.clientWidth,
                left: "33%",
                behavior: "smooth",
              });
            }}
          >
            <img src={img} alt={`Thumbnail ${idx + 1}`} />
          </div>
        ))}
      </div>

      {/* Mobile Pagination Indicators */}
      <div className="pagination-dots">
        {images.map((_, idx) => (
          <span
            key={idx}
            className={`dot ${idx === activeIndex ? "active" : ""}`}
          />
        ))}
      </div>
    </div>
  );
};
