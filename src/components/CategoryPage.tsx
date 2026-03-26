"use client";

import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import Image from "next/image";

interface Product {
  id: number;
  nameKey: string;
  price: { mn: string; en: string };
  image: string;
  sizes: string[];
  collection: "spring-summer" | "autumn-winter";
}

const products: Record<"women" | "men", Product[]> = {
  women: [
    { id: 1, nameKey: "category.product.wrap", price: { mn: "₮1,200,000", en: "$1,200" }, image: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=600&h=800&fit=crop", sizes: ["S", "M", "L"], collection: "autumn-winter" },
    { id: 2, nameKey: "category.product.cardigan", price: { mn: "₮980,000", en: "$980" }, image: "https://images.unsplash.com/photo-1525450824786-227cbef70703?w=600&h=800&fit=crop", sizes: ["S", "M", "L", "XL"], collection: "spring-summer" },
    { id: 3, nameKey: "category.product.turtleneck", price: { mn: "₮890,000", en: "$890" }, image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&h=800&fit=crop", sizes: ["S", "M", "L"], collection: "autumn-winter" },
    { id: 4, nameKey: "category.product.scarf", price: { mn: "₮450,000", en: "$450" }, image: "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=600&h=800&fit=crop", sizes: ["S", "M"], collection: "spring-summer" },
    { id: 5, nameKey: "category.product.pullover", price: { mn: "₮750,000", en: "$750" }, image: "https://images.unsplash.com/photo-1434389677669-e08b4cda3a00?w=600&h=800&fit=crop", sizes: ["M", "L", "XL"], collection: "autumn-winter" },
    { id: 6, nameKey: "category.product.coat", price: { mn: "₮2,400,000", en: "$2,400" }, image: "https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?w=600&h=800&fit=crop", sizes: ["S", "M", "L"], collection: "autumn-winter" },
  ],
  men: [
    { id: 1, nameKey: "category.product.crewneck", price: { mn: "₮890,000", en: "$890" }, image: "https://images.unsplash.com/photo-1614495039368-525273956716?w=600&h=800&fit=crop", sizes: ["M", "L", "XL"], collection: "autumn-winter" },
    { id: 2, nameKey: "category.product.vneck", price: { mn: "₮850,000", en: "$850" }, image: "https://images.unsplash.com/photo-1516826957135-700dedea698c?w=600&h=800&fit=crop", sizes: ["S", "M", "L", "XL"], collection: "spring-summer" },
    { id: 3, nameKey: "category.product.polo", price: { mn: "₮780,000", en: "$780" }, image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=800&fit=crop", sizes: ["M", "L"], collection: "spring-summer" },
    { id: 4, nameKey: "category.product.overcoat", price: { mn: "₮2,800,000", en: "$2,800" }, image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=800&fit=crop", sizes: ["S", "M", "L", "XL"], collection: "autumn-winter" },
    { id: 5, nameKey: "category.product.hoodie", price: { mn: "₮920,000", en: "$920" }, image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=800&fit=crop", sizes: ["S", "M", "L", "XL"], collection: "autumn-winter" },
    { id: 6, nameKey: "category.product.blazer", price: { mn: "₮1,650,000", en: "$1,650" }, image: "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=600&h=800&fit=crop", sizes: ["M", "L", "XL"], collection: "spring-summer" },
  ],
};

const sizes = ["S", "M", "L", "XL"];

const CategoryPage = ({ category }: { category: "women" | "men" }) => {
  const { lang, t } = useLanguage();
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedCollection, setSelectedCollection] = useState<string | null>(null);

  const categoryProducts = products[category];

  const filtered = categoryProducts.filter((p) => {
    if (selectedSize && !p.sizes.includes(selectedSize)) return false;
    if (selectedCollection && p.collection !== selectedCollection) return false;
    return true;
  });

  const titleKey = category === "women" ? "nav.women" : "nav.men";

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Banner */}
      <div className="pt-20 bg-secondary/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 md:py-24">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-serif text-foreground tracking-wide"
          >
            {t(titleKey)}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-4 text-sm font-sans tracking-[0.15em] uppercase text-muted-foreground"
          >
            {t("category.subtitle")}
          </motion.p>
        </div>
      </div>

      {/* Filters + Grid */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-8 mb-12 pb-8 border-b border-border">
          {/* Size Filter */}
          <div>
            <p className="text-xs font-sans tracking-[0.2em] uppercase text-muted-foreground mb-3">
              {t("filter.size")}
            </p>
            <div className="flex gap-2">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(selectedSize === size ? null : size)}
                  className={`w-10 h-10 text-xs font-sans tracking-wider border transition-all duration-300 ${
                    selectedSize === size
                      ? "bg-foreground text-background border-foreground"
                      : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Collection Filter */}
          <div>
            <p className="text-xs font-sans tracking-[0.2em] uppercase text-muted-foreground mb-3">
              {t("filter.collection")}
            </p>
            <div className="flex gap-3">
              {(["spring-summer", "autumn-winter"] as const).map((col) => (
                <button
                  key={col}
                  onClick={() => setSelectedCollection(selectedCollection === col ? null : col)}
                  className={`px-4 py-2 text-xs font-sans tracking-[0.15em] uppercase border transition-all duration-300 ${
                    selectedCollection === col
                      ? "bg-foreground text-background border-foreground"
                      : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
                  }`}
                >
                  {t(`filter.${col}`)}
                </button>
              ))}
            </div>
          </div>

          {/* Clear filters */}
          {(selectedSize || selectedCollection) && (
            <div className="flex items-end">
              <button
                onClick={() => { setSelectedSize(null); setSelectedCollection(null); }}
                className="text-xs font-sans tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground underline underline-offset-4 transition-colors"
              >
                {t("filter.clear")}
              </button>
            </div>
          )}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {filtered.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="group cursor-pointer"
            >
              <div className="aspect-[3/4] overflow-hidden bg-secondary/30 mb-5 relative">
                <Image
                  src={product.image}
                  alt={t(product.nameKey)}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <h3 className="text-sm font-sans tracking-[0.1em] uppercase text-foreground group-hover:text-foreground/70 transition-colors duration-300">
                {t(product.nameKey)}
              </h3>
              <p className="mt-1.5 text-sm font-sans text-muted-foreground">
                {product.price[lang]}
              </p>
              <div className="mt-2 flex gap-1.5">
                {product.sizes.map((s) => (
                  <span key={s} className="text-[10px] font-sans tracking-wider text-muted-foreground/60">
                    {s}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-sm font-sans tracking-[0.15em] uppercase text-muted-foreground">
              {t("filter.noResults")}
            </p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default CategoryPage;
