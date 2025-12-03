import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/contexts/TranslationContext";
import { usePrivacyPolicy } from "@/hooks/usePrivacyPolicy";
import { PrivacyPolicyData, MultilingualText, ContentSection } from "@/types/privacyPolicy";

const PrivacyPolicy = () => {
  const { t, language } = useTranslation();
  const { data: privacyData, isLoading } = usePrivacyPolicy();

  const getTranslated = (field: MultilingualText | undefined, fallback: string = ''): string => {
    if (!field) return fallback;
    const lang = language as keyof MultilingualText;
    return field[lang] || field['en'] || field['fr'] || field['ar'] || fallback;
  };

  const getTitle = () => {
    if (!privacyData?.titre) return t('privacyPage.title');
    if (Array.isArray(privacyData.titre)) {
      const title = privacyData.titre.find(t => t.lang === language) || privacyData.titre.find(t => t.lang === 'en');
      return title?.value || t('privacyPage.title');
    }
    return getTranslated(privacyData.titre as MultilingualText, t('privacyPage.title'));
  };

    const getIntro = (): string => {
        if (!privacyData?.contenu) return '';

        if (Array.isArray(privacyData.contenu)) {
            const introSection = privacyData.contenu.find(c => c.type === 'intro');
            return getTranslated(introSection?.text ?? introSection?.paragraphe);
        }

        // Fallback: if contenu is just a MultilingualText (old format)
        return getTranslated(privacyData.contenu as MultilingualText);
    };

    const getSections = (): ContentSection[] => {
        if (!privacyData?.contenu) return [];

        if (Array.isArray(privacyData.contenu)) {
            return privacyData.contenu.filter(c => c.type === 'section');
        }

        return []; // no sections if flat text
    };

  const renderContent = () => {
    if (isLoading) {
      return <p>Loading...</p>;
    }

    if (privacyData) {
      return (
        <>
            {getIntro() && (
            <div className="text-muted-foreground mb-12 whitespace-pre-line leading-relaxed">
                {getIntro()}
            </div>
        )}

          <div className="space-y-12">
            {getSections().map((section, index) => (
              <section key={index}>
                <h2 className="text-2xl font-semibold mb-4">{getTranslated(section.titre)}</h2>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                  {getTranslated(section.paragraphe)}
                </p>
              </section>
            ))}
          </div>
        </>
      );
    }

    // Fallback content if no API data
    return (
      <>
        <p className="text-muted-foreground mb-12">
          {t('privacyPage.intro')}
        </p>
        <div className="space-y-12">
          <section>
            <h2 className="text-2xl font-semibold mb-4">{t('privacyPage.section1Title')}</h2>
            <p className="text-muted-foreground leading-relaxed">
              {t('privacyPage.section1Text')}
            </p>
          </section>
          {/* Add other fallback sections here */}
        </div>
      </>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Link to="/">
            <Button variant="ghost" className="mb-8">
              <ArrowLeft className="w-4 h-4 ltr:mr-2 rtl:ml-2" />
              {t('privacyPage.backToHome')}
            </Button>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {getTitle()}
            </h1>
            <p className="text-muted-foreground mb-8">
              {privacyData?.date_creation 
                ? `${t('privacyPage.lastUpdated')} ${new Date(privacyData.date_creation).toLocaleDateString('en-GB')}`
                : `${t('privacyPage.lastUpdated')} ${new Date().toLocaleDateString('en-GB')}`
              }
              {privacyData?.version && ` - Version ${privacyData.version}`}
            </p>
            
            {renderContent()}

          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
