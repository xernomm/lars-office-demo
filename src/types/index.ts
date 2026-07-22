export type UserRole = 
  | 'direktur' 
  | 'manager' 
  | 'surveyor' 
  | 'staff' 
  | 'finance' 
  | 'client';

export interface UserRoleDetail {
  id: UserRole;
  label: string;
  title: string;
  description: string;
  badgeColor: string;
}

export type ModuleType = 
  | 'dashboard' 
  | 'chatbot' 
  | 'survey_generator' 
  | 'dms' 
  | 'workflow' 
  | 'audit';

export interface ChatMessage {
  id: string;
  sender: string;
  text: string;
  timestamp: string;
  isAi: boolean;
  language?: 'ID' | 'EN';
  category?: string;
  isStreaming?: boolean;
}

export interface VisionSample {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  detectedDefect: string;
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
}

export interface DocumentItem {
  id: string;
  title: string;
  type: 'PDF' | 'DOCX' | 'XLSX';
  category: 'SOP' | 'Kontrak' | 'Laporan Inspection' | 'Regulasi' | 'Invoice';
  date: string;
  size: string;
  author: string;
  accessRoles: UserRole[];
  summary?: {
    partiesInvolved: string;
    contractValue: string;
    scopeOfWork: string;
    validityPeriod: string;
    complianceScore: string;
  };
  ocrText?: string;
}

export interface SurveyReport {
  id: string;
  shipName: string;
  surveyType: string;
  dwt: string;
  date: string;
  findingsText: string;
  visionFindings?: string;
  audioTranscript?: string;
  executiveSummary: string;
  detailedFindings: string[];
  recommendations: string[];
  status: 'Draft' | 'Pending Approval' | 'Approved' | 'Distributed';
  language: 'ID' | 'EN';
  managerNote?: string;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  user: string;
  role: UserRole;
  module: string;
  action: string;
  ipAddress: string;
  status: 'Success' | 'Warning' | 'Denied';
}

export interface WorkflowStep {
  id: number;
  name: string;
  shortName: string;
  description: string;
  status: 'Completed' | 'Active' | 'Pending';
  payloadSample: string;
  lastUpdated: string;
}
