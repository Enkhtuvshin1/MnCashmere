"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import Image from "next/image";

const BrandStory = () => {
  const { t } = useLanguage();

  return (
    <section className="relative">
      {/* Image half */}
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[80vh]">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="relative overflow-hidden min-h-[400px]"
        >
          <Image
            src="/images/brand-story.jpg"
            alt="Mongolian Steppes"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </motion.div>

        {/* Text half */}
        <div className="flex items-center bg-secondary px-8 lg:px-20 py-20">
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="max-w-lg"
          >
            <p className="text-xs tracking-[0.4em] uppercase font-sans text-muted-foreground mb-6">
              {t("brand.subtitle")}
            </p>
            <h2 className="text-3xl md:text-4xl font-serif text-foreground leading-snug mb-8">
              {t("brand.title")}
            </h2>
            <p className="font-sans text-sm leading-relaxed text-foreground/75 mb-5">
              {t("brand.text1")}
            </p>
            <p className="font-sans text-sm leading-relaxed text-foreground/75 mb-10">
              {t("brand.text2")}
            </p>
            <a
              href="#"
              className="text-xs tracking-[0.25em] uppercase font-sans text-foreground border-b border-foreground/40 pb-1 hover:border-foreground transition-colors duration-300"
            >
              {t("brand.cta")}
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BrandStory;
