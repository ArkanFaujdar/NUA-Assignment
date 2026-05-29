# Architectural & Design Decisions

### 1. Variant State Synchronization: Context API

For overall application state, I selected the React Context API to manage the shopping cart global array and handle persistence strategies inside `localStorage`.

### 2. Architecture

Used a component-based architecture to improve code reusability and maintainability. Each UI section was divided into independent and reusable components for better scalability. This approach also made the application easier to manage, debug, and extend in the future.

### 3. Layout Structure: Tabs

I chose a strict layout using semantic horizontal tabs for the desktop view, falling back onto simple stacked CSS rows for smaller viewports. Tabs offer immediate, scannable data visualization blocks for key-value tables and review data configurations without forcing repetitive scroll shifts on desktop viewports.

### 4. Desktop Hover Zoom Processing

The image gallery zoom logic recalculates raw relative percentage coordinates (`x% y%`) bound to the listener container during mouse pointer navigation. I purposefully avoided introducing external processing tracking frameworks to maintain high-performance layout rendering speeds, keeping the component lightweight and meeting high Lighthouse optimization goals.
