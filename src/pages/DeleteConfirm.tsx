import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trash2, Download, AlertTriangle, Loader2 } from 'lucide-react';
import { usePrivacy } from '../context/PrivacyContext';
import { translations } from '../utils/translations';

export const DeleteConfirm: React.FC = () => {
  const { type } = useParams<{ type: string }>();
  const navigate = useNavigate();
  const { language, deleteData, downloadData } = usePrivacy();
  const t = translations[language];

  const [isProcessing, setIsProcessing] = useState(false);

  const getPageContent = () => {
    switch (type) {
      case 'download':
        return {
          title: language === 'en' ? 'Data Access & Summary Request' : 'डेटा पहुंच और सारांश अनुरोध',
          icon: <Download className="w-12 h-12 text-emerald-600 animate-bounce" />,
          warning: language === 'en' 
            ? 'Under Section 11 of the DPDP Act, you have the Right to obtain a summary of your personal data being processed. Downloading this package will include your profile meta-data, active settings, and verification logs.'
            : 'DPDP अधिनियम की धारा 11 के तहत, आपके पास संसाधित किए जा रहे अपने व्यक्तिगत डेटा का सारांश प्राप्त करने का अधिकार है। इस पैकेज को डाउनलोड करने में आपका प्रोफ़ाइल मेटा-डेटा, सक्रिय सेटिंग्स और सत्यापन लॉग शामिल होंगे।',
          description: language === 'en'
            ? 'We will generate a portable, machine-readable JSON data archive containing all active consent relationships and transaction trails.'
            : 'हम सभी सक्रिय सहमति संबंधों और लेनदेन के इतिहास को शामिल करते हुए एक पोर्टेबल, मशीन-पठनीय JSON डेटा संग्रह उत्पन्न करेंगे।',
          btnConfirmText: t.btnDownload,
          btnConfirmColor: 'bg-emerald-600 hover:bg-emerald-700 focus:ring-emerald-500',
          action: async () => {
            const dataUrl = await downloadData();
            // Trigger actual download in the browser
            const link = document.createElement('a');
            link.href = dataUrl;
            link.download = `youtube_dpdp_privacy_export_${Date.now()}.json`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }
        };
      case 'watch':
        return {
          title: language === 'en' ? 'Erase Watch History' : 'देखने का इतिहास मिटाएं',
          icon: <Trash2 className="w-12 h-12 text-youtube-red" />,
          warning: language === 'en'
            ? 'This will permanently delete your YouTube watch logs. You will lose personalized homepage recommendations and the ability to resume videos from where you left off.'
            : 'यह आपके YouTube देखने के लॉग को स्थायी रूप से हटा देगा। आप व्यक्तिगत होमपेज अनुशंसाएं खो देंगे और वीडियो को वहीं से फिर से शुरू नहीं कर पाएंगे जहां आपने छोड़ा था।',
          description: t.deleteWarning,
          btnConfirmText: t.btnDelete,
          btnConfirmColor: 'bg-youtube-red hover:bg-youtube-darkRed focus:ring-youtube-red',
          action: async () => {
            await deleteData('watch');
          }
        };
      case 'search':
        return {
          title: language === 'en' ? 'Erase Search History' : 'खोज इतिहास मिटाएं',
          icon: <Trash2 className="w-12 h-12 text-youtube-red" />,
          warning: language === 'en'
            ? 'This will permanently erase your YouTube searches. Search autocompletion will not be tailored to you, and search-based suggestions will be reset.'
            : 'यह आपके YouTube खोजों को स्थायी रूप से मिटा देगा। खोज स्वतः पूर्ण आपके लिए अनुकूलित नहीं होगी, और खोज-आधारित सुझावों को रीसेट कर दिया जाएगा।',
          description: t.deleteWarning,
          btnConfirmText: t.btnDelete,
          btnConfirmColor: 'bg-youtube-red hover:bg-youtube-darkRed focus:ring-youtube-red',
          action: async () => {
            await deleteData('search');
          }
        };
      case 'google':
        return {
          title: language === 'en' ? 'Erase All Google Service Logs' : 'सभी गूगल सेवा लॉग मिटाएं',
          icon: <AlertTriangle className="w-12 h-12 text-youtube-red animate-pulse" />,
          warning: language === 'en'
            ? 'CRITICAL WARNING: This simulates complete erasure of all personal data logs processed on YouTube. Your settings will be reset to consent-withdrawn (disabled) state.'
            : 'महत्वपूर्ण चेतावनी: यह YouTube पर संसाधित सभी व्यक्तिगत डेटा लॉग को पूरी तरह से मिटाने का अनुकरण करता है। आपकी सेटिंग्स सहमति-वापस (अक्षम) स्थिति में रीसेट हो जाएंगी।',
          description: language === 'en'
            ? 'This action cannot be undone. In compliance with DPDP Section 12, the Data Fiduciary will purge records from all primary and secondary database nodes.'
            : 'इस कार्रवाई को वापस नहीं लिया जा सकता। DPDP धारा 12 के अनुपालन में, डेटा फिड्यूशियरी सभी प्राथमिक और माध्यमिक डेटाबेस नोड्स से रिकॉर्ड साफ़ कर देगा।',
          btnConfirmText: language === 'en' ? 'Yes, Erase All My Data' : 'हाँ, मेरा सारा डेटा मिटाएं',
          btnConfirmColor: 'bg-youtube-red hover:bg-youtube-darkRed focus:ring-youtube-red',
          action: async () => {
            await deleteData('google');
          }
        };
      default:
        return null;
    }
  };

  const content = getPageContent();

  if (!content) {
    return (
      <div className="text-center p-8 bg-white border border-youtube-border rounded-2xl">
        <p className="text-sm text-youtube-gray">Invalid Action Type</p>
      </div>
    );
  }

  const handleConfirm = async () => {
    setIsProcessing(true);
    try {
      await content.action();
      navigate('/success', { state: { fromAction: type } });
    } catch (e) {
      console.error(e);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-xl mx-auto w-full bg-white rounded-3xl border border-youtube-border shadow-md overflow-hidden p-6 sm:p-10 my-4 space-y-6"
    >
      {/* Icon */}
      <div className="flex justify-center">
        <div className={`p-4 rounded-full ${type === 'download' ? 'bg-emerald-50' : 'bg-red-50'}`}>
          {content.icon}
        </div>
      </div>

      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-xl sm:text-2xl font-extrabold text-youtube-dark">
          {content.title}
        </h2>
        <p className="text-xs font-bold text-youtube-red bg-youtube-lightRed px-3 py-1 rounded inline-block">
          🇮🇳 {t.deleteConfirmTitle}
        </p>
      </div>

      {/* Warning Box */}
      <div className="bg-youtube-lightGray p-4 sm:p-5 rounded-2xl border border-youtube-border space-y-2 text-left">
        <p className="text-xs sm:text-sm font-semibold text-youtube-dark">
          {content.warning}
        </p>
        <p className="text-[11px] text-youtube-gray leading-relaxed pt-2 border-t border-youtube-border/60">
          {content.description}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3 pt-4 border-t border-youtube-border/60">
        <button
          onClick={() => navigate(-1)}
          disabled={isProcessing}
          className="px-5 py-2.5 bg-youtube-lightGray hover:bg-youtube-border border border-youtube-border text-youtube-dark rounded-full text-xs font-bold transition-all text-center select-none active:scale-98 disabled:opacity-50"
        >
          {t.btnCancel}
        </button>

        <button
          onClick={handleConfirm}
          disabled={isProcessing}
          className={`flex items-center justify-center space-x-2 px-6 py-2.5 text-white rounded-full text-xs font-bold shadow hover:shadow-md transition-all select-none active:scale-98 disabled:opacity-50 min-w-[140px] ${content.btnConfirmColor}`}
        >
          {isProcessing ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              <span>{t.deleteProgress.substring(0, 12)}...</span>
            </>
          ) : (
            <span>{content.btnConfirmText}</span>
          )}
        </button>
      </div>
    </motion.div>
  );
};
