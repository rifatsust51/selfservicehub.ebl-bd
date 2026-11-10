import { DocumentDetails } from '../types/verification';

export const DEFAULT_QR_TOKEN = 'B5B80F8F46A78378F37C409D126211C4E4E947B518B1EF38BAB467EA41CB96CB';

export const primaryDocument: DocumentDetails = {
  customerName: 'MD. SHAFIQUL HAQUE',
  accountNo: '1331440025228',
  documentType: 'CASA Statement',
  issueDate: '29-OCT-2026 02:39 PM',
  closingBalance: '439.82',
};

export const documentDatabase: Record<string, DocumentDetails> = {
  [DEFAULT_QR_TOKEN]: primaryDocument,
};
