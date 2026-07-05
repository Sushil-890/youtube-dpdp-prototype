import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { Download, Trash2, History } from 'lucide-react';
import { usePrivacy } from '../context/PrivacyContext';
import { translations } from '../utils/translations';

export const MyData: React.FC = () => {
  const navigate = useNavigate();
  const { language, auditLogs, resetAll } = usePrivacy();
  const t = translations[language];

  const actions = [
    {
      type: 'download',
      title: t.downloadTitle,
      desc: t.downloadDesc,
      icon: <Download className="w-5 h-5 text-emerald-600" />,
      color: 'bg-emerald-50 hover:bg-emerald-100/60 border-emerald-200 hover:border-emerald-300',
      textColor: 'text-emerald-700',
      btnText: language === 'en' ? 'Request Data Summary' : 'डेटा सारांश का अनुरोध करें',
    },
    {
      type: 'watch',
      title: t.deleteWatchTitle,
      desc: t.deleteWatchDesc,
      icon: <Trash2 className="w-5 h-5 text-youtube-red" />,
      color: 'bg-white hover:bg-youtube-lightRed/40 border-youtube-border hover:border-red-200',
      textColor: 'text-youtube-red',
      btnText: language === 'en' ? 'Erase Watch Logs' : 'देखने के लॉग मिटाएं',
    },
    {
      type: 'search',
      title: t.deleteSearchTitle,
      desc: t.deleteSearchDesc,
      icon: <Trash2 className="w-5 h-5 text-youtube-red" />,
      color: 'bg-white hover:bg-youtube-lightRed/40 border-youtube-border hover:border-red-200',
      textColor: 'text-youtube-red',
      btnText: language === 'en' ? 'Erase Search Queries' : 'खोज इतिहास मिटाएं',
    },
    {
      type: 'google',
      title: t.deleteGoogleTitle,
      desc: t.deleteGoogleDesc,
      icon: <Trash2 className="w-5 h-5 text-youtube-red" />,
      color: 'bg-red-50/50 hover:bg-red-50 border-red-200 hover:border-red-300',
      textColor: 'text-youtube-red',
      btnText: language === 'en' ? 'Erase All Service Data' : 'सभी सेवा डेटा मिटाएं',
    },
  ];

  // Animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 90 } },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-3xl mx-auto w-full space-y-8 my-2"
    >
      {/* Title */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-youtube-dark">
          {t.myDataTitle}
        </h2>
        <p className="text-sm text-youtube-gray max-w-xl mx-auto">
          {t.myDataSubtitle}
        </p>
      </div>

      {/* Grid of actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {actions.map((act, idx) => (
          <motion.div
            key={idx}
            variants={itemVariants}
            whileHover={{ scale: 1.01 }}
            className={`border rounded-2xl p-5 shadow-sm transition-all duration-200 flex flex-col justify-between ${act.color}`}
          >
            <div>
              <div className="flex items-center space-x-3 mb-2.5">
                <div className="p-2 bg-white rounded-xl shadow-sm">
                  {act.icon}
                </div>
                <h3 className="font-bold text-youtube-dark text-sm sm:text-base">
                  {act.title}
                </h3>
              </div>
              <p className="text-xs text-youtube-gray leading-relaxed mb-4">
                {act.desc}
              </p>
            </div>

            <button
              onClick={() => navigate(`/delete-confirm/${act.type}`)}
              className={`w-full py-2 bg-white border font-bold text-xs rounded-full shadow-sm transition-all text-center select-none active:scale-98 ${
                act.type === 'download'
                  ? 'border-emerald-300 text-emerald-700 hover:bg-emerald-50'
                  : 'border-youtube-border text-youtube-red hover:bg-youtube-lightRed'
              }`}
            >
              {act.btnText}
            </button>
          </motion.div>
        ))}
      </div>

      {/* Audit Log Panel - Premium Feature */}
      <motion.div
        variants={itemVariants}
        className="bg-white border border-youtube-border rounded-2xl p-5 shadow-sm space-y-4"
      >
        <div className="flex items-center justify-between border-b border-youtube-border pb-3.5">
          <div className="space-y-1 text-left">
            <h3 className="font-bold text-youtube-dark text-base flex items-center">
              <History className="w-5 h-5 text-youtube-red mr-2" />
              {t.auditTitle}
            </h3>
            <p className="text-[10px] text-youtube-gray">
              {t.auditDesc}
            </p>
          </div>
          <button
            onClick={() => {
              if (window.confirm('Reset settings and clear the audit trail?')) {
                resetAll();
              }
            }}
            className="text-[10px] font-bold text-youtube-gray hover:text-youtube-red border border-youtube-border hover:border-red-200 px-3 py-1 rounded-full bg-youtube-lightGray hover:bg-youtube-lightRed transition-all"
          >
            {t.btnReset}
          </button>
        </div>

        {/* Audit Trail List */}
        <div className="overflow-x-auto max-h-60 overflow-y-auto pr-1">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-youtube-border text-youtube-gray bg-youtube-lightGray/40">
                <th className="py-2.5 px-3 font-semibold w-1/4">{t.auditAction}</th>
                <th className="py-2.5 px-3 font-semibold w-1/4">{t.auditTime}</th>
                <th className="py-2.5 px-3 font-semibold w-2/4">{t.auditDetails}</th>
              </tr>
            </thead>
            <tbody>
              {auditLogs.map((log) => (
                <tr key={log.id} className="border-b border-youtube-border/60 hover:bg-youtube-lightGray/20 transition-colors">
                  <td className="py-3 px-3 font-bold text-youtube-dark">
                    <span className={`inline-block px-2.5 py-0.5 rounded-full text-[9px] ${
                      log.action.includes('Erased') || log.action.includes('Reset')
                        ? 'bg-red-50 text-youtube-red border border-red-100'
                        : log.action.includes('Granted')
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                        : 'bg-blue-50 text-blue-700 border border-blue-100'
                    }`}>
                      {log.action}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-youtube-gray font-mono text-[10px]">{log.timestamp}</td>
                  <td className="py-3 px-3 text-youtube-gray text-[11px] leading-relaxed">{log.details}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  );
};
