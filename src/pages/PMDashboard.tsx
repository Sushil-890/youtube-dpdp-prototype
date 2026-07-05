import React, { useState } from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { BarChart3, TrendingUp, ShieldCheck, Download, Trash2, Baby, Clock } from 'lucide-react';

// ─── Mock data ────────────────────────────────────────────────
const TREND_DATA = [62, 65, 67, 70, 69, 72, 74, 76, 75, 78, 80, 82, 81, 84, 86, 87, 86, 88, 89, 91, 90, 92, 93, 94, 93, 94, 95, 94, 94, 94];

const REGIONS = ['All India', 'North', 'South', 'West', 'East', 'Central'];
const PLATFORMS = ['All Platforms', 'Android', 'iOS', 'Web', 'Smart TV'];
const AGE_GROUPS = ['All Ages', '13–17', '18–24', '25–34', '35–44', '45+'];

const KPI_CARDS = [
  {
    icon: <ShieldCheck className="w-5 h-5" />,
    label: 'Valid Consent Rate',
    value: '94%',
    change: '+2.1%',
    positive: true,
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
  },
  {
    icon: <BarChart3 className="w-5 h-5" />,
    label: 'Privacy Center Adoption',
    value: '38%',
    change: '+5.4%',
    positive: true,
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    border: 'border-blue-200',
  },
  {
    icon: <Download className="w-5 h-5" />,
    label: 'Data Download Requests',
    value: '2,341',
    change: '+18.2%',
    positive: true,
    color: 'text-purple-600',
    bg: 'bg-purple-50',
    border: 'border-purple-200',
  },
  {
    icon: <Trash2 className="w-5 h-5" />,
    label: 'Data Deletion Requests',
    value: '612',
    change: '-3.1%',
    positive: false,
    color: 'text-red-600',
    bg: 'bg-red-50',
    border: 'border-red-200',
  },
  {
    icon: <Baby className="w-5 h-5" />,
    label: 'Child Accounts Verified',
    value: '18,220',
    change: '+11.7%',
    positive: true,
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
  },
  {
    icon: <Clock className="w-5 h-5" />,
    label: 'Avg. Consent Completion',
    value: '42 sec',
    change: '-8.3%',
    positive: true,
    color: 'text-teal-600',
    bg: 'bg-teal-50',
    border: 'border-teal-200',
  },
];

const CONSENT_BREAKDOWN = [
  { label: 'Watch History', enabled: 87, color: '#EF4444' },
  { label: 'Search History', enabled: 81, color: '#3B82F6' },
  { label: 'Personalised Ads', enabled: 63, color: '#F59E0B' },
  { label: 'Location', enabled: 74, color: '#10B981' },
];

// ─── Tiny sparkline component ──────────────────────────────────
const Sparkline: React.FC<{ data: number[]; color: string }> = ({ data, color }) => {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const w = 300;
  const h = 60;
  const pts = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * w;
      const y = h - ((v - min) / range) * (h - 8) - 4;
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-16" preserveAspectRatio="none">
      <polyline fill="none" stroke={color} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" points={pts} />
      <polyline
        fill={`${color}18`}
        stroke="none"
        points={`0,${h} ${pts} ${w},${h}`}
      />
    </svg>
  );
};

