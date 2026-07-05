import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { usePrivacy } from '../context/PrivacyContext';
import { translations } from '../utils/translations';

export const Header: React.FC = () => {
  const { language, setLanguage } = usePrivacy();
  const t = translations[language];

  return (
    <header className="bg-white border-b border-youtube-border sticky top-0 z-40 px-4 py-3 sm:px-6 shadow-sm">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        {/* Branding */}
        <div className="flex items-center space-x-2">
          <div className="flex items-center justify-center w-10 h-7 bg-youtube-red rounded-lg text-white font-bold text-lg select-none">
            ▶
          </div>
          <div>
            <span className="font-bold text-xl tracking-tight text-youtube-dark">
              YouTube
            </span>
            <span className="text-xs ml-1.5 px-2 py-0.5 bg-youtube-lightRed text-youtube-red font-semibold rounded-full border border-red-100">
              Privacy
            </span>
          </div>
        </div>

        {/* DPDP Compliance and Language Selector */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          <div className="hidden md:flex items-center text-xs font-semibold bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-full border border-emerald-200 shadow-sm animate-pulse">
            <ShieldCheck className="w-4.5 h-4.5 mr-1 text-emerald-600" />
            {t.complianceBadge}
          </div>

          <div className="flex items-center bg-youtube-lightGray border border-youtube-border rounded-full p-0.5">
            <button
              onClick={() => setLanguage('en')}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                language === 'en'
                  ? 'bg-white text-youtube-dark shadow-sm'
                  : 'text-youtube-gray hover:text-youtube-dark'
              }`}
              aria-label="Switch to English"
            >
              EN
            </button>
            <button
              onClick={() => setLanguage('hi')}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                language === 'hi'
                  ? 'bg-white text-youtube-dark shadow-sm'
                  : 'text-youtube-gray hover:text-youtube-dark'
              }`}
              aria-label="हिंदी में बदलें"
            >
              हिं
            </button>
          </div>
        </div>
      </div>
      
      {/* Small mobile compliance indicator */}
      <div className="max-w-4xl mx-auto mt-2 flex md:hidden items-center justify-center text-[10px] font-semibold bg-emerald-50 text-emerald-700 py-1 rounded border border-emerald-100">
        <ShieldCheck className="w-3.5 h-3.5 mr-1 text-emerald-600" />
        {t.complianceBadge}
      </div>
    </header>
  );
};
