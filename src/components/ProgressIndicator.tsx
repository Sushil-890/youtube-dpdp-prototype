import React from 'react';
import { useLocation } from 'react-router-dom';
import { usePrivacy } from '../context/PrivacyContext';

export const ProgressIndicator: React.FC = () => {
  const location = useLocation();
  const { language } = usePrivacy();

  const getProgressState = () => {
    const path = location.pathname;
    if (path === '/') return { percentage: 12, step: 0 };
    if (path === '/consent') return { percentage: 30, step: 1 };
    if (path === '/age-check') return { percentage: 25, step: 1 };
    if (path === '/child-verification') return { percentage: 35, step: 1 };
    if (path === '/privacy-center') return { percentage: 55, step: 2 };
    if (path === '/privacy-summary') return { percentage: 72, step: 3 };
    if (path === '/my-data') return { percentage: 85, step: 3 };
    if (path.startsWith('/delete-confirm')) return { percentage: 90, step: 3 };
    if (path === '/success') return { percentage: 100, step: 4 };
    if (path === '/pm-dashboard') return { percentage: 100, step: 4 };
    return { percentage: 0, step: -1 };
  };

  const { percentage, step } = getProgressState();

  if (step === -1) return null;

  const stepsLabels = {
    en: ['Welcome', 'Choose Settings', 'Review', 'Your Data', 'Done!'],
    hi: ['स्वागत', 'सेटिंग्स चुनें', 'समीक्षा करें', 'आपका डेटा', 'पूर्ण!'],
  };

  const labels = stepsLabels[language];

  return (
    <div className="w-full bg-white border-b border-youtube-border px-4 py-3 sm:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Progress Bar */}
        <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden mb-3">
          <div
            className="bg-youtube-red h-full rounded-full transition-all duration-700 ease-out"
            style={{ width: `${percentage}%` }}
          />
        </div>

        {/* Step Labels */}
        <div className="flex justify-between text-[10px] sm:text-[11px] font-medium text-youtube-gray select-none">
          {labels.map((label, idx) => {
            const isCompleted = idx < step;
            const isCurrent = idx === step;
            return (
              <div
                key={label}
                className={`flex flex-col items-center gap-0.5 transition-all duration-300 ${
                  isCurrent ? 'text-youtube-red' : isCompleted ? 'text-emerald-600' : 'text-gray-300'
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-all duration-300 border-2 ${
                    isCurrent
                      ? 'bg-youtube-red border-youtube-red text-white shadow-md scale-110'
                      : isCompleted
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-600'
                      : 'bg-gray-50 border-gray-200 text-gray-300'
                  }`}
                >
                  {isCompleted ? '✓' : idx + 1}
                </div>
                <span className="hidden sm:inline font-semibold">{label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
