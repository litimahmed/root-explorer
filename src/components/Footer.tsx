/**
 * @file Footer.tsx
 * @description This component renders the main footer for the application.
 * It includes the company logo, a brief description, social media links, and a sitemap.
 * The entire component is animated with Framer Motion for a smooth user experience.
 */

// Import necessary libraries and components.
import { motion } from "framer-motion";
import {
  Mail,
  MapPin,
  Clock,
  Globe,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Phone,
  Printer
} from "lucide-react";
import { useTranslation } from "@/contexts/TranslationContext";
import { Link } from "react-router-dom";
import ToorriiLogo from "@/assets/toorrii-logo.png";
import { useContactInfo } from "@/hooks/useContactInfo";
import { TbBrandTiktok } from "react-icons/tb";

/**
 * @component Footer
 * @description The main footer component.
 */
const Footer = () => {
  // Hook to get the translation function and contact data.
  const { t, isRTL, language } = useTranslation();
  const { data: contactData } = useContactInfo();
  
  type TranslatableField = { fr: string; ar: string; en: string; } | undefined;
  type Language = 'en' | 'fr' | 'ar';

  const getTranslated = (field: TranslatableField) => {
    if (!field) return '';
    return field[language as Language] || field['en'] || '';
  };

  // Contact information - dynamically from API
  const contactInfoPrimary = [
    contactData?.email && { 
      icon: Mail, 
      label: "Email", 
      value: contactData.email, 
      href: `mailto:${contactData.email}`, 
      color: "text-red-500", 
      bg: "bg-red-50 hover:bg-red-100" 
    },
    contactData?.telephone_1 && { 
      icon: Phone, 
      label: "Phone", 
      value: contactData.telephone_1, 
      href: `tel:${contactData.telephone_1}`, 
      color: "text-green-500", 
      bg: "bg-green-50 hover:bg-green-100" 
    },
    contactData?.telephone_fixe && { 
      icon: Printer, 
      label: "Fax", 
      value: contactData.telephone_fixe, 
      href: `tel:${contactData.telephone_fixe}`, 
      color: "text-purple-500", 
      bg: "bg-purple-50 hover:bg-purple-100" 
    },
    contactData?.adresse && { 
      icon: MapPin, 
      label: "Address", 
      value: `${getTranslated(contactData.adresse)}, ${getTranslated(contactData.ville)}`, 
      href: "#", 
      color: "text-blue-500", 
      bg: "bg-blue-50 hover:bg-blue-100" 
    },
    contactData?.horaires && { 
      icon: Clock, 
      label: "Hours", 
      value: contactData.horaires, 
      href: "#", 
      color: "text-orange-500", 
      bg: "bg-orange-50 hover:bg-orange-100" 
    },
    contactData?.site_web && { 
      icon: Globe, 
      label: "Website", 
      value: contactData.site_web.replace(/^https?:\/\//, ''), 
      href: contactData.site_web, 
      color: "text-primary", 
      bg: "bg-primary/10 hover:bg-primary/20" 
    },
  ].filter(Boolean);

  // Social links - dynamically from API
  const socialLinks = [
    contactData?.facebook && { 
      icon: Facebook, 
      label: "Facebook", 
      value: "/toorrii", 
      href: contactData.facebook, 
      color: "text-blue-600", 
      bg: "bg-blue-50 hover:bg-blue-100" 
    },
    contactData?.instagram && { 
      icon: Instagram, 
      label: "Instagram", 
      value: "@toorrii", 
      href: contactData.instagram, 
      color: "text-pink-600", 
      bg: "bg-pink-50 hover:bg-pink-100" 
    },
    contactData?.linkedin && { 
      icon: Linkedin, 
      label: "LinkedIn", 
      value: "/company/toorrii", 
      href: contactData.linkedin, 
      color: "text-blue-700", 
      bg: "bg-blue-50 hover:bg-blue-100" 
    },
    contactData?.x && { 
      icon: Twitter, 
      label: "X", 
      value: "@toorrii", 
      href: contactData.x, 
      color: "text-foreground", 
      bg: "bg-muted hover:bg-muted/80" 
    },
    contactData?.tiktok && { 
      icon: TbBrandTiktok, 
      label: "TikTok", 
      value: "@toorrii", 
      href: contactData.tiktok, 
      color: "text-foreground", 
      bg: "bg-muted hover:bg-muted/80" 
    },
  ].filter(Boolean);
  
  // Pages to display in the footer navigation
  const pageLinks = [
    { name: t('nav.partnerships'), href: '/#partnerships' },
    { name: t('nav.aboutUs'), href: '/about-us' },
    { name: t('nav.privacy'), href: '/privacy-policy' },
    { name: t('footer.termsOfService'), href: '/terms-of-service' },
    { name: t('nav.contact'), href: '/contact' },
  ];
  
  return (
    <footer className="bg-background border-t border-border">
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 items-center">
          {/* Logo and Description Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <Link to="/" className="inline-block mb-6">
              <motion.div 
                className={`flex items-center h-16 relative ${isRTL ? '-left-4' : 'left-4'}`}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <img 
                  src={ToorriiLogo} 
                  alt="Toorrii Logo" 
                  className="h-full w-auto object-contain scale-[2]"
                />
              </motion.div>
            </Link>
            <p className="text-muted-foreground leading-relaxed">
              {t("footer.description")}
            </p>
          </motion.div>

          {/* Pages Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="font-semibold text-foreground mb-4">
              {t("footer.company")}
            </h3>
            <ul className="space-y-3">
              {pageLinks.map((link, index) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: 0.1 + index * 0.05,
                  }}
                  viewport={{ once: true }}
                >
                  <Link
                    to={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Information Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="font-semibold text-foreground mb-4">
              {t("footer.contactUs")}
            </h3>
            <ul className="space-y-4">
              {contactInfoPrimary.map((contact, index) => (
                <motion.li
                  key={contact.label}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: 0.2 + index * 0.05,
                  }}
                  viewport={{ once: true }}
                >
                  <a
                    href={contact.href}
                    target={contact.href.startsWith('http') ? '_blank' : undefined}
                    rel={contact.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="flex items-center space-x-3 rtl:space-x-reverse group"
                  >
                    <div className={`w-9 h-9 ${contact.bg} rounded-lg flex items-center justify-center transition-colors flex-shrink-0`}>
                      <contact.icon className={`w-4 h-4 ${contact.color}`} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs text-muted-foreground/70">{contact.label}</span>
                      <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">{contact.value}</span>
                    </div>
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Social Links Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className="font-semibold text-foreground mb-4">
              Réseaux Sociaux
            </h3>
            <ul className="space-y-4">
              {socialLinks.map((social, index) => (
                <motion.li
                  key={social.label}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: 0.3 + index * 0.05,
                  }}
                  viewport={{ once: true }}
                >
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 rtl:space-x-reverse group"
                  >
                    <div className={`w-9 h-9 ${social.bg} rounded-lg flex items-center justify-center transition-colors flex-shrink-0`}>
                      <social.icon className={`w-4 h-4 ${social.color}`} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs text-muted-foreground/70">{social.label}</span>
                      <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">{social.value}</span>
                    </div>
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Animated bottom section of the footer with copyright and legal links. */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="border-t border-border pt-8 mt-12 flex flex-col md:flex-row justify-between items-center"
        >
          <motion.div
            className="text-muted-foreground text-sm"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <span>© 2025 Toorrii. All rights reserved.</span>
          </motion.div>
          <div className="flex items-center space-x-6 mt-4 md:mt-0">
            <motion.div whileHover={{ y: -2 }}>
              <Link
                to="/privacy-policy"
                className="text-muted-foreground hover:text-primary text-sm transition-colors"
              >
                {t("footer.privacyPolicy")}
              </Link>
            </motion.div>
            <motion.div whileHover={{ y: -2 }}>
              <Link
                to="/terms-of-service"
                className="text-muted-foreground hover:text-primary text-sm transition-colors"
              >
                {t("footer.termsOfService")}
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
