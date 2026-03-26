"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const HeroSection = () => {
  const { t } = useLanguage();

  return (
    <section className="relative h-screen w-full overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/hero-cashmere.jpg"
          alt="Luxury Mongolian Cashmere"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-charcoal/30" />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-xs tracking-[0.4em] uppercase font-sans text-warm-white/80 mb-6"
        >
          {t("hero.subtitle")}
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="text-4xl md:text-6xl lg:text-7xl font-serif text-warm-white max-w-4xl leading-tight"
        >
          {t("hero.title")}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <Link
            href="/product"
            className="mt-12 inline-block text-xs tracking-[0.3em] uppercase font-sans text-warm-white border border-warm-white/50 px-10 py-4 hover:bg-warm-white hover:text-charcoal transition-all duration-500"
          >
            {t("hero.cta")}
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
