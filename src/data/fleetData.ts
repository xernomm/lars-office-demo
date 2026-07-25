import {
  Vessel, Certificate, CrewMember, FleetDocument,
  MaintenanceTask, WorkOrder, PurchaseOrder, InventoryItem,
  Transaction, BudgetLine, SavedReport, SystemUser,
  UpcomingTask, MaintenanceChartData, ExpenseItem, CompanyProfile
} from '../types';

// ======================== VESSELS ========================
export const MOCK_VESSELS: Vessel[] = [
  {
    id: 'VSL-001', name: 'MV Ocean Pioneer', type: 'Bulk Carrier', flag: 'Indonesia', flagEmoji: '🇮🇩',
    status: 'At Sea', imo: '9482103', mmsi: '525019001', dwt: 45210, grossTonnage: 28450, yearBuilt: 2018,
    classificationSociety: 'BKI', location: 'South China Sea', coordinates: { lat: 12.5, lng: 112.25 },
    speed: 12.5, heading: 45, nextMaintenance: '02 Jun 2024', maintenanceType: 'Main Engine Service',
    certificateCount: 8, validCertificates: 8, expiringCertificates: 0, crewCount: 22, lastInspection: '15 Mar 2024',
    imageUrl: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400'
  },
  {
    id: 'VSL-002', name: 'MV Pacific Trader', type: 'Container Ship', flag: 'Singapore', flagEmoji: '🇸🇬',
    status: 'In Port', imo: '9518274', mmsi: '563022100', dwt: 38900, grossTonnage: 25100, yearBuilt: 2019,
    classificationSociety: 'Lloyd\'s Register', location: 'Port of Singapore', coordinates: { lat: 1.26, lng: 103.84 },
    speed: 0, heading: 180, nextMaintenance: '05 Jun 2024', maintenanceType: 'Aux Engine Service',
    certificateCount: 8, validCertificates: 7, expiringCertificates: 1, crewCount: 20, lastInspection: '22 Apr 2024',
    imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400'
  },
  {
    id: 'VSL-003', name: 'MV Coastal Explorer', type: 'Offshore Support', flag: 'Indonesia', flagEmoji: '🇮🇩',
    status: 'Maintenance', imo: '9601892', mmsi: '525019045', dwt: 12800, grossTonnage: 8200, yearBuilt: 2016,
    classificationSociety: 'BKI', location: 'Batam Shipyard', coordinates: { lat: 1.05, lng: 104.03 },
    speed: 0, heading: 0, nextMaintenance: '10 Jun 2024', maintenanceType: 'Docking',
    certificateCount: 8, validCertificates: 5, expiringCertificates: 2, crewCount: 15, lastInspection: '10 Jan 2024',
    imageUrl: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=400'
  },
  {
    id: 'VSL-004', name: 'MT Nusantara Spirit', type: 'Oil Tanker', flag: 'Indonesia', flagEmoji: '🇮🇩',
    status: 'At Sea', imo: '9555128', mmsi: '525019078', dwt: 68500, grossTonnage: 42100, yearBuilt: 2020,
    classificationSociety: 'DNV', location: 'Strait of Malacca', coordinates: { lat: 2.5, lng: 101.5 },
    speed: 10.8, heading: 310, nextMaintenance: '20 Jul 2024', maintenanceType: 'Cargo Tank Inspection',
    certificateCount: 10, validCertificates: 9, expiringCertificates: 1, crewCount: 28, lastInspection: '05 May 2024',
    imageUrl: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400'
  },
  {
    id: 'VSL-005', name: 'TB Samudra Jaya', type: 'Tugboat', flag: 'Indonesia', flagEmoji: '🇮🇩',
    status: 'At Sea', imo: '9710445', mmsi: '525019112', dwt: 2800, grossTonnage: 1850, yearBuilt: 2021,
    classificationSociety: 'BKI', location: 'Java Sea', coordinates: { lat: -5.8, lng: 110.4 },
    speed: 8.2, heading: 90, nextMaintenance: '15 Aug 2024', maintenanceType: 'Propeller Inspection',
    certificateCount: 6, validCertificates: 6, expiringCertificates: 0, crewCount: 12, lastInspection: '28 Apr 2024',
    imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400'
  },
  {
    id: 'VSL-006', name: 'MV Borneo Express', type: 'Chemical Tanker', flag: 'Malaysia', flagEmoji: '🇲🇾',
    status: 'Laid Up', imo: '9488210', mmsi: '533001200', dwt: 22400, grossTonnage: 14800, yearBuilt: 2015,
    classificationSociety: 'ABS', location: 'Tanjung Priok', coordinates: { lat: -6.1, lng: 106.87 },
    speed: 0, heading: 270, nextMaintenance: '01 Sep 2024', maintenanceType: 'Full Refit',
    certificateCount: 8, validCertificates: 4, expiringCertificates: 3, crewCount: 8, lastInspection: '20 Dec 2023',
    imageUrl: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=400'
  },
];

