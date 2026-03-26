"use client";

import { useLanguage } from "@/contexts/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-foreground text-primary-foreground">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20">
        {/* Newsletter */}
        <div className="text-center mb-16 pb-16 border-b border-primary-foreground/10">
          <h3 className="text-2xl font-serif mb-3">{t("footer.newsletter")}</h3>
          <p className="text-xs font-sans tracking-wide text-primary-foreground/60 mb-8">
            {t("footer.newsletterText")}
          </p>
          <div className="flex max-w-md mx-auto">
            <input
              type="email"
              placeholder={t("footer.email")}
              className="flex-1 bg-transparent border border-primary-foreground/20 px-5 py-3 text-xs font-sans tracking-wide text-primary-foreground placeholder:text-primary-foreground/40 focus:outline-none focus:border-primary-foreground/50"
            />
            <button className="bg-primary-foreground text-foreground px-8 py-3 text-xs font-sans tracking-[0.2em] uppercase hover:bg-primary-foreground/90 transition-colors">
              {t("footer.subscribe")}
            </button>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xl font-serif tracking-[0.15em]">MnCashmere</p>
          <p className="text-[10px] font-sans tracking-wide text-primary-foreground/40">
            © 2026 MnCashmere. {t("footer.rights")}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
