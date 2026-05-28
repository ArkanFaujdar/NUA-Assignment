import { useState, useEffect } from "react";

export const useProduct = (productId) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `https://fakestoreapi.com/products/${productId}`,
        );
        if (!res.ok) throw new Error("Failed to fetch item data.");
        const data = await res.json();

        // Enriching raw API data with required mock variants for production validation
        const enrichedData = {
          ...data,
          brand: "Apex Elements Co.",
          originalPrice: (data.price * 1.25).toFixed(2), // 25% markup for sale visual representation
          colors: [
            {
              name: "Siren Coral",
              hex: "#e75650",
              images: [data.image, data.image, data.image],
            },
            {
              name: "Alpine Charcoal",
              hex: "#2c3e50",
              images: [data.image, data.image],
            },
            { name: "Summit White", hex: "#f8f9fa", images: [data.image] },
          ],
          sizes: [
            { name: "S", stock: 0 },
            { name: "M", stock: 2 }, // Low stock edge case trigger
            { name: "L", stock: 15 },
            { name: "XL", stock: 5 },
          ],
          specifications: [
            { key: "Material", value: "3-Layer GORE-TEX Pro Proshell" },
            { key: "Waterproof Rating", value: "28,000mm" },
            { key: "Weight", value: "420g" },
            { key: "Origin", value: "Imported" },
          ],
          reviews: [
            {
              id: 1,
              user: "Sarah K.",
              rating: 5,
              comment:
                "Survives brutal squalls beautifully. The color is exceptionally vibrant in person.",
            },
            {
              id: 2,
              user: "Marc H.",
              rating: 4,
              comment:
                "Highly breathable, but the cut runs slightly slim through the shoulders.",
            },
          ],
        };

        setProduct(enrichedData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  return { product, loading, error };
};
