import React, { useState } from 'react';
import { MOCK_VESSELS } from '../../data/fleetData';
import { Vessel } from '../../types';
import { Ship, Search, Filter, X, MapPin, Anchor, Calendar, Users, Shield, Eye, ChevronRight, Gauge } from 'lucide-react';

export const VesselsModule: React.FC = () => {
  const [vessels] = useState(MOCK_VESSELS);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedVessel, setSelectedVessel] = useState<Vessel | null>(null);

  const statuses = ['All', 'At Sea', 'In Port', 'Maintenance', 'Laid Up'];

  const filtered = vessels.filter(v => {
    const matchSearch = v.name.toLowerCase().includes(search.toLowerCase()) || v.type.toLowerCase().includes(search.toLowerCase()) || v.imo.includes(search);
    const matchStatus = statusFilter === 'All' || v.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const statusColor = (s: string) => {
    switch (s) { case 'At Sea': return 'bg-sky-100 text-sky-800 border-sky-300'; case 'In Port': return 'bg-emerald-100 text-emerald-800 border-emerald-300'; case 'Maintenance': return 'bg-amber-100 text-amber-800 border-amber-300'; default: return 'bg-slate-200 text-slate-700 border-slate-300'; }
  };

  return (
    <div className="space-y-5 pb-8">
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3"><div className="w-8 h-8 rounded-lg bg-sky-50 border border-sky-200 flex items-center justify-center"><Ship className="w-5 h-5 text-sky-600" /></div><div><h2 className="text-base font-extrabold text-slate-800">Fleet Vessels</h2><p className="text-xs text-slate-500 font-medium">Manage and monitor your entire fleet of vessels</p></div></div>
        <div className="text-xs text-slate-500 font-bold bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">Total: <span className="text-teal-700">{vessels.length} Vessels</span></div>
      </div>

      <div className="bg-white border border-slate-200 p-4 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4 shadow-xs">
        <div className="relative w-full md:w-80"><Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" /><input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search vessel name, type, IMO..." className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-teal-500 focus:bg-white" /></div>
        <div className="flex items-center gap-1.5 overflow-x-auto"><Filter className="w-3.5 h-3.5 text-slate-400 shrink-0" />{statuses.map(s => (<button key={s} onClick={() => setStatusFilter(s)} className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${statusFilter === s ? 'bg-teal-600 text-white shadow-xs' : 'bg-slate-50 text-slate-600 hover:text-slate-900 border border-slate-200'}`}>{s}</button>))}</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map(v => (
          <div key={v.id} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-shadow cursor-pointer group" onClick={() => setSelectedVessel(v)}>
            <div className="h-32 bg-gradient-to-br from-sky-100 to-teal-50 flex items-center justify-center relative">
              <Ship className="w-16 h-16 text-sky-200" />
              <span className={`absolute top-3 right-3 text-[10px] font-extrabold px-2 py-0.5 rounded-full border ${statusColor(v.status)}`}>{v.status}</span>
              <span className="absolute top-3 left-3 text-sm">{v.flagEmoji}</span>
            </div>
            <div className="p-4 space-y-3">
              <div><h3 className="font-extrabold text-slate-900 text-sm">{v.name}</h3><p className="text-[10px] text-slate-500 font-medium">{v.type} • IMO {v.imo}</p></div>
              <div className="grid grid-cols-2 gap-2 text-[10px]">
                <div className="flex items-center gap-1.5 text-slate-600"><MapPin className="w-3 h-3 text-teal-600" />{v.location}</div>
                <div className="flex items-center gap-1.5 text-slate-600"><Anchor className="w-3 h-3 text-sky-600" />{v.dwt.toLocaleString()} DWT</div>
                <div className="flex items-center gap-1.5 text-slate-600"><Users className="w-3 h-3 text-purple-600" />{v.crewCount} Crew</div>
                <div className="flex items-center gap-1.5 text-slate-600"><Shield className="w-3 h-3 text-emerald-600" />{v.validCertificates} Certs Valid</div>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                <div className="text-[10px] text-slate-400 font-medium"><Calendar className="w-3 h-3 inline mr-1" />Next: {v.nextMaintenance}</div>
                <button className="text-[10px] text-teal-600 font-bold hover:underline flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">Details <ChevronRight className="w-3 h-3" /></button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Vessel Detail Drawer */}
      {selectedVessel && (
        <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/40 backdrop-blur-xs">
          <div className="w-full max-w-lg bg-white h-full overflow-y-auto p-6 space-y-5 shadow-2xl">
            <div className="flex items-start justify-between border-b border-slate-200 pb-4">
              <div className="flex items-center gap-3"><div className="w-12 h-12 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-center"><Ship className="w-6 h-6 text-sky-600" /></div><div><h3 className="font-extrabold text-base text-slate-900">{selectedVessel.name}</h3><p className="text-xs text-slate-500">{selectedVessel.type} • <span className="text-sm">{selectedVessel.flagEmoji}</span> {selectedVessel.flag}</p></div></div>
              <button onClick={() => setSelectedVessel(null)} className="p-1 bg-slate-100 hover:bg-slate-200 text-slate-500 rounded-lg"><X className="w-5 h-5" /></button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[{ l: 'IMO Number', v: selectedVessel.imo }, { l: 'MMSI', v: selectedVessel.mmsi }, { l: 'DWT', v: `${selectedVessel.dwt.toLocaleString()} MT` }, { l: 'Gross Tonnage', v: `${selectedVessel.grossTonnage.toLocaleString()} GT` }, { l: 'Year Built', v: selectedVessel.yearBuilt }, { l: 'Class Society', v: selectedVessel.classificationSociety }, { l: 'Speed', v: `${selectedVessel.speed} kn` }, { l: 'Heading', v: `${selectedVessel.heading}°` }].map((item, i) => (
                <div key={i} className="bg-slate-50 p-3 rounded-xl border border-slate-200"><span className="text-[10px] text-slate-400 font-bold uppercase block">{item.l}</span><span className="text-xs font-bold text-slate-800">{item.v}</span></div>
              ))}
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
              <div className="text-[10px] font-bold text-slate-400 uppercase">CURRENT POSITION</div>
              <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-teal-600" /><div><span className="text-xs font-bold text-slate-800">{selectedVessel.location}</span><span className="text-[10px] text-slate-500 font-mono ml-2">{selectedVessel.coordinates.lat.toFixed(4)}°, {selectedVessel.coordinates.lng.toFixed(4)}°</span></div></div>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
              <div className="text-[10px] font-bold text-slate-400 uppercase">NEXT MAINTENANCE</div>
              <div className="flex items-center gap-2"><Gauge className="w-4 h-4 text-amber-600" /><div><span className="text-xs font-bold text-slate-800">{selectedVessel.maintenanceType}</span><span className="text-[10px] text-slate-500 ml-2">{selectedVessel.nextMaintenance}</span></div></div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-200 text-center"><div className="text-lg font-black text-emerald-700">{selectedVessel.validCertificates}</div><div className="text-[10px] text-emerald-600 font-bold">Valid Certs</div></div>
              <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-center"><div className="text-lg font-black text-amber-700">{selectedVessel.expiringCertificates}</div><div className="text-[10px] text-amber-600 font-bold">Expiring</div></div>
              <div className="bg-sky-50 p-3 rounded-xl border border-sky-200 text-center"><div className="text-lg font-black text-sky-700">{selectedVessel.crewCount}</div><div className="text-[10px] text-sky-600 font-bold">Crew On Board</div></div>
            </div>
            <div className="pt-4 border-t border-slate-200 flex justify-end"><button onClick={() => setSelectedVessel(null)} className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold px-4 py-2 rounded-xl">Close</button></div>
          </div>
        </div>
      )}
    </div>
  );
};
