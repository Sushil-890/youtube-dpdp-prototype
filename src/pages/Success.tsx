import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { Check, ShieldCheck, History, Search, Sparkles, MapPin, Sliders, Database } from 'lucide-react';
import { usePrivacy } from '../context/PrivacyContext';
import { translations } from '../utils/translations';

export const Success: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { language, settings } = usePrivacy();
  const t = translations[language];
  const isHi = language === 'hi';

  const state = location.state as { fromAction?: string } | null;
  const fromAction = state?.fromAction;
  const isPreferencesSaved = !fromAction;

  const getSuccessContent = () => {
    switch (fromAction) {
      case 'download':
        return {
          title: isHi ? 'डेटा डाउनलोड हो गया!' : 'Data Downloaded!',
          message: isHi
            ? 'DPDP अधिनियम धारा 11 के तहत आपका डेटा सारांश तैयार हो गया है।'
            : 'Your data summary has been prepared and downloaded — Section 11 Right to Access.',
        };
      case 'watch':
        return {
          title: isHi ? 'देखने का इतिहास मिटाया गया!' : 'Watch History Deleted!',
          message: isHi
            ? 'आपका देखने का इतिहास स्थायी रूप से हटा दिया गया है (DPDP धारा 12)।'
            : 'Your watch history has been permanently erased from our databases (DPDP Section 12).',
        };
      case 'search':
        return {
          title: isHi ? 'खोज इतिहास मिटाया गया!' : 'Search History Deleted!',
          message: isHi
            ? 'आपका खोज इतिहास स्थायी रूप से हटा दिया गया है (DPDP धारा 12)।'
            : 'Your search history has been permanently erased from our databases (DPDP Section 12).',
        };
      case 'google':
        return {
          title: isHi ? 'सभी डेटा मिटाया गया!' : 'All Data Erased!',
          message: isHi
            ? 'सभी व्यक्तिगत डेटा हटा दिया गया है। सेटिंग्स डिफ़ॉल्ट पर रीसेट हो गई हैं।'
            : 'All personal data has been erased. Consent settings reset to disabled state.',
        };
      default:
        return {
          title: isHi ? 'प्राथमिकताएं सहेजी गईं!' : 'Preferences Saved!',
          message: isHi
            ? 'आपकी गोपनीयता प्राथमिकताएं सफलतापूर्वक अपडेट की गई हैं। आप इन्हें कभी भी गोपनीयता केंद्र से बदल सकते हैं।'
            : 'Your privacy preferences have been successfully updated. You can change these settings anytime from Privacy Center.',
        };
    }
  };

  const { title, message } = getSuccessContent();

  const summaryItems = [
    { key: 'watchHistory' as const, icon: <History className="w-4 h-4" />, label: isHi ? 'देखने का इतिहास' : 'Watch History' },
    { key: 'searchHistory' as const, icon: <Search className="w-4 h-4" />, label: isHi ? 'खोज इतिहास' : 'Search History' },
    { key: 'personalizedAds' as const, icon: <Sparkles className="w-4 h-4" />, label: isHi ? 'व्यक्तिगत विज्ञापन' : 'Personalised Ads' },
    { key: 'location' as const, icon: <MapPin className="w-4 h-4" />, label: isHi ? 'स्थान' : 'Location' },
  ];

  const container: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };
  const itemV: Variants = {
    hidden: { opacity: 0, y: 14 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 90, damping: 18 } },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="max-w-xl mx-auto w-full space-y-6 my-4"
    >
      {/* Success badge */}
      <motion.div variants={itemV} className="text-center space-y-4">
        <div className="flex justify-center">
          <div className="relative">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
              className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center border-2 border-emerald-400"
            >
              <Check className="w-10 h-10 stroke-[3]" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.35 }}
              className="absolute -top-1 -right-1 bg-youtube-red text-white p-1.5 rounded-full"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
            </motion.div>
          </div>
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900">{title}</h2>
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
            ✓ {isHi ? 'ऑडिट लॉग अपडेट किया गया' : 'Audit Log Updated'}
          </span>
          <p className="text-sm text-gray-500 max-w-sm mx-auto leading-relaxed pt-1">
            {message}
          </p>
        </div>
      </motion.div>

      {/* Settings summary — shown only when preferences were saved */}
      {isPreferencesSaved && (
        <motion.div variants={itemV} className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="px-5 py-3 bg-gray-50 border-b border-gray-100">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">
              {isHi ? 'आपकी सहेजी गई सेटिंग्स' : 'Your saved settings'}
            </p>
          </div>
          <div className="divide-y divide-gray-100">
            {summaryItems.map((item, i) => {
              const isOn = settings[item.key];
              return (
                <motion.div
                  key={item.key}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.08 }}
                  className="flex items-center justify-between px-5 py-3.5"
                >
                  <div className="flex items-center gap-3 text-gray-600">
                    <span className="text-gray-400">{item.icon}</span>
                    <span className="text-sm font-semibold text-gray-700">{item.label}</span>
                  </div>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5 ${
                    isOn
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'bg-gray-100 text-gray-500 border border-gray-200'
                  }`}>
                    {isOn ? '✔' : '✘'}
                    {isOn ? (isHi ? 'चालू' : 'Enabled') : (isHi ? 'बंद' : 'Disabled')}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* CTA Buttons */}
      <motion.div variants={itemV} className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 pt-1">
        <button
          onClick={() => navigate('/privacy-center')}
          className="flex items-center justify-center gap-2 px-5 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-full text-sm font-semibold hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm"
        >
          <Sliders className="w-4 h-4 text-youtube-red" />
          {t.btnHome}
        </button>

        <button
          onClick={() => navigate('/my-data')}
          className="flex items-center justify-center gap-2 px-6 py-2.5 bg-youtube-red hover:bg-youtube-darkRed text-white rounded-full text-sm font-bold shadow-sm hover:shadow-md transition-all"
        >
          <Database className="w-4 h-4" />
          {isHi ? 'My Data देखें' : 'View My Data'}
        </button>
      </motion.div>
    </motion.div>
  );
};
