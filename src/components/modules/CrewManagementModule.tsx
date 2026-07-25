import React, { useState } from 'react';
import { MOCK_CREW } from '../../data/fleetData';
import { CrewMember } from '../../types';
import { Users, Search, Filter, Phone, Mail, Award, Calendar, Ship, UserCheck, X, CheckCircle2 } from 'lucide-react';

export const CrewManagementModule: React.FC = () => {
  const [crew] = useState<CrewMember[]>(MOCK_CREW);
  const [search, setSearch] = useState('');
  const [deptFilter, setDeptFilter] = useState('All');
  const [selectedCrew, setSelectedCrew] = useState<CrewMember | null>(null);

  const departments = ['All', 'Deck', 'Engine', 'Catering'];

  const filtered = crew.filter(c => {
    const ms = c.name.toLowerCase().includes(search.toLowerCase()) || 
               c.rank.toLowerCase().includes(search.toLowerCase()) || 
               c.vesselName.toLowerCase().includes(search.toLowerCase());
    const md = deptFilter === 'All' || c.department === deptFilter;
    return ms && md;
  });

  const statusBadge = (s: string) => {
    switch (s) {
      case 'On Board': return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'On Leave': return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'Available': return 'bg-sky-100 text-sky-800 border-sky-300';
      default: return 'bg-slate-100 text-slate-600 border-slate-300';
    }
  };

  return (
    <div className="space-y-5 pb-8">
      {/* Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-teal-50 border border-teal-200 flex items-center justify-center">
            <Users className="w-5 h-5 text-teal-600" />
          </div>
          <div>
            <h2 className="text-base font-extrabold text-slate-800">Crew Management</h2>
            <p className="text-xs text-slate-500 font-medium">Overview of all active seafarers, assignments, and certifications</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-xs font-bold bg-teal-50 text-teal-700 px-3 py-1.5 rounded-xl border border-teal-200">
            {crew.filter(c => c.status === 'On Board').length} On Board
          </div>
          <div className="text-xs font-bold bg-amber-50 text-amber-700 px-3 py-1.5 rounded-xl border border-amber-200">
            {crew.filter(c => c.status === 'On Leave').length} On Leave
          </div>
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
            placeholder="Search crew name, rank, vessel..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-teal-500 focus:bg-white"
          />
        </div>
        <div className="flex items-center gap-1.5">
          <Filter className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          {departments.map(d => (
            <button
              key={d}
              onClick={() => setDeptFilter(d)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                deptFilter === d ? 'bg-teal-600 text-white' : 'bg-slate-50 text-slate-600 border border-slate-200'
              }`}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      {/* Crew Table */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 border-b border-slate-200 text-[10px] uppercase font-extrabold text-slate-500 tracking-wider">
              <tr>
                <th className="px-4 py-3">Crew Member</th>
                <th className="px-4 py-3">Rank & Dept</th>
                <th className="px-4 py-3">Vessel Assignment</th>
                <th className="px-4 py-3">Nationality</th>
                <th className="px-4 py-3">Cert. Expiry</th>
                <th className="px-4 py-3">Contract End</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map(c => (
                <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-slate-200 text-slate-700 font-bold flex items-center justify-center text-[10px]">
                        {c.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                      </div>
                      <div>
                        <span className="font-bold text-slate-900 block">{c.name}</span>
                        <span className="text-[10px] text-slate-400 font-mono">{c.id}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="font-bold text-slate-800 block">{c.rank}</span>
                    <span className="text-[10px] text-slate-500">{c.department}</span>
                  </td>
                  <td className="px-4 py-3 font-medium text-slate-800">{c.vesselName}</td>
                  <td className="px-4 py-3 text-slate-600">{c.nationality}</td>
                  <td className="px-4 py-3 font-mono text-[11px]">{c.certExpiry}</td>
                  <td className="px-4 py-3 font-mono text-[11px]">{c.contractEnd}</td>
                  <td className="px-4 py-3">
                    <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full border ${statusBadge(c.status)}`}>
                      {c.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => setSelectedCrew(c)}
                      className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-500 rounded-lg"
                    >
                      <UserCheck className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Modal */}
      {selectedCrew && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-extrabold text-sm text-slate-900">{selectedCrew.name}</h3>
                <p className="text-xs text-slate-500">{selectedCrew.rank} • {selectedCrew.department} Dept</p>
              </div>
              <button onClick={() => setSelectedCrew(null)} className="p-1 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-500">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { l: 'Assigned Vessel', v: selectedCrew.vesselName },
                { l: 'Status', v: selectedCrew.status },
                { l: 'Nationality', v: selectedCrew.nationality },
                { l: 'Join Date', v: selectedCrew.joinDate },
                { l: 'Contract End', v: selectedCrew.contractEnd },
                { l: 'Cert. Expiry', v: selectedCrew.certExpiry },
              ].map((item, i) => (
                <div key={i} className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">{item.l}</span>
                  <span className="text-xs font-bold text-slate-800">{item.v}</span>
                </div>
              ))}
            </div>
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1.5">
              <span className="text-[10px] text-slate-400 font-bold uppercase block">Certifications & Competencies</span>
              <div className="flex flex-wrap gap-1">
                {selectedCrew.certifications.map((cert, idx) => (
                  <span key={idx} className="bg-teal-50 text-teal-700 border border-teal-200 px-2 py-0.5 rounded text-[10px] font-bold">
                    {cert}
                  </span>
                ))}
              </div>
            </div>
            <div className="space-y-1 text-xs text-slate-600">
              <div className="flex items-center gap-2"><Phone className="w-3.5 h-3.5 text-slate-400" />{selectedCrew.phone}</div>
              <div className="flex items-center gap-2"><Mail className="w-3.5 h-3.5 text-slate-400" />{selectedCrew.email}</div>
            </div>
            <div className="flex justify-end pt-2 border-t border-slate-200">
              <button onClick={() => setSelectedCrew(null)} className="bg-slate-100 text-slate-700 text-xs font-bold px-4 py-2 rounded-xl hover:bg-slate-200">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
