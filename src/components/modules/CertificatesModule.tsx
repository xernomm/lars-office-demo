import React, { useState } from 'react';
import { MOCK_CERTIFICATES } from '../../data/fleetData';
import { Certificate } from '../../types';
import { Award, Search, Filter, X, Calendar, Building, FileText, AlertTriangle, CheckCircle2, Clock } from 'lucide-react';

export const CertificatesModule: React.FC = () => {
  const [certs] = useState(MOCK_CERTIFICATES);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  const statuses = ['All', 'Valid', 'Expiring Soon', 'Expired'];
  const filtered = certs.filter(c => {
    const ms = c.name.toLowerCase().includes(search.toLowerCase()) || c.vesselName.toLowerCase().includes(search.toLowerCase()) || c.issuedBy.toLowerCase().includes(search.toLowerCase());
    const mst = statusFilter === 'All' || c.status === statusFilter;
    return ms && mst;
  });

  const statusBadge = (s: string) => {
    switch (s) { case 'Valid': return 'bg-emerald-100 text-emerald-800 border-emerald-300'; case 'Expiring Soon': return 'bg-amber-100 text-amber-800 border-amber-300'; case 'Expired': return 'bg-rose-100 text-rose-800 border-rose-300'; default: return 'bg-slate-100 text-slate-600'; }
  };
  const statusIcon = (s: string) => { switch (s) { case 'Valid': return <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />; case 'Expiring Soon': return <Clock className="w-3.5 h-3.5 text-amber-600" />; default: return <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />; } };

  const handleRenew = (cert: Certificate) => { alert(`Simulasi: Permintaan perpanjangan sertifikat "${cert.name}" untuk ${cert.vesselName} telah dikirim ke Classification Society.`); };

  return (
    <div className="space-y-5 pb-8">
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3"><div className="w-8 h-8 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center"><Award className="w-5 h-5 text-amber-600" /></div><div><h2 className="text-base font-extrabold text-slate-800">Certificates Management</h2><p className="text-xs text-slate-500 font-medium">Track and manage all vessel certificates, renewals, and compliance status</p></div></div>
        <div className="flex items-center gap-3">
          <div className="text-xs font-bold bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-xl border border-emerald-200">{certs.filter(c => c.status === 'Valid').length} Valid</div>
          <div className="text-xs font-bold bg-amber-50 text-amber-700 px-3 py-1.5 rounded-xl border border-amber-200">{certs.filter(c => c.status === 'Expiring Soon').length} Expiring</div>
          <div className="text-xs font-bold bg-rose-50 text-rose-700 px-3 py-1.5 rounded-xl border border-rose-200">{certs.filter(c => c.status === 'Expired').length} Expired</div>
        </div>
      </div>

      <div className="bg-white border border-slate-200 p-4 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4 shadow-xs">
        <div className="relative w-full md:w-80"><Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" /><input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search certificate, vessel, issuer..." className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-teal-500 focus:bg-white" /></div>
        <div className="flex items-center gap-1.5"><Filter className="w-3.5 h-3.5 text-slate-400 shrink-0" />{statuses.map(s => (<button key={s} onClick={() => setStatusFilter(s)} className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${statusFilter === s ? 'bg-teal-600 text-white' : 'bg-slate-50 text-slate-600 border border-slate-200'}`}>{s}</button>))}</div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 border-b border-slate-200 text-[10px] uppercase font-extrabold text-slate-500 tracking-wider">
              <tr><th className="px-4 py-3">Certificate</th><th className="px-4 py-3">Vessel</th><th className="px-4 py-3">Type</th><th className="px-4 py-3">Issued By</th><th className="px-4 py-3">Issue Date</th><th className="px-4 py-3">Expiry Date</th><th className="px-4 py-3">Status</th><th className="px-4 py-3 text-right">Action</th></tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map(c => (
                <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3"><div className="flex items-center gap-2"><FileText className="w-4 h-4 text-amber-600 shrink-0" /><span className="font-bold text-slate-900">{c.name}</span></div></td>
                  <td className="px-4 py-3 font-medium">{c.vesselName}</td>
                  <td className="px-4 py-3"><span className="bg-slate-100 text-slate-600 text-[10px] font-bold px-2 py-0.5 rounded">{c.type}</span></td>
                  <td className="px-4 py-3 text-slate-600"><div className="flex items-center gap-1"><Building className="w-3 h-3" />{c.issuedBy}</div></td>
                  <td className="px-4 py-3 font-mono text-[11px]">{c.issueDate}</td>
                  <td className="px-4 py-3 font-mono text-[11px]">{c.expiryDate}</td>
                  <td className="px-4 py-3"><span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full border inline-flex items-center gap-1 ${statusBadge(c.status)}`}>{statusIcon(c.status)}{c.status}</span></td>
                  <td className="px-4 py-3 text-right flex items-center gap-1.5 justify-end">
                    <button onClick={() => setSelectedCert(c)} className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-500 rounded-lg"><FileText className="w-3.5 h-3.5" /></button>
                    {c.status !== 'Valid' && <button onClick={() => handleRenew(c)} className="text-[10px] font-bold bg-teal-600 text-white px-2.5 py-1 rounded-lg hover:bg-teal-500">Renew</button>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 space-y-4">
            <div className="flex items-start justify-between"><h3 className="font-extrabold text-sm text-slate-900">{selectedCert.name}</h3><button onClick={() => setSelectedCert(null)} className="p-1 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-500"><X className="w-4 h-4" /></button></div>
            <div className="grid grid-cols-2 gap-3">
              {[{ l: 'Vessel', v: selectedCert.vesselName }, { l: 'Type', v: selectedCert.type }, { l: 'Issued By', v: selectedCert.issuedBy }, { l: 'Status', v: selectedCert.status }, { l: 'Issue Date', v: selectedCert.issueDate }, { l: 'Expiry Date', v: selectedCert.expiryDate }].map((item, i) => (
                <div key={i} className="bg-slate-50 p-3 rounded-xl border border-slate-200"><span className="text-[10px] text-slate-400 font-bold uppercase block">{item.l}</span><span className="text-xs font-bold text-slate-800">{item.v}</span></div>
              ))}
            </div>
            <div className="flex justify-end gap-2 pt-2 border-t border-slate-200">
              {selectedCert.status !== 'Valid' && <button onClick={() => { handleRenew(selectedCert); setSelectedCert(null); }} className="bg-teal-600 text-white text-xs font-bold px-4 py-2 rounded-xl hover:bg-teal-500">Request Renewal</button>}
              <button onClick={() => setSelectedCert(null)} className="bg-slate-100 text-slate-700 text-xs font-bold px-4 py-2 rounded-xl hover:bg-slate-200">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
