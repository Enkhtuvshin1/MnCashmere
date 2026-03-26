"use client";

import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";

const colors = [
  { name: "Cream", value: "hsl(40, 33%, 96%)" },
  { name: "Camel", value: "hsl(30, 30%, 55%)" },
  { name: "Charcoal", value: "hsl(220, 10%, 25%)" },
  { name: "Oatmeal", value: "hsl(35, 20%, 80%)" },
];

const sizes = ["XS", "S", "M", "L", "XL"];

const ProductPage = () => {
  const { t } = useLanguage();
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState(2);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Product Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="aspect-square bg-secondary overflow-hidden relative"
            >
              <Image
                src="/images/product-sweater.jpg"
                alt={t("product.name")}
                fill
                className="object-cover"
                priority
              />
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col justify-center"
            >
              <p className="text-xs tracking-[0.3em] uppercase font-sans text-muted-foreground mb-4">
                GOBI
              </p>
              <h1 className="text-3xl md:text-4xl font-serif text-foreground mb-4">
                {t("product.name")}
              </h1>
              <p className="text-xl font-sans text-foreground/80 mb-8">
                {t("product.price")}
              </p>
              <p className="text-sm font-sans leading-relaxed text-foreground/65 mb-10">
                {t("product.description")}
              </p>

              {/* Color Swatches */}
              <div className="mb-8">
                <p className="text-xs tracking-[0.2em] uppercase font-sans text-foreground/70 mb-4">
                  {t("product.color")} — {colors[selectedColor].name}
                </p>
                <div className="flex gap-3">
                  {colors.map((color, i) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(i)}
                      className={`w-8 h-8 rounded-full border-2 transition-all duration-300 ${
                        selectedColor === i
                          ? "border-foreground scale-110"
                          : "border-border hover:border-foreground/50"
                      }`}
                      style={{ backgroundColor: color.value }}
                    />
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div className="mb-10">
                <p className="text-xs tracking-[0.2em] uppercase font-sans text-foreground/70 mb-4">
                  {t("product.size")}
                </p>
                <div className="flex gap-3">
                  {sizes.map((size, i) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(i)}
                      className={`w-12 h-12 text-xs font-sans tracking-wide border transition-all duration-300 ${
                        selectedSize === i
                          ? "border-foreground bg-foreground text-primary-foreground"
                          : "border-border text-foreground/70 hover:border-foreground"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Add to Cart */}
              <button className="w-full bg-foreground text-primary-foreground py-4 text-xs tracking-[0.3em] uppercase font-sans hover:bg-foreground/90 transition-colors duration-300 mb-10">
                {t("product.addToCart")}
              </button>

              {/* Details */}
              <div className="border-t border-border pt-8">
                <p className="text-xs tracking-[0.2em] uppercase font-sans text-foreground/70 mb-4">
                  {t("product.details")}
                </p>
                <ul className="space-y-2">
                  {["product.detail1", "product.detail2", "product.detail3"].map((key) => (
                    <li key={key} className="text-sm font-sans text-foreground/60">
                      • {t(key)}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductPage;