// ======================== CERTIFICATES ========================
export const MOCK_CERTIFICATES: Certificate[] = [
  { id: 'CERT-001', vesselId: 'VSL-001', vesselName: 'MV Ocean Pioneer', name: 'Certificate of Class', type: 'Class', issuedBy: 'BKI', issueDate: '15 Jan 2023', expiryDate: '14 Jan 2028', status: 'Valid' },
  { id: 'CERT-002', vesselId: 'VSL-001', vesselName: 'MV Ocean Pioneer', name: 'Safety Management Certificate (SMC)', type: 'ISM', issuedBy: 'Directorate General of Sea Transportation', issueDate: '01 Mar 2023', expiryDate: '28 Feb 2028', status: 'Valid' },
  { id: 'CERT-003', vesselId: 'VSL-001', vesselName: 'MV Ocean Pioneer', name: 'IOPP Certificate', type: 'MARPOL', issuedBy: 'BKI', issueDate: '15 Jan 2023', expiryDate: '14 Jan 2028', status: 'Valid' },
  { id: 'CERT-004', vesselId: 'VSL-001', vesselName: 'MV Ocean Pioneer', name: 'ISPS Certificate', type: 'Security', issuedBy: 'Maritime Security Agency', issueDate: '10 Jun 2023', expiryDate: '09 Jun 2028', status: 'Valid' },
  { id: 'CERT-005', vesselId: 'VSL-002', vesselName: 'MV Pacific Trader', name: 'Certificate of Class', type: 'Class', issuedBy: "Lloyd's Register", issueDate: '20 Apr 2022', expiryDate: '19 Apr 2027', status: 'Valid' },
  { id: 'CERT-006', vesselId: 'VSL-002', vesselName: 'MV Pacific Trader', name: 'Safety Equipment Certificate', type: 'SOLAS', issuedBy: 'MPA Singapore', issueDate: '01 May 2023', expiryDate: '30 Aug 2024', status: 'Expiring Soon' },
  { id: 'CERT-007', vesselId: 'VSL-002', vesselName: 'MV Pacific Trader', name: 'Load Line Certificate', type: 'Statutory', issuedBy: "Lloyd's Register", issueDate: '20 Apr 2022', expiryDate: '19 Apr 2027', status: 'Valid' },
  { id: 'CERT-008', vesselId: 'VSL-003', vesselName: 'MV Coastal Explorer', name: 'Certificate of Class', type: 'Class', issuedBy: 'BKI', issueDate: '05 Mar 2021', expiryDate: '04 Mar 2024', status: 'Expired' },
  { id: 'CERT-009', vesselId: 'VSL-003', vesselName: 'MV Coastal Explorer', name: 'IOPP Certificate', type: 'MARPOL', issuedBy: 'BKI', issueDate: '05 Mar 2021', expiryDate: '15 Jul 2024', status: 'Expiring Soon' },
  { id: 'CERT-010', vesselId: 'VSL-004', vesselName: 'MT Nusantara Spirit', name: 'Certificate of Class', type: 'Class', issuedBy: 'DNV', issueDate: '10 Jul 2022', expiryDate: '09 Jul 2027', status: 'Valid' },
  { id: 'CERT-011', vesselId: 'VSL-004', vesselName: 'MT Nusantara Spirit', name: 'International Oil Pollution Prevention (IOPP)', type: 'MARPOL', issuedBy: 'DNV', issueDate: '10 Jul 2022', expiryDate: '10 Aug 2024', status: 'Expiring Soon' },
  { id: 'CERT-012', vesselId: 'VSL-005', vesselName: 'TB Samudra Jaya', name: 'Certificate of Class', type: 'Class', issuedBy: 'BKI', issueDate: '01 Sep 2022', expiryDate: '31 Aug 2027', status: 'Valid' },
  { id: 'CERT-013', vesselId: 'VSL-006', vesselName: 'MV Borneo Express', name: 'Certificate of Class', type: 'Class', issuedBy: 'ABS', issueDate: '10 Feb 2020', expiryDate: '01 Feb 2024', status: 'Expired' },
  { id: 'CERT-014', vesselId: 'VSL-006', vesselName: 'MV Borneo Express', name: 'NLS Certificate', type: 'MARPOL', issuedBy: 'ABS', issueDate: '10 Feb 2020', expiryDate: '15 Mar 2024', status: 'Expired' },
  { id: 'CERT-015', vesselId: 'VSL-006', vesselName: 'MV Borneo Express', name: 'Safety Construction Certificate', type: 'SOLAS', issuedBy: 'ABS', issueDate: '10 Feb 2020', expiryDate: '20 Sep 2024', status: 'Expiring Soon' },
];

