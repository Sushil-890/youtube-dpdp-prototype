import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { History, Search, Sparkles, MapPin, CheckCircle, XCircle, Save, ArrowLeft } from 'lucide-react';
import { usePrivacy } from '../context/PrivacyContext';
import type { PrivacySettings } from '../context/PrivacyContext';

export const PrivacySummary: React.FC = () => {
  const navigate = useNavigate();
  const { pendingSettings, updateSettings, language, addAuditLog } = usePrivacy();
  const isHi = language === 'hi';

  const categories: { key: keyof PrivacySettings; icon: React.ReactNode; label: string; labelHi: string }[] = [
    { key: 'watchHistory', icon: <History className="w-4 h-4" />, label: 'Watch History', labelHi: 'देखने का इतिहास' },
    { key: 'searchHistory', icon: <Search className="w-4 h-4" />, label: 'Search History', labelHi: 'खोज इतिहास' },
    { key: 'personalizedAds', icon: <Sparkles className="w-4 h-4" />, label: 'Personalised Ads', labelHi: 'व्यक्तिगत विज्ञापन' },
    { key: 'location', icon: <MapPin className="w-4 h-4" />, label: 'Location', labelHi: 'स्थान सेवाएं' },
  ];

  const container: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.09 } },
  };
  const itemV: Variants = {
    hidden: { opacity: 0, y: 14 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 90, damping: 18 } },
  };

  const handleConfirm = () => {
    updateSettings(pendingSettings);
    const summary = Object.entries(pendingSettings)
      .map(([k, v]) => `${k}: ${v ? 'Enabled' : 'Disabled'}`)
      .join(', ');
    addAuditLog('Privacy Preferences Saved', summary);
    navigate('/success');
  };

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="max-w-xl mx-auto w-full space-y-6 py-2">
      {/* Header */}
      <motion.div variants={itemV} className="text-center space-y-2">
        <h1 className="text-2xl sm:text-3xl font-black text-gray-900">
          {isHi ? 'गोपनीयता सारांश' : 'Privacy Summary'}
        </h1>
        <p className="text-sm text-gray-500 max-w-sm mx-auto">
          {isHi
            ? 'सहेजने से पहले अपनी प्राथमिकताओं की समीक्षा करें।'
            : "Review your choices before we save them. You can go back to make changes."}
        </p>
      </motion.div>

      {/* Summary Card */}
      <motion.div variants={itemV} className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="px-5 py-3 bg-gray-50 border-b border-gray-100">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">
            {isHi ? 'आपकी चुनी हुई सेटिंग्स' : 'Your selected settings'}
          </p>
        </div>
        <div className="divide-y divide-gray-100">
          {categories.map(cat => {
            const isOn = pendingSettings[cat.key];
            return (
              <motion.div
                key={cat.key}
                variants={itemV}
                className="flex items-center justify-between px-5 py-4"
              >
                <div className="flex items-center gap-3 text-gray-700">
                  <span className="text-gray-400">{cat.icon}</span>
                  <span className="font-semibold text-sm">{isHi ? cat.labelHi : cat.label}</span>
                </div>
                <div className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full ${
                  isOn
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    : 'bg-gray-100 text-gray-500 border border-gray-200'
                }`}>
                  {isOn
                    ? <><CheckCircle className="w-3.5 h-3.5" />{isHi ? 'चालू' : 'Enabled'}</>
                    : <><XCircle className="w-3.5 h-3.5" />{isHi ? 'बंद' : 'Disabled'}</>
                  }
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Info note */}
      <motion.div variants={itemV} className="bg-blue-50 border border-blue-100 rounded-xl px-4 py-3 text-xs text-blue-700">
        💡 {isHi
          ? 'आप इन सेटिंग्स को गोपनीयता केंद्र से कभी भी बदल सकते हैं।'
          : 'You can change these settings at any time from the Privacy Center — no commitment required.'}
      </motion.div>

      {/* Action Buttons */}
      <motion.div variants={itemV} className="flex items-center justify-between gap-3 pt-1">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 px-5 py-2.5 bg-white border border-gray-200 text-gray-600 rounded-full text-sm font-semibold hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          {isHi ? 'वापस' : 'Back'}
        </button>
        <button
          onClick={handleConfirm}
          className="flex items-center gap-2 px-7 py-2.5 bg-youtube-red hover:bg-youtube-darkRed text-white rounded-full text-sm font-bold shadow-sm hover:shadow-md transition-all"
        >
          <Save className="w-4 h-4" />
          {isHi ? 'पुष्टि करें और सहेजें' : 'Confirm & Save'}
        </button>
      </motion.div>
    </motion.div>
  );
};
