import { DocumentDetails } from '../types/verification';

export const DEFAULT_QR_TOKEN = 'B5B80F8F46A78378F37C409D126211C4E4E947B518B1EF38BAB467EA41CB96CB';

// 1. Original Document
export const primaryDocument: DocumentDetails = {
  customerName: 'MD. SHAFIQUL HAQUE',
  accountNo: '1331440025228',
  documentType: 'CASA Statement',
  issueDate: '29-OCT-2026 02:39 PM',
  closingBalance: '439.82',
};

// 2. Statement 1: New User Name, Everything Else Same
export const STATEMENT_1_TOKEN = 'A1C49F7D832B10E659D824E312759B4A091E72D8534C118A620F93E417C2B801';
export const statement1Document: DocumentDetails = {
  customerName: 'MOHAMMAD TANVIR AHMED',
  accountNo: '1331440025228',
  documentType: 'CASA Statement',
  issueDate: '29-OCT-2026 02:39 PM',
  closingBalance: '439.82',
};

// 3. Statement 2: Same User Name, All Amounts Changed
export const STATEMENT_2_TOKEN = 'C2D81E5F943A21F760E935F423860C5B102F83E9645D229B731A04F528D3C912';
export const statement2Document: DocumentDetails = {
  customerName: 'MD. SHAFIQUL HAQUE',
  accountNo: '1331440025228',
  documentType: 'CASA Statement',
  issueDate: '29-OCT-2026 02:39 PM',
  closingBalance: '58,950.00',
};

// 4. Statement 3: Name and Amount Everything Changed
export const STATEMENT_3_TOKEN = 'E3F92A6B054B32A871FA46A534971D6C213A94FA756E330C842B15A639E4DA23';
export const statement3Document: DocumentDetails = {
  customerName: 'SYEDA FARHANA RAHMAN',
  accountNo: '1331890048125',
  documentType: 'CASA Statement',
  issueDate: '02-NOV-2026 11:15 AM',
  closingBalance: '1,425,830.50',
};

export const documentDatabase: Record<string, DocumentDetails> = {
  // Original
  [DEFAULT_QR_TOKEN]: primaryDocument,
  'ORIGINAL': primaryDocument,
  'DEFAULT': primaryDocument,
  '0': primaryDocument,

  // Statement 1 (Changed name: MOHAMMAD TANVIR AHMED)
  [STATEMENT_1_TOKEN]: statement1Document,
  'STMT1': statement1Document,
  'STATEMENT1': statement1Document,
  '1': statement1Document,

  // Statement 2 (Same name: MD. SHAFIQUL HAQUE, Changed balance: 58,950.00)
  [STATEMENT_2_TOKEN]: statement2Document,
  'STMT2': statement2Document,
  'STATEMENT2': statement2Document,
  '2': statement2Document,

  // Statement 3 (Changed name: SYEDA FARHANA RAHMAN, Changed balance: 1,425,830.50)
  [STATEMENT_3_TOKEN]: statement3Document,
  'STMT3': statement3Document,
  'STATEMENT3': statement3Document,
  '3': statement3Document,
};