// ======================== CREW ========================
export const MOCK_CREW: CrewMember[] = [
  { id: 'CRW-001', name: 'Capt. Heru Susanto', rank: 'Master', department: 'Deck', vesselId: 'VSL-001', vesselName: 'MV Ocean Pioneer', nationality: 'Indonesian', certifications: ['Master Mariner (ANT-I)', 'GMDSS GOC', 'SSO'], certExpiry: '15 Dec 2025', joinDate: '01 Jan 2024', contractEnd: '31 Dec 2024', phone: '+62 812 3456 7890', email: 'heru.s@lars.co.id', status: 'On Board' },
  { id: 'CRW-002', name: 'C/O Rizky Pratama', rank: 'Chief Officer', department: 'Deck', vesselId: 'VSL-001', vesselName: 'MV Ocean Pioneer', nationality: 'Indonesian', certifications: ['ANT-II', 'ARPA', 'BRM'], certExpiry: '20 Mar 2025', joinDate: '15 Feb 2024', contractEnd: '14 Feb 2025', phone: '+62 813 4567 8901', email: 'rizky.p@lars.co.id', status: 'On Board' },
  { id: 'CRW-003', name: 'C/E Bambang Widodo', rank: 'Chief Engineer', department: 'Engine', vesselId: 'VSL-001', vesselName: 'MV Ocean Pioneer', nationality: 'Indonesian', certifications: ['ATT-I', 'ERM', 'High Voltage'], certExpiry: '10 Jul 2025', joinDate: '01 Mar 2024', contractEnd: '28 Feb 2025', phone: '+62 815 6789 0123', email: 'bambang.w@lars.co.id', status: 'On Board' },
  { id: 'CRW-004', name: '2/O Siti Nurhaliza', rank: 'Second Officer', department: 'Deck', vesselId: 'VSL-002', vesselName: 'MV Pacific Trader', nationality: 'Indonesian', certifications: ['ANT-III', 'ARPA'], certExpiry: '05 Nov 2025', joinDate: '10 Apr 2024', contractEnd: '09 Apr 2025', phone: '+62 816 7890 1234', email: 'siti.n@lars.co.id', status: 'On Board' },
  { id: 'CRW-005', name: 'Capt. Ahmad Fadli', rank: 'Master', department: 'Deck', vesselId: 'VSL-002', vesselName: 'MV Pacific Trader', nationality: 'Indonesian', certifications: ['Master Mariner (ANT-I)', 'GMDSS GOC'], certExpiry: '28 Feb 2026', joinDate: '01 Jan 2024', contractEnd: '31 Dec 2024', phone: '+62 817 8901 2345', email: 'ahmad.f@lars.co.id', status: 'On Board' },
  { id: 'CRW-006', name: 'C/E Denny Setiawan', rank: 'Chief Engineer', department: 'Engine', vesselId: 'VSL-002', vesselName: 'MV Pacific Trader', nationality: 'Indonesian', certifications: ['ATT-I', 'ERM'], certExpiry: '15 Aug 2025', joinDate: '15 Jan 2024', contractEnd: '14 Jan 2025', phone: '+62 818 9012 3456', email: 'denny.s@lars.co.id', status: 'On Board' },
  { id: 'CRW-007', name: 'Bosun Wahyu Prasetyo', rank: 'Bosun', department: 'Deck', vesselId: 'VSL-003', vesselName: 'MV Coastal Explorer', nationality: 'Indonesian', certifications: ['BST', 'PSCRB', 'AFF'], certExpiry: '20 Jun 2025', joinDate: '01 May 2024', contractEnd: '31 Oct 2024', phone: '+62 819 0123 4567', email: 'wahyu.p@lars.co.id', status: 'On Board' },
  { id: 'CRW-008', name: 'Capt. Irfan Hakim', rank: 'Master', department: 'Deck', vesselId: 'VSL-004', vesselName: 'MT Nusantara Spirit', nationality: 'Indonesian', certifications: ['Master Mariner (ANT-I)', 'GMDSS GOC', 'Tanker Endorsement'], certExpiry: '30 Sep 2025', joinDate: '01 Feb 2024', contractEnd: '31 Jan 2025', phone: '+62 811 2345 6789', email: 'irfan.h@lars.co.id', status: 'On Board' },
  { id: 'CRW-009', name: '3/E Putri Handayani', rank: 'Third Engineer', department: 'Engine', vesselId: 'VSL-004', vesselName: 'MT Nusantara Spirit', nationality: 'Indonesian', certifications: ['ATT-III'], certExpiry: '12 Jan 2025', joinDate: '10 Mar 2024', contractEnd: '09 Mar 2025', phone: '+62 812 0987 6543', email: 'putri.h@lars.co.id', status: 'On Board' },
  { id: 'CRW-010', name: 'AB Seaman Joko Susilo', rank: 'AB Seaman', department: 'Deck', vesselId: 'VSL-005', vesselName: 'TB Samudra Jaya', nationality: 'Indonesian', certifications: ['BST', 'PSCRB'], certExpiry: '18 Apr 2026', joinDate: '01 Jun 2024', contractEnd: '30 Nov 2024', phone: '+62 813 1122 3344', email: 'joko.s@lars.co.id', status: 'On Board' },
  { id: 'CRW-011', name: 'Capt. Lee Wei Ming', rank: 'Master', department: 'Deck', vesselId: 'VSL-005', vesselName: 'TB Samudra Jaya', nationality: 'Malaysian', certifications: ['Master Mariner', 'GMDSS GOC'], certExpiry: '22 Nov 2025', joinDate: '01 Apr 2024', contractEnd: '31 Mar 2025', phone: '+60 12 345 6789', email: 'lee.wm@lars.co.id', status: 'On Board' },
  { id: 'CRW-012', name: 'Oiler Rudi Hartono', rank: 'Oiler', department: 'Engine', vesselId: 'VSL-003', vesselName: 'MV Coastal Explorer', nationality: 'Indonesian', certifications: ['BST', 'AFF'], certExpiry: '30 May 2025', joinDate: '15 Apr 2024', contractEnd: '14 Oct 2024', phone: '+62 814 5566 7788', email: 'rudi.h@lars.co.id', status: 'On Board' },
  { id: 'CRW-013', name: 'C/O Budi Santoso', rank: 'Chief Officer', department: 'Deck', vesselId: 'VSL-006', vesselName: 'MV Borneo Express', nationality: 'Indonesian', certifications: ['ANT-II', 'ARPA'], certExpiry: '10 Oct 2024', joinDate: '01 Jan 2024', contractEnd: '30 Jun 2024', phone: '+62 815 9988 7766', email: 'budi.s@lars.co.id', status: 'On Leave' },
  { id: 'CRW-014', name: '2/E Andi Firmansyah', rank: 'Second Engineer', department: 'Engine', vesselId: 'VSL-001', vesselName: 'MV Ocean Pioneer', nationality: 'Indonesian', certifications: ['ATT-II', 'ERM'], certExpiry: '25 Aug 2025', joinDate: '01 Apr 2024', contractEnd: '31 Mar 2025', phone: '+62 816 4455 6677', email: 'andi.f@lars.co.id', status: 'On Board' },
  { id: 'CRW-015', name: 'Cook Agus Supriyadi', rank: 'Chief Cook', department: 'Catering', vesselId: 'VSL-004', vesselName: 'MT Nusantara Spirit', nationality: 'Indonesian', certifications: ['BST', 'Ship Cook Certificate'], certExpiry: '15 Mar 2026', joinDate: '01 May 2024', contractEnd: '31 Oct 2024', phone: '+62 817 3344 5566', email: 'agus.s@lars.co.id', status: 'On Board' },
];

// ======================== FLEET DOCUMENTS ========================
export const MOCK_FLEET_DOCUMENTS: FleetDocument[] = [
  { id: 'FDOC-001', title: 'Safety Management Manual v4.2', type: 'PDF', category: 'Safety', vesselName: 'All Vessels', uploadDate: '20 May 2024', size: '2.4 MB', uploadedBy: 'QA/QC Team', status: 'Active' },
  { id: 'FDOC-002', title: 'Crew List - May 2024', type: 'XLSX', category: 'Crew', vesselName: 'MV Ocean Pioneer', uploadDate: '18 May 2024', size: '0.8 MB', uploadedBy: 'HR Department', status: 'Active' },
  { id: 'FDOC-003', title: 'Insurance Certificate - P&I Club', type: 'PDF', category: 'Insurance', vesselName: 'MV Ocean Pioneer', uploadDate: '15 May 2024', size: '1.3 MB', uploadedBy: 'Legal Dept', status: 'Active' },
  { id: 'FDOC-004', title: 'Planned Maintenance Report Q1 2024', type: 'PDF', category: 'Maintenance', vesselName: 'All Vessels', uploadDate: '12 May 2024', size: '3.1 MB', uploadedBy: 'Technical Superintendent', status: 'Active' },
  { id: 'FDOC-005', title: 'Dry Dock Report - MV Coastal Explorer', type: 'PDF', category: 'Maintenance', vesselName: 'MV Coastal Explorer', uploadDate: '10 May 2024', size: '5.6 MB', uploadedBy: 'Shipyard', status: 'Pending Review' },
  { id: 'FDOC-006', title: 'Voyage Report #VR-2024-042', type: 'PDF', category: 'Operations', vesselName: 'MT Nusantara Spirit', uploadDate: '08 May 2024', size: '1.8 MB', uploadedBy: 'Capt. Irfan Hakim', status: 'Active' },
  { id: 'FDOC-007', title: 'ISM Internal Audit Report 2024', type: 'DOCX', category: 'Audit', vesselName: 'All Vessels', uploadDate: '05 May 2024', size: '2.2 MB', uploadedBy: 'DPA', status: 'Active' },
  { id: 'FDOC-008', title: 'Bunker Delivery Note - MV Pacific Trader', type: 'PDF', category: 'Operations', vesselName: 'MV Pacific Trader', uploadDate: '02 May 2024', size: '0.5 MB', uploadedBy: 'C/E Denny', status: 'Archived' },
];

