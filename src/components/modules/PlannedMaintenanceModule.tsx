import React, { useState } from 'react';
import { MOCK_MAINTENANCE_TASKS } from '../../data/fleetData';
import { MaintenanceTask } from '../../types';
import { Wrench, Search, Filter, AlertTriangle, CheckCircle2, Clock, Calendar, Gauge, User, X } from 'lucide-react';

export const PlannedMaintenanceModule: React.FC = () => {
  const [tasks] = useState<MaintenanceTask[]>(MOCK_MAINTENANCE_TASKS);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedTask, setSelectedTask] = useState<MaintenanceTask | null>(null);

  const statuses = ['All', 'Scheduled', 'In Progress', 'Completed', 'Overdue'];

  const filtered = tasks.filter(t => {
    const ms = t.component.toLowerCase().includes(search.toLowerCase()) ||
               t.taskDescription.toLowerCase().includes(search.toLowerCase()) ||
               t.vesselName.toLowerCase().includes(search.toLowerCase());
    const mst = statusFilter === 'All' || t.status === statusFilter;
    return ms && mst;
  });

  const statusBadge = (s: string) => {
    switch (s) {
      case 'Completed': return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'In Progress': return 'bg-sky-100 text-sky-800 border-sky-300';
      case 'Scheduled': return 'bg-slate-100 text-slate-700 border-slate-300';
      case 'Overdue': return 'bg-rose-100 text-rose-800 border-rose-300';
      default: return 'bg-slate-100 text-slate-600';
    }
  };

  const priorityBadge = (p: string) => {
    switch (p) {
      case 'Critical': return 'bg-rose-50 text-rose-700 border-rose-200';
      case 'High': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Medium': return 'bg-sky-50 text-sky-700 border-sky-200';
      default: return 'bg-slate-50 text-slate-600 border-slate-200';
    }
  };

  return (
    <div className="space-y-5 pb-8">
      {/* Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center">
            <Wrench className="w-5 h-5 text-amber-600" />
          </div>
          <div>
            <h2 className="text-base font-extrabold text-slate-800">Planned Maintenance System (PMS)</h2>
            <p className="text-xs text-slate-500 font-medium">Component maintenance schedules, running hours tracking & overhaul intervals</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="text-xs font-bold bg-rose-50 text-rose-700 px-3 py-1.5 rounded-xl border border-rose-200">
            {tasks.filter(t => t.status === 'Overdue').length} Overdue
          </div>
          <div className="text-xs font-bold bg-sky-50 text-sky-700 px-3 py-1.5 rounded-xl border border-sky-200">
            {tasks.filter(t => t.status === 'In Progress').length} In Progress
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
            placeholder="Search component, vessel, task..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-teal-500 focus:bg-white"
          />
        </div>
        <div className="flex items-center gap-1.5">
          <Filter className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          {statuses.map(s => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                statusFilter === s ? 'bg-teal-600 text-white' : 'bg-slate-50 text-slate-600 border border-slate-200'
              }`}
            >
              {s}
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
                <th className="px-4 py-3">Component / Task</th>
                <th className="px-4 py-3">Vessel</th>
                <th className="px-4 py-3">Priority</th>
                <th className="px-4 py-3">Running Hrs / Interval</th>
                <th className="px-4 py-3">Scheduled Date</th>
                <th className="px-4 py-3">Assigned To</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map(t => (
                <tr key={t.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3">
                    <span className="font-bold text-slate-900 block">{t.component}</span>
                    <span className="text-[10px] text-slate-500 line-clamp-1">{t.taskDescription}</span>
                  </td>
                  <td className="px-4 py-3 font-medium text-slate-800">{t.vesselName}</td>
                  <td className="px-4 py-3">
                    <span className={`text-[9px] font-extrabold px-2 py-0.5 rounded border ${priorityBadge(t.priority)}`}>
                      {t.priority}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-mono text-[11px]">
                    {t.intervalHours > 0 ? (
                      <span className={t.runningHours >= t.intervalHours ? 'text-rose-600 font-bold' : 'text-slate-700'}>
                        {t.runningHours.toLocaleString()} / {t.intervalHours.toLocaleString()} hrs
                      </span>
                    ) : (
                      <span className="text-slate-400">Calendar Based</span>
                    )}
                  </td>
                  <td className="px-4 py-3 font-mono text-[11px]">{t.scheduledDate}</td>
                  <td className="px-4 py-3 text-slate-600">{t.assignedTo}</td>
                  <td className="px-4 py-3">
                    <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full border ${statusBadge(t.status)}`}>
                      {t.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => setSelectedTask(t)}
                      className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-500 rounded-lg"
                    >
                      <Wrench className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Task Modal */}
      {selectedTask && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-extrabold text-sm text-slate-900">{selectedTask.component}</h3>
                <p className="text-xs text-slate-500">{selectedTask.vesselName} • {selectedTask.id}</p>
              </div>
              <button onClick={() => setSelectedTask(null)} className="p-1 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-500">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs text-slate-700 leading-relaxed">
              <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">TASK DESCRIPTION</span>
              {selectedTask.taskDescription}
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { l: 'Priority', v: selectedTask.priority },
                { l: 'Status', v: selectedTask.status },
                { l: 'Scheduled Date', v: selectedTask.scheduledDate },
                { l: 'Assigned To', v: selectedTask.assignedTo },
                { l: 'Est. Hours', v: `${selectedTask.estimatedHours} hrs` },
                { l: 'Running Hours', v: `${selectedTask.runningHours} / ${selectedTask.intervalHours}` },
              ].map((item, i) => (
                <div key={i} className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">{item.l}</span>
                  <span className="text-xs font-bold text-slate-800">{item.v}</span>
                </div>
              ))}
            </div>
            {selectedTask.remarks && (
              <div className="bg-rose-50 border border-rose-200 p-3 rounded-xl text-xs text-rose-800 font-medium">
                <strong>Remark:</strong> {selectedTask.remarks}
              </div>
            )}
            <div className="flex justify-end pt-2 border-t border-slate-200">
              <button onClick={() => setSelectedTask(null)} className="bg-slate-100 text-slate-700 text-xs font-bold px-4 py-2 rounded-xl hover:bg-slate-200">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
