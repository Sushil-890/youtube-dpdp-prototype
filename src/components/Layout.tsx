import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, BarChart3 } from 'lucide-react';
import { Header } from './Header';
import { ProgressIndicator } from './ProgressIndicator';
import { usePrivacy } from '../context/PrivacyContext';

interface LayoutProps {
  children: React.ReactNode;
}

const HIDE_BACK = ['/', '/age-check'];
const HIDE_PROGRESS = ['/pm-dashboard'];

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { language } = usePrivacy();

  const showBack = !HIDE_BACK.includes(location.pathname);
  const showProgress = !HIDE_PROGRESS.includes(location.pathname);
  const isPMDashboard = location.pathname === '/pm-dashboard';

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      {showProgress && <ProgressIndicator />}

      <main className="flex-1 flex flex-col max-w-5xl w-full mx-auto px-4 py-6 sm:px-6">
        {/* Back + PM Dashboard nav */}
        {showBack && (
          <div className="mb-5 flex items-center justify-between">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-1.5 text-sm font-semibold text-gray-500 hover:text-gray-900 bg-white border border-gray-200 hover:border-gray-300 px-4 py-1.5 rounded-full shadow-sm transition-all hover:shadow"
              aria-label="Go back"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{language === 'en' ? 'Back' : 'वापस'}</span>
            </button>

            {/* PM Dashboard shortcut — only show outside PM Dashboard */}
            {!isPMDashboard && (
              <button
                onClick={() => navigate('/pm-dashboard')}
                className="flex items-center gap-1.5 text-xs font-bold text-white bg-youtube-dark hover:bg-gray-700 px-3.5 py-1.5 rounded-full shadow-sm transition-all"
                aria-label="Open PM Dashboard"
              >
                <BarChart3 className="w-3.5 h-3.5" />
                <span>PM Dashboard</span>
              </button>
            )}
          </div>
        )}

        <div className="flex-1 flex flex-col justify-center">
          {children}
        </div>
      </main>

      {/* Footer — hidden on PM Dashboard */}
      {!isPMDashboard && (
        <footer className="bg-white border-t border-gray-100 py-6 mt-8">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-gray-500">
              <div className="space-y-1.5">
                <p className="font-bold text-gray-700 text-sm">Data Fiduciary</p>
                <p>Google India Pvt. Ltd.</p>
                <p className="text-[10px] text-gray-400">Registered with MeitY, Govt. of India</p>
              </div>
              <div className="space-y-1.5">
                <p className="font-bold text-gray-700 text-sm">Your Rights (DPDP Act 2023)</p>
                <ul className="space-y-0.5 text-[10px] text-gray-400">
                  <li>• Withdraw consent anytime (Sec 6)</li>
                  <li>• Access your data (Sec 11)</li>
                  <li>• Delete your data (Sec 12)</li>
                  <li>• File a grievance (Sec 13)</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-3 rounded-xl border border-gray-100 space-y-1.5">
                <p className="font-bold text-gray-700 text-sm">Grievance Officer</p>
                <p className="text-gray-600">Ms. Priya Sharma</p>
                <p className="font-mono text-[10px]">grievance-india@google.com</p>
                <span className="inline-block text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                  Response within 7 days
                </span>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-gray-100 text-center text-[10px] text-gray-400">
              © {new Date().getFullYear()} YouTube India · DPDP Act 2023 Compliance Portal ·{' '}
              <span className="font-semibold text-youtube-red">PM Case Study Prototype</span>
              {' '}· Vedantu PM Internship Assignment
            </div>
          </div>
        </footer>
      )}
    </div>
  );
};