// ======================== MAINTENANCE TASKS ========================
export const MOCK_MAINTENANCE_TASKS: MaintenanceTask[] = [
  { id: 'MT-001', vesselId: 'VSL-001', vesselName: 'MV Ocean Pioneer', component: 'Main Engine - Cylinder Head', taskDescription: 'Overhaul cylinder head #3 and #4, replace exhaust valve seats', priority: 'High', status: 'Overdue', scheduledDate: '02 Jun 2024', assignedTo: 'C/E Bambang', estimatedHours: 48, runningHours: 12500, intervalHours: 12000, remarks: 'Running hours exceeded limit' },
  { id: 'MT-002', vesselId: 'VSL-001', vesselName: 'MV Ocean Pioneer', component: 'Auxiliary Boiler', taskDescription: 'Annual inspection and safety valve test', priority: 'Medium', status: 'Scheduled', scheduledDate: '15 Jul 2024', assignedTo: '2/E Andi', estimatedHours: 8, runningHours: 4200, intervalHours: 5000 },
  { id: 'MT-003', vesselId: 'VSL-002', vesselName: 'MV Pacific Trader', component: 'Aux Engine #1', taskDescription: 'Top overhaul and injector replacement', priority: 'High', status: 'In Progress', scheduledDate: '05 Jun 2024', assignedTo: 'C/E Denny', estimatedHours: 24, actualHours: 16, runningHours: 8800, intervalHours: 8000 },
  { id: 'MT-004', vesselId: 'VSL-002', vesselName: 'MV Pacific Trader', component: 'Ballast Water Treatment System', taskDescription: 'Quarterly calibration and UV lamp replacement', priority: 'Medium', status: 'Scheduled', scheduledDate: '20 Jun 2024', assignedTo: '2/E TBD', estimatedHours: 6, runningHours: 2100, intervalHours: 2500 },
  { id: 'MT-005', vesselId: 'VSL-003', vesselName: 'MV Coastal Explorer', component: 'Hull - Bottom Plate', taskDescription: 'Dry dock hull blasting and recoating', priority: 'Critical', status: 'In Progress', scheduledDate: '10 Jun 2024', assignedTo: 'Batam Shipyard', estimatedHours: 240, actualHours: 120, runningHours: 0, intervalHours: 0, remarks: 'Intermediate survey combined with docking' },
  { id: 'MT-006', vesselId: 'VSL-003', vesselName: 'MV Coastal Explorer', component: 'Propeller & Rudder', taskDescription: 'Propeller polishing, rudder bearing clearance check', priority: 'High', status: 'Scheduled', scheduledDate: '12 Jun 2024', assignedTo: 'Batam Shipyard', estimatedHours: 36, runningHours: 0, intervalHours: 0 },
  { id: 'MT-007', vesselId: 'VSL-004', vesselName: 'MT Nusantara Spirit', component: 'Cargo Tank Coating', taskDescription: 'Tank #2P coating inspection and touch-up', priority: 'Medium', status: 'Scheduled', scheduledDate: '20 Jul 2024', assignedTo: 'C/O TBD', estimatedHours: 16, runningHours: 0, intervalHours: 0 },
  { id: 'MT-008', vesselId: 'VSL-004', vesselName: 'MT Nusantara Spirit', component: 'Inert Gas System (IGS)', taskDescription: 'IGS scrubber overhaul and deck seal inspection', priority: 'High', status: 'Scheduled', scheduledDate: '25 Jul 2024', assignedTo: 'C/E TBD', estimatedHours: 12, runningHours: 3500, intervalHours: 4000 },
  { id: 'MT-009', vesselId: 'VSL-005', vesselName: 'TB Samudra Jaya', component: 'Main Engine - Turbocharger', taskDescription: 'Turbocharger rotor inspection and bearing replacement', priority: 'Medium', status: 'Completed', scheduledDate: '28 Apr 2024', completedDate: '30 Apr 2024', assignedTo: 'C/E Lee', estimatedHours: 12, actualHours: 14, runningHours: 6000, intervalHours: 6000 },
  { id: 'MT-010', vesselId: 'VSL-006', vesselName: 'MV Borneo Express', component: 'Full Vessel Refit', taskDescription: 'Complete structural survey, piping renewal, machinery overhaul', priority: 'Critical', status: 'Overdue', scheduledDate: '01 May 2024', assignedTo: 'Tanjung Priok Shipyard', estimatedHours: 720, runningHours: 0, intervalHours: 0, remarks: 'Awaiting budget approval for refit' },
];

