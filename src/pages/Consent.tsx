import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';
import {
  History, Search, Sparkles, MapPin, ChevronDown, ChevronUp,
  CheckCircle, Clock, Info, ArrowRight, Zap
} from 'lucide-react';
import { usePrivacy } from '../context/PrivacyContext';
import type { PrivacySettings } from '../context/PrivacyContext';

interface ConsentCategory {
  key: keyof PrivacySettings;
  icon: React.ReactNode;
  iconBg: string;
  title: string;
  purpose: string;
  benefit: string;
  retention: string;
  required: 'Required' | 'Optional';
  ifDisabled: string;
  learnMore: string;
}

export const Consent: React.FC = () => {
  const navigate = useNavigate();
  const { language, acceptAllSettings, setPendingSettings, pendingSettings, ageGroup } = usePrivacy();
  const isHi = language === 'hi';

  const [localSettings, setLocalSettings] = useState<PrivacySettings>({ ...pendingSettings });
  const [expandedKey, setExpandedKey] = useState<string | null>(null);

  const categories: ConsentCategory[] = [
    {
      key: 'watchHistory',
      icon: <History className="w-5 h-5 text-red-500" />,
      iconBg: 'bg-red-50',
      title: isHi ? 'देखने का इतिहास' : 'Watch History',
      purpose: isHi
        ? 'हम आपके द्वारा देखे गए वीडियो को याद रखते हैं ताकि आपको बेहतर सुझाव दे सकें।'
        : "We remember what you watch to recommend videos you'll actually enjoy.",
      benefit: isHi ? 'आपके होमपेज और सुझाव व्यक्तिगत बनते हैं।' : 'Your homepage and recommendations become personalised.',
      retention: isHi ? '18 महीने' : '18 months',
      required: 'Optional',
      ifDisabled: isHi
        ? 'YouTube काम करता रहेगा, लेकिन सुझाव कम व्यक्तिगत होंगे।'
        : 'YouTube still works perfectly. Recommendations will be less personalised.',
      learnMore: isHi
        ? 'हम यह जानकारी किसी तृतीय पक्ष को नहीं बेचते। केवल आपके अनुभव को बेहतर बनाने के लिए उपयोग किया जाता है।'
        : "We never sell this data to third parties. It's only used to make your YouTube experience better — not for anything else.",
    },
    {
      key: 'searchHistory',
      icon: <Search className="w-5 h-5 text-blue-500" />,
      iconBg: 'bg-blue-50',
      title: isHi ? 'खोज इतिहास' : 'Search History',
      purpose: isHi
        ? 'हम आपकी खोजें याद रखते हैं ताकि भविष्य में तेज और स्मार्ट सुझाव दे सकें।'
        : 'We save your searches to speed up future searches and suggest relevant results.',
      benefit: isHi ? 'खोज तेज होती है, autocomplete काम करता है।' : 'Faster searches, smarter autocomplete — saves you time.',
      retention: isHi ? '12 महीने' : '12 months',
      required: 'Optional',
      ifDisabled: isHi
        ? 'खोज काम करेगी, लेकिन autocomplete और सुझाव कम होंगे।'
        : "Search still works. You just won't get personalised autocomplete suggestions.",
      learnMore: isHi
        ? 'खोज इतिहास आपके डिवाइस और हमारे सर्वर पर सुरक्षित रूप से संग्रहीत होता है। आप इसे कभी भी हटा सकते हैं।'
        : 'Your search history is stored securely. You can view, edit, or delete it at any time from My Data.',
    },
    {
      key: 'personalizedAds',
      icon: <Sparkles className="w-5 h-5 text-amber-500" />,
      iconBg: 'bg-amber-50',
      title: isHi ? 'व्यक्तिगत विज्ञापन' : 'Personalised Ads',
      purpose: isHi
        ? 'हम आपकी रुचियों के आधार पर विज्ञापन दिखाते हैं।'
        : 'We show you ads that match your interests instead of random ones.',
      benefit: isHi ? 'आप उन उत्पादों के बारे में जानते हैं जो आपको पसंद आ सकते हैं।' : 'See ads that are actually relevant to what you care about.',
      retention: isHi ? '6 महीने' : '6 months',
      required: 'Optional',
      ifDisabled: isHi
        ? 'आपको उतने ही विज्ञापन दिखेंगे, बस वे कम प्रासंगिक होंगे।'
        : "You'll still see ads — just generic ones not tailored to you. The number of ads stays the same.",
      learnMore: isHi
        ? 'बच्चों के खातों के लिए व्यक्तिगत विज्ञापन हमेशा बंद रहते हैं।'
        : 'Personalised ads are always disabled for users under 18. You can opt out at any time without losing access to YouTube.',
    },
    {
      key: 'location',
      icon: <MapPin className="w-5 h-5 text-green-500" />,
      iconBg: 'bg-green-50',
      title: isHi ? 'स्थान सेवाएं' : 'Location',
      purpose: isHi
        ? 'हम आपके स्थान का उपयोग स्थानीय वीडियो, समाचार और सामग्री दिखाने के लिए करते हैं।'
        : 'We use your location to show local news, regional content, and to comply with streaming laws in your area.',
      benefit: isHi ? 'स्थानीय समाचार और क्षेत्रीय सामग्री दिखती है।' : 'See local news, regional sports, and content relevant to where you are.',
      retention: isHi ? '3 महीने' : '3 months',
      required: 'Optional',
      ifDisabled: isHi
        ? 'आपको स्थान-आधारित सामग्री नहीं मिलेगी। बाकी सब काम करेगा।'
        : "You won't see location-based content, but everything else works normally.",
      learnMore: isHi
        ? 'हम आपका सटीक GPS स्थान नहीं रखते — केवल अनुमानित क्षेत्र।'
        : "We only use your approximate region — not your exact GPS location. This helps us comply with India's regional content laws.",
    },
  ];

  const container: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.08 } },
  };
  const itemV: Variants = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 90, damping: 18 } },
  };

  const handleToggle = (key: keyof PrivacySettings) => {
    if (ageGroup === 'minor' && (key === 'personalizedAds' || key === 'location')) return;
    setLocalSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleAcceptAll = () => {
    acceptAllSettings();
    navigate('/success');
  };

  const handleManage = () => {
    setPendingSettings(localSettings);
    navigate('/privacy-center');
  };

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="max-w-3xl mx-auto w-full space-y-5 py-2">
      {/* Header */}
      <motion.div variants={itemV} className="text-center space-y-2">
        <h1 className="text-2xl sm:text-3xl font-black text-gray-900">
          {isHi ? 'आप तय करें कि क्या साझा करना है' : 'You decide what to share'}
        </h1>
        <p className="text-sm text-gray-500 max-w-xl mx-auto">
          {isHi
            ? 'नीचे हर श्रेणी के लिए हमने स्पष्ट रूप से बताया है कि डेटा का उपयोग क्यों होता है।'
            : "Below, we've clearly explained why we'd like each type of data and what happens if you say no."}
        </p>
        {ageGroup === 'minor' && (
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 bg-blue-50 border border-blue-200 px-3 py-1.5 rounded-full">
            🛡️ {isHi ? 'बाल सुरक्षा मोड सक्रिय — विज्ञापन और स्थान बंद हैं' : 'Child Protection Mode — Ads & Location disabled for your safety'}
          </div>
        )}
      </motion.div>

      {/* Cards */}
      {categories.map(cat => {
        const isOn = localSettings[cat.key];
        const isLocked = ageGroup === 'minor' && (cat.key === 'personalizedAds' || cat.key === 'location');
        const isExpanded = expandedKey === cat.key;

        return (
          <motion.div
            key={cat.key}
            variants={itemV}
            className={`bg-white rounded-2xl border shadow-sm transition-all duration-200 overflow-hidden ${
              isLocked ? 'opacity-70' : 'hover:shadow-md'
            } ${isOn ? 'border-gray-200' : 'border-gray-200'}`}
          >
            {/* Card Header Row */}
            <div className="p-5 flex items-start gap-4">
              <div className={`${cat.iconBg} p-2.5 rounded-xl flex-shrink-0`}>{cat.icon}</div>

              <div className="flex-1 min-w-0 space-y-1.5">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-bold text-gray-900 text-base">{cat.title}</h3>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                    cat.required === 'Optional'
                      ? 'text-gray-500 bg-gray-50 border-gray-200'
                      : 'text-youtube-red bg-red-50 border-red-200'
                  }`}>
                    {isHi ? (cat.required === 'Optional' ? 'वैकल्पिक' : 'आवश्यक') : cat.required}
                  </span>
                  {isLocked && (
                    <span className="text-[10px] font-bold text-blue-600 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-full">
                      🔒 {isHi ? 'बच्चों के लिए बंद' : 'Locked for minors'}
                    </span>
                  )}
                </div>

                <p className="text-sm text-gray-600 leading-relaxed">{cat.purpose}</p>

                {/* Meta row */}
                <div className="flex flex-wrap gap-3 text-xs text-gray-400 pt-0.5">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {isHi ? `संग्रहण: ${cat.retention}` : `Stored for: ${cat.retention}`}
                  </span>
                  <span className="flex items-center gap-1">
                    <Zap className="w-3 h-3" />
                    {isHi ? `लाभ: ${cat.benefit}` : `Benefit: ${cat.benefit}`}
                  </span>
                </div>

                {/* If Disabled note */}
                <div className="text-[11px] text-gray-400 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100 mt-1">
                  <span className="font-semibold text-gray-500">{isHi ? 'यदि बंद करें: ' : 'If off: '}</span>
                  {cat.ifDisabled}
                </div>
              </div>

              {/* Toggle */}
              <div className="flex-shrink-0 flex flex-col items-center gap-2">
                <label className="relative inline-flex items-center cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={isOn}
                    onChange={() => handleToggle(cat.key)}
                    disabled={isLocked}
                    className="sr-only peer"
                    aria-label={`Toggle ${cat.title}`}
                  />
                  <div className={`w-11 h-6 rounded-full peer transition-all duration-300 peer-checked:bg-youtube-red bg-gray-200 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-5 after:shadow-sm ${isLocked ? 'cursor-not-allowed' : ''}`} />
                </label>
                <span className={`text-[10px] font-bold ${isOn ? 'text-emerald-600' : 'text-gray-400'}`}>
                  {isOn ? (isHi ? 'चालू' : 'On') : (isHi ? 'बंद' : 'Off')}
                </span>
              </div>
            </div>

            {/* Learn More Toggle */}
            <button
              onClick={() => setExpandedKey(isExpanded ? null : cat.key)}
              className="w-full flex items-center justify-between px-5 py-2.5 text-xs font-semibold text-gray-400 hover:text-youtube-red hover:bg-red-50 border-t border-gray-100 transition-colors"
            >
              <span className="flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5" />
                {isHi ? 'और जानें' : 'Learn more'}
              </span>
              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="px-5 py-3 bg-blue-50/40 border-t border-blue-100 text-sm text-gray-600 leading-relaxed">
                    💡 {cat.learnMore}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}

      {/* CTA Buttons */}
      <motion.div
        variants={itemV}
        className="bg-white rounded-2xl border border-gray-200 p-5 flex flex-col sm:flex-row items-center justify-between gap-4"
      >
        <p className="text-xs text-gray-400 max-w-xs text-center sm:text-left">
          {isHi
            ? 'आप कभी भी सेटिंग बदल सकते हैं। सहमति वापस लेना बिल्कुल आसान है।'
            : 'You can change these settings anytime. Withdrawing consent is always just one tap away.'}
        </p>
        <div className="flex flex-col sm:flex-row gap-2.5 w-full sm:w-auto">
          <button
            onClick={handleManage}
            className="px-5 py-2.5 bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-200 rounded-full text-sm font-semibold transition-all text-center"
          >
            {isHi ? 'प्राथमिकताएं प्रबंधित करें' : 'Manage Preferences'}
          </button>
          <button
            onClick={handleAcceptAll}
            className="flex items-center justify-center gap-2 px-6 py-2.5 bg-youtube-red hover:bg-youtube-darkRed text-white rounded-full text-sm font-bold shadow-sm hover:shadow-md transition-all"
          >
            <CheckCircle className="w-4 h-4" />
            {isHi ? 'सब स्वीकार करें' : 'Accept All'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};
