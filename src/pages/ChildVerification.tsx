import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { ShieldCheck, Lock, CheckCircle, ArrowRight, Baby } from 'lucide-react';
import { usePrivacy } from '../context/PrivacyContext';

export const ChildVerification: React.FC = () => {
  const navigate = useNavigate();
  const { setAgeGroup, setParentVerified, language } = usePrivacy();
  const isHi = language === 'hi';

  const [step, setStep] = useState<'info' | 'verify' | 'done'>('info');
  const [parentName, setParentName] = useState('');
  const [agreed, setAgreed] = useState(false);

  const container: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };
  const itemV: Variants = {
    hidden: { opacity: 0, y: 14 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 90, damping: 18 } },
  };

  const handleVerify = () => {
    if (!parentName.trim() || !agreed) return;
    setStep('done');
  };

  const handleContinue = () => {
    setAgeGroup('minor');
    setParentVerified(true);
    navigate('/consent');
  };

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="max-w-lg mx-auto w-full space-y-6 py-2">

      {step === 'info' && (
        <>
          <motion.div variants={itemV} className="text-center space-y-3">
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center">
                <Baby className="w-8 h-8 text-blue-600" />
              </div>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900">
              {isHi ? 'बाल खाता सुरक्षा' : 'Child Account Protection'}
            </h1>
            <p className="text-sm text-gray-500 max-w-sm mx-auto leading-relaxed">
              {isHi
                ? 'भारत के DPDP अधिनियम 2023 के अनुसार, 18 वर्ष से कम आयु के उपयोगकर्ताओं के लिए माता-पिता की सत्यापन आवश्यक है।'
                : "Under India's DPDP Act 2023, users under 18 require parental consent for data processing. We've made it simple."}
            </p>
          </motion.div>

          <motion.div variants={itemV} className="space-y-3">
            {[
              {
                icon: '🚫',
                title: isHi ? 'व्यक्तिगत विज्ञापन बंद' : 'Personalised Ads Disabled',
                desc: isHi ? 'बच्चों को कभी भी targeted ads नहीं दिखाए जाते।' : 'Children are never shown targeted advertisements — ever.',
              },
              {
                icon: '📍',
                title: isHi ? 'स्थान ट्रैकिंग बंद' : 'Location Tracking Off',
                desc: isHi ? 'स्थान डेटा एकत्र नहीं किया जाता।' : 'Location data is not collected for minor accounts.',
              },
              {
                icon: '🛡️',
                title: isHi ? 'सीमित व्यक्तिगतकरण' : 'Limited Personalisation',
                desc: isHi ? 'केवल सुरक्षित और उचित सामग्री दिखाई जाती है।' : 'Only age-appropriate content is recommended.',
              },
              {
                icon: '🇮🇳',
                title: isHi ? 'DPDP अनुपालन' : 'DPDP Act Compliant',
                desc: isHi ? 'धारा 9 के तहत बाल डेटा संरक्षण।' : 'Fully compliant with Section 9 of India\'s DPDP Act 2023.',
              },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 bg-blue-50 border border-blue-100 rounded-xl px-4 py-3">
                <span className="text-xl flex-shrink-0 mt-0.5">{item.icon}</span>
                <div>
                  <p className="font-bold text-blue-900 text-sm">{item.title}</p>
                  <p className="text-xs text-blue-700 mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </motion.div>

          <motion.div variants={itemV} className="flex justify-end">
            <button
              onClick={() => setStep('verify')}
              className="flex items-center gap-2 px-7 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-bold text-sm shadow-sm hover:shadow-md transition-all"
            >
              <Lock className="w-4 h-4" />
              {isHi ? 'माता-पिता का सत्यापन →' : 'Parent Verification →'}
            </button>
          </motion.div>
        </>
      )}

      {step === 'verify' && (
        <>
          <motion.div variants={itemV} className="text-center space-y-2">
            <div className="flex justify-center">
              <div className="w-14 h-14 bg-amber-100 rounded-2xl flex items-center justify-center">
                <Lock className="w-7 h-7 text-amber-600" />
              </div>
            </div>
            <h1 className="text-2xl font-black text-gray-900">
              {isHi ? 'माता-पिता की सत्यापन' : 'Parent Verification'}
            </h1>
            <p className="text-sm text-gray-500">
              {isHi
                ? 'यह एक mock सत्यापन है — कोई real डेटा संग्रहीत नहीं होता।'
                : 'This is a mock verification step — no real data is stored or transmitted.'}
            </p>
          </motion.div>

          <motion.div variants={itemV} className="bg-white border border-gray-200 rounded-2xl p-6 space-y-4 shadow-sm">
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-gray-700">
                {isHi ? "माता-पिता / अभिभावक का नाम" : "Parent / Guardian Name"}
              </label>
              <input
                type="text"
                value={parentName}
                onChange={e => setParentName(e.target.value)}
                placeholder={isHi ? "उदाहरण: रमेश शर्मा" : "e.g. Ramesh Sharma"}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition"
              />
            </div>

            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={agreed}
                onChange={e => setAgreed(e.target.checked)}
                className="mt-0.5 w-4 h-4 accent-blue-600 cursor-pointer"
              />
              <span className="text-xs text-gray-600 leading-relaxed">
                {isHi
                  ? 'मैं पुष्टि करता/करती हूं कि मैं इस बच्चे का माता-पिता / कानूनी अभिभावक हूं और DPDP अधिनियम 2023 की धारा 9 के तहत डेटा प्रसंस्करण की सहमति देता/देती हूं।'
                  : 'I confirm I am the parent / legal guardian of this child and consent to data processing as permitted under Section 9 of India\'s DPDP Act 2023.'}
              </span>
            </label>

            <button
              onClick={handleVerify}
              disabled={!parentName.trim() || !agreed}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-full font-bold text-sm transition-all"
            >
              {isHi ? 'सत्यापित करें' : 'Verify & Continue'}
            </button>
          </motion.div>
        </>
      )}

      {step === 'done' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center space-y-6"
        >
          <div className="flex justify-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
              className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center border-2 border-emerald-400"
            >
              <CheckCircle className="w-10 h-10 text-emerald-600" />
            </motion.div>
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-black text-gray-900">
              {isHi ? 'सत्यापन सफल!' : 'Verification Successful!'}
            </h2>
            <p className="text-sm text-gray-500 max-w-xs mx-auto">
              {isHi
                ? `${parentName} ने सफलतापूर्वक सत्यापित किया है। बाल सुरक्षा मोड सक्रिय है।`
                : `${parentName} has been verified. Child protection mode is now active.`}
            </p>
          </div>

          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 text-left space-y-2">
            <p className="text-xs font-bold text-blue-800 mb-2">
              {isHi ? 'सक्रिय सुरक्षाएं:' : 'Active protections:'}
            </p>
            {[
              isHi ? '✓ व्यक्तिगत विज्ञापन: बंद' : '✓ Personalised Ads: Disabled',
              isHi ? '✓ स्थान ट्रैकिंग: बंद' : '✓ Location Tracking: Disabled',
              isHi ? '✓ सीमित व्यक्तिगतकरण: सक्रिय' : '✓ Limited Personalisation: Active',
              isHi ? '✓ DPDP धारा 9: अनुपालित' : '✓ DPDP Section 9: Compliant',
            ].map((line, i) => (
              <p key={i} className="text-xs text-blue-700 font-medium">{line}</p>
            ))}
          </div>

          <button
            onClick={handleContinue}
            className="flex items-center gap-2 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-bold text-sm shadow-sm hover:shadow-md transition-all mx-auto"
          >
            <ShieldCheck className="w-4 h-4" />
            {isHi ? 'सुरक्षित रूप से जारी रखें' : 'Continue Safely'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </motion.div>
  );
};
