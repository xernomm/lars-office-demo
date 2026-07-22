import React, { useState } from 'react';
import { AuditLog } from '../../types';
import { MOCK_AUDIT_LOGS } from '../../data/mockData';
import { 
  ShieldAlert, 
  ShieldCheck, 
  Lock, 
  Key, 
  CheckCircle2, 
  AlertOctagon, 
  Search 
} from 'lucide-react';

export const AuditLogModule: React.FC = () => {
  const [logs] = useState<AuditLog[]>(MOCK_AUDIT_LOGS);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredLogs = logs.filter((log) => {
    return (
      log.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.module.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.ipAddress.includes(searchQuery)
    );
  });

  return (
    <div className="space-y-6 pb-8">
      
      {/* Header Banner */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-600">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <h2 className="text-base font-extrabold text-slate-800">
              System Audit Log & Security Management
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1 font-medium">
            Logging Immutable Aktivitas Pengguna, Pengawasan Hak Akses RBAC, & Kepatuhan Keamanan ISO 27001
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200 text-xs shadow-2xs">
          <ShieldCheck className="w-4 h-4 text-purple-600" />
          <span className="text-slate-500">Enkripsi Data:</span>
          <span className="font-bold text-purple-700">AES-256 Enabled</span>
        </div>
      </div>

      {/* Security Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white border border-slate-200 p-4 rounded-2xl space-y-2 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-400 uppercase">STATUS AUDIT TRAIL</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-xl font-black text-slate-900">Immutable Ledger</div>
          <p className="text-[10px] text-emerald-700 font-bold">Seluruh aktivitas user tercatat otomatis</p>
        </div>

        <div className="bg-white border border-slate-200 p-4 rounded-2xl space-y-2 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-400 uppercase">RBAC ACCESS MATRIX</span>
            <Lock className="w-4 h-4 text-teal-600" />
          </div>
          <div className="text-xl font-black text-slate-900">6 Roles Configured</div>
          <p className="text-[10px] text-slate-500 font-medium">Direktur, Manager, Surveyor, Staff, Finance, Client</p>
        </div>

        <div className="bg-white border border-slate-200 p-4 rounded-2xl space-y-2 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-400 uppercase">AI SAFETY GUARDRAIL</span>
            <Key className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-xl font-black text-purple-700">Gemini 3.5 Filtered</div>
          <p className="text-[10px] text-slate-500 font-medium">Pencegahan kebocoran data rahasia maritim</p>
        </div>
      </div>

      {/* Search Input Bar */}
      <div className="bg-white border border-slate-200 p-4 rounded-2xl flex items-center justify-between shadow-xs">
        <div className="relative w-full max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari user, aktivitas, modul, atau IP Address..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-teal-500 focus:bg-white"
          />
        </div>
        <span className="text-xs text-slate-500 font-mono">
          Total Log Recorded: <span className="text-teal-700 font-bold">{filteredLogs.length} Events</span>
        </span>
      </div>

      {/* Audit Log Table */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 border-b border-slate-200 text-[10px] uppercase font-extrabold text-slate-500 tracking-wider">
              <tr>
                <th className="p-4">WAKTU (TIMESTAMP)</th>
                <th className="p-4">PENGGUNA & ROLE</th>
                <th className="p-4">MODUL & AKSI</th>
                <th className="p-4">IP ADDRESS</th>
                <th className="p-4 text-right">STATUS SECURITY</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 font-mono text-[11px] text-slate-500 font-medium">{log.timestamp}</td>
                  
                  <td className="p-4">
                    <div>
                      <div className="font-bold text-slate-900">{log.user}</div>
                      <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded bg-slate-100 text-teal-800 uppercase">
                        {log.role}
                      </span>
                    </div>
                  </td>

                  <td className="p-4">
                    <div>
                      <div className="font-bold text-teal-700">{log.module}</div>
                      <p className="text-[11px] text-slate-600 font-medium">{log.action}</p>
                    </div>
                  </td>

                  <td className="p-4 font-mono text-[11px] text-slate-500 font-medium">{log.ipAddress}</td>

                  <td className="p-4 text-right">
                    <span
                      className={`inline-flex items-center gap-1 text-[10px] font-extrabold px-2.5 py-1 rounded-full border ${
                        log.status === 'Success'
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                          : 'bg-rose-50 text-rose-800 border-rose-300'
                      }`}
                    >
                      {log.status === 'Success' ? (
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      ) : (
                        <AlertOctagon className="w-3 h-3 text-rose-600" />
                      )}
                      <span>{log.status}</span>
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
