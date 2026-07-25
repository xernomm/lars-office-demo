import React, { useState } from 'react';
import { MOCK_PURCHASE_ORDERS } from '../../data/fleetData';
import { PurchaseOrder } from '../../types';
import { ShoppingCart, Search, Filter, Plus, Truck, Building2, CheckCircle2, Clock, XCircle, X } from 'lucide-react';

export const ProcurementModule: React.FC = () => {
  const [pos, setPos] = useState<PurchaseOrder[]>(MOCK_PURCHASE_ORDERS);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedPO, setSelectedPO] = useState<PurchaseOrder | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  const statuses = ['All', 'Draft', 'Pending Approval', 'Approved', 'Ordered', 'Delivered'];

  const filtered = pos.filter(p => {
    const ms = p.title.toLowerCase().includes(search.toLowerCase()) ||
               p.vendor.toLowerCase().includes(search.toLowerCase()) ||
               p.id.toLowerCase().includes(search.toLowerCase()) ||
               p.vesselName.toLowerCase().includes(search.toLowerCase());
    const mst = statusFilter === 'All' || p.status === statusFilter;
    return ms && mst;
  });

  const statusBadge = (s: string) => {
    switch (s) {
      case 'Delivered': return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'Ordered': return 'bg-sky-100 text-sky-800 border-sky-300';
      case 'Approved': return 'bg-teal-100 text-teal-800 border-teal-300';
      case 'Pending Approval': return 'bg-amber-100 text-amber-800 border-amber-300';
      default: return 'bg-slate-200 text-slate-600 border-slate-300';
    }
  };

  const handleApprove = (po: PurchaseOrder) => {
    setPos(prev => prev.map(p => p.id === po.id ? { ...p, status: 'Approved', approvedBy: 'Current User' } : p));
    setNotification(`Purchase Order ${po.id} approved!`);
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
            <ShoppingCart className="w-5 h-5 text-emerald-600" />
          </div>
          <div>
            <h2 className="text-base font-extrabold text-slate-800">Procurement & Purchase Orders</h2>
            <p className="text-xs text-slate-500 font-medium">Requisition, vendor management, PO approval workflows & delivery tracking</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-xs font-bold bg-slate-50 text-slate-700 px-3 py-1.5 rounded-xl border border-slate-200">
            Total Spend: <span className="text-emerald-700 font-extrabold">USD {pos.reduce((acc, p) => acc + p.totalAmount, 0).toLocaleString()}</span>
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
            placeholder="Search PO ID, vendor, vessel..."
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
                <th className="px-4 py-3">PO ID & Title</th>
                <th className="px-4 py-3">Vendor</th>
                <th className="px-4 py-3">Vessel</th>
                <th className="px-4 py-3">Items</th>
                <th className="px-4 py-3">Total Amount</th>
                <th className="px-4 py-3">Order / Exp. Date</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map(p => (
                <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3">
                    <span className="text-[10px] text-teal-700 font-mono font-bold block">{p.id}</span>
                    <span className="font-bold text-slate-900 block">{p.title}</span>
                  </td>
                  <td className="px-4 py-3 font-medium text-slate-800">{p.vendor}</td>
                  <td className="px-4 py-3 text-slate-600">{p.vesselName}</td>
                  <td className="px-4 py-3 text-slate-600">{p.items} items</td>
                  <td className="px-4 py-3 font-mono font-bold text-slate-800">
                    USD {p.totalAmount.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 font-mono text-[11px]">
                    <div>{p.orderDate}</div>
                    <div className="text-[10px] text-slate-400">Exp: {p.expectedDelivery}</div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full border ${statusBadge(p.status)}`}>
                      {p.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right flex items-center gap-1.5 justify-end">
                    {p.status === 'Pending Approval' && (
                      <button
                        onClick={() => handleApprove(p)}
                        className="bg-emerald-600 text-white text-[10px] font-bold px-2 py-1 rounded hover:bg-emerald-500"
                      >
                        Approve
                      </button>
                    )}
                    <button
                      onClick={() => setSelectedPO(p)}
                      className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-500 rounded-lg"
                    >
                      <ShoppingCart className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {selectedPO && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-extrabold text-sm text-slate-900">{selectedPO.title}</h3>
                <p className="text-xs text-slate-500">{selectedPO.id} • Vendor: {selectedPO.vendor}</p>
              </div>
              <button onClick={() => setSelectedPO(null)} className="p-1 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-500">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { l: 'Category', v: selectedPO.category },
                { l: 'Vessel', v: selectedPO.vesselName },
                { l: 'Total Amount', v: `USD ${selectedPO.totalAmount.toLocaleString()}` },
                { l: 'Items Count', v: selectedPO.items },
                { l: 'Requested By', v: selectedPO.requestedBy },
                { l: 'Approved By', v: selectedPO.approvedBy || 'Pending' },
                { l: 'Order Date', v: selectedPO.orderDate },
                { l: 'Expected Delivery', v: selectedPO.expectedDelivery },
              ].map((item, i) => (
                <div key={i} className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">{item.l}</span>
                  <span className="text-xs font-bold text-slate-800">{item.v}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-end pt-2 border-t border-slate-200">
              <button onClick={() => setSelectedPO(null)} className="bg-slate-100 text-slate-700 text-xs font-bold px-4 py-2 rounded-xl hover:bg-slate-200">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
