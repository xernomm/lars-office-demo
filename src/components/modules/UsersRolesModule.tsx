import React, { useState } from 'react';
import { MOCK_SYSTEM_USERS } from '../../data/fleetData';
import { SystemUser, UserRole } from '../../types';
import { Shield, Search, Plus, UserCheck, Mail, Phone, Lock, CheckCircle2, X } from 'lucide-react';

export const UsersRolesModule: React.FC = () => {
  const [users, setUsers] = useState<SystemUser[]>(MOCK_SYSTEM_USERS);
  const [search, setSearch] = useState('');
  const [selectedUser, setSelectedUser] = useState<SystemUser | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  const filtered = users.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase()) ||
    u.role.toLowerCase().includes(search.toLowerCase())
  );

  const roleBadge = (role: UserRole) => {
    switch (role) {
      case 'direktur': return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'manager': return 'bg-sky-100 text-sky-800 border-sky-300';
      case 'surveyor': return 'bg-teal-100 text-teal-800 border-teal-300';
      case 'finance': return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'client': return 'bg-amber-100 text-amber-800 border-amber-300';
      default: return 'bg-slate-100 text-slate-700 border-slate-300';
    }
  };

  const handleAddUser = () => {
    const newUser: SystemUser = {
      id: `USR-${Date.now().toString().slice(-3)}`,
      name: 'New Staff Member',
      email: `user.${Date.now().toString().slice(-4)}@lars.co.id`,
      role: 'staff',
      department: 'Operations',
      status: 'Active',
      lastLogin: 'Never',
      createdDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      phone: '+62 812 0000 0000',
    };
    setUsers(prev => [newUser, ...prev]);
    setNotification('User created successfully!');
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
            <Shield className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <h2 className="text-base font-extrabold text-slate-800">Users & Roles Management</h2>
            <p className="text-xs text-slate-500 font-medium">Role-Based Access Control (RBAC), user accounts & security permissions</p>
          </div>
        </div>
        <button
          onClick={handleAddUser}
          className="bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl flex items-center gap-2 shadow-xs"
        >
          <Plus className="w-4 h-4" />Add User
        </button>
      </div>

      {/* Search */}
      <div className="bg-white border border-slate-200 p-4 rounded-2xl flex items-center justify-between shadow-xs">
        <div className="relative w-full max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search user name, email, role..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-teal-500 focus:bg-white"
          />
        </div>
        <span className="text-xs text-slate-500 font-mono">Active Users: <span className="text-teal-700 font-bold">{users.filter(u => u.status === 'Active').length}</span></span>
      </div>

      {/* Table */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 border-b border-slate-200 text-[10px] uppercase font-extrabold text-slate-500 tracking-wider">
              <tr>
                <th className="px-4 py-3">User Name & Email</th>
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3">Department</th>
                <th className="px-4 py-3">Last Login</th>
                <th className="px-4 py-3">Created</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map(u => (
                <tr key={u.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-slate-200 text-slate-700 font-bold flex items-center justify-center text-[10px]">
                        {u.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                      </div>
                      <div>
                        <span className="font-bold text-slate-900 block">{u.name}</span>
                        <span className="text-[10px] text-slate-400 font-mono">{u.email}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full border uppercase ${roleBadge(u.role)}`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-600 font-medium">{u.department}</td>
                  <td className="px-4 py-3 font-mono text-[11px] text-slate-500">{u.lastLogin}</td>
                  <td className="px-4 py-3 font-mono text-[11px] text-slate-500">{u.createdDate}</td>
                  <td className="px-4 py-3">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${u.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-slate-100 text-slate-500 border-slate-200'}`}>
                      {u.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => setSelectedUser(u)}
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

      {/* Modal */}
      {selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-extrabold text-sm text-slate-900">{selectedUser.name}</h3>
                <p className="text-xs text-slate-500">{selectedUser.email}</p>
              </div>
              <button onClick={() => setSelectedUser(null)} className="p-1 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-500">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { l: 'User ID', v: selectedUser.id },
                { l: 'Assigned Role', v: selectedUser.role.toUpperCase() },
                { l: 'Department', v: selectedUser.department },
                { l: 'Status', v: selectedUser.status },
                { l: 'Phone', v: selectedUser.phone },
                { l: 'Last Login', v: selectedUser.lastLogin },
              ].map((item, i) => (
                <div key={i} className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">{item.l}</span>
                  <span className="text-xs font-bold text-slate-800">{item.v}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-end pt-2 border-t border-slate-200">
              <button onClick={() => setSelectedUser(null)} className="bg-slate-100 text-slate-700 text-xs font-bold px-4 py-2 rounded-xl hover:bg-slate-200">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
