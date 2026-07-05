import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { History, Search, Sparkles, MapPin, Save } from 'lucide-react';
import { usePrivacy } from '../context/PrivacyContext';
import type { PrivacySettings } from '../context/PrivacyContext';

export const PrivacyCenter: React.FC = () => {
  const navigate = useNavigate();
  const { pendingSettings, setPendingSettings, language, ageGroup } = usePrivacy();
  const isHi = language === 'hi';

  const [local, setLocal] = useState<PrivacySettings>({ ...pendingSettings });

  const handleToggle = (key: keyof PrivacySettings) => {
    if (ageGroup === 'minor' && (key === 'personalizedAds' || key === 'location')) return;
    setLocal(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleNext = () => {
    setPendingSettings(local);
    navigate('/privacy-summary');
  };

  const categories = [
    {
      key: 'watchHistory' as keyof PrivacySettings,
      icon: <History className="w-5 h-5 text-red-500" />,
      bg: 'bg-red-50',
      title: isHi ? 'देखने का इतिहास' : 'Watch History',
      desc: isHi
        ? 'हम आपके द्वारा देखे गए वीडियो याद रखते हैं।'
        : "We remember videos you've watched to recommend better content.",
      retention: isHi ? '18 महीने' : '18 months',
    },
    {
      key: 'searchHistory' as keyof PrivacySettings,
      icon: <Search className="w-5 h-5 text-blue-500" />,
      bg: 'bg-blue-50',
      title: isHi ? 'खोज इतिहास' : 'Search History',
      desc: isHi
        ? 'हम आपकी खोजें सहेजते हैं ताकि autocomplete बेहतर हो।'
        : 'Your searches are saved to make autocomplete smarter and faster.',
      retention: isHi ? '12 महीने' : '12 months',
    },
    {
      key: 'personalizedAds' as keyof PrivacySettings,
      icon: <Sparkles className="w-5 h-5 text-amber-500" />,
      bg: 'bg-amber-50',
      title: isHi ? 'व्यक्तिगत विज्ञापन' : 'Personalised Ads',
      desc: isHi
        ? 'आपकी रुचियों के आधार पर विज्ञापन दिखाए जाते हैं।'
        : 'Ads tailored to your interests instead of random ones.',
      retention: isHi ? '6 महीने' : '6 months',
    },
    {
      key: 'location' as keyof PrivacySettings,
      icon: <MapPin className="w-5 h-5 text-green-500" />,
      bg: 'bg-green-50',
      title: isHi ? 'स्थान सेवाएं' : 'Location',
      desc: isHi
        ? 'स्थानीय सामग्री और क्षेत्रीय अनुशंसाओं के लिए।'
        : 'Used for local news and region-specific content.',
      retention: isHi ? '3 महीने' : '3 months',
    },
  ];

  const container: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.07 } },
  };
  const itemV: Variants = {
    hidden: { opacity: 0, y: 14 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 90, damping: 18 } },
  };

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="max-w-2xl mx-auto w-full space-y-5 py-2">
      {/* Header */}
      <motion.div variants={itemV} className="text-center space-y-2">
        <h1 className="text-2xl sm:text-3xl font-black text-gray-900">
          {isHi ? 'अपनी सेटिंग्स प्रबंधित करें' : 'Manage your settings'}
        </h1>
        <p className="text-sm text-gray-500">
          {isHi
            ? 'हर श्रेणी को अलग से चालू या बंद करें।'
            : "Turn each category on or off independently. We'll show a summary before saving."}
        </p>
        {ageGroup === 'minor' && (
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 bg-blue-50 border border-blue-200 px-3 py-1.5 rounded-full">
            🛡️ {isHi ? 'बाल सुरक्षा मोड सक्रिय' : 'Child Protection Mode Active'}
          </span>
        )}
      </motion.div>

      {/* Toggle Cards */}
      {categories.map(cat => {
        const isOn = local[cat.key];
        const isLocked = ageGroup === 'minor' && (cat.key === 'personalizedAds' || cat.key === 'location');

        return (
          <motion.div
            key={cat.key}
            variants={itemV}
            className={`bg-white border rounded-2xl p-5 shadow-sm transition-all duration-200 ${
              isLocked ? 'opacity-70' : 'hover:shadow-md'
            } ${isOn ? 'border-gray-200' : 'border-gray-100'}`}
          >
            <div className="flex items-center gap-4">
              <div className={`${cat.bg} p-2.5 rounded-xl flex-shrink-0`}>{cat.icon}</div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold text-gray-900 text-base">{cat.title}</h3>
                  {isLocked && (
                    <span className="text-[10px] font-bold text-blue-600 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-full">
                      🔒 {isHi ? 'बंद' : 'Locked'}
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-500 leading-relaxed">{cat.desc}</p>
                <div className="mt-1.5 flex items-center gap-1 text-xs text-gray-400">
                  <span>🕐</span>
                  <span>{isHi ? `संग्रहण: ${cat.retention}` : `Stored for: ${cat.retention}`}</span>
                </div>
                {/* Status badge */}
                <div className="mt-2">
                  <span className={`inline-block text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${
                    isOn
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      : 'bg-gray-50 text-gray-500 border-gray-200'
                  }`}>
                    {isOn
                      ? (isHi ? '✓ चालू है' : '✓ Enabled')
                      : (isHi ? '✗ बंद है' : '✗ Disabled')}
                  </span>
                </div>
              </div>

              {/* Toggle */}
              <label className={`relative flex-shrink-0 ${isLocked ? 'cursor-not-allowed' : 'cursor-pointer'}`}>
                <input
                  type="checkbox"
                  checked={isOn}
                  onChange={() => handleToggle(cat.key)}
                  disabled={isLocked}
                  className="sr-only peer"
                  aria-label={`Toggle ${cat.title}`}
                />
                <div className="w-12 h-6 bg-gray-200 peer-checked:bg-youtube-red rounded-full transition-all duration-300 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all after:shadow peer-checked:after:translate-x-6" />
              </label>
            </div>
          </motion.div>
        );
      })}

      {/* Next: Review summary */}
      <motion.div variants={itemV} className="flex justify-end pt-2">
        <button
          onClick={handleNext}
          className="flex items-center gap-2 px-7 py-3 bg-youtube-red hover:bg-youtube-darkRed text-white rounded-full font-bold text-sm shadow-sm hover:shadow-md transition-all"
        >
          <Save className="w-4 h-4" />
          {isHi ? 'समीक्षा और सहेजें →' : 'Review & Save →'}
        </button>
      </motion.div>
    </motion.div>
  );
};