// ======================== WORK ORDERS ========================
export const MOCK_WORK_ORDERS: WorkOrder[] = [
  { id: 'WO-2024-001', title: 'Main Engine Cylinder Head Overhaul', vesselId: 'VSL-001', vesselName: 'MV Ocean Pioneer', category: 'Engine', priority: 'Urgent', status: 'In Progress', requestedBy: 'C/E Bambang', assignedTo: 'Engine Workshop', createdDate: '25 May 2024', dueDate: '10 Jun 2024', description: 'Overhaul cylinder heads #3 and #4 due to high exhaust temperature.', estimatedCost: 15000, actualCost: 8500 },
  { id: 'WO-2024-002', title: 'Navigation Radar Calibration', vesselId: 'VSL-002', vesselName: 'MV Pacific Trader', category: 'Navigation', priority: 'Normal', status: 'Open', requestedBy: 'C/O Siti', assignedTo: 'Electronics Team', createdDate: '28 May 2024', dueDate: '15 Jun 2024', description: 'X-band radar showing intermittent bearing errors. Needs calibration.', estimatedCost: 3500 },
  { id: 'WO-2024-003', title: 'Lifeboat Davit Wire Replacement', vesselId: 'VSL-001', vesselName: 'MV Ocean Pioneer', category: 'Safety', priority: 'Urgent', status: 'Pending Parts', requestedBy: 'Bosun', assignedTo: 'Deck Team', createdDate: '20 May 2024', dueDate: '05 Jun 2024', description: 'Lifeboat davit wire #1 showing corrosion beyond acceptable limit.', estimatedCost: 8000 },
  { id: 'WO-2024-004', title: 'Sewage Treatment Plant Overhaul', vesselId: 'VSL-003', vesselName: 'MV Coastal Explorer', category: 'Environmental', priority: 'Normal', status: 'Open', requestedBy: 'C/E', assignedTo: 'Environmental Dept', createdDate: '01 Jun 2024', dueDate: '25 Jun 2024', description: 'STP unit membrane needs replacement. Effluent quality below standard.', estimatedCost: 12000 },
  { id: 'WO-2024-005', title: 'Cargo Pump #2 Seal Replacement', vesselId: 'VSL-004', vesselName: 'MT Nusantara Spirit', category: 'Cargo', priority: 'Emergency', status: 'In Progress', requestedBy: 'C/E Irfan', assignedTo: 'Engine Team', createdDate: '30 May 2024', dueDate: '02 Jun 2024', description: 'Mechanical seal failure on cargo pump #2. Oil leaking into pump room.', estimatedCost: 22000, actualCost: 18500 },
  { id: 'WO-2024-006', title: 'GMDSS Battery Replacement', vesselId: 'VSL-005', vesselName: 'TB Samudra Jaya', category: 'Communication', priority: 'Normal', status: 'Completed', requestedBy: 'Radio Officer', assignedTo: 'Electronics', createdDate: '15 May 2024', dueDate: '30 May 2024', completedDate: '28 May 2024', description: 'GMDSS backup battery below capacity threshold.', estimatedCost: 2500, actualCost: 2200 },
  { id: 'WO-2024-007', title: 'Accommodation A/C Compressor Repair', vesselId: 'VSL-004', vesselName: 'MT Nusantara Spirit', category: 'HVAC', priority: 'Low', status: 'Open', requestedBy: 'Chief Cook', assignedTo: 'Engine Team', createdDate: '02 Jun 2024', dueDate: '20 Jun 2024', description: 'A/C compressor for officers mess making unusual noise. Cooling capacity reduced.', estimatedCost: 5000 },
  { id: 'WO-2024-008', title: 'Anchor Windlass Brake Lining', vesselId: 'VSL-006', vesselName: 'MV Borneo Express', category: 'Deck', priority: 'Normal', status: 'Cancelled', requestedBy: 'C/O Budi', assignedTo: 'Deck Team', createdDate: '10 May 2024', dueDate: '30 May 2024', description: 'Brake lining wear at 70%. Replacement during next port stay.', estimatedCost: 4000 },
];

// ======================== PURCHASE ORDERS ========================
export const MOCK_PURCHASE_ORDERS: PurchaseOrder[] = [
  { id: 'PO-2024-0051', title: 'Main Engine Spare Parts Package', vendor: 'MAN Energy Solutions', vesselName: 'MV Ocean Pioneer', category: 'Engine Spares', status: 'Ordered', items: 12, totalAmount: 45000, currency: 'USD', requestedBy: 'C/E Bambang', approvedBy: 'Tech Supt', orderDate: '22 May 2024', expectedDelivery: '15 Jun 2024' },
  { id: 'PO-2024-0052', title: 'Safety Equipment Annual Supply', vendor: 'Viking Life-Saving Equipment', vesselName: 'All Vessels', category: 'Safety', status: 'Delivered', items: 24, totalAmount: 18500, currency: 'USD', requestedBy: 'DPA', approvedBy: 'Fleet Manager', orderDate: '10 May 2024', expectedDelivery: '25 May 2024', deliveredDate: '24 May 2024' },
  { id: 'PO-2024-0053', title: 'Lubricating Oil - Cylinder & System', vendor: 'Shell Marine', vesselName: 'MT Nusantara Spirit', category: 'Lubricants', status: 'Approved', items: 6, totalAmount: 32000, currency: 'USD', requestedBy: 'C/E', approvedBy: 'Procurement Mgr', orderDate: '28 May 2024', expectedDelivery: '10 Jun 2024' },
  { id: 'PO-2024-0054', title: 'Navigation Charts Update Package', vendor: 'UKHO / Admiralty', vesselName: 'All Vessels', category: 'Navigation', status: 'Pending Approval', items: 48, totalAmount: 5200, currency: 'USD', requestedBy: 'Fleet Ops', orderDate: '01 Jun 2024', expectedDelivery: '20 Jun 2024' },
  { id: 'PO-2024-0055', title: 'Dry Dock Materials - Hull Coating', vendor: 'Jotun Marine Coatings', vesselName: 'MV Coastal Explorer', category: 'Hull & Deck', status: 'Ordered', items: 8, totalAmount: 28000, currency: 'USD', requestedBy: 'Shipyard', approvedBy: 'Tech Supt', orderDate: '05 Jun 2024', expectedDelivery: '08 Jun 2024' },
  { id: 'PO-2024-0056', title: 'Provision & Stores - Monthly Supply', vendor: 'PT Samudera Supplies', vesselName: 'MV Ocean Pioneer', category: 'Provisions', status: 'Draft', items: 156, totalAmount: 8500, currency: 'USD', requestedBy: 'Chief Cook', orderDate: '03 Jun 2024', expectedDelivery: '12 Jun 2024' },
];

