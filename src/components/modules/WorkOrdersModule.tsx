import React, { useState } from 'react';
import { MOCK_WORK_ORDERS } from '../../data/fleetData';
import { WorkOrder } from '../../types';
import { ClipboardList, Search, Filter, Plus, Clock, AlertCircle, CheckCircle2, XCircle, DollarSign, X } from 'lucide-react';

export const WorkOrdersModule: React.FC = () => {
  const [workOrders, setWorkOrders] = useState<WorkOrder[]>(MOCK_WORK_ORDERS);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedWO, setSelectedWO] = useState<WorkOrder | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  const statuses = ['All', 'Open', 'In Progress', 'Pending Parts', 'Completed', 'Cancelled'];

  const filtered = workOrders.filter(w => {
    const ms = w.title.toLowerCase().includes(search.toLowerCase()) ||
               w.vesselName.toLowerCase().includes(search.toLowerCase()) ||
               w.id.toLowerCase().includes(search.toLowerCase());
    const mst = statusFilter === 'All' || w.status === statusFilter;
    return ms && mst;
  });

  const statusBadge = (s: string) => {
    switch (s) {
      case 'Completed': return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'In Progress': return 'bg-sky-100 text-sky-800 border-sky-300';
      case 'Open': return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'Pending Parts': return 'bg-amber-100 text-amber-800 border-amber-300';
      default: return 'bg-slate-200 text-slate-600 border-slate-300';
    }
  };

  const priorityBadge = (p: string) => {
    switch (p) {
      case 'Emergency': return 'bg-rose-100 text-rose-800 border-rose-300 font-black';
      case 'Urgent': return 'bg-rose-50 text-rose-700 border-rose-200';
      case 'Normal': return 'bg-sky-50 text-sky-700 border-sky-200';
      default: return 'bg-slate-50 text-slate-600 border-slate-200';
    }
  };

  const handleCreateWO = () => {
    const newWO: WorkOrder = {
      id: `WO-2024-${String(workOrders.length + 1).padStart(3, '0')}`,
      title: 'New Emergency Repair Work Order',
      vesselId: 'VSL-001',
      vesselName: 'MV Ocean Pioneer',
      category: 'General Technical',
      priority: 'Urgent',
      status: 'Open',
      requestedBy: 'Current User',
      assignedTo: 'Engine Workshop',
      createdDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      dueDate: '15 Jun 2024',
      description: 'Simulated work order submission.',
      estimatedCost: 5000,
    };
    setWorkOrders(prev => [newWO, ...prev]);
    setNotification('Work Order created successfully!');
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
          <div className="w-8 h-8 rounded-lg bg-purple-50 border border-purple-200 flex items-center justify-center">
            <ClipboardList className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <h2 className="text-base font-extrabold text-slate-800">Work Orders</h2>
            <p className="text-xs text-slate-500 font-medium">Issue, track and manage technical work orders across the fleet</p>
          </div>
        </div>
        <button
          onClick={handleCreateWO}
          className="bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl flex items-center gap-2 shadow-xs"
        >
          <Plus className="w-4 h-4" />Create Work Order
        </button>
      </div>

      {/* Filter Bar */}
      <div className="bg-white border border-slate-200 p-4 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4 shadow-xs">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search work order title, vessel, ID..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-teal-500 focus:bg-white"
          />
        </div>
        <div className="flex items-center gap-1.5 overflow-x-auto">
          <Filter className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          {statuses.map(s => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
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
                <th className="px-4 py-3">WO ID & Title</th>
                <th className="px-4 py-3">Vessel</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Priority</th>
                <th className="px-4 py-3">Est. Cost</th>
                <th className="px-4 py-3">Due Date</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map(w => (
                <tr key={w.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3">
                    <span className="text-[10px] text-teal-700 font-mono font-bold block">{w.id}</span>
                    <span className="font-bold text-slate-900 block">{w.title}</span>
                  </td>
                  <td className="px-4 py-3 font-medium text-slate-800">{w.vesselName}</td>
                  <td className="px-4 py-3"><span className="bg-slate-100 text-slate-600 text-[10px] font-bold px-2 py-0.5 rounded">{w.category}</span></td>
                  <td className="px-4 py-3">
                    <span className={`text-[9px] font-extrabold px-2 py-0.5 rounded border ${priorityBadge(w.priority)}`}>
                      {w.priority}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-mono font-bold text-slate-800">
                    USD {w.estimatedCost.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 font-mono text-[11px]">{w.dueDate}</td>
                  <td className="px-4 py-3">
                    <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full border ${statusBadge(w.status)}`}>
                      {w.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => setSelectedWO(w)}
                      className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-500 rounded-lg"
                    >
                      <ClipboardList className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {selectedWO && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-extrabold text-sm text-slate-900">{selectedWO.title}</h3>
                <p className="text-xs text-slate-500">{selectedWO.id} • {selectedWO.vesselName}</p>
              </div>
              <button onClick={() => setSelectedWO(null)} className="p-1 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-500">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs text-slate-700 leading-relaxed">
              <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">DESCRIPTION</span>
              {selectedWO.description}
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { l: 'Requested By', v: selectedWO.requestedBy },
                { l: 'Assigned To', v: selectedWO.assignedTo },
                { l: 'Created Date', v: selectedWO.createdDate },
                { l: 'Due Date', v: selectedWO.dueDate },
                { l: 'Estimated Cost', v: `USD ${selectedWO.estimatedCost.toLocaleString()}` },
                { l: 'Actual Cost', v: selectedWO.actualCost ? `USD ${selectedWO.actualCost.toLocaleString()}` : 'N/A' },
              ].map((item, i) => (
                <div key={i} className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">{item.l}</span>
                  <span className="text-xs font-bold text-slate-800">{item.v}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-end pt-2 border-t border-slate-200">
              <button onClick={() => setSelectedWO(null)} className="bg-slate-100 text-slate-700 text-xs font-bold px-4 py-2 rounded-xl hover:bg-slate-200">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
