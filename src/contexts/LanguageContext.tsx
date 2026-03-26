"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type Language = "mn" | "en";

interface LanguageContextType {
  lang: Language;
  toggleLang: () => void;
  t: (key: string) => string;
}

const translations: Record<string, Record<Language, string>> = {
  // Nav
  "nav.home": { mn: "Нүүр", en: "Home" },
  "nav.women": { mn: "Эмэгтэй", en: "Women" },
  "nav.men": { mn: "Эрэгтэй", en: "Men" },
  "nav.accessories": { mn: "Аксессуар", en: "Accessories" },
  "nav.about": { mn: "Бидний тухай", en: "About Us" },

  // Category Page
  "category.subtitle": { mn: "Кашемир цуглуулга", en: "Cashmere Collection" },
  "category.product.wrap": { mn: "Кашемир Ороолт", en: "Cashmere Wrap" },
  "category.product.cardigan": { mn: "Кашемир Кардиган", en: "Cashmere Cardigan" },
  "category.product.turtleneck": { mn: "Кашемир Өндөр Хүзүүтэй", en: "Cashmere Turtleneck" },
  "category.product.scarf": { mn: "Кашемир Ороолт Алчуур", en: "Cashmere Scarf" },
  "category.product.pullover": { mn: "Кашемир Пуловер", en: "Cashmere Pullover" },
  "category.product.coat": { mn: "Кашемир Пальто", en: "Cashmere Coat" },
  "category.product.crewneck": { mn: "Кашемир Дугуй Хүзүүтэй", en: "Cashmere Crewneck" },
  "category.product.vneck": { mn: "Кашемир V Хүзүүтэй", en: "Cashmere V-Neck" },
  "category.product.polo": { mn: "Кашемир Поло", en: "Cashmere Polo" },
  "category.product.overcoat": { mn: "Кашемир Гадуур Хүрэм", en: "Cashmere Overcoat" },
  "category.product.hoodie": { mn: "Кашемир Худи", en: "Cashmere Hoodie" },
  "category.product.blazer": { mn: "Кашемир Блейзер", en: "Cashmere Blazer" },
  "filter.size": { mn: "Хэмжээ", en: "Size" },
  "filter.collection": { mn: "Цуглуулга", en: "Collection" },
  "filter.spring-summer": { mn: "Хавар/Зун", en: "Spring/Summer" },
  "filter.autumn-winter": { mn: "Намар/Өвөл", en: "Autumn/Winter" },
  "filter.clear": { mn: "Цэвэрлэх", en: "Clear Filters" },
  "filter.noResults": { mn: "Бүтээгдэхүүн олдсонгүй", en: "No products found" },

  // Hero
  "hero.subtitle": { mn: "Монгол Кашемир", en: "Mongolian Cashmere" },
  "hero.title": { mn: "Тансаг Зөөлөн Байгаль", en: "Luxuriously Soft by Nature" },
  "hero.cta": { mn: "Худалдан авах", en: "Shop Now" },

  // Collections
  "collections.title": { mn: "Цуглуулга", en: "Collections" },
  "collections.new": { mn: "Шинэ ирсэн", en: "New Arrivals" },
  "collections.women": { mn: "Эмэгтэй", en: "Women" },
  "collections.men": { mn: "Эрэгтэй", en: "Men" },
  "collections.accessories": { mn: "Аксессуар", en: "Accessories" },
  "collections.explore": { mn: "Үзэх", en: "Explore" },

  // Brand Story
  "brand.subtitle": { mn: "Бидний түүх", en: "Our Heritage" },
  "brand.title": { mn: "Монгол Кашемирийн Өв Уламжлал", en: "The Legacy of Mongolian Cashmere" },
  "brand.text1": {
    mn: "Монгол нутгийн өндөрлөг уулс, уудам тал хээрийн хүйтэн цаг агаараас хамгаалахын тулд ямаад онцгой зөөлөн, нарийн ноос ургуулдаг. Энэхүү байгалийн бэлэг бол дэлхийн хамгийн үнэт эдлэлүүдийн нэг юм.",
    en: "In the vast highlands of Mongolia, goats grow an extraordinarily fine, soft undercoat to protect against the harsh winters. This natural gift produces one of the world's most precious fibers."
  },
  "brand.text2": {
    mn: "Бид уламжлалт Монгол нүүдэлчдийн арга барилыг орчин үеийн технологитой хослуулан, дэлхийн хамгийн өндөр чанартай кашемир бүтээгдэхүүнийг та бүхэнд хүргэж байна.",
    en: "We blend the traditional methods of Mongolian nomadic herders with modern craftsmanship to bring you cashmere of unparalleled quality and softness."
  },
  "brand.cta": { mn: "Дэлгэрэнгүй", en: "Discover More" },

  // Product
  "product.name": { mn: "Кашемир Цамц", en: "Cashmere Sweater" },
  "product.price": { mn: "₮890,000", en: "$890" },
  "product.description": {
    mn: "100% монгол кашемираар хийгдсэн. Онцгой зөөлөн, хөнгөн, дулаан. Өдөр тутмын хэрэглээнд тохиромжтой.",
    en: "Crafted from 100% Mongolian cashmere. Exceptionally soft, lightweight, and warm. Perfect for everyday luxury."
  },
  "product.color": { mn: "Өнгө", en: "Color" },
  "product.size": { mn: "Хэмжээ", en: "Size" },
  "product.addToCart": { mn: "Сагсанд нэмэх", en: "Add to Cart" },
  "product.details": { mn: "Дэлгэрэнгүй мэдээлэл", en: "Product Details" },
  "product.detail1": { mn: "100% Монгол кашемир", en: "100% Mongolian Cashmere" },
  "product.detail2": { mn: "Гар угаалт зөвлөмж", en: "Hand wash recommended" },
  "product.detail3": { mn: "Монголд үйлдвэрлэсэн", en: "Made in Mongolia" },

  // Footer
  "footer.newsletter": { mn: "Мэдээлэл авах", en: "Newsletter" },
  "footer.newsletterText": { mn: "Шинэ цуглуулга, онцлох бүтээгдэхүүний мэдээлэл авах", en: "Stay updated with new collections and exclusive offers" },
  "footer.email": { mn: "И-мэйл хаяг", en: "Email address" },
  "footer.subscribe": { mn: "Бүртгүүлэх", en: "Subscribe" },
  "footer.rights": { mn: "Бүх эрх хуулиар хамгаалагдсан", en: "All rights reserved" },

  // Profile
  "profile.title": { mn: "Миний бүртгэл", en: "My Account" },
  "profile.orders": { mn: "Захиалгууд", en: "My Orders" },
  "profile.address": { mn: "Хаягийн дэвтэр", en: "Address Book" },
  "profile.wishlist": { mn: "Хүслийн жагсаалт", en: "Wishlist" },
  "profile.settings": { mn: "Тохиргоо", en: "Settings" },
  "profile.editDetails": { mn: "Хувийн мэдээлэл засах", en: "Edit Details" },
  "profile.name": { mn: "Нэр", en: "Name" },
  "profile.email": { mn: "И-мэйл", en: "Email" },
  "profile.phone": { mn: "Утасны дугаар", en: "Phone Number" },
  "profile.save": { mn: "Хадгалах", en: "Save Changes" },
  "profile.saved": { mn: "Хадгалагдсан", en: "Saved" },
  "profile.noOrders": { mn: "Захиалга байхгүй байна", en: "No orders yet" },
  "profile.noAddress": { mn: "Хаяг бүртгэгдээгүй байна", en: "No addresses saved" },
  "profile.noWishlist": { mn: "Хүслийн жагсаалт хоосон байна", en: "Your wishlist is empty" },
  "nav.logout": { mn: "Гарах", en: "Logout" },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Language>("mn");

  const toggleLang = () => setLang((prev) => (prev === "mn" ? "en" : "mn"));

  const t = (key: string): string => {
    return translations[key]?.[lang] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
};
