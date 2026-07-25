import React, { useState } from 'react';
import { MOCK_SAVED_REPORTS } from '../../data/fleetData';
import { SavedReport } from '../../types';
import { FileBarChart, Download, FileText, FileSpreadsheet, Plus, CheckCircle2, Search } from 'lucide-react';

export const ReportsModule: React.FC = () => {
  const [reports, setReports] = useState<SavedReport[]>(MOCK_SAVED_REPORTS);
  const [search, setSearch] = useState('');
  const [notification, setNotification] = useState<string | null>(null);

  const filtered = reports.filter(r =>
    r.title.toLowerCase().includes(search.toLowerCase()) ||
    r.type.toLowerCase().includes(search.toLowerCase())
  );

  const formatIcon = (fmt: string) => {
    switch (fmt) {
      case 'PDF': return <FileText className="w-4 h-4 text-rose-500" />;
      case 'XLSX': return <FileSpreadsheet className="w-4 h-4 text-emerald-600" />;
      default: return <FileText className="w-4 h-4 text-sky-600" />;
    }
  };

  const handleDownload = (r: SavedReport) => {
    setNotification(`Report "${r.title}" downloaded (${r.format})`);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleGenerate = () => {
    const newRpt: SavedReport = {
      id: `RPT-${Date.now().toString().slice(-3)}`,
      title: 'Custom Fleet Performance Report',
      type: 'Executive',
      period: 'Jun 2024',
      generatedDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      generatedBy: 'Current User',
      format: 'PDF',
      size: '2.8 MB',
      status: 'Ready',
    };
    setReports(prev => [newRpt, ...prev]);
    setNotification('New report generated successfully!');
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <div className="space-y-5 pb-8">
      {notification && (
        <div className="fixed top-16 right-6 z-50 bg-emerald-600 text-white px-4 py-2.5 rounded-xl shadow-xl font-semibold text-xs flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="w-4 h-4" />{notification}
        </div>
      )}

      {/* Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-sky-50 border border-sky-200 flex items-center justify-center">
            <FileBarChart className="w-5 h-5 text-sky-600" />
          </div>
          <div>
            <h2 className="text-base font-extrabold text-slate-800">Maritime Reports Generator</h2>
            <p className="text-xs text-slate-500 font-medium">Standardized fleet reports, OPEX summaries & compliance archives</p>
          </div>
        </div>
        <button
          onClick={handleGenerate}
          className="bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl flex items-center gap-2 shadow-xs"
        >
          <Plus className="w-4 h-4" />Generate Report
        </button>
      </div>

      {/* Search */}
      <div className="bg-white border border-slate-200 p-4 rounded-2xl flex items-center justify-between shadow-xs">
        <div className="relative w-full max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search report title, type..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-teal-500 focus:bg-white"
          />
        </div>
        <span className="text-xs text-slate-500 font-mono">Total Saved Reports: <span className="text-teal-700 font-bold">{reports.length}</span></span>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(r => (
          <div key={r.id} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs space-y-3 hover:border-slate-300 transition-colors">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-slate-50 border border-slate-200">{formatIcon(r.format)}</div>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-xs">{r.title}</h3>
                  <p className="text-[10px] text-slate-400 font-mono">{r.id} • {r.size}</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
              <div>Type: <span className="font-bold text-slate-800">{r.type}</span></div>
              <div>Period: <span className="font-bold text-slate-800">{r.period}</span></div>
              <div>Generated: <span className="font-mono text-slate-700">{r.generatedDate}</span></div>
              <div>By: <span className="font-medium text-slate-700">{r.generatedBy}</span></div>
            </div>
            <div className="flex items-center justify-between pt-1 border-t border-slate-100">
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">{r.status}</span>
              <button
                onClick={() => handleDownload(r)}
                className="text-[10px] font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors"
              >
                <Download className="w-3 h-3 text-teal-600" />Download
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