// ======================== INVENTORY ========================
export const MOCK_INVENTORY: InventoryItem[] = [
  { id: 'INV-001', partNumber: 'ME-CYL-HEAD-001', name: 'Cylinder Head Assembly', category: 'Engine Spares', location: 'Main Engine Store', vesselName: 'MV Ocean Pioneer', quantity: 2, minStock: 2, unit: 'pcs', unitPrice: 8500, currency: 'USD', lastRestocked: '10 Mar 2024', supplier: 'MAN Energy Solutions', status: 'Low Stock' },
  { id: 'INV-002', partNumber: 'ME-EXH-VALVE-002', name: 'Exhaust Valve Spindle', category: 'Engine Spares', location: 'Main Engine Store', vesselName: 'MV Ocean Pioneer', quantity: 8, minStock: 4, unit: 'pcs', unitPrice: 1200, currency: 'USD', lastRestocked: '15 Apr 2024', supplier: 'MAN Energy Solutions', status: 'In Stock' },
  { id: 'INV-003', partNumber: 'FLT-FO-PURIFIER', name: 'Fuel Oil Purifier Disc Stack', category: 'Purifier Parts', location: 'Engine Store', vesselName: 'MV Ocean Pioneer', quantity: 1, minStock: 2, unit: 'set', unitPrice: 3200, currency: 'USD', lastRestocked: '20 Jan 2024', supplier: 'Alfa Laval', status: 'Low Stock' },
  { id: 'INV-004', partNumber: 'DK-MOORING-ROPE', name: 'Polypropylene Mooring Rope 72mm', category: 'Deck Supplies', location: 'Bosun Store', vesselName: 'MV Pacific Trader', quantity: 4, minStock: 2, unit: 'coils', unitPrice: 2800, currency: 'USD', lastRestocked: '05 May 2024', supplier: 'Samson Rope', status: 'In Stock' },
  { id: 'INV-005', partNumber: 'SF-SCBA-CYLINDER', name: 'SCBA Breathing Air Cylinder', category: 'Safety Equipment', location: 'Safety Store', vesselName: 'MV Ocean Pioneer', quantity: 6, minStock: 4, unit: 'pcs', unitPrice: 450, currency: 'USD', lastRestocked: '01 May 2024', supplier: 'MSA Safety', status: 'In Stock' },
  { id: 'INV-006', partNumber: 'LO-CYL-OIL-50', name: 'Cylinder Lube Oil 50 BN', category: 'Lubricants', location: 'Oil Store', vesselName: 'MT Nusantara Spirit', quantity: 8, minStock: 10, unit: 'drums', unitPrice: 680, currency: 'USD', lastRestocked: '12 Apr 2024', supplier: 'Shell Marine', status: 'Low Stock' },
  { id: 'INV-007', partNumber: 'EL-NAV-LIGHT', name: 'Navigation Light Bulb (LED)', category: 'Electrical', location: 'Electrical Store', vesselName: 'TB Samudra Jaya', quantity: 12, minStock: 6, unit: 'pcs', unitPrice: 85, currency: 'USD', lastRestocked: '20 May 2024', supplier: 'Hella Marine', status: 'In Stock' },
  { id: 'INV-008', partNumber: 'PNT-ANTIFOUL-20L', name: 'Antifouling Paint (Self-Polishing)', category: 'Hull & Deck', location: 'Paint Store', vesselName: 'MV Coastal Explorer', quantity: 0, minStock: 10, unit: 'cans (20L)', unitPrice: 320, currency: 'USD', lastRestocked: '15 Feb 2024', supplier: 'Jotun Marine', status: 'Out of Stock' },
  { id: 'INV-009', partNumber: 'ME-FUEL-INJ-003', name: 'Fuel Injector Nozzle (Complete)', category: 'Engine Spares', location: 'Engine Store', vesselName: 'MV Pacific Trader', quantity: 4, minStock: 3, unit: 'pcs', unitPrice: 2100, currency: 'USD', lastRestocked: '28 Apr 2024', supplier: 'Bosch Rexroth', status: 'In Stock' },
  { id: 'INV-010', partNumber: 'SF-IMMSUIT-001', name: 'Immersion Suit (SOLAS Approved)', category: 'Safety Equipment', location: 'Safety Store', vesselName: 'All Vessels', quantity: 30, minStock: 24, unit: 'pcs', unitPrice: 280, currency: 'USD', lastRestocked: '10 May 2024', supplier: 'Viking', status: 'In Stock' },
  { id: 'INV-011', partNumber: 'GT-WELDING-ROD', name: 'Welding Electrode E7018 (3.2mm)', category: 'General Tools', location: 'Workshop', vesselName: 'MV Coastal Explorer', quantity: 5, minStock: 10, unit: 'boxes', unitPrice: 45, currency: 'USD', lastRestocked: '01 Mar 2024', supplier: 'Lincoln Electric', status: 'Low Stock' },
  { id: 'INV-012', partNumber: 'FW-CHEMICAL-001', name: 'Fresh Water Treatment Chemical', category: 'Consumables', location: 'Engine Store', vesselName: 'MV Ocean Pioneer', quantity: 15, minStock: 5, unit: 'kg', unitPrice: 18, currency: 'USD', lastRestocked: '25 May 2024', supplier: 'Drew Marine', status: 'In Stock' },
];

