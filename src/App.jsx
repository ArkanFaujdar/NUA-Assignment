import React from "react";
import { useProduct } from "./hooks/useProduct";
import { ImageGallery } from "./components/ImageGallery";
import { ProductInfo } from "./components/ProductInfo";
import { ProductTabs } from "./components/ProductTabs";
import "./styles/main.css";
import { CartProvider } from "./context/CardContext";

function ProductDetailLayout() {
  const { product, loading, error } = useProduct(1);

  if (loading) {
    return <div className="center-viewport">Loading exceptional gear...</div>;
  }

  if (error) {
    return <div className="center-viewport error-txt">Error: {error}</div>;
  }

  return (
    <main className="app-container">
      <div className="pdp-main-grid">
        <ImageGallery images={product.colors[0]?.images} />
        <ProductInfo product={product} />
      </div>
      <ProductTabs product={product} />
    </main>
  );
}

export default function App() {
  return (
    <CartProvider>
      <ProductDetailLayout />
    </CartProvider>
  );
}
