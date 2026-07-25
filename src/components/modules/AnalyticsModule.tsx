import React from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { FLEET_UTILIZATION_DATA, MOCK_MAINTENANCE_CHART } from '../../data/fleetData';
import { BarChart3, TrendingUp, Anchor, ShieldCheck, Gauge, Zap } from 'lucide-react';

export const AnalyticsModule: React.FC = () => {
  return (
    <div className="space-y-5 pb-8">
      {/* Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-teal-50 border border-teal-200 flex items-center justify-center">
            <BarChart3 className="w-5 h-5 text-teal-600" />
          </div>
          <div>
            <h2 className="text-base font-extrabold text-slate-800">Advanced Fleet Analytics</h2>
            <p className="text-xs text-slate-500 font-medium">Operational efficiency metrics, fleet utilization, and predictive insights</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-xl border border-emerald-200">
            Overall Fleet Efficiency: 94.2%
          </span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 p-4 rounded-2xl space-y-1 shadow-xs">
          <span className="text-[10px] font-bold text-slate-400 uppercase">AVG FLEET UTILIZATION</span>
          <div className="text-2xl font-black text-slate-900">85.4%</div>
          <p className="text-[10px] text-emerald-600 font-bold flex items-center gap-1"><TrendingUp className="w-3 h-3" /> +2.3% vs target (85%)</p>
        </div>
        <div className="bg-white border border-slate-200 p-4 rounded-2xl space-y-1 shadow-xs">
          <span className="text-[10px] font-bold text-slate-400 uppercase">UNPLANNED DOWNTIME</span>
          <div className="text-2xl font-black text-teal-700">1.2 Days</div>
          <p className="text-[10px] text-emerald-600 font-bold">-0.8 days vs last quarter</p>
        </div>
        <div className="bg-white border border-slate-200 p-4 rounded-2xl space-y-1 shadow-xs">
          <span className="text-[10px] font-bold text-slate-400 uppercase">FUEL EFFICIENCY SCORE</span>
          <div className="text-2xl font-black text-sky-600">92 / 100</div>
          <p className="text-[10px] text-slate-500">CII & EEXI Compliant</p>
        </div>
        <div className="bg-white border border-slate-200 p-4 rounded-2xl space-y-1 shadow-xs">
          <span className="text-[10px] font-bold text-slate-400 uppercase">SAFETY INCIDENTS</span>
          <div className="text-2xl font-black text-emerald-600">0 LTIs</div>
          <p className="text-[10px] text-emerald-600 font-bold">180 Days Incident-Free</p>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-6 bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
          <h3 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider mb-4">FLEET UTILIZATION RATE (%)</h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={FLEET_UTILIZATION_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} />
              <YAxis domain={[70, 100]} tick={{ fontSize: 11, fill: '#94a3b8' }} />
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 12, border: '1px solid #e2e8f0' }} />
              <Line type="monotone" dataKey="utilization" stroke="#0ea5e9" strokeWidth={2.5} dot={{ r: 4 }} name="Utilization %" />
              <Line type="monotone" dataKey="target" stroke="#94a3b8" strokeDasharray="4 4" strokeWidth={1.5} dot={false} name="Target %" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="lg:col-span-6 bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
          <h3 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider mb-4">MAINTENANCE TASK COMPLETION</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={MOCK_MAINTENANCE_CHART} barSize={16}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} />
              <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} />
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 12, border: '1px solid #e2e8f0' }} />
              <Bar dataKey="completed" fill="#10b981" radius={[4, 4, 0, 0]} name="Completed" />
              <Bar dataKey="inProgress" fill="#0ea5e9" radius={[4, 4, 0, 0]} name="In Progress" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
