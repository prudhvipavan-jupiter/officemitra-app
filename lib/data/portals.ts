import type { PortalLink } from "./types";

export const portalLinks: PortalLink[] = [
  // AP Finance & Treasury
  { name: "CFMS — Comprehensive Financial Management System", url: "https://cfms.ap.gov.in/", description: "Pay bills, receipts, DDO workflows, and treasury integration", category: "finance" },
  { name: "NIDHI — AP Treasury Portal", url: "https://nidhi.ap.gov.in/", description: "Treasury accounts, challans, and account statements", category: "finance" },
  { name: "APGLI — AP Government Life Insurance", url: "https://apgli.ap.gov.in/", description: "Policy details, premium, claims, and insurable amount", category: "finance" },
  { name: "AP Cooperative Bank", url: "https://www.apcob.org/", description: "APCOB services for government employees where applicable", category: "finance" },
  { name: "AP State Insurance Department", url: "https://www.ap.gov.in/", description: "AP government insurance schemes and notifications", category: "finance" },

  // AP Establishment & HR
  { name: "HRMS — AP Employee Self Service", url: "https://hrms.ap.gov.in/", description: "Service book, leave balance, pay details, and employee records", category: "establishment" },
  { name: "AP Secretariat Establishment", url: "https://www.ap.gov.in/", description: "General Administration department notifications", category: "establishment" },
  { name: "AP Public Service Commission", url: "https://psc.ap.gov.in/", description: "Recruitment, departmental tests, and select lists", category: "establishment" },
  { name: "AP Employee Welfare Board", url: "https://www.ap.gov.in/", description: "Welfare schemes for AP government employees", category: "establishment" },
  { name: "AP Teachers Portal", url: "https://cse.ap.gov.in/", description: "School education department services and transfers", category: "establishment" },

  // AP Health
  { name: "EHS — Employees Health Scheme", url: "https://ehs.ap.gov.in/", description: "Health cards, empanelled hospitals, and eligibility", category: "health" },
  { name: "Dr. NTR Vaidya Seva", url: "https://ntrvaidyaseva.ap.gov.in/", description: "Health insurance scheme for AP residents", category: "health" },
  { name: "Aarogyasri Health Care Trust", url: "https://www.aarogyasri.ap.gov.in/", description: "Secondary and tertiary care for BPL and eligible categories", category: "health" },
  { name: "AP Medical & Health Department", url: "https://health.ap.gov.in/", description: "Health department GOs, transfers, and notifications", category: "health" },
  { name: "104 Health Helpline AP", url: "https://104.gov.in/", description: "Medical advice and health information helpline", category: "health" },

  // AP General & e-Governance
  { name: "GOIR — AP Government Orders Repository", url: "https://goir.ap.gov.in/", description: "Search and download Andhra Pradesh Government Orders", category: "general" },
  { name: "AP State Portal", url: "https://www.ap.gov.in/", description: "Official Andhra Pradesh government web portal", category: "general" },
  { name: "AP Meeseva", url: "https://ap.meeseva.gov.in/", description: "Citizen services — certificates, registrations, and utilities", category: "general" },
  { name: "Meebhoomi — AP Land Records", url: "https://meebhoomi.ap.gov.in/", description: "Land records, adangal, and 1-B extracts", category: "general" },
  { name: "AP Registration & Stamps", url: "https://registration.ap.gov.in/", description: "Property registration and stamp duty services", category: "general" },
  { name: "AP High Court", url: "https://aphc.gov.in/", description: "Andhra Pradesh High Court case status and cause lists", category: "general" },
  { name: "AP eCourts Services", url: "https://services.ecourts.gov.in/", description: "Case status for district courts in AP", category: "general" },
  { name: "AP Police — Citizen Services", url: "https://www.appolice.gov.in/", description: "FIR status, certificates, and citizen services", category: "general" },
  { name: "AP Transport — RTA Services", url: "https://www.aptransport.org/", description: "Driving licence, RC, and vehicle services", category: "general" },
  { name: "AP Civil Supplies — EPDS", url: "https://aepos.ap.gov.in/", description: "Ration card and PDS services", category: "general" },
  { name: "AP Social Welfare Department", url: "https://www.ap.gov.in/", description: "SC/ST/BC welfare schemes and scholarships", category: "general" },
  { name: "AP ePASS Scholarships", url: "https://epass.apcfss.in/", description: "Post-matric and pre-matric scholarships", category: "general" },
  { name: "AP Single Desk Portal", url: "https://invest.ap.gov.in/", description: "Industrial approvals and business clearances", category: "general" },
  { name: "APCRDA — Capital Region Development", url: "https://crda.ap.gov.in/", description: "Amaravati capital region development authority", category: "general" },
  { name: "AP Disaster Management", url: "https://apsdms.ap.gov.in/", description: "Disaster alerts and relief information", category: "general" },

  // Income Tax & Central Tax
  { name: "Income Tax e-Filing Portal", url: "https://www.incometax.gov.in/", description: "File ITR, download Form 26AS, AIS, and TIS", category: "tax" },
  { name: "TRACES — TDS Reconciliation", url: "https://www.tdscpc.gov.in/", description: "Form 26AS, TDS certificates, and correction statements", category: "tax" },
  { name: "NSDL PAN Services", url: "https://www.onlineservices.nsdl.com/paam/", description: "Apply or correct PAN card", category: "tax" },
  { name: "UTIITSL PAN / TAN Services", url: "https://www.pan.utiitsl.com/", description: "PAN application and TAN services", category: "tax" },
  { name: "GST Portal", url: "https://www.gst.gov.in/", description: "GST registration and returns (if applicable)", category: "tax" },
  { name: "CBDT — Central Board of Direct Taxes", url: "https://www.incometaxindia.gov.in/", description: "Tax rules, circulars, and calculators", category: "tax" },

  // Pension & Retirement (Central)
  { name: "SPARSH — Defence Pension Portal", url: "https://sparsh.defencepension.gov.in/", description: "Defence pension disbursement and grievances", category: "pension" },
  { name: "Bhavishya — Pension Portal (DoPPW)", url: "https://bhavishya.gov.in/", description: "Central civil pension processing and status", category: "pension" },
  { name: "CPENGRAMS — Pension Grievances", url: "https://pensionersportal.gov.in/", description: "Central pensioners grievance redressal", category: "pension" },
  { name: "NPS — CRA (Protean/NSDL)", url: "https://cra-nsdl.com/", description: "National Pension System account and statements", category: "pension" },
  { name: "EPFO — Employees Provident Fund", url: "https://www.epfindia.gov.in/", description: "UAN, passbook, and PF withdrawal (where applicable)", category: "pension" },
  { name: "AG Andhra Pradesh — Accountant General", url: "https://agap.cag.gov.in/", description: "Pension, GPF, and accounts for AP state employees", category: "pension" },

  // Central Government — General
  { name: "India.gov.in — National Portal", url: "https://www.india.gov.in/", description: "Central and state government services directory", category: "central" },
  { name: "DigiLocker", url: "https://www.digilocker.gov.in/", description: "Store and share digital documents and certificates", category: "central" },
  { name: "UMANG App Portal", url: "https://web.umang.gov.in/", description: "Unified mobile app for government services", category: "central" },
  { name: "MyGov India", url: "https://www.mygov.in/", description: "Citizen engagement and government initiatives", category: "central" },
  { name: "Centralised Public Grievance (CPGRAMS)", url: "https://pgportal.gov.in/", description: "Lodge and track grievances with ministries", category: "central" },
  { name: "e-Hospital — CGHS", url: "https://ehospital.nic.in/", description: "Central Government Health Scheme appointments", category: "central" },
  { name: "DoPT — Department of Personnel", url: "https://dopt.gov.in/", description: "Central service rules, CCS, and OMs", category: "central" },
  { name: "Department of Expenditure", url: "https://doe.gov.in/", description: "Pay commission, allowances, and finance OMs", category: "central" },
  { name: "RBI — Reserve Bank of India", url: "https://www.rbi.org.in/", description: "Banking regulations, inflation, and financial literacy", category: "central" },
  { name: "SBI — State Bank of India", url: "https://www.onlinesbi.sbi/", description: "Salary accounts, loans, and government banking", category: "central" },

  // Utilities
  { name: "APSPDCL — Southern Power Distribution", url: "https://www.apspdcl.in/", description: "Electricity bill payment and new connections", category: "utility" },
  { name: "APEPDCL — Eastern Power Distribution", url: "https://www.apeasternpower.com/", description: "Electricity services for east AP districts", category: "utility" },
  { name: "AP Water Resources Department", url: "https://www.apwater.gov.in/", description: "Irrigation and water supply information", category: "utility" },
  { name: "India Post — Postal Services", url: "https://www.indiapost.gov.in/", description: "Savings schemes, NSC, and postal banking", category: "utility" },
  { name: "UIDAI — Aadhaar Services", url: "https://uidai.gov.in/", description: "Aadhaar update, download, and verification", category: "utility" },
  { name: "National Scholarship Portal", url: "https://scholarships.gov.in/", description: "Central and state scholarships for children", category: "utility" },
  { name: "e-Shram Portal", url: "https://eshram.gov.in/", description: "Unorganised worker registration (family reference)", category: "utility" },
  { name: "Vahan / Sarathi — Transport", url: "https://parivahan.gov.in/", description: "National vehicle and driving licence services", category: "utility" },
];

export const portalCategories = [...new Set(portalLinks.map((p) => p.category))];