// ======================== TRANSACTIONS ========================
export const MOCK_TRANSACTIONS: Transaction[] = [
  { id: 'TXN-001', date: '01 Jun 2024', description: 'Bunker Supply - MV Ocean Pioneer (HFO 380)', account: 'Operating Expenses', category: 'Fuel', type: 'Debit', amount: 125000, currency: 'USD', reference: 'BDN-2024-0089', vesselName: 'MV Ocean Pioneer', status: 'Posted' },
  { id: 'TXN-002', date: '28 May 2024', description: 'Crew Wage Payment - May 2024', account: 'Crew Expenses', category: 'Crew & Payroll', type: 'Debit', amount: 68000, currency: 'USD', reference: 'PAY-2024-05', status: 'Posted' },
  { id: 'TXN-003', date: '25 May 2024', description: 'Port Charges - Singapore (MV Pacific Trader)', account: 'Port & Agency', category: 'Port & Agency', type: 'Debit', amount: 32000, currency: 'USD', reference: 'PA-SG-2024-042', vesselName: 'MV Pacific Trader', status: 'Posted' },
  { id: 'TXN-004', date: '24 May 2024', description: 'Safety Equipment PO Delivery (Viking)', account: 'Maintenance', category: 'Maintenance', type: 'Debit', amount: 18500, currency: 'USD', reference: 'PO-2024-0052', status: 'Posted' },
  { id: 'TXN-005', date: '22 May 2024', description: 'Charter Hire Income - MT Nusantara Spirit', account: 'Revenue', category: 'Charter Income', type: 'Credit', amount: 285000, currency: 'USD', reference: 'CH-NS-2024-05', vesselName: 'MT Nusantara Spirit', status: 'Posted' },
  { id: 'TXN-006', date: '20 May 2024', description: 'P&I Insurance Premium Q2 2024', account: 'Insurance', category: 'Insurance', type: 'Debit', amount: 42000, currency: 'USD', reference: 'INS-PI-2024-Q2', status: 'Posted' },
  { id: 'TXN-007', date: '18 May 2024', description: 'Hull & Machinery Insurance Premium', account: 'Insurance', category: 'Insurance', type: 'Debit', amount: 55000, currency: 'USD', reference: 'INS-HM-2024-Q2', status: 'Posted' },
  { id: 'TXN-008', date: '15 May 2024', description: 'Dry Dock Advance Payment - MV Coastal Explorer', account: 'Dry Dock', category: 'Maintenance', type: 'Debit', amount: 150000, currency: 'USD', reference: 'DD-CE-2024-ADV', vesselName: 'MV Coastal Explorer', status: 'Posted' },
  { id: 'TXN-009', date: '10 May 2024', description: 'Survey Fee Income - Draft Survey MT Ocean Glory', account: 'Revenue', category: 'Survey Income', type: 'Credit', amount: 65000, currency: 'USD', reference: 'SRV-OG-2024-05', vesselName: 'MV Ocean Pioneer', status: 'Posted' },
  { id: 'TXN-010', date: '05 May 2024', description: 'Lub Oil Supply - Shell Marine (MT Nusantara Spirit)', account: 'Operating Expenses', category: 'Lubricants', type: 'Debit', amount: 32000, currency: 'USD', reference: 'PO-2024-0053', vesselName: 'MT Nusantara Spirit', status: 'Pending' },
];

// ======================== BUDGET ========================
export const MOCK_BUDGET_LINES: BudgetLine[] = [
  { id: 'BUD-001', category: 'Fuel & Bunker', budgetAmount: 980000, actualAmount: 856000, currency: 'USD', variance: 124000, variancePercent: 12.7, period: '2024 H1' },
  { id: 'BUD-002', category: 'Crew & Payroll', budgetAmount: 760000, actualAmount: 712000, currency: 'USD', variance: 48000, variancePercent: 6.3, period: '2024 H1' },
  { id: 'BUD-003', category: 'Maintenance & Repairs', budgetAmount: 520000, actualAmount: 485000, currency: 'USD', variance: 35000, variancePercent: 6.7, period: '2024 H1' },
  { id: 'BUD-004', category: 'Port & Agency', budgetAmount: 320000, actualAmount: 298000, currency: 'USD', variance: 22000, variancePercent: 6.9, period: '2024 H1' },
  { id: 'BUD-005', category: 'Insurance (P&I + H&M)', budgetAmount: 250000, actualAmount: 242000, currency: 'USD', variance: 8000, variancePercent: 3.2, period: '2024 H1' },
  { id: 'BUD-006', category: 'Others (Admin, IT, Misc)', budgetAmount: 150000, actualAmount: 132000, currency: 'USD', variance: 18000, variancePercent: 12.0, period: '2024 H1' },
];

// ======================== SAVED REPORTS ========================
export const MOCK_SAVED_REPORTS: SavedReport[] = [
  { id: 'RPT-001', title: 'Fleet Performance Summary Q1 2024', type: 'Fleet Performance', period: 'Jan - Mar 2024', generatedDate: '15 Apr 2024', generatedBy: 'Fleet Manager', format: 'PDF', size: '4.2 MB', status: 'Ready' },
  { id: 'RPT-002', title: 'Vessel OPEX Report - MV Ocean Pioneer', type: 'Vessel OPEX', vessel: 'MV Ocean Pioneer', period: 'May 2024', generatedDate: '01 Jun 2024', generatedBy: 'Finance Dept', format: 'XLSX', size: '1.8 MB', status: 'Ready' },
  { id: 'RPT-003', title: 'Maintenance Compliance Report', type: 'Maintenance', period: 'Jan - May 2024', generatedDate: '28 May 2024', generatedBy: 'Tech Superintendent', format: 'PDF', size: '3.5 MB', status: 'Ready' },
  { id: 'RPT-004', title: 'Crew Certification Status Report', type: 'Crew', period: 'As of Jun 2024', generatedDate: '01 Jun 2024', generatedBy: 'HR Department', format: 'XLSX', size: '0.9 MB', status: 'Ready' },
  { id: 'RPT-005', title: 'Certificate Expiry Forecast Report', type: 'Certificates', period: 'Jun - Dec 2024', generatedDate: '03 Jun 2024', generatedBy: 'Compliance Officer', format: 'PDF', size: '2.1 MB', status: 'Ready' },
  { id: 'RPT-006', title: 'Procurement Spending Analysis', type: 'Procurement', period: 'Q1 2024', generatedDate: '05 Apr 2024', generatedBy: 'Procurement Mgr', format: 'XLSX', size: '1.4 MB', status: 'Ready' },
];

