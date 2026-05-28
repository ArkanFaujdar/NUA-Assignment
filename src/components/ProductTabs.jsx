import React, { useState } from "react";
import "./ProductsTabs.css";

export const ProductTabs = ({ product }) => {
  const [activeTab, setActiveTab] = useState("description");

  const tabs = [
    { id: "description", label: "Description" },
    { id: "specifications", label: "Specifications" },
    { id: "reviews", label: "Reviews" },
  ];

  return (
    <div className="tabs-section">
      <div className="tabs-header-bar" role="tablist">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={activeTab === tab.id}
            className={`tab-toggle ${activeTab === tab.id ? "active" : ""}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="tab-viewport-panel">
        {activeTab === "description" && (
          <div className="tab-content-pane fade-in">
            <p className="long-description">{product.description}</p>
          </div>
        )}

        {activeTab === "specifications" && (
          <div className="tab-content-pane fade-in">
            <table className="specs-table">
              <tbody>
                {product.specifications.map((spec) => (
                  <tr key={spec.key}>
                    <td className="spec-key">{spec.key}</td>
                    <td className="spec-val">{spec.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "reviews" && (
          <div className="tab-content-pane fade-in review-cards-grid">
            {product.reviews.map((review) => (
              <div key={review.id} className="review-card">
                <div className="review-meta">
                  <strong>{review.user}</strong>
                  <span className="stars">{"★".repeat(review.rating)}</span>
                </div>
                <p>"{review.comment}"</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
