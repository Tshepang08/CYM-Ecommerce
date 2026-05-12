# ⛪ CYM Uniforms | Official E-commerce Store

![Uniforms](https://img.shields.io/badge/category-Uniforms-blue)
![Books](https://img.shields.io/badge/category-Literature-gold)
![Status](https://img.shields.io/badge/status-Production--Ready-success)

A specialized e-commerce UI library and storefront built for the **Christian Youth Ministry (CYM)** of the Uniting Reformed Church in Southern Africa. This project focuses on a clean, heritage-driven aesthetic using navy and gold accents.

---

## ✨ Features

### 🛍️ Smart Shopping Experience
* **Dynamic Product Grid:** Automatically populates items like Formal Suits, Tracksuits, and Hymn Books from a central data object.
* **Interactive Cart:** Real-time calculation of totals (in Rands) with the ability to add, remove, or clear items.
* **Quick View Modals:** Detailed product overlays featuring high-resolution images and item descriptions.

### 🛠️ Advanced UI Components
* **Multi-Step Checkout:** A guided 3-step form (Personal Info → Shipping → Payment) to reduce user friction.
* **Sortable Product Table:** A data-rich catalog with built-in pagination and sorting by name, category, or price.
* **Dynamic FAQ Accordion:** Space-saving interactive panels for shipping and sizing information.
* **Theme Engine:** Built-in Dark Mode support using CSS Custom Properties.

---

## 🎨 Design System

| Variable | Value | Description |
| :--- | :--- | :--- |
| **Primary** | `#0b3d91` | Deep Navy (Church Heritage) |
| **Accent** | `#b8860b` | Golden Thread (Embroidery) |
| **Surface** | `#f7f7f9` | Soft UI background |
| **Radius** | `12px` | Modern rounded aesthetics |

---

## 📂 Architecture

```text
├── index.html   # Semantic HTML5 layout & ARIA-compliant navigation
├── style.css    # Custom CSS framework with Dark Mode support
├── script.js    # Logic for Cart, Carousel, Modal, and Data-Table
└── images/      # Product assets (Uniforms, Badges, Books)

🚀 Technical Highlights
🛒 The Cart Logic
The cart utilizes a reactive approach to state management:

function updateCartCount(){
  cartBtn.textContent = `Cart (${cart.length})`;
}

Cites the use of JavaScript array methods like .reduce() to calculate totals and .map() to render line items.

📊 Data Cataloging
The system handles a PRODUCTS array that defines the entire store inventory, making it easily extensible for future items like specialized church literature.

🔧 SETUP
Clone the repo.

Open index.html in any modern browser.

No build tools required — purely Vanilla JS for maximum performance.

© CYM Uniform Store — Uniting Reformed Church of Southern Africa
