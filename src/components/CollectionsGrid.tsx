"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import Image from "next/image";

const CollectionsGrid = () => {
  const { t } = useLanguage();

  const collections = [
    { key: "collections.new", image: "/images/collection-new.jpg" },
    { key: "collections.women", image: "/images/collection-women.jpg" },
    { key: "collections.men", image: "/images/collection-men.jpg" },
    { key: "collections.accessories", image: "/images/collection-accessories.jpg" },
  ];

  return (
    <section className="py-24 lg:py-32 px-6 lg:px-12 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-4xl font-serif text-foreground tracking-wide">
          {t("collections.title")}
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {collections.map((item, i) => (
          <motion.div
            key={item.key}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: i * 0.15 }}
            className="group relative overflow-hidden cursor-pointer aspect-[4/5]"
          >
            <Image
              src={item.image}
              alt={t(item.key)}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-charcoal/20 group-hover:bg-charcoal/35 transition-all duration-500" />
            <div className="absolute inset-0 flex flex-col items-center justify-end pb-12">
              <h3 className="text-lg font-serif text-warm-white tracking-[0.15em] mb-3">
                {t(item.key)}
              </h3>
              <span className="text-[10px] tracking-[0.3em] uppercase font-sans text-warm-white/70 group-hover:text-warm-white transition-colors border-b border-warm-white/30 pb-0.5">
                {t("collections.explore")}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default CollectionsGrid;
