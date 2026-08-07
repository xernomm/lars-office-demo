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
  | 'audit'
  // Fleet Management
  | 'fleet_vessels'
  | 'fleet_certificates'
  | 'fleet_documents'
  | 'fleet_crew'
  // Operations
  | 'ops_maintenance'
  | 'ops_workorders'
  | 'ops_procurement'
  | 'ops_inventory'
  // Finance
  | 'fin_accounting'
  | 'fin_budget'
  // Reporting
  | 'rep_reports'
  | 'rep_analytics'
  // Settings
  | 'set_users'
  | 'set_company';

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

// ========== FLEET MANAGEMENT TYPES ==========

export type VesselStatus = 'At Sea' | 'In Port' | 'Maintenance' | 'Laid Up';
export type VesselType = 'Bulk Carrier' | 'Container Ship' | 'Oil Tanker' | 'Chemical Tanker' | 'Offshore Support' | 'Tugboat' | 'LNG Carrier';

export interface Vessel {
  id: string;
  name: string;
  type: VesselType;
  flag: string;
  flagEmoji: string;
  status: VesselStatus;
  imo: string;
  mmsi: string;
  dwt: number;
  grossTonnage: number;
  yearBuilt: number;
  classificationSociety: string;
  location: string;
  coordinates: { lat: number; lng: number };
  speed: number;
  heading: number;
  course?: number;
  draught?: number;
  destination?: string;
  eta?: string;
  aisLastUpdate?: string;
  marineTrafficUrl?: string;
  nextMaintenance: string;
  maintenanceType: string;
  certificateCount: number;
  validCertificates: number;
  expiringCertificates: number;
  crewCount: number;
  lastInspection: string;
  imageUrl: string;
}

export type CertificateStatus = 'Valid' | 'Expiring Soon' | 'Expired';

export interface Certificate {
  id: string;
  vesselId: string;
  vesselName: string;
  name: string;
  type: string;
  issuedBy: string;
  issueDate: string;
  expiryDate: string;
  status: CertificateStatus;
  documentUrl?: string;
  remarks?: string;
}

export interface CrewMember {
  id: string;
  name: string;
  rank: string;
  department: string;
  vesselId: string;
  vesselName: string;
  nationality: string;
  certifications: string[];
  certExpiry: string;
  joinDate: string;
  contractEnd: string;
  phone: string;
  email: string;
  status: 'On Board' | 'On Leave' | 'Available' | 'Training';
}

export interface FleetDocument {
  id: string;
  title: string;
  type: 'PDF' | 'DOCX' | 'XLSX' | 'IMG';
  category: string;
  vesselName: string;
  uploadDate: string;
  size: string;
  uploadedBy: string;
  status: 'Active' | 'Archived' | 'Pending Review';
}

// ========== OPERATIONS TYPES ==========

export type MaintenanceStatus = 'Scheduled' | 'In Progress' | 'Completed' | 'Overdue';
export type MaintenancePriority = 'Critical' | 'High' | 'Medium' | 'Low';

export interface MaintenanceTask {
  id: string;
  vesselId: string;
  vesselName: string;
  component: string;
  taskDescription: string;
  priority: MaintenancePriority;
  status: MaintenanceStatus;
  scheduledDate: string;
  completedDate?: string;
  assignedTo: string;
  estimatedHours: number;
  actualHours?: number;
  runningHours: number;
  intervalHours: number;
  remarks?: string;
}

export type WorkOrderStatus = 'Open' | 'In Progress' | 'Pending Parts' | 'Completed' | 'Cancelled';
export type WorkOrderPriority = 'Emergency' | 'Urgent' | 'Normal' | 'Low';

export interface WorkOrder {
  id: string;
  title: string;
  vesselId: string;
  vesselName: string;
  category: string;
  priority: WorkOrderPriority;
  status: WorkOrderStatus;
  requestedBy: string;
  assignedTo: string;
  createdDate: string;
  dueDate: string;
  completedDate?: string;
  description: string;
  estimatedCost: number;
  actualCost?: number;
}

export type POStatus = 'Draft' | 'Pending Approval' | 'Approved' | 'Ordered' | 'Delivered' | 'Cancelled';

export interface PurchaseOrder {
  id: string;
  title: string;
  vendor: string;
  vesselName: string;
  category: string;
  status: POStatus;
  items: number;
  totalAmount: number;
  currency: string;
  requestedBy: string;
  approvedBy?: string;
  orderDate: string;
  expectedDelivery: string;
  deliveredDate?: string;
}

export interface InventoryItem {
  id: string;
  partNumber: string;
  name: string;
  category: string;
  location: string;
  vesselName: string;
  quantity: number;
  minStock: number;
  unit: string;
  unitPrice: number;
  currency: string;
  lastRestocked: string;
  supplier: string;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
}

// ========== FINANCE TYPES ==========

export type TransactionType = 'Debit' | 'Credit';

export interface Transaction {
  id: string;
  date: string;
  description: string;
  account: string;
  category: string;
  type: TransactionType;
  amount: number;
  currency: string;
  reference: string;
  vesselName?: string;
  status: 'Posted' | 'Pending' | 'Voided';
}

export interface BudgetLine {
  id: string;
  category: string;
  budgetAmount: number;
  actualAmount: number;
  currency: string;
  variance: number;
  variancePercent: number;
  period: string;
}

// ========== REPORTING TYPES ==========

export interface SavedReport {
  id: string;
  title: string;
  type: string;
  vessel?: string;
  period: string;
  generatedDate: string;
  generatedBy: string;
  format: 'PDF' | 'XLSX' | 'CSV';
  size: string;
  status: 'Ready' | 'Generating' | 'Failed';
}

// ========== SETTINGS TYPES ==========

export type SystemUserStatus = 'Active' | 'Inactive' | 'Suspended';

export interface SystemUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department: string;
  status: SystemUserStatus;
  lastLogin: string;
  createdDate: string;
  phone: string;
  avatar?: string;
}

export interface CompanyProfile {
  name: string;
  legalName: string;
  address: string;
  city: string;
  country: string;
  phone: string;
  email: string;
  website: string;
  npwp: string;
  siup: string;
  timezone: string;
  language: string;
  currency: string;
  logoUrl?: string;
}

// ========== CHART DATA TYPES ==========

export interface UpcomingTask {
  id: string;
  title: string;
  vesselName: string;
  dueDate: string;
  status: 'Overdue' | 'Due Soon' | 'Upcoming';
  icon: string;
}

export interface MaintenanceChartData {
  month: string;
  completed: number;
  inProgress: number;
  overdue: number;
}

export interface ExpenseItem {
  name: string;
  amount: number;
  percentage: number;
}
