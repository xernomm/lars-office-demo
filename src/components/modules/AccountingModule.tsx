import React, { useState } from 'react';
import { MOCK_TRANSACTIONS } from '../../data/fleetData';
import { Transaction } from '../../types';
import { DollarSign, Search, Filter, ArrowUpRight, ArrowDownRight, CreditCard, Download, CheckCircle2 } from 'lucide-react';

export const AccountingModule: React.FC = () => {
  const [txns] = useState<Transaction[]>(MOCK_TRANSACTIONS);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [notification, setNotification] = useState<string | null>(null);

  const filtered = txns.filter(t => {
    const ms = t.description.toLowerCase().includes(search.toLowerCase()) ||
               t.category.toLowerCase().includes(search.toLowerCase()) ||
               (t.vesselName && t.vesselName.toLowerCase().includes(search.toLowerCase()));
    const mt = typeFilter === 'All' || t.type === typeFilter;
    return ms && mt;
  });

  const totalDebit = txns.filter(t => t.type === 'Debit').reduce((acc, t) => acc + t.amount, 0);
  const totalCredit = txns.filter(t => t.type === 'Credit').reduce((acc, t) => acc + t.amount, 0);

  const handleExport = () => {
    setNotification('Journal transactions exported to Excel (simulated)');
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
          <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center">
            <DollarSign className="w-5 h-5 text-emerald-600" />
          </div>
          <div>
            <h2 className="text-base font-extrabold text-slate-800">Financial Accounting & General Ledger</h2>
            <p className="text-xs text-slate-500 font-medium">Journal entries, OPEX/CAPEX tracking, debit & credit ledgers</p>
          </div>
        </div>
        <button
          onClick={handleExport}
          className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs px-4 py-2.5 rounded-xl flex items-center gap-2 border border-slate-200"
        >
          <Download className="w-4 h-4 text-teal-600" />Export Ledger
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-slate-200 p-4 rounded-2xl space-y-1 shadow-xs">
          <span className="text-[10px] font-bold text-slate-400 uppercase">TOTAL EXPENSES (DEBIT)</span>
          <div className="text-xl font-black text-rose-600">USD {totalDebit.toLocaleString()}</div>
          <p className="text-[10px] text-slate-500">Fleet Operations & Maintenance</p>
        </div>
        <div className="bg-white border border-slate-200 p-4 rounded-2xl space-y-1 shadow-xs">
          <span className="text-[10px] font-bold text-slate-400 uppercase">TOTAL REVENUE (CREDIT)</span>
          <div className="text-xl font-black text-emerald-600">USD {totalCredit.toLocaleString()}</div>
          <p className="text-[10px] text-slate-500">Charter Hire & Survey Fees</p>
        </div>
        <div className="bg-white border border-slate-200 p-4 rounded-2xl space-y-1 shadow-xs">
          <span className="text-[10px] font-bold text-slate-400 uppercase">NET BALANCE</span>
          <div className={`text-xl font-black ${(totalCredit - totalDebit) >= 0 ? 'text-teal-700' : 'text-rose-600'}`}>
            USD {(totalCredit - totalDebit).toLocaleString()}
          </div>
          <p className="text-[10px] text-slate-500">Current Period Cashflow</p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white border border-slate-200 p-4 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4 shadow-xs">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search description, category, vessel..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-teal-500 focus:bg-white"
          />
        </div>
        <div className="flex items-center gap-1.5">
          <Filter className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          {['All', 'Debit', 'Credit'].map(t => (
            <button
              key={t}
              onClick={() => setTypeFilter(t)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                typeFilter === t ? 'bg-teal-600 text-white' : 'bg-slate-50 text-slate-600 border border-slate-200'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 border-b border-slate-200 text-[10px] uppercase font-extrabold text-slate-500 tracking-wider">
              <tr>
                <th className="px-4 py-3">Date & Ref</th>
                <th className="px-4 py-3">Description</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Vessel</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3 text-right">Amount</th>
                <th className="px-4 py-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map(t => (
                <tr key={t.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3">
                    <span className="font-bold text-slate-900 block font-mono text-[11px]">{t.date}</span>
                    <span className="text-[10px] text-slate-400 font-mono">{t.reference}</span>
                  </td>
                  <td className="px-4 py-3 font-medium text-slate-800">{t.description}</td>
                  <td className="px-4 py-3"><span className="bg-slate-100 text-slate-600 text-[10px] font-bold px-2 py-0.5 rounded">{t.category}</span></td>
                  <td className="px-4 py-3 text-slate-600">{t.vesselName || 'General Fleet'}</td>
                  <td className="px-4 py-3">
                    <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded ${t.type === 'Debit' ? 'bg-rose-50 text-rose-700' : 'bg-emerald-50 text-emerald-700'}`}>
                      {t.type}
                    </span>
                  </td>
                  <td className={`px-4 py-3 text-right font-mono font-bold ${t.type === 'Debit' ? 'text-rose-600' : 'text-emerald-600'}`}>
                    {t.type === 'Debit' ? '-' : '+'}USD {t.amount.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span className="text-[10px] font-bold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded border border-emerald-200">
                      {t.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
