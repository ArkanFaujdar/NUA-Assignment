import React, { useState, useEffect } from "react";
import "./ProductInfo.css";
import { useCart } from "../context/CardContext";

export const ProductInfo = ({ product }) => {
  const { addToCart } = useCart();

  // Read URL configurations for deep linking compliance
  const getUrlParams = () => {
    const params = new URLSearchParams(window.location.search);
    return {
      color: params.get("color") || product.colors[0]?.name,
      size:
        params.get("size") ||
        product.sizes.find((s) => s.stock > 0)?.name ||
        product.sizes[0]?.name,
    };
  };

  const [selectedColor, setSelectedColor] = useState(getUrlParams().color);
  const [selectedSize, setSelectedSize] = useState(getUrlParams().size);
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  const currentSizeObj = product.sizes.find((s) => s.name === selectedSize);
  const currentStock = currentSizeObj ? currentSizeObj.stock : 0;

  // Enforce boundary safety resets when switching options
  useEffect(() => {
    setQuantity(1);
  }, [selectedSize]);

  const handleAddToCartClick = () => {
    setIsAdding(true);
    // Simulate API async loading latency and execution safety rules
    setTimeout(() => {
      addToCart(
        product,
        { color: selectedColor, size: selectedSize },
        quantity,
      );
      setIsAdding(false);
    }, 600);
  };

  return (
    <div className="info-panel">
      <span className="brand-label">{product.brand}</span>
      <h1 className="product-title">{product.title}</h1>

      <div className="price-container">
        <span className="sale-price">${product.price}</span>
        <span className="original-price">${product.originalPrice}</span>
        <span className="discount-badge">Save Over 20%</span>
      </div>

      <hr className="divider" />

      {/* Color Swatch Logic */}
      <div className="option-section">
        <span className="section-title">
          Color: <strong>{selectedColor}</strong>
        </span>
        <div className="swatch-group">
          {product.colors.map((color) => (
            <button
              key={color.name}
              className={`swatch-btn ${selectedColor === color.name ? "active" : ""}`}
              style={{ "--swatch-color": color.hex }}
              onClick={() => setSelectedColor(color.name)}
              aria-label={color.name}
            />
          ))}
        </div>
      </div>

      {/* Size Variant Interactive Grid */}
      <div className="option-section">
        <span className="section-title">Size:</span>
        <div className="size-group">
          {product.sizes.map((size) => {
            const isSoldOut = size.stock === 0;
            const isLowStock = size.stock > 0 && size.stock <= 2;
            return (
              <button
                key={size.name}
                disabled={isSoldOut}
                className={`size-btn ${selectedSize === size.name ? "selected" : ""} ${isSoldOut ? "sold-out" : ""}`}
                onClick={() => setSelectedSize(size.name)}
              >
                {size.name}
                {isLowStock && (
                  <span className="low-stock-pill">Only {size.stock}</span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Operational Quantity Selectors */}
      <div className="option-section">
        <span className="section-title">Quantity:</span>
        <div className="quantity-picker">
          <button
            disabled={quantity <= 1 || currentStock === 0}
            onClick={() => setQuantity((prev) => prev - 1)}
          >
            -
          </button>
          <span className="qty-value">{currentStock === 0 ? 0 : quantity}</span>
          <button
            disabled={quantity >= currentStock || currentStock === 0}
            onClick={() => setQuantity((prev) => prev + 1)}
          >
            +
          </button>
        </div>
      </div>

      <button
        className="add-to-cart-cta"
        disabled={currentStock === 0 || isAdding}
        onClick={handleAddToCartClick}
      >
        {isAdding
          ? "Updating Cart..."
          : currentStock === 0
            ? "Sold Out"
            : "Add to Cart"}
      </button>

      {/* Conditional Delivery Matrix Layout */}
      {currentStock > 0 && (
        <p className="delivery-estimate">
          🚚 Ordered within the next 3 hours?{" "}
          <strong>Arrives Friday, May 29.</strong>
        </p>
      )}
    </div>
  );
};
