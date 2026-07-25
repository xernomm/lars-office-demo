import React from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ModuleType } from '../../types';
import { OpenLayersVesselMap } from '../OpenLayersVesselMap';
import {
  MOCK_VESSELS, MOCK_UPCOMING_TASKS, MOCK_MAINTENANCE_CHART,
  MOCK_TOP_EXPENSES, FLEET_OVERVIEW_DATA, CERTIFICATE_STATUS_DATA,
  MOCK_FLEET_DOCUMENTS
} from '../../data/fleetData';
import {
  Ship, Anchor, Wrench, ClipboardList, DollarSign, ArrowUpRight,
  ArrowDownRight, MapPin, Calendar, FileText, ChevronRight, Eye,
  Shield, Award, Clipboard, AlertTriangle, TrendingUp
} from 'lucide-react';

interface FleetDashboardModuleProps {
  onNavigateModule: (module: ModuleType) => void;
}

const getTaskIcon = (icon: string) => {
  switch (icon) {
    case 'wrench': return Wrench;
    case 'award': return Award;
    case 'shield': return Shield;
    case 'clipboard': return Clipboard;
    default: return ClipboardList;
  }
};

const statusBadge = (status: string) => {
  switch (status) {
    case 'At Sea': return 'bg-sky-100 text-sky-800 border-sky-300';
    case 'In Port': return 'bg-emerald-100 text-emerald-800 border-emerald-300';
    case 'Maintenance': return 'bg-amber-100 text-amber-800 border-amber-300';
    case 'Laid Up': return 'bg-slate-200 text-slate-700 border-slate-300';
    default: return 'bg-slate-100 text-slate-600';
  }
};

