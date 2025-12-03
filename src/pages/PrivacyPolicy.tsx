/**
 * @file PrivacyPolicy.tsx
 * @description Full Privacy Policy page with detailed privacy information.
 */

import { motion } from "framer-motion";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useTranslation } from "@/contexts/TranslationContext";
import { Shield, Lock, Eye, Database } from "lucide-react";
import { usePrivacyPolicy } from "@/hooks/usePrivacyPolicy";

const PrivacyPolicy = () => {
  const { t, language } = useTranslation();
  const { data: privacyData } = usePrivacyPolicy();
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      }
    }
  }, [location]);

  type TranslatableField = { fr?: string; ar?: string; en?: string; } | undefined | {};
  type Language = 'en' | 'fr' | 'ar';

  const getTranslated = (field: TranslatableField, fallback: string = ''): string => {
    if (!field || typeof field !== 'object') return fallback;
    const translated = field[language as Language] || field['en'] || field['fr'] || field['ar'];
    return translated || fallback;
  };

  const getTitleFromData = (titleData: any, fallback: string = ''): string => {
    if (!titleData) return fallback;
    // Handle array format: [{ lang: "en", value: "..." }]
    if (Array.isArray(titleData)) {
      const titleObj = titleData.find(t => t.lang === language) || titleData.find(t => t.lang === 'en') || titleData[0];
      return titleObj?.value || fallback;
    }
    // Handle object format: { en: "...", fr: "...", ar: "..." }
    if (typeof titleData === 'object') {
      return getTranslated(titleData, fallback);
    }
    return fallback;
  };

  const getContentSections = () => {
    if (!privacyData?.contenu) return [];
    // Handle array format with sections
    if (Array.isArray(privacyData.contenu)) {
      return privacyData.contenu.filter(section => section.type === 'section');
    }
    return [];
  };

  const getIntroText = () => {
    if (!privacyData?.contenu) return '';
    // Handle array format with intro
    if (Array.isArray(privacyData.contenu)) {
      const intro = privacyData.contenu.find(section => section.type === 'intro');
      return intro?.text ? getTranslated(intro.text) : (intro?.paragraphe ? getTranslated(intro.paragraphe) : '');
    }
    // Handle simple object format
    if (typeof privacyData.contenu === 'object' && !Array.isArray(privacyData.contenu)) {
      return getTranslated(privacyData.contenu);
    }
    return '';
  };

  const hasApiContent = privacyData && (getIntroText() || getContentSections().length > 0);

  const fallbackSections = [
    {
      id: "data-collection",
      icon: Database,
      title: t("privacyPage.section1Title"),
      content: t("privacyPage.section1Text")
    },
    {
      id: "data-usage",
      icon: Eye,
      title: t("privacyPage.section2Title"),
      content: t("privacyPage.section2Text")
    },
    {
      id: "data-protection",
      icon: Lock,
      title: t("privacyPage.section3Title"),
      content: t("privacyPage.section3Text")
    },
    {
      id: "user-rights",
      icon: Shield,
      title: t("privacyPage.section4Title"),
      content: t("privacyPage.section4Text")
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-primary/5 to-background">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-primary/10 mb-6">
              <Shield className="w-10 h-10 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {getTitleFromData(privacyData?.titre, t("privacyPage.title"))}
            </h1>
            <p className="text-xl text-muted-foreground mb-4">
              {t("privacyPage.subtitle")}
            </p>
            {privacyData?.version && (
              <p className="text-sm text-muted-foreground">
                {t("privacyPage.lastUpdated")} - Version {privacyData.version}
              </p>
            )}
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Introduction */}
          {hasApiContent && getIntroText() && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-12 p-8 bg-card border border-border rounded-2xl"
            >
              <div className="text-muted-foreground leading-relaxed whitespace-pre-line">
                {getIntroText()}
              </div>
            </motion.div>
          )}
          
          {!hasApiContent && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-12 p-8 bg-card border border-border rounded-2xl"
            >
              <h2 className="text-2xl font-bold mb-4">{t("privacyPage.introTitle")}</h2>
              <p className="text-muted-foreground leading-relaxed">
                {t("privacyPage.intro")}
              </p>
            </motion.div>
          )}

          {/* Main Sections from API */}
          {hasApiContent && getContentSections().length > 0 ? (
            <div className="space-y-8">
              {getContentSections().map((section, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  className="p-8 bg-card border border-border rounded-2xl hover:border-primary/50 transition-colors scroll-mt-24"
                >
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-3">{getTranslated(section.titre)}</h3>
                    <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                      {getTranslated(section.paragraphe)}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="space-y-8">
              {fallbackSections.map((section, index) => (
                <motion.div
                  key={index}
                  id={section.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  className="p-8 bg-card border border-border rounded-2xl hover:border-primary/50 transition-colors scroll-mt-24"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <section.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-3">{section.title}</h3>
                      <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                        {section.content}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Contact Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-12 p-8 bg-gradient-to-br from-primary/5 to-transparent border border-border rounded-2xl"
          >
            <h2 className="text-2xl font-bold mb-6">{t("privacyPage.contactTitle")}</h2>
            <p className="text-muted-foreground leading-relaxed">
              {t("privacyPage.contactText")}
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
