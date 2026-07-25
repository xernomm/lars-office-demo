import React, { useState } from 'react';
import { UserRole, ModuleType } from './types';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';

// LARS AI Modules
import { AiChatbotModule } from './components/modules/AiChatbotModule';
import { AiSurveyGeneratorModule } from './components/modules/AiSurveyGeneratorModule';
import { DocumentManagementModule } from './components/modules/DocumentManagementModule';
import { WorkflowTrackerModule } from './components/modules/WorkflowTrackerModule';
import { AuditLogModule } from './components/modules/AuditLogModule';

// Fleet Management & Operations Modules
import { FleetDashboardModule } from './components/modules/FleetDashboardModule';
import { VesselsModule } from './components/modules/VesselsModule';
import { CertificatesModule } from './components/modules/CertificatesModule';
import { FleetDocumentsModule } from './components/modules/FleetDocumentsModule';
import { CrewManagementModule } from './components/modules/CrewManagementModule';
import { PlannedMaintenanceModule } from './components/modules/PlannedMaintenanceModule';
import { WorkOrdersModule } from './components/modules/WorkOrdersModule';
import { ProcurementModule } from './components/modules/ProcurementModule';
import { InventoryModule } from './components/modules/InventoryModule';

// Finance, Reporting & Settings Modules
import { AccountingModule } from './components/modules/AccountingModule';
import { BudgetCostModule } from './components/modules/BudgetCostModule';
import { ReportsModule } from './components/modules/ReportsModule';
import { AnalyticsModule } from './components/modules/AnalyticsModule';
import { UsersRolesModule } from './components/modules/UsersRolesModule';
import { CompanySettingsModule } from './components/modules/CompanySettingsModule';

export const App: React.FC = () => {
  const [activeRole, setActiveRole] = useState<UserRole>('direktur');
  const [activeModule, setActiveModule] = useState<ModuleType>('dashboard');

  const renderActiveModule = () => {
    switch (activeModule) {
      case 'dashboard':
        return <FleetDashboardModule onNavigateModule={(mod) => setActiveModule(mod)} />;

      // Fleet Management
      case 'fleet_vessels':
        return <VesselsModule />;
      case 'fleet_certificates':
        return <CertificatesModule />;
      case 'fleet_documents':
        return <FleetDocumentsModule />;
      case 'fleet_crew':
        return <CrewManagementModule />;

      // Operations
      case 'ops_maintenance':
        return <PlannedMaintenanceModule />;
      case 'ops_workorders':
        return <WorkOrdersModule />;
      case 'ops_procurement':
        return <ProcurementModule />;
      case 'ops_inventory':
        return <InventoryModule />;

      // LARS AI Modules
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

      // Finance
      case 'fin_accounting':
        return <AccountingModule />;
      case 'fin_budget':
        return <BudgetCostModule />;

      // Reporting
      case 'rep_reports':
        return <ReportsModule />;
      case 'rep_analytics':
        return <AnalyticsModule />;

      // Settings
      case 'set_users':
        return <UsersRolesModule />;
      case 'set_company':
        return <CompanySettingsModule />;

      default:
        return <FleetDashboardModule onNavigateModule={(mod) => setActiveModule(mod)} />;
    }
  };

  return (
    <div className="h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-teal-500 selection:text-white overflow-hidden">
      {/* Top Header */}
      <Header
        activeRole={activeRole}
        onRoleChange={(role) => setActiveRole(role)}
      />

      {/* Main Body Layout */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden min-h-0 items-stretch">
        {/* Left Sidebar */}
        <Sidebar
          activeModule={activeModule}
          onSelectModule={(mod) => setActiveModule(mod)}
        />

        {/* Center Content Workspace */}
        <main className="flex-1 p-4 lg:p-6 overflow-y-auto bg-slate-50 min-h-0">
          {renderActiveModule()}
        </main>
      </div>
    </div>
  );
};

export default App;
