import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { MOCK_BUDGET_LINES, MONTHLY_OPEX_TREND } from '../../data/fleetData';
import { DollarSign, TrendingDown, TrendingUp, PieChart, ShieldCheck } from 'lucide-react';

export const BudgetCostModule: React.FC = () => {
  const lines = MOCK_BUDGET_LINES;
  const totalBudget = lines.reduce((acc, l) => acc + l.budgetAmount, 0);
  const totalActual = lines.reduce((acc, l) => acc + l.actualAmount, 0);
  const totalSavings = totalBudget - totalActual;

  return (
    <div className="space-y-5 pb-8">
      {/* Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-teal-50 border border-teal-200 flex items-center justify-center">
            <DollarSign className="w-5 h-5 text-teal-600" />
          </div>
          <div>
            <h2 className="text-base font-extrabold text-slate-800">Budget & Cost Analysis</h2>
            <p className="text-xs text-slate-500 font-medium">OPEX budget allocations, cost variance analysis & forecasting</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-xs font-bold bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-xl border border-emerald-200">
            Total Savings: USD {totalSavings.toLocaleString()} ({(totalSavings / totalBudget * 100).toFixed(1)}%)
          </div>
        </div>
      </div>

      {/* Chart & Summary Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-8 bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
          <h3 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider mb-4">MONTHLY OPEX TREND (BUDGET VS ACTUAL)</h3>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={MONTHLY_OPEX_TREND}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} />
              <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} tickFormatter={v => `$${v / 1000}k`} />
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 12, border: '1px solid #e2e8f0' }} formatter={(v: any) => `$${Number(v).toLocaleString()}`} />
              <Area type="monotone" dataKey="budget" stroke="#94a3b8" fill="#e2e8f0" fillOpacity={0.4} name="Budget" />
              <Area type="monotone" dataKey="actual" stroke="#0ea5e9" fill="#0ea5e9" fillOpacity={0.2} name="Actual" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="lg:col-span-4 bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
          <h3 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">PERIOD SUMMARY (2024 H1)</h3>
          <div className="space-y-3">
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
              <span className="text-[10px] text-slate-400 font-bold uppercase block">TOTAL BUDGETED</span>
              <span className="text-lg font-black text-slate-900">USD {totalBudget.toLocaleString()}</span>
            </div>
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
              <span className="text-[10px] text-slate-400 font-bold uppercase block">ACTUAL SPENT</span>
              <span className="text-lg font-black text-teal-700">USD {totalActual.toLocaleString()}</span>
            </div>
            <div className="bg-emerald-50 p-3.5 rounded-xl border border-emerald-200">
              <span className="text-[10px] text-emerald-600 font-bold uppercase block">UNDER BUDGET (FAVORABLE)</span>
              <span className="text-lg font-black text-emerald-700">USD {totalSavings.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Variance Table */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="p-4 border-b border-slate-200">
          <h3 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">COST VARIANCE ANALYSIS BY CATEGORY</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 border-b border-slate-200 text-[10px] uppercase font-extrabold text-slate-500 tracking-wider">
              <tr>
                <th className="px-4 py-3">Expense Category</th>
                <th className="px-4 py-3">Budget Amount</th>
                <th className="px-4 py-3">Actual Amount</th>
                <th className="px-4 py-3">Variance ($)</th>
                <th className="px-4 py-3">Variance (%)</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {lines.map(l => (
                <tr key={l.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 font-bold text-slate-900">{l.category}</td>
                  <td className="px-4 py-3 font-mono font-medium">USD {l.budgetAmount.toLocaleString()}</td>
                  <td className="px-4 py-3 font-mono font-bold text-teal-700">USD {l.actualAmount.toLocaleString()}</td>
                  <td className="px-4 py-3 font-mono font-bold text-emerald-600">+USD {l.variance.toLocaleString()}</td>
                  <td className="px-4 py-3 font-mono font-bold text-emerald-600">+{l.variancePercent}%</td>
                  <td className="px-4 py-3">
                    <span className="text-[10px] font-extrabold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded border border-emerald-200">
                      Under Budget
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