// ─── Bar chart for consent breakdown ─────────────────────────
const ConsentBar: React.FC<{ label: string; pct: number; color: string; delay: number }> = ({ label, pct, color, delay }) => (
  <div className="space-y-1.5">
    <div className="flex items-center justify-between text-xs">
      <span className="font-semibold text-gray-700">{label}</span>
      <span className="font-bold text-gray-900">{pct}%</span>
    </div>
    <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${pct}%` }}
        transition={{ duration: 0.8, delay, ease: 'easeOut' }}
        className="h-full rounded-full"
        style={{ backgroundColor: color }}
      />
    </div>
  </div>
);

// ─── Main component ────────────────────────────────────────────
export const PMDashboard: React.FC = () => {
  const [region, setRegion] = useState('All India');
  const [platform, setPlatform] = useState('All Platforms');
  const [ageGroup, setAgeGroup] = useState('All Ages');

  const container: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.07 } },
  };
  const itemV: Variants = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 90, damping: 18 } },
  };

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="w-full max-w-5xl mx-auto space-y-6 py-2">

      {/* Header */}
      <motion.div variants={itemV} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <BarChart3 className="w-5 h-5 text-youtube-red" />
            <h1 className="text-xl sm:text-2xl font-black text-gray-900">PM Analytics Dashboard</h1>
            <span className="text-[10px] font-bold text-gray-500 bg-gray-100 border border-gray-200 px-2 py-0.5 rounded-full">Internal View</span>
          </div>
          <p className="text-xs text-gray-500">Real-time consent health metrics · India DPDP Act 2023 Compliance · Mock Data</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-full animate-pulse">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
            Live
          </span>
          <span className="text-xs text-gray-400 hidden sm:inline">Last updated: just now</span>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div variants={itemV} className="flex flex-wrap gap-2">
        {[
          { label: 'Region', value: region, options: REGIONS, setter: setRegion },
          { label: 'Platform', value: platform, options: PLATFORMS, setter: setPlatform },
          { label: 'Age Group', value: ageGroup, options: AGE_GROUPS, setter: setAgeGroup },
        ].map(f => (
          <div key={f.label} className="flex items-center gap-1.5 bg-white border border-gray-200 rounded-full px-3 py-1.5 shadow-sm">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">{f.label}</span>
            <select
              value={f.value}
              onChange={e => f.setter(e.target.value)}
              className="text-xs font-semibold text-gray-700 bg-transparent border-none outline-none cursor-pointer pr-1"
            >
              {f.options.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>
        ))}
        <div className="flex items-center gap-1 text-[10px] text-gray-400 ml-1 self-center">
          <TrendingUp className="w-3 h-3" />
          Filters affect display only (mock prototype)
        </div>
      </motion.div>

      {/* KPI Cards */}
      <motion.div variants={itemV} className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {KPI_CARDS.map((kpi, i) => (
          <motion.div
            key={i}
            variants={itemV}
            whileHover={{ scale: 1.02, y: -2 }}
            className={`bg-white border ${kpi.border} rounded-2xl p-4 shadow-sm hover:shadow-md transition-all`}
          >
            <div className={`${kpi.bg} ${kpi.color} w-9 h-9 rounded-xl flex items-center justify-center mb-3`}>
              {kpi.icon}
            </div>
            <div className="text-2xl font-black text-gray-900">{kpi.value}</div>
            <div className="text-xs text-gray-500 mt-0.5 leading-tight">{kpi.label}</div>
            <div className={`text-[11px] font-bold mt-1.5 ${kpi.positive ? 'text-emerald-600' : 'text-red-500'}`}>
              {kpi.change} vs last month
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Charts row */}
      <motion.div variants={itemV} className="grid grid-cols-1 lg:grid-cols-2 gap-4">

        {/* Consent trend */}
        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-gray-900 text-sm">Consent Rate Trend</h3>
              <p className="text-[11px] text-gray-400 mt-0.5">Last 30 days · Valid consents %</p>
            </div>
            <div className="text-right">
              <div className="text-xl font-black text-gray-900">94%</div>
              <div className="text-[11px] font-bold text-emerald-600">↑ +2.1%</div>
            </div>
          </div>
          <Sparkline data={TREND_DATA} color="#EF4444" />
          <div className="flex justify-between text-[10px] text-gray-400 mt-1">
            <span>Jun 5</span>
            <span>Jun 19</span>
            <span>Jul 5</span>
          </div>
        </div>

        {/* Consent by category */}
        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
          <h3 className="font-bold text-gray-900 text-sm mb-1">Consent Rate by Category</h3>
          <p className="text-[11px] text-gray-400 mb-4">% of users who have enabled each category</p>
          <div className="space-y-4">
            {CONSENT_BREAKDOWN.map((c, i) => (
              <ConsentBar key={c.label} label={c.label} pct={c.enabled} color={c.color} delay={i * 0.1} />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Bottom row */}
      <motion.div variants={itemV} className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* Consent funnel */}
        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm space-y-3">
          <h3 className="font-bold text-gray-900 text-sm">Consent Funnel</h3>
          <p className="text-[11px] text-gray-400">User drop-off at each step</p>
          {[
            { step: 'Welcome Screen', users: '1,24,500', pct: 100 },
            { step: 'Consent Page', users: '1,18,200', pct: 95 },
            { step: 'Privacy Center', users: '47,200', pct: 38 },
            { step: 'Summary Review', users: '44,800', pct: 36 },
            { step: 'Confirmed & Saved', users: '42,100', pct: 34 },
          ].map((row, i) => (
            <div key={i} className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-gray-600 font-medium">{row.step}</span>
                <span className="font-bold text-gray-800">{row.users}</span>
              </div>
              <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${row.pct}%` }}
                  transition={{ duration: 0.7, delay: i * 0.08 }}
                  className="h-full bg-youtube-red rounded-full"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Platform breakdown */}
        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm space-y-3">
          <h3 className="font-bold text-gray-900 text-sm">Platform Breakdown</h3>
          <p className="text-[11px] text-gray-400">Consent interactions by surface</p>
          {[
            { platform: 'Android', pct: 52, color: '#3DDC84' },
            { platform: 'Web', pct: 27, color: '#4285F4' },
            { platform: 'iOS', pct: 14, color: '#A2AAAD' },
            { platform: 'Smart TV', pct: 7, color: '#FF6D00' },
          ].map((row, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: row.color }} />
              <div className="flex-1">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-600 font-medium">{row.platform}</span>
                  <span className="font-bold text-gray-800">{row.pct}%</span>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${row.pct}%` }}
                    transition={{ duration: 0.7, delay: i * 0.08 }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: row.color }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Insights */}
        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm space-y-3">
          <h3 className="font-bold text-gray-900 text-sm">PM Insights</h3>
          <p className="text-[11px] text-gray-400">Auto-generated observations</p>
          {[
            { emoji: '📈', text: 'Consent rate up 2.1% after redesigned consent cards with "Learn More" sections.' },
            { emoji: '🛡️', text: '18,220 child accounts verified — DPDP Section 9 compliance strong.' },
            { emoji: '⚡', text: 'Average completion time dropped from 57s to 42s after UX simplification.' },
            { emoji: '📍', text: 'Location consent lowest at 74% — consider clearer value proposition copy.' },
            { emoji: '📱', text: 'Android has 52% of consent interactions — prioritise mobile-first improvements.' },
          ].map((ins, i) => (
            <div key={i} className="flex items-start gap-2 text-xs text-gray-600">
              <span className="flex-shrink-0 text-base leading-none mt-0.5">{ins.emoji}</span>
              <span className="leading-relaxed">{ins.text}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Footer note */}
      <motion.div variants={itemV} className="text-center">
        <p className="text-[11px] text-gray-400 bg-white border border-gray-100 rounded-xl px-4 py-2.5 inline-block shadow-sm">
          📊 All data is mock / illustrative · This dashboard is an internal PM tool, not visible to end users · Vedantu PM Internship Case Study
        </p>
      </motion.div>
    </motion.div>
  );
};
