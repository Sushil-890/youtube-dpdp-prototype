import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { Shield, Eye, Trash2, ArrowRight, Users } from 'lucide-react';
import { usePrivacy } from '../context/PrivacyContext';

export const Welcome: React.FC = () => {
  const navigate = useNavigate();
  const { language } = usePrivacy();
  const isHi = language === 'hi';

  const container: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.12 } },
  };
  const item: Variants = {
    hidden: { opacity: 0, y: 22 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 90, damping: 18 } },
  };

  const pillars = [
    {
      icon: <Shield className="w-5 h-5 text-youtube-red" />,
      title: isHi ? 'आप चुनते हैं' : 'You Choose',
      desc: isHi
        ? 'तय करें कि हम कौन सा डेटा उपयोग कर सकते हैं।'
        : 'Decide exactly what data we can use — nothing more.',
    },
    {
      icon: <Eye className="w-5 h-5 text-youtube-red" />,
      title: isHi ? 'पूर्ण पारदर्शिता' : 'Full Transparency',
      desc: isHi
        ? 'हम स्पष्ट रूप से बताते हैं कि हम डेटा का उपयोग क्यों करते हैं।'
        : 'We clearly explain why we collect each piece of data.',
    },
    {
      icon: <Trash2 className="w-5 h-5 text-youtube-red" />,
      title: isHi ? 'आसान नियंत्रण' : 'Easy Control',
      desc: isHi
        ? 'कभी भी सहमति बदलें या अपना डेटा हटाएं।'
        : 'Change your mind or delete your data at any time.',
    },
  ];

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="max-w-2xl mx-auto w-full space-y-8 py-4"
    >
      {/* Hero */}
      <motion.div variants={item} className="text-center space-y-4">
        {/* YouTube logo mark */}
        <div className="flex justify-center">
          <div className="relative">
            <div className="w-16 h-16 bg-youtube-red rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-white text-3xl">▶</span>
            </div>
            <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-white text-[8px] font-black px-1.5 py-0.5 rounded-full">
              DPDP
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
            {isHi ? 'आपकी गोपनीयता मायने रखती है' : 'Your Privacy Matters'}
          </h1>
          <p className="text-base text-gray-500 max-w-md mx-auto leading-relaxed">
            {isHi
              ? 'आप अपने व्यक्तिगत डेटा के नियंत्रण में हैं। यह प्रोटोटाइप दर्शाता है कि YouTube भारत के DPDP अधिनियम 2023 के अनुपालन में एक पारदर्शी गोपनीयता अनुभव कैसे प्रदान कर सकता है।'
              : "You're in control of your personal data. This prototype shows how YouTube could deliver a transparent, user-friendly privacy experience while complying with India's Digital Personal Data Protection (DPDP) Act, 2023."}
          </p>
          <div className="flex justify-center">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-full">
              🇮🇳 {isHi ? 'DPDP अधिनियम 2023 के अनुरूप' : "Designed for India's DPDP Act 2023"}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Three Pillars */}
      <motion.div variants={item} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {pillars.map((p, i) => (
          <div
            key={i}
            className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
          >
            <div className="w-9 h-9 bg-red-50 rounded-xl flex items-center justify-center mb-3">
              {p.icon}
            </div>
            <h3 className="font-bold text-gray-900 text-sm mb-1">{p.title}</h3>
            <p className="text-xs text-gray-500 leading-relaxed">{p.desc}</p>
          </div>
        ))}
      </motion.div>

      {/* Age Check CTA */}
      <motion.div variants={item} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-4">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-youtube-red" />
          <h2 className="font-bold text-gray-900 text-base">
            {isHi ? 'शुरू करने से पहले' : 'Before we begin'}
          </h2>
        </div>
        <p className="text-sm text-gray-500">
          {isHi
            ? 'आपकी उम्र हमें सही गोपनीयता सुरक्षा प्रदान करने में मदद करती है।'
            : 'Telling us your age group helps us provide the right privacy protections for you.'}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            onClick={() => navigate('/consent')}
            className="group flex flex-col items-center p-4 bg-gray-50 hover:bg-youtube-red hover:text-white border border-gray-200 hover:border-youtube-red rounded-xl transition-all duration-200 text-gray-700"
          >
            <span className="text-2xl mb-1">🧑</span>
            <span className="font-bold text-sm">{isHi ? '18 वर्ष या अधिक' : '18 or older'}</span>
            <span className="text-xs opacity-70 mt-0.5">{isHi ? 'मानक गोपनीयता' : 'Standard privacy settings'}</span>
          </button>
          <button
            onClick={() => navigate('/child-verification')}
            className="group flex flex-col items-center p-4 bg-gray-50 hover:bg-blue-600 hover:text-white border border-gray-200 hover:border-blue-500 rounded-xl transition-all duration-200 text-gray-700"
          >
            <span className="text-2xl mb-1">🧒</span>
            <span className="font-bold text-sm">{isHi ? '18 वर्ष से कम' : 'Under 18'}</span>
            <span className="text-xs opacity-70 mt-0.5">{isHi ? 'बच्चों की सुरक्षा' : 'Enhanced protection for minors'}</span>
          </button>
        </div>

        <p className="text-center">
          <button
            onClick={() => navigate('/consent')}
            className="text-xs text-gray-400 hover:text-gray-600 underline underline-offset-2"
          >
            {isHi ? 'छोड़ें और जारी रखें' : 'Skip and continue with default settings'}
          </button>
        </p>
      </motion.div>

      {/* PM Dashboard link */}
      <motion.p variants={item} className="text-center">
        <button
          onClick={() => navigate('/pm-dashboard')}
          className="text-xs font-semibold text-youtube-red hover:text-youtube-darkRed underline-offset-2 hover:underline transition-colors"
        >
          📊 {isHi ? 'PM डैशबोर्ड देखें →' : 'View PM Analytics Dashboard →'}
        </button>
      </motion.p>
    </motion.div>
  );
};
