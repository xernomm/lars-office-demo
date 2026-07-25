import React, { useState } from 'react';
import { MOCK_FLEET_DOCUMENTS } from '../../data/fleetData';
import { FleetDocument } from '../../types';
import { FolderGit2, Search, Filter, Upload, FileText, FileSpreadsheet, Image, X, CheckCircle2, Clock, Archive } from 'lucide-react';

export const FleetDocumentsModule: React.FC = () => {
  const [docs, setDocs] = useState(MOCK_FLEET_DOCUMENTS);
  const [search, setSearch] = useState('');
  const [catFilter, setCatFilter] = useState('All');
  const [selectedDoc, setSelectedDoc] = useState<FleetDocument | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  const categories = ['All', 'Safety', 'Crew', 'Insurance', 'Maintenance', 'Operations', 'Audit'];
  const filtered = docs.filter(d => {
    const ms = d.title.toLowerCase().includes(search.toLowerCase()) || d.vesselName.toLowerCase().includes(search.toLowerCase());
    const mc = catFilter === 'All' || d.category === catFilter;
    return ms && mc;
  });

  const docIcon = (type: string) => {
    switch (type) { case 'PDF': return <FileText className="w-4 h-4 text-rose-500" />; case 'XLSX': return <FileSpreadsheet className="w-4 h-4 text-emerald-600" />; case 'IMG': return <Image className="w-4 h-4 text-sky-600" />; default: return <FileText className="w-4 h-4 text-sky-600" />; }
  };
  const statusBadge = (s: string) => {
    switch (s) { case 'Active': return 'bg-emerald-100 text-emerald-800 border-emerald-300'; case 'Pending Review': return 'bg-amber-100 text-amber-800 border-amber-300'; default: return 'bg-slate-200 text-slate-600 border-slate-300'; }
  };
  const statusIcon = (s: string) => { switch (s) { case 'Active': return <CheckCircle2 className="w-3 h-3" />; case 'Pending Review': return <Clock className="w-3 h-3" />; default: return <Archive className="w-3 h-3" />; } };

  const handleUpload = () => {
    const newDoc: FleetDocument = { id: `FDOC-${Date.now()}`, title: `Uploaded Document - ${new Date().toLocaleDateString()}`, type: 'PDF', category: 'Operations', vesselName: 'MV Ocean Pioneer', uploadDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }), size: '1.2 MB', uploadedBy: 'Current User', status: 'Pending Review' };
    setDocs(prev => [newDoc, ...prev]);
    setNotification('Document uploaded successfully!');
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <div className="space-y-5 pb-8">
      {notification && <div className="fixed top-16 right-6 z-50 bg-emerald-600 text-white px-4 py-2.5 rounded-xl shadow-xl font-semibold text-xs flex items-center gap-2 animate-bounce"><CheckCircle2 className="w-4 h-4" />{notification}</div>}

      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3"><div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-200 flex items-center justify-center"><FolderGit2 className="w-5 h-5 text-indigo-600" /></div><div><h2 className="text-base font-extrabold text-slate-800">Fleet Documents</h2><p className="text-xs text-slate-500 font-medium">Central repository for all fleet-related documents and records</p></div></div>
        <button onClick={handleUpload} className="bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl flex items-center gap-2 shadow-xs"><Upload className="w-4 h-4" />Upload Document</button>
      </div>

      <div className="bg-white border border-slate-200 p-4 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4 shadow-xs">
        <div className="relative w-full md:w-80"><Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" /><input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search document, vessel..." className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-teal-500 focus:bg-white" /></div>
        <div className="flex items-center gap-1.5 overflow-x-auto"><Filter className="w-3.5 h-3.5 text-slate-400 shrink-0" />{categories.map(c => (<button key={c} onClick={() => setCatFilter(c)} className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${catFilter === c ? 'bg-teal-600 text-white' : 'bg-slate-50 text-slate-600 border border-slate-200'}`}>{c}</button>))}</div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 border-b border-slate-200 text-[10px] uppercase font-extrabold text-slate-500 tracking-wider">
              <tr><th className="px-4 py-3">Document</th><th className="px-4 py-3">Category</th><th className="px-4 py-3">Vessel</th><th className="px-4 py-3">Uploaded</th><th className="px-4 py-3">Size</th><th className="px-4 py-3">Uploaded By</th><th className="px-4 py-3">Status</th><th className="px-4 py-3 text-right">Action</th></tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map(d => (
                <tr key={d.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3"><div className="flex items-center gap-2">{docIcon(d.type)}<span className="font-bold text-slate-900">{d.title}</span></div></td>
                  <td className="px-4 py-3"><span className="bg-slate-100 text-slate-600 text-[10px] font-bold px-2 py-0.5 rounded">{d.category}</span></td>
                  <td className="px-4 py-3 font-medium">{d.vesselName}</td>
                  <td className="px-4 py-3 font-mono text-[11px]">{d.uploadDate}</td>
                  <td className="px-4 py-3 text-slate-500 font-mono text-[11px]">{d.size}</td>
                  <td className="px-4 py-3">{d.uploadedBy}</td>
                  <td className="px-4 py-3"><span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full border inline-flex items-center gap-1 ${statusBadge(d.status)}`}>{statusIcon(d.status)}{d.status}</span></td>
                  <td className="px-4 py-3 text-right"><button onClick={() => setSelectedDoc(d)} className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-500 rounded-lg"><FileText className="w-3.5 h-3.5" /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 space-y-4">
            <div className="flex items-start justify-between"><h3 className="font-extrabold text-sm text-slate-900">{selectedDoc.title}</h3><button onClick={() => setSelectedDoc(null)} className="p-1 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-500"><X className="w-4 h-4" /></button></div>
            <div className="grid grid-cols-2 gap-3">
              {[{ l: 'Type', v: selectedDoc.type }, { l: 'Category', v: selectedDoc.category }, { l: 'Vessel', v: selectedDoc.vesselName }, { l: 'Size', v: selectedDoc.size }, { l: 'Uploaded By', v: selectedDoc.uploadedBy }, { l: 'Status', v: selectedDoc.status }].map((item, i) => (
                <div key={i} className="bg-slate-50 p-3 rounded-xl border border-slate-200"><span className="text-[10px] text-slate-400 font-bold uppercase block">{item.l}</span><span className="text-xs font-bold text-slate-800">{item.v}</span></div>
              ))}
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center text-xs text-slate-500">
              <FileText className="w-12 h-12 text-slate-300 mx-auto mb-2" />Document preview not available in demo mode
            </div>
            <div className="flex justify-end"><button onClick={() => setSelectedDoc(null)} className="bg-slate-100 text-slate-700 text-xs font-bold px-4 py-2 rounded-xl hover:bg-slate-200">Close</button></div>
          </div>
        </div>
      )}
    </div>
  );
};