export const FleetDashboardModule: React.FC<FleetDashboardModuleProps> = ({ onNavigateModule }) => {
  const totalVessels = 24;
  const atSea = 14;
  const plannedMaintenance = 8;
  const openWorkOrders = 17;
  const budgetAmount = 2650000;
  const actualAmount = 2450000;
  const budgetPercent = ((actualAmount / budgetAmount) * 100).toFixed(1);

  return (
    <div className="space-y-5 pb-8">

      {/* Stat Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase">TOTAL VESSELS</span>
            <div className="p-1.5 rounded-lg bg-sky-50"><Ship className="w-4 h-4 text-sky-600" /></div>
          </div>
          <div className="text-2xl font-black text-slate-900">{totalVessels}</div>
          <p className="text-[10px] text-slate-500 font-medium">Units</p>
          <p className="text-[10px] text-emerald-600 font-bold flex items-center gap-0.5 mt-1"><ArrowUpRight className="w-3 h-3" /> 4 from last month</p>
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase">VESSELS AT SEA</span>
            <div className="p-1.5 rounded-lg bg-teal-50"><Anchor className="w-4 h-4 text-teal-600" /></div>
          </div>
          <div className="text-2xl font-black text-slate-900">{atSea}</div>
          <p className="text-[10px] text-slate-500 font-medium">Units</p>
          <p className="text-[10px] text-rose-500 font-bold flex items-center gap-0.5 mt-1"><ArrowDownRight className="w-3 h-3" /> 2 from last month</p>
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase">PLANNED MAINTENANCE</span>
            <div className="p-1.5 rounded-lg bg-amber-50"><Wrench className="w-4 h-4 text-amber-600" /></div>
          </div>
          <div className="text-2xl font-black text-slate-900">{plannedMaintenance}</div>
          <p className="text-[10px] text-slate-500 font-medium">Due</p>
          <p className="text-[10px] text-rose-500 font-bold flex items-center gap-0.5 mt-1"><ArrowDownRight className="w-3 h-3" /> 3 from last month</p>
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase">OPEN WORK ORDERS</span>
            <div className="p-1.5 rounded-lg bg-purple-50"><ClipboardList className="w-4 h-4 text-purple-600" /></div>
          </div>
          <div className="text-2xl font-black text-slate-900">{openWorkOrders}</div>
          <p className="text-[10px] text-slate-500 font-medium">Orders</p>
          <p className="text-[10px] text-emerald-600 font-bold flex items-center gap-0.5 mt-1"><ArrowUpRight className="w-3 h-3" /> 5 from last month</p>
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase">MONTHLY OPEX</span>
            <div className="p-1.5 rounded-lg bg-emerald-50"><DollarSign className="w-4 h-4 text-emerald-600" /></div>
          </div>
          <div className="text-lg font-black text-slate-900">USD 2,450,000</div>
          <p className="text-[10px] text-slate-500 font-medium">This Month</p>
          <p className="text-[10px] text-emerald-600 font-bold flex items-center gap-0.5 mt-1"><TrendingUp className="w-3 h-3" /> 8% from last month</p>
        </div>
      </div>

      {/* Fleet Overview + Vessel Map + Upcoming Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Fleet Overview Donut */}
        <div className="lg:col-span-3 bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
          <h3 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider mb-4">FLEET OVERVIEW</h3>
          <div className="flex justify-center">
            <ResponsiveContainer width={180} height={180}>
              <PieChart>
                <Pie data={FLEET_OVERVIEW_DATA} cx="50%" cy="50%" innerRadius={55} outerRadius={80} paddingAngle={3} dataKey="value">
                  {FLEET_OVERVIEW_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="text-center -mt-24 mb-16">
            <div className="text-2xl font-black text-slate-900">{totalVessels}</div>
            <div className="text-[10px] text-slate-500 font-bold uppercase">TOTAL</div>
          </div>
          <div className="space-y-2">
            {FLEET_OVERVIEW_DATA.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-slate-600 font-medium">{item.name}</span>
                </div>
                <span className="font-bold text-slate-800">{item.value} ({Math.round(item.value / totalVessels * 100)}%)</span>
              </div>
            ))}
          </div>
        </div>

        {/* Vessel Status Map (OpenLayers) */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">VESSEL STATUS MAP</h3>
            <button onClick={() => onNavigateModule('fleet_vessels')} className="text-[10px] text-teal-600 font-bold hover:underline flex items-center gap-1">View on Map <ChevronRight className="w-3 h-3" /></button>
          </div>
          <OpenLayersVesselMap />
          <div className="flex items-center gap-4 mt-3 justify-center">
            {[{ label: 'At Sea', color: 'bg-sky-500' }, { label: 'In Port', color: 'bg-emerald-500' }, { label: 'Maintenance', color: 'bg-amber-500' }, { label: 'Laid Up', color: 'bg-slate-400' }].map(l => (
              <div key={l.label} className="flex items-center gap-1.5 text-[10px] text-slate-600 font-medium"><div className={`w-2 h-2 rounded-full ${l.color}`} />{l.label}</div>
            ))}
          </div>
        </div>

        {/* Upcoming Tasks */}
        <div className="lg:col-span-4 bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">UPCOMING TASKS</h3>
            <button onClick={() => onNavigateModule('ops_maintenance')} className="text-[10px] text-teal-600 font-bold hover:underline flex items-center gap-1">View all <ChevronRight className="w-3 h-3" /></button>
          </div>
          <div className="space-y-3">
            {MOCK_UPCOMING_TASKS.map((task) => {
              const Icon = getTaskIcon(task.icon);
              return (
                <div key={task.id} className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="p-1.5 rounded-lg bg-white border border-slate-200 shrink-0"><Icon className="w-4 h-4 text-teal-600" /></div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold text-slate-800">{task.title}</div>
                    <div className="text-[10px] text-slate-500 font-medium">{task.vesselName}</div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-[10px] text-slate-600 font-medium">{task.dueDate}</div>
                    <span className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded-full ${task.status === 'Overdue' ? 'bg-rose-100 text-rose-800' : task.status === 'Due Soon' ? 'bg-amber-100 text-amber-800' : 'bg-sky-100 text-sky-800'}`}>
                      {task.status}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Maintenance Bar + Budget + Top Expenses + Certificate Donut */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Maintenance Overview */}
        <div className="lg:col-span-3 bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">MAINTENANCE OVERVIEW</h3>
            <button onClick={() => onNavigateModule('ops_maintenance')} className="text-[10px] text-teal-600 font-bold hover:underline flex items-center gap-1">View all <ChevronRight className="w-3 h-3" /></button>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={MOCK_MAINTENANCE_CHART} barSize={12}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#94a3b8' }} />
              <YAxis tick={{ fontSize: 10, fill: '#94a3b8' }} />
              <Tooltip contentStyle={{ fontSize: 11, borderRadius: 12, border: '1px solid #e2e8f0' }} />
              <Bar dataKey="completed" fill="#10b981" radius={[2, 2, 0, 0]} />
              <Bar dataKey="inProgress" fill="#0ea5e9" radius={[2, 2, 0, 0]} />
              <Bar dataKey="overdue" fill="#ef4444" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <div className="flex items-center gap-3 mt-2 justify-center text-[10px]">
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500" />Completed</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-sky-500" />In Progress</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-rose-500" />Overdue</span>
          </div>
        </div>

        {/* Budget vs Actual */}
        <div className="lg:col-span-3 bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
          <h3 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider mb-4">BUDGET VS ACTUAL (OPEX)</h3>
          <div className="space-y-3">
            <div><span className="text-[10px] text-slate-400 font-bold uppercase block">Budget</span><span className="text-lg font-black text-slate-900">USD 2,650,000</span></div>
            <div><span className="text-[10px] text-slate-400 font-bold uppercase block">Actual</span><span className="text-lg font-black text-teal-700">USD 2,450,000</span></div>
            <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden"><div className="h-full bg-gradient-to-r from-teal-500 to-emerald-400 rounded-full" style={{ width: `${budgetPercent}%` }} /></div>
            <div className="text-right text-xs font-bold text-emerald-600">{budgetPercent}%</div>
          </div>
          <button onClick={() => onNavigateModule('fin_budget')} className="mt-3 text-[10px] text-teal-600 font-bold hover:underline flex items-center gap-1">View detail <ChevronRight className="w-3 h-3" /></button>
        </div>

        {/* Top Expenses */}
        <div className="lg:col-span-3 bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
          <h3 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider mb-4">TOP EXPENSES</h3>
          <div className="space-y-2.5">
            {MOCK_TOP_EXPENSES.map((exp) => (
              <div key={exp.name} className="flex items-center justify-between text-xs">
                <span className="text-slate-600 font-medium">{exp.name}</span>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-800">USD {(exp.amount / 1000).toFixed(0)}K</span>
                  <span className="text-[10px] text-slate-400 font-mono w-8 text-right">{exp.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
          <button onClick={() => onNavigateModule('fin_accounting')} className="mt-4 text-[10px] text-teal-600 font-bold hover:underline flex items-center gap-1">View all expenses <ChevronRight className="w-3 h-3" /></button>
        </div>

        {/* Certificate Status Donut */}
        <div className="lg:col-span-3 bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
          <h3 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider mb-4">CERTIFICATE STATUS</h3>
          <div className="flex justify-center">
            <ResponsiveContainer width={160} height={160}>
              <PieChart>
                <Pie data={CERTIFICATE_STATUS_DATA} cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={3} dataKey="value">
                  {CERTIFICATE_STATUS_DATA.map((entry, index) => (
                    <Cell key={`cert-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="text-center -mt-20 mb-12">
            <div className="text-xl font-black text-slate-900">48</div>
            <div className="text-[10px] text-slate-500 font-bold uppercase">TOTAL</div>
          </div>
          <div className="space-y-1.5">
            {CERTIFICATE_STATUS_DATA.map(c => (
              <div key={c.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: c.color }} /><span className="text-slate-600 font-medium">{c.name}</span></div>
                <span className="font-bold text-slate-800">{c.value} ({Math.round(c.value / 48 * 100)}%)</span>
              </div>
            ))}
          </div>
          <button onClick={() => onNavigateModule('fleet_certificates')} className="mt-3 text-[10px] text-teal-600 font-bold hover:underline flex items-center gap-1">View all certificates <ChevronRight className="w-3 h-3" /></button>
        </div>
      </div>

      {/* Vessel List + Documents */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Vessel List Table */}
        <div className="lg:col-span-8 bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
          <div className="p-4 flex items-center justify-between border-b border-slate-200">
            <h3 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">VESSEL LIST ({MOCK_VESSELS.length})</h3>
            <button onClick={() => onNavigateModule('fleet_vessels')} className="text-[10px] text-teal-600 font-bold hover:underline flex items-center gap-1">View all <ChevronRight className="w-3 h-3" /></button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 text-[10px] uppercase font-extrabold text-slate-500 tracking-wider">
                <tr>
                  <th className="px-4 py-3">Vessel Name</th>
                  <th className="px-4 py-3">Type</th>
                  <th className="px-4 py-3">Flag</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Location</th>
                  <th className="px-4 py-3">Next Maintenance</th>
                  <th className="px-4 py-3">Certificates</th>
                  <th className="px-4 py-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {MOCK_VESSELS.map((v) => (
                  <tr key={v.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-sky-50 flex items-center justify-center"><Ship className="w-3.5 h-3.5 text-sky-600" /></div>
                        <span className="font-bold text-slate-900">{v.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-slate-600">{v.type}</td>
                    <td className="px-4 py-3"><span className="text-sm">{v.flagEmoji}</span> {v.flag}</td>
                    <td className="px-4 py-3"><span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full border ${statusBadge(v.status)}`}>{v.status}</span></td>
                    <td className="px-4 py-3"><div className="font-medium text-slate-700">{v.location}</div><div className="text-[10px] text-slate-400 font-mono">{v.coordinates.lat.toFixed(2)}°N {v.coordinates.lng.toFixed(2)}°E</div></td>
                    <td className="px-4 py-3"><div className="font-medium text-slate-700">{v.nextMaintenance}</div><div className="text-[10px] text-slate-400">{v.maintenanceType}</div></td>
                    <td className="px-4 py-3"><span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">{v.validCertificates} Valid</span>{v.expiringCertificates > 0 && <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200 ml-1">{v.expiringCertificates} Expiring</span>}</td>
                    <td className="px-4 py-3 text-right"><button onClick={() => onNavigateModule('fleet_vessels')} className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-500 transition-colors"><Eye className="w-3.5 h-3.5" /></button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Documents List */}
        <div className="lg:col-span-4 bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">DOCUMENTS</h3>
            <button onClick={() => onNavigateModule('fleet_documents')} className="text-[10px] text-teal-600 font-bold hover:underline flex items-center gap-1">View all <ChevronRight className="w-3 h-3" /></button>
          </div>
          <div className="space-y-3">
            {MOCK_FLEET_DOCUMENTS.slice(0, 4).map((doc) => (
              <div key={doc.id} className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200 hover:border-slate-300 transition-colors cursor-pointer">
                <div className="p-1.5 rounded-lg bg-white border border-slate-200 shrink-0"><FileText className="w-4 h-4 text-teal-600" /></div>
                <div className="flex-1 min-w-0">
                  <div className="text-[11px] font-bold text-slate-800 truncate">{doc.title}</div>
                  <div className="text-[10px] text-slate-400 font-medium">{doc.type} • {doc.size}</div>
                </div>
                <div className="text-[10px] text-slate-400 font-medium shrink-0">{doc.uploadDate}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};
