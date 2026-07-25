import React, { useState } from 'react';
import { MOCK_INVENTORY } from '../../data/fleetData';
import { InventoryItem } from '../../types';
import { Package, Search, Filter, AlertTriangle, CheckCircle2, XCircle, Plus, X } from 'lucide-react';

export const InventoryModule: React.FC = () => {
  const [items] = useState<InventoryItem[]>(MOCK_INVENTORY);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);

  const statuses = ['All', 'In Stock', 'Low Stock', 'Out of Stock'];

  const filtered = items.filter(i => {
    const ms = i.name.toLowerCase().includes(search.toLowerCase()) ||
               i.partNumber.toLowerCase().includes(search.toLowerCase()) ||
               i.vesselName.toLowerCase().includes(search.toLowerCase());
    const mst = statusFilter === 'All' || i.status === statusFilter;
    return ms && mst;
  });

  const statusBadge = (s: string) => {
    switch (s) {
      case 'In Stock': return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'Low Stock': return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'Out of Stock': return 'bg-rose-100 text-rose-800 border-rose-300';
      default: return 'bg-slate-100 text-slate-600';
    }
  };

  return (
    <div className="space-y-5 pb-8">
      {/* Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-sky-50 border border-sky-200 flex items-center justify-center">
            <Package className="w-5 h-5 text-sky-600" />
          </div>
          <div>
            <h2 className="text-base font-extrabold text-slate-800">Inventory & Spare Parts</h2>
            <p className="text-xs text-slate-500 font-medium">Spare parts tracking, stock levels, reorder points & warehouse locations</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-xs font-bold bg-amber-50 text-amber-700 px-3 py-1.5 rounded-xl border border-amber-200">
            {items.filter(i => i.status === 'Low Stock').length} Low Stock
          </div>
          <div className="text-xs font-bold bg-rose-50 text-rose-700 px-3 py-1.5 rounded-xl border border-rose-200">
            {items.filter(i => i.status === 'Out of Stock').length} Out of Stock
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
            placeholder="Search part name, number, vessel..."
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
                <th className="px-4 py-3">Part Name & Number</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Vessel Location</th>
                <th className="px-4 py-3">Stock / Min Stock</th>
                <th className="px-4 py-3">Unit Price</th>
                <th className="px-4 py-3">Supplier</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map(i => (
                <tr key={i.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3">
                    <span className="font-bold text-slate-900 block">{i.name}</span>
                    <span className="text-[10px] text-teal-700 font-mono font-bold">{i.partNumber}</span>
                  </td>
                  <td className="px-4 py-3"><span className="bg-slate-100 text-slate-600 text-[10px] font-bold px-2 py-0.5 rounded">{i.category}</span></td>
                  <td className="px-4 py-3">
                    <div className="font-medium text-slate-800">{i.vesselName}</div>
                    <div className="text-[10px] text-slate-400">{i.location}</div>
                  </td>
                  <td className="px-4 py-3 font-mono font-bold">
                    <span className={i.quantity <= i.minStock ? 'text-rose-600' : 'text-slate-800'}>
                      {i.quantity} {i.unit}
                    </span>
                    <span className="text-[10px] text-slate-400 font-normal ml-1">(min: {i.minStock})</span>
                  </td>
                  <td className="px-4 py-3 font-mono text-slate-800">
                    USD {i.unitPrice.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-slate-600">{i.supplier}</td>
                  <td className="px-4 py-3">
                    <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full border ${statusBadge(i.status)}`}>
                      {i.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => setSelectedItem(i)}
                      className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-500 rounded-lg"
                    >
                      <Package className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-extrabold text-sm text-slate-900">{selectedItem.name}</h3>
                <p className="text-xs text-slate-500">{selectedItem.partNumber} • {selectedItem.category}</p>
              </div>
              <button onClick={() => setSelectedItem(null)} className="p-1 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-500">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { l: 'Vessel', v: selectedItem.vesselName },
                { l: 'Location', v: selectedItem.location },
                { l: 'Current Quantity', v: `${selectedItem.quantity} ${selectedItem.unit}` },
                { l: 'Min Reorder Stock', v: `${selectedItem.minStock} ${selectedItem.unit}` },
                { l: 'Unit Price', v: `USD ${selectedItem.unitPrice.toLocaleString()}` },
                { l: 'Supplier', v: selectedItem.supplier },
                { l: 'Last Restocked', v: selectedItem.lastRestocked },
                { l: 'Status', v: selectedItem.status },
              ].map((item, i) => (
                <div key={i} className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">{item.l}</span>
                  <span className="text-xs font-bold text-slate-800">{item.v}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-end pt-2 border-t border-slate-200">
              <button onClick={() => setSelectedItem(null)} className="bg-slate-100 text-slate-700 text-xs font-bold px-4 py-2 rounded-xl hover:bg-slate-200">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
