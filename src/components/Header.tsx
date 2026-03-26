"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, User, ShoppingBag, LogOut } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { motion } from "framer-motion";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const { lang, toggleLang, t } = useLanguage();
  const { isLoggedIn, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItems = [
    { key: "nav.home", href: "/" },
    { key: "nav.women", href: "/women" },
    { key: "nav.men", href: "/men" },
    { key: "nav.accessories", href: "/" },
    { key: "nav.about", href: "/" },
  ];

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/95 backdrop-blur-sm border-b border-border shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo — Left */}
          <Link href="/" className="shrink-0">
            <h1 className="text-xl md:text-2xl font-serif tracking-[0.15em] text-foreground">
              MnCashmere
            </h1>
          </Link>

          {/* Nav Links — Center */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className="text-xs font-sans tracking-[0.2em] uppercase text-foreground/80 hover:text-foreground transition-colors duration-300"
              >
                {t(item.key)}
              </Link>
            ))}
          </nav>

          {/* Right Icons */}
          <div className="flex items-center gap-5">
            <button
              onClick={toggleLang}
              className="text-xs font-sans tracking-[0.15em] uppercase text-foreground/70 hover:text-foreground transition-colors border border-foreground/20 px-3 py-1.5 rounded-sm"
            >
              {lang === "mn" ? "EN" : "MN"}
            </button>
            <Search className="w-4.5 h-4.5 text-foreground/70 hover:text-foreground transition-colors cursor-pointer" />
            <Link href={isLoggedIn ? "/profile" : "/"}>
              <User className="w-4.5 h-4.5 text-foreground/70 hover:text-foreground transition-colors cursor-pointer" />
            </Link>
            <ShoppingBag className="w-4.5 h-4.5 text-foreground/70 hover:text-foreground transition-colors cursor-pointer" />
            {isLoggedIn && (
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 text-xs font-sans tracking-[0.15em] uppercase text-foreground/70 hover:text-foreground transition-colors"
                title={t("nav.logout")}
              >
                <LogOut className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
