"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import {
  Package,
  MapPin,
  Heart,
  Settings,
  User,
  Phone,
  Mail,
  Check,
} from "lucide-react";

type Tab = "orders" | "address" | "wishlist" | "settings";

const sidebarItems: { key: Tab; icon: typeof Package; labelKey: string }[] = [
  { key: "orders", icon: Package, labelKey: "profile.orders" },
  { key: "address", icon: MapPin, labelKey: "profile.address" },
  { key: "wishlist", icon: Heart, labelKey: "profile.wishlist" },
  { key: "settings", icon: Settings, labelKey: "profile.settings" },
];

const ProfilePage = () => {
  const { t } = useLanguage();
  const { user, updateUser, isLoggedIn } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>("settings");
  const [saved, setSaved] = useState(false);

  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
  });

  if (!isLoggedIn) {
    router.push("/");
    return null;
  }

  const handleSave = () => {
    updateUser(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "orders":
        return (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <Package className="w-12 h-12 text-muted-foreground/40 mb-4" />
            <p className="text-sm font-sans tracking-[0.15em] uppercase text-muted-foreground">
              {t("profile.noOrders")}
            </p>
          </div>
        );
      case "address":
        return (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <MapPin className="w-12 h-12 text-muted-foreground/40 mb-4" />
            <p className="text-sm font-sans tracking-[0.15em] uppercase text-muted-foreground">
              {t("profile.noAddress")}
            </p>
          </div>
        );
      case "wishlist":
        return (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <Heart className="w-12 h-12 text-muted-foreground/40 mb-4" />
            <p className="text-sm font-sans tracking-[0.15em] uppercase text-muted-foreground">
              {t("profile.noWishlist")}
            </p>
          </div>
        );
      case "settings":
        return (
          <div className="max-w-lg">
            <h2 className="text-2xl font-serif text-foreground mb-8">
              {t("profile.editDetails")}
            </h2>
            <div className="space-y-6">
              {/* Name */}
              <div>
                <label className="text-xs font-sans tracking-[0.2em] uppercase text-muted-foreground mb-2 block">
                  {t("profile.name")}
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50" />
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 bg-transparent border border-border text-foreground font-sans text-sm tracking-wide focus:outline-none focus:border-foreground transition-colors"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="text-xs font-sans tracking-[0.2em] uppercase text-muted-foreground mb-2 block">
                  {t("profile.email")}
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50" />
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 bg-transparent border border-border text-foreground font-sans text-sm tracking-wide focus:outline-none focus:border-foreground transition-colors"
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="text-xs font-sans tracking-[0.2em] uppercase text-muted-foreground mb-2 block">
                  {t("profile.phone")}
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50" />
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 bg-transparent border border-border text-foreground font-sans text-sm tracking-wide focus:outline-none focus:border-foreground transition-colors"
                  />
                </div>
              </div>

              {/* Save */}
              <button
                onClick={handleSave}
                className="mt-4 flex items-center gap-2 px-8 py-3 bg-foreground text-background text-xs font-sans tracking-[0.2em] uppercase hover:bg-foreground/90 transition-colors"
              >
                {saved ? (
                  <>
                    <Check className="w-4 h-4" />
                    {t("profile.saved")}
                  </>
                ) : (
                  t("profile.save")
                )}
              </button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="pt-20">
        {/* Page Header */}
        <div className="bg-secondary/50">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12 md:py-16">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl font-serif text-foreground"
            >
              {t("profile.title")}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-2 text-sm font-sans text-muted-foreground"
            >
              {user?.name} · {user?.email}
            </motion.p>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
          <div className="flex flex-col md:flex-row gap-12">
            {/* Sidebar */}
            <motion.aside
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="md:w-64 shrink-0"
            >
              <nav className="space-y-1">
                {sidebarItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.key;
                  return (
                    <button
                      key={item.key}
                      onClick={() => setActiveTab(item.key)}
                      className={`w-full flex items-center gap-3 px-4 py-3 text-left text-sm font-sans tracking-wide transition-all duration-300 border-l-2 ${
                        isActive
                          ? "border-foreground text-foreground bg-secondary/50"
                          : "border-transparent text-muted-foreground hover:text-foreground hover:bg-secondary/30"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {t(item.labelKey)}
                    </button>
                  );
                })}
              </nav>
            </motion.aside>

            {/* Main Content */}
            <motion.main
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="flex-1 min-h-[400px]"
            >
              {renderContent()}
            </motion.main>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProfilePage;
