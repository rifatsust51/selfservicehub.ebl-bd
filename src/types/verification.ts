export interface DocumentDetails {
  customerName: string;
  accountNo: string;
  documentType: string;
  issueDate: string;
  closingBalance: string;
}

export type VerificationState = 'idle' | 'verifying' | 'verified' | 'failed';