// ======================== SYSTEM USERS ========================
export const MOCK_SYSTEM_USERS: SystemUser[] = [
  { id: 'USR-001', name: 'Bambang Supriyanto', email: 'bambang.s@lars.co.id', role: 'direktur', department: 'Board of Directors', status: 'Active', lastLogin: '25 Jul 2024 09:15', createdDate: '01 Jan 2023', phone: '+62 811 1234 5678' },
  { id: 'USR-002', name: 'Capt. Heru Susanto', email: 'heru.s@lars.co.id', role: 'manager', department: 'Operations', status: 'Active', lastLogin: '25 Jul 2024 08:30', createdDate: '15 Jan 2023', phone: '+62 812 3456 7890' },
  { id: 'USR-003', name: 'Andi Surveyor', email: 'andi.s@lars.co.id', role: 'surveyor', department: 'Survey Division', status: 'Active', lastLogin: '24 Jul 2024 14:22', createdDate: '01 Mar 2023', phone: '+62 813 4567 8901' },
  { id: 'USR-004', name: 'Dewi Anggraini', email: 'dewi.a@lars.co.id', role: 'staff', department: 'Administration', status: 'Active', lastLogin: '25 Jul 2024 07:45', createdDate: '10 Apr 2023', phone: '+62 814 5678 9012' },
  { id: 'USR-005', name: 'Rina Kartika', email: 'rina.k@lars.co.id', role: 'finance', department: 'Finance & Accounting', status: 'Active', lastLogin: '25 Jul 2024 09:00', createdDate: '01 Feb 2023', phone: '+62 815 6789 0123' },
  { id: 'USR-006', name: 'PT Samudra Jaya Line', email: 'ops@samuderajaya.co.id', role: 'client', department: 'External - Shipowner', status: 'Active', lastLogin: '23 Jul 2024 16:40', createdDate: '15 May 2023', phone: '+62 21 5555 1234' },
  { id: 'USR-007', name: 'Fadlan Maulana', email: 'fadlan.m@lars.co.id', role: 'surveyor', department: 'Survey Division', status: 'Active', lastLogin: '24 Jul 2024 11:10', createdDate: '01 Jun 2023', phone: '+62 816 7890 1234' },
  { id: 'USR-008', name: 'Sari Wulandari', email: 'sari.w@lars.co.id', role: 'staff', department: 'IT & Systems', status: 'Inactive', lastLogin: '15 Jun 2024 10:00', createdDate: '20 Jul 2023', phone: '+62 817 8901 2345' },
];

// ======================== COMPANY PROFILE ========================
export const MOCK_COMPANY_PROFILE: CompanyProfile = {
  name: 'LARS Maritime Intelligence',
  legalName: 'PT LARS Maritime Intelligence Indonesia',
  address: 'Gedung Maritime Tower Lt. 15, Jl. Tanjung Priok Raya No. 42',
  city: 'Jakarta Utara, DKI Jakarta 14310',
  country: 'Indonesia',
  phone: '+62 21 1234 5678',
  email: 'info@lars-maritime.co.id',
  website: 'www.lars-maritime.co.id',
  npwp: '01.234.567.8-012.000',
  siup: '510/SIUP/PMA/2023',
  timezone: 'Asia/Jakarta (WIB, UTC+7)',
  language: 'Bahasa Indonesia',
  currency: 'USD / IDR',
};

// ======================== CHART DATA ========================
export const MOCK_UPCOMING_TASKS: UpcomingTask[] = [
  { id: 'UT-001', title: 'Maintenance - Main Engine', vesselName: 'MV Ocean Pioneer', dueDate: '02 Jun 2024', status: 'Overdue', icon: 'wrench' },
  { id: 'UT-002', title: 'Class Renewal - ABS', vesselName: 'MV Pacific Trader', dueDate: '05 Jun 2024', status: 'Due Soon', icon: 'award' },
  { id: 'UT-003', title: 'Safety Drill', vesselName: 'MV Ocean Pioneer', dueDate: '07 Jun 2024', status: 'Upcoming', icon: 'shield' },
  { id: 'UT-004', title: 'PSC Inspection', vesselName: 'MV Coastal Explorer', dueDate: '10 Jun 2024', status: 'Upcoming', icon: 'clipboard' },
];

export const MOCK_MAINTENANCE_CHART: MaintenanceChartData[] = [
  { month: 'Jan', completed: 12, inProgress: 3, overdue: 1 },
  { month: 'Feb', completed: 10, inProgress: 5, overdue: 2 },
  { month: 'Mar', completed: 15, inProgress: 4, overdue: 1 },
  { month: 'Apr', completed: 18, inProgress: 2, overdue: 0 },
  { month: 'May', completed: 14, inProgress: 6, overdue: 3 },
  { month: 'Jun', completed: 8, inProgress: 7, overdue: 2 },
];

export const MOCK_TOP_EXPENSES: ExpenseItem[] = [
  { name: 'Fuel', amount: 980000, percentage: 40 },
  { name: 'Maintenance', amount: 760000, percentage: 31 },
  { name: 'Port & Agency', amount: 320000, percentage: 13 },
  { name: 'Crew & Payroll', amount: 250000, percentage: 10 },
  { name: 'Others', amount: 140000, percentage: 6 },
];

export const FLEET_OVERVIEW_DATA = [
  { name: 'At Sea', value: 14, color: '#0ea5e9' },
  { name: 'In Port', value: 6, color: '#10b981' },
  { name: 'Maintenance', value: 3, color: '#f59e0b' },
  { name: 'Laid Up', value: 1, color: '#94a3b8' },
];

export const CERTIFICATE_STATUS_DATA = [
  { name: 'Valid', value: 32, color: '#10b981' },
  { name: 'Expiring Soon', value: 10, color: '#f59e0b' },
  { name: 'Expired', value: 6, color: '#ef4444' },
];

export const MONTHLY_OPEX_TREND = [
  { month: 'Jan', budget: 420000, actual: 395000 },
  { month: 'Feb', budget: 430000, actual: 410000 },
  { month: 'Mar', budget: 450000, actual: 440000 },
  { month: 'Apr', budget: 460000, actual: 425000 },
  { month: 'May', budget: 470000, actual: 460000 },
  { month: 'Jun', budget: 480000, actual: 445000 },
];

export const FLEET_UTILIZATION_DATA = [
  { month: 'Jan', utilization: 82, target: 85 },
  { month: 'Feb', utilization: 78, target: 85 },
  { month: 'Mar', utilization: 88, target: 85 },
  { month: 'Apr', utilization: 91, target: 85 },
  { month: 'May', utilization: 85, target: 85 },
  { month: 'Jun', utilization: 79, target: 85 },
];
