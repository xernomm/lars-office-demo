import React, { useState } from 'react';
import { UserRole, ModuleType } from './types';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';

import { DashboardModule } from './components/modules/DashboardModule';
import { AiChatbotModule } from './components/modules/AiChatbotModule';
import { AiSurveyGeneratorModule } from './components/modules/AiSurveyGeneratorModule';
import { DocumentManagementModule } from './components/modules/DocumentManagementModule';
import { WorkflowTrackerModule } from './components/modules/WorkflowTrackerModule';
import { AuditLogModule } from './components/modules/AuditLogModule';

export const App: React.FC = () => {
  const [activeRole, setActiveRole] = useState<UserRole>('direktur');
  const [activeModule, setActiveModule] = useState<ModuleType>('dashboard');

  const renderActiveModule = () => {
    switch (activeModule) {
      case 'dashboard':
        return (
          <DashboardModule
            activeRole={activeRole}
            onNavigateModule={(mod) => setActiveModule(mod)}
          />
        );
      case 'chatbot':
        return <AiChatbotModule />;
      case 'survey_generator':
        return <AiSurveyGeneratorModule />;
      case 'dms':
        return <DocumentManagementModule activeRole={activeRole} />;
      case 'workflow':
        return <WorkflowTrackerModule />;
      case 'audit':
        return <AuditLogModule />;
      default:
        return (
          <DashboardModule
            activeRole={activeRole}
            onNavigateModule={(mod) => setActiveModule(mod)}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-teal-500 selection:text-white">
      {/* Top Header */}
      <Header
        activeRole={activeRole}
        onRoleChange={(role) => setActiveRole(role)}
      />

      {/* Main Body Layout */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Left Sidebar */}
        <Sidebar
          activeModule={activeModule}
          onSelectModule={(mod) => setActiveModule(mod)}
        />

        {/* Center Content Workspace */}
        <main className="flex-1 p-4 lg:p-6 overflow-y-auto bg-slate-50">
          {renderActiveModule()}
        </main>
      </div>
    </div>
  );
};

export default App;
