import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import QRCode from 'qrcode';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const BASE_VERCEL_URL = 'https://selfservicehubebl-bd.vercel.app/ebl-cert-portal-flat/verify.php';

function getBase64(filePath) {
  const fileData = fs.readFileSync(filePath);
  const ext = path.extname(filePath).slice(1);
  return `data:image/${ext === 'svg' ? 'svg+xml' : ext};base64,${fileData.toString('base64')}`;
}

const logoBase64 = getBase64(path.join(rootDir, 'my-asset/ebl-statement-logo.png'));

// The 19 authentic transactions from WhatsApp Image (Statement 1 and Original)
const baseTransactions = [
  {
    date: '01-Jul-2025',
    desc: 'Opening Balance',
    ref: '',
    debits: '',
    credits: '0.00',
    balance: '0.00'
  },
  {
    date: '13-Aug-2025',
    desc: 'NPSB FUND TRANSFER<br>999999****998*||522507784575|PUBALI BANK PLC<br>DHAKA&nbsp;&nbsp;&nbsp;&nbsp;BDII - //999VMT2252250271',
    ref: '',
    debits: '',
    credits: '300,000.00',
    balance: '300,000.00'
  },
  {
    date: '13-Aug-2025',
    desc: 'NPSB FUND TRANSFER<br>999999****998*||522507785108|PUBALI BANK PLC<br>DHAKA&nbsp;&nbsp;&nbsp;&nbsp;BDII - //999VMT225225027X',
    ref: '',
    debits: '',
    credits: '195,000.00',
    balance: '495,000.00'
  },
  {
    date: '13-Aug-2025',
    desc: 'NPSB FUND TRANSFER<br>999999****998*||522538900127|DUTCH-BANGLA<br>BANK LTD. DHAKA&nbsp;&nbsp;&nbsp;&nbsp;BDII -<br>//999VMT225225028V',
    ref: '',
    debits: '',
    credits: '10,000.00',
    balance: '505,000.00'
  },
  {
    date: '20-Aug-2025',
    desc: 'NEW DEPOSIT //133DEBK252320001',
    ref: '',
    debits: '500,000.00',
    credits: '',
    balance: '5,000.00'
  },
  {
    date: '21-Aug-2025',
    desc: 'Debit Card Issuance Fee DC ISSUANCE FEE Aug<br>21 2025 DC ISSUANCE FEE Aug 21 2025<br>//1012056252330230',
    ref: '',
    debits: '690.00',
    credits: '',
    balance: '4,310.00'
  },
  {
    date: '31-Aug-2025',
    desc: 'PURCHASE TRANSACTION<br>452017****353*||524331123064|BATA - GULSHAN<br>AVENUE >DHAKA&nbsp;&nbsp;&nbsp;&nbsp;BDII<br>452017****353*||524331123064|BATA - GULSHAN<br>AVENUE DHAKA&nbsp;&nbsp;&nbsp;&nbsp;BDII - //999POSO25243034C',
    ref: '',
    debits: '798.00',
    credits: '',
    balance: '3,512.00'
  },
  {
    date: '18-Sep-2025',
    desc: 'Credit Card SI Payment 423800******1244;BDT_SI<br>423800******1244;BDT_SI //1018041252612984',
    ref: '',
    debits: '606.09',
    credits: '',
    balance: '2,905.91'
  },
  {
    date: '21-Sep-2025',
    desc: 'CASH DEPOSIT Self - //133CHDP252640040',
    ref: '',
    debits: '',
    credits: '20,000.00',
    balance: '22,905.91'
  },
  {
    date: '21-Sep-2025',
    desc: 'IMMEDIATE TRANSFER 4238********1244<br>4238********1244 //1338001252640003',
    ref: '',
    debits: '20,203.00',
    credits: '',
    balance: '2,702.91'
  },
  {
    date: '12-Oct-2025',
    desc: 'NPSB FUND TRANSFER<br>452017****353*||528513097783|PUBALI BANK PLC<br>DHAKA&nbsp;&nbsp;&nbsp;&nbsp;BDII - //999VMT22528501JY',
    ref: '',
    debits: '',
    credits: '63,000.00',
    balance: '65,702.91'
  },
  {
    date: '13-Oct-2025',
    desc: 'NPSB FUND TRANSFER<br>452017****353*||528611494815|NPSB FT<br>UNKNOWN BDII - //999VMT22528601J8',
    ref: '',
    debits: '',
    credits: '99,000.00',
    balance: '164,702.91'
  },
  {
    date: '14-Oct-2025',
    desc: 'NPSB FUND TRANSFER<br>452017****353*||528725406377|DUTCH-BANGLA<br>BANK LTD. DHAKA&nbsp;&nbsp;&nbsp;&nbsp;BDII -<br>//999VMT22528701I7',
    ref: '',
    debits: '',
    credits: '2,000.00',
    balance: '166,702.91'
  },
  {
    date: '14-Oct-2025',
    desc: 'IMMEDIATE TRANSFER 4238********1244<br>4238********1244 //1338001252870004',
    ref: '',
    debits: '164,740.00',
    credits: '',
    balance: '1,962.91'
  },
  {
    date: '20-Oct-2025',
    desc: 'Credit Card SI Payment 423800******1244;BDT_SI<br>423800******1244;BDT_SI //1018040252932697',
    ref: '',
    debits: '18.92',
    credits: '',
    balance: '1,943.99'
  },
  {
    date: '30-Oct-2025',
    desc: 'IC INTEREST LIQUIDATION',
    ref: '',
    debits: '',
    credits: '6.86',
    balance: '1,950.85'
  },
  {
    date: '30-Oct-2025',
    desc: 'WITHOLDING SOURCE TAX ON CASA ACCOUNTS',
    ref: '',
    debits: '1.03',
    credits: '',
    balance: '1,949.82'
  },
  {
    date: '11-Nov-2025',
    desc: 'PURCHASE TRANSACTION<br>452017****353*||531511630204|FAKRUDDIN<br>BIRIYANI RES>DHAKA&nbsp;&nbsp;&nbsp;&nbsp;BDII<br>452017****353*||531511630204|FAKRUDDIN<br>BIRIYANI RESDHAKA&nbsp;&nbsp;&nbsp;&nbsp;BDII -<br>//999POSO25315012S',
    ref: '',
    debits: '820.00',
    credits: '',
    balance: '1,129.82'
  },
  {
    date: '29-Dec-2025',
    desc: 'Transaction Alert Fee and VAT for 2025 against<br>Account no. 1331440025228 and VAT for 2025<br>against Account no. 1331440025228',
    ref: '',
    debits: '460.00',
    credits: '',
    balance: '669.82'
  }
];

// Statement 2: Exactly 19 transactions, same row formats, changed amounts (Ending at 58,950.00)
const stmt2Transactions = [
  {
    date: '01-Jul-2025',
    desc: 'Opening Balance',
    ref: '',
    debits: '',
    credits: '20,000.00',
    balance: '20,000.00'
  },
  {
    date: '13-Aug-2025',
    desc: 'NPSB FUND TRANSFER<br>999999****998*||522507784575|PUBALI BANK PLC<br>DHAKA&nbsp;&nbsp;&nbsp;&nbsp;BDII - //999VMT2252250271',
    ref: '',
    debits: '',
    credits: '250,000.00',
    balance: '270,000.00'
  },
  {
    date: '13-Aug-2025',
    desc: 'NPSB FUND TRANSFER<br>999999****998*||522507785108|PUBALI BANK PLC<br>DHAKA&nbsp;&nbsp;&nbsp;&nbsp;BDII - //999VMT225225027X',
    ref: '',
    debits: '',
    credits: '180,000.00',
    balance: '450,000.00'
  },
  {
    date: '13-Aug-2025',
    desc: 'NPSB FUND TRANSFER<br>999999****998*||522538900127|DUTCH-BANGLA<br>BANK LTD. DHAKA&nbsp;&nbsp;&nbsp;&nbsp;BDII -<br>//999VMT225225028V',
    ref: '',
    debits: '',
    credits: '50,000.00',
    balance: '500,000.00'
  },
  {
    date: '20-Aug-2025',
    desc: 'NEW DEPOSIT //133DEBK252320001',
    ref: '',
    debits: '450,000.00',
    credits: '',
    balance: '50,000.00'
  },
  {
    date: '21-Aug-2025',
    desc: 'Debit Card Issuance Fee DC ISSUANCE FEE Aug<br>21 2025 DC ISSUANCE FEE Aug 21 2025<br>//1012056252330230',
    ref: '',
    debits: '690.00',
    credits: '',
    balance: '49,310.00'
  },
  {
    date: '31-Aug-2025',
    desc: 'PURCHASE TRANSACTION<br>452017****353*||524331123064|BATA - GULSHAN<br>AVENUE >DHAKA&nbsp;&nbsp;&nbsp;&nbsp;BDII<br>452017****353*||524331123064|BATA - GULSHAN<br>AVENUE DHAKA&nbsp;&nbsp;&nbsp;&nbsp;BDII - //999POSO25243034C',
    ref: '',
    debits: '1,500.00',
    credits: '',
    balance: '47,810.00'
  },
  {
    date: '18-Sep-2025',
    desc: 'Credit Card SI Payment 423800******1244;BDT_SI<br>423800******1244;BDT_SI //1018041252612984',
    ref: '',
    debits: '3,250.00',
    credits: '',
    balance: '44,560.00'
  },
  {
    date: '21-Sep-2025',
    desc: 'CASH DEPOSIT Self - //133CHDP252640040',
    ref: '',
    debits: '',
    credits: '45,000.00',
    balance: '89,560.00'
  },
  {
    date: '21-Sep-2025',
    desc: 'IMMEDIATE TRANSFER 4238********1244<br>4238********1244 //1338001252640003',
    ref: '',
    debits: '30,000.00',
    credits: '',
    balance: '59,560.00'
  },
  {
    date: '12-Oct-2025',
    desc: 'NPSB FUND TRANSFER<br>452017****353*||528513097783|PUBALI BANK PLC<br>DHAKA&nbsp;&nbsp;&nbsp;&nbsp;BDII - //999VMT22528501JY',
    ref: '',
    debits: '',
    credits: '75,000.00',
    balance: '134,560.00'
  },
  {
    date: '13-Oct-2025',
    desc: 'NPSB FUND TRANSFER<br>452017****353*||528611494815|NPSB FT<br>UNKNOWN BDII - //999VMT22528601J8',
    ref: '',
    debits: '',
    credits: '80,000.00',
    balance: '214,560.00'
  },
  {
    date: '14-Oct-2025',
    desc: 'NPSB FUND TRANSFER<br>452017****353*||528725406377|DUTCH-BANGLA<br>BANK LTD. DHAKA&nbsp;&nbsp;&nbsp;&nbsp;BDII -<br>//999VMT22528701I7',
    ref: '',
    debits: '',
    credits: '25,000.00',
    balance: '239,560.00'
  },
  {
    date: '14-Oct-2025',
    desc: 'IMMEDIATE TRANSFER 4238********1244<br>4238********1244 //1338001252870004',
    ref: '',
    debits: '175,000.00',
    credits: '',
    balance: '64,560.00'
  },
  {
    date: '20-Oct-2025',
    desc: 'Credit Card SI Payment 423800******1244;BDT_SI<br>423800******1244;BDT_SI //1018040252932697',
    ref: '',
    debits: '4,820.00',
    credits: '',
    balance: '59,740.00'
  },
  {
    date: '30-Oct-2025',
    desc: 'IC INTEREST LIQUIDATION',
    ref: '',
    debits: '',
    credits: '18.25',
    balance: '59,758.25'
  },
  {
    date: '30-Oct-2025',
    desc: 'WITHOLDING SOURCE TAX ON CASA ACCOUNTS',
    ref: '',
    debits: '2.74',
    credits: '',
    balance: '59,755.51'
  },
  {
    date: '11-Nov-2025',
    desc: 'PURCHASE TRANSACTION<br>452017****353*||531511630204|FAKRUDDIN<br>BIRIYANI RES>DHAKA&nbsp;&nbsp;&nbsp;&nbsp;BDII<br>452017****353*||531511630204|FAKRUDDIN<br>BIRIYANI RESDHAKA&nbsp;&nbsp;&nbsp;&nbsp;BDII -<br>//999POSO25315012S',
    ref: '',
    debits: '345.51',
    credits: '',
    balance: '59,410.00'
  },
  {
    date: '29-Dec-2025',
    desc: 'Transaction Alert Fee and VAT for 2025 against<br>Account no. 1331440025228 and VAT for 2025<br>against Account no. 1331440025228',
    ref: '',
    debits: '460.00',
    credits: '',
    balance: '58,950.00'
  }
];

// Statement 3: Exactly 19 transactions, same row formats, changed name and amounts (Ending at 1,425,830.50)
const stmt3Transactions = [
  {
    date: '01-Jul-2025',
    desc: 'Opening Balance',
    ref: '',
    debits: '',
    credits: '500,000.00',
    balance: '500,000.00'
  },
  {
    date: '13-Aug-2025',
    desc: 'NPSB FUND TRANSFER<br>999999****998*||522507784575|STANDARD CHARTERED<br>DHAKA&nbsp;&nbsp;&nbsp;&nbsp;BDII - //999VMT2252250271',
    ref: '',
    debits: '',
    credits: '600,000.00',
    balance: '1,100,000.00'
  },
  {
    date: '13-Aug-2025',
    desc: 'NPSB FUND TRANSFER<br>999999****998*||522507785108|CITIBANK N.A.<br>DHAKA&nbsp;&nbsp;&nbsp;&nbsp;BDII - //999VMT225225027X',
    ref: '',
    debits: '',
    credits: '450,000.00',
    balance: '1,550,000.00'
  },
  {
    date: '13-Aug-2025',
    desc: 'NPSB FUND TRANSFER<br>999999****998*||522538900127|DUTCH-BANGLA<br>BANK LTD. DHAKA&nbsp;&nbsp;&nbsp;&nbsp;BDII -<br>//999VMT225225028V',
    ref: '',
    debits: '',
    credits: '150,000.00',
    balance: '1,700,000.00'
  },
  {
    date: '20-Aug-2025',
    desc: 'NEW DEPOSIT //142DEBK252320001',
    ref: '',
    debits: '200,000.00',
    credits: '',
    balance: '1,500,000.00'
  },
  {
    date: '21-Aug-2025',
    desc: 'Debit Card Issuance Fee DC ISSUANCE FEE Aug<br>21 2025 DC ISSUANCE FEE Aug 21 2025<br>//1012056252330230',
    ref: '',
    debits: '690.00',
    credits: '',
    balance: '1,499,310.00'
  },
  {
    date: '31-Aug-2025',
    desc: 'PURCHASE TRANSACTION<br>452017****353*||524331123064|GULSHAN CLUB<br>AVENUE >DHAKA&nbsp;&nbsp;&nbsp;&nbsp;BDII<br>452017****353*||524331123064|GULSHAN CLUB<br>AVENUE DHAKA&nbsp;&nbsp;&nbsp;&nbsp;BDII - //999POSO25243034C',
    ref: '',
    debits: '24,500.00',
    credits: '',
    balance: '1,474,810.00'
  },
  {
    date: '18-Sep-2025',
    desc: 'Credit Card SI Payment 452000******9012;BDT_SI<br>452000******9012;BDT_SI //1018041252612984',
    ref: '',
    debits: '65,400.00',
    credits: '',
    balance: '1,409,410.00'
  },
  {
    date: '21-Sep-2025',
    desc: 'CASH DEPOSIT Self - //142CHDP252640040',
    ref: '',
    debits: '',
    credits: '120,000.00',
    balance: '1,529,410.00'
  },
  {
    date: '21-Sep-2025',
    desc: 'IMMEDIATE TRANSFER 4520********9012<br>4520********9012 //1428001252640003',
    ref: '',
    debits: '85,000.00',
    credits: '',
    balance: '1,444,410.00'
  },
  {
    date: '12-Oct-2025',
    desc: 'NPSB FUND TRANSFER<br>452017****353*||528513097783|SQUARE PHARMA PLC<br>DHAKA&nbsp;&nbsp;&nbsp;&nbsp;BDII - //999VMT22528501JY',
    ref: '',
    debits: '',
    credits: '185,000.00',
    balance: '1,629,410.00'
  },
  {
    date: '13-Oct-2025',
    desc: 'NPSB FUND TRANSFER<br>452017****353*||528611494815|NPSB FT<br>UNKNOWN BDII - //999VMT22528601J8',
    ref: '',
    debits: '',
    credits: '220,000.00',
    balance: '1,849,410.00'
  },
  {
    date: '14-Oct-2025',
    desc: 'NPSB FUND TRANSFER<br>452017****353*||528725406377|TECHVENTURE BD<br>BANK LTD. DHAKA&nbsp;&nbsp;&nbsp;&nbsp;BDII -<br>//999VMT22528701I7',
    ref: '',
    debits: '',
    credits: '95,000.00',
    balance: '1,944,410.00'
  },
  {
    date: '14-Oct-2025',
    desc: 'IMMEDIATE TRANSFER 4520********9012<br>4520********9012 //1428001252870004',
    ref: '',
    debits: '350,000.00',
    credits: '',
    balance: '1,594,410.00'
  },
  {
    date: '20-Oct-2025',
    desc: 'Credit Card SI Payment 452000******9012;BDT_SI<br>452000******9012;BDT_SI //1018040252932697',
    ref: '',
    debits: '42,100.00',
    credits: '',
    balance: '1,552,310.00'
  },
  {
    date: '30-Oct-2025',
    desc: 'IC INTEREST LIQUIDATION',
    ref: '',
    debits: '',
    credits: '12,480.50',
    balance: '1,564,790.50'
  },
  {
    date: '30-Oct-2025',
    desc: 'WITHOLDING SOURCE TAX ON CASA ACCOUNTS',
    ref: '',
    debits: '1,872.00',
    credits: '',
    balance: '1,562,918.50'
  },
  {
    date: '11-Nov-2025',
    desc: 'PURCHASE TRANSACTION<br>452017****353*||531511630204|SINGAPORE AIR<br>TICKETS >DHAKA&nbsp;&nbsp;&nbsp;&nbsp;BDII<br>452017****353*||531511630204|SINGAPORE AIR<br>TICKETS DHAKA&nbsp;&nbsp;&nbsp;&nbsp;BDII -<br>//999POSO25315012S',
    ref: '',
    debits: '136,628.00',
    credits: '',
    balance: '1,426,290.50'
  },
  {
    date: '29-Dec-2025',
    desc: 'Transaction Alert Fee and VAT for 2025 against<br>Account no. 1331890048125 and VAT for 2025<br>against Account no. 1331890048125',
    ref: '',
    debits: '460.00',
    credits: '',
    balance: '1,425,830.50'
  }
];

const statements = [
  {
    filename: 'statement-original',
    title: 'Original Statement (MD. SHAFIQUL HAQUE)',
    token: 'B5B80F8F46A78378F37C409D126211C4E4E947B518B1EF38BAB467EA41CB96CB',
    qrUrl: `${BASE_VERCEL_URL}?qr=B5B80F8F46A78378F37C409D126211C4E4E947B518B1EF38BAB467EA41CB96CB`,
    customerName: 'MD. SHAFIQUL HAQUE',
    customerAddress: 'HOUSE 18/6 GAIDERTEK MIRPUR DARUSSALAM DHAKA',
    branchName: 'Gulshan Avenue Branch',
    branchAddress: 'Z N Tower (Ground Floor), Holding No. 02, Block- S W (I), Road-08, Gulshan Avenue, Gulshan-1,<br>Dhaka',
    accountNo: '1331440025228',
    productName: 'EBL Power Savings',
    periodFrom: '01-JUL-2025  -  31-DEC-2025',
    currencyName: 'BANGLADESH TAKA',
    branchCode: '133',
    customerId: '3358178',
    transactions: baseTransactions,
  },
  {
    filename: 'statement-1-new-name',
    title: 'Statement 1: Changed User Name (MOHAMMAD TANVIR AHMED)',
    token: 'A1C49F7D832B10E659D824E312759B4A091E72D8534C118A620F93E417C2B801',
    qrUrl: `${BASE_VERCEL_URL}?qr=A1C49F7D832B10E659D824E312759B4A091E72D8534C118A620F93E417C2B801`,
    customerName: 'MOHAMMAD TANVIR AHMED',
    customerAddress: 'HOUSE 18/6 GAIDERTEK MIRPUR DARUSSALAM DHAKA',
    branchName: 'Gulshan Avenue Branch',
    branchAddress: 'Z N Tower (Ground Floor), Holding No. 02, Block- S W (I), Road-08, Gulshan Avenue, Gulshan-1,<br>Dhaka',
    accountNo: '1331440025228',
    productName: 'EBL Power Savings',
    periodFrom: '01-JUL-2025  -  31-DEC-2025',
    currencyName: 'BANGLADESH TAKA',
    branchCode: '133',
    customerId: '3358178',
    transactions: baseTransactions,
  },
  {
    filename: 'statement-2-changed-amounts',
    title: 'Statement 2: Same User Name, Changed Amounts (MD. SHAFIQUL HAQUE)',
    token: 'C2D81E5F943A21F760E935F423860C5B102F83E9645D229B731A04F528D3C912',
    qrUrl: `${BASE_VERCEL_URL}?qr=C2D81E5F943A21F760E935F423860C5B102F83E9645D229B731A04F528D3C912`,
    customerName: 'MD. SHAFIQUL HAQUE',
    customerAddress: 'HOUSE 18/6 GAIDERTEK MIRPUR DARUSSALAM DHAKA',
    branchName: 'Gulshan Avenue Branch',
    branchAddress: 'Z N Tower (Ground Floor), Holding No. 02, Block- S W (I), Road-08, Gulshan Avenue, Gulshan-1,<br>Dhaka',
    accountNo: '1331440025228',
    productName: 'EBL Power Savings',
    periodFrom: '01-JUL-2025  -  31-DEC-2025',
    currencyName: 'BANGLADESH TAKA',
    branchCode: '133',
    customerId: '3358178',
    transactions: stmt2Transactions,
  },
  {
    filename: 'statement-3-name-and-amounts-changed',
    title: 'Statement 3: Name & Amounts Changed (SYEDA FARHANA RAHMAN)',
    token: 'E3F92A6B054B32A871FA46A534971D6C213A94FA756E330C842B15A639E4DA23',
    qrUrl: `${BASE_VERCEL_URL}?qr=E3F92A6B054B32A871FA46A534971D6C213A94FA756E330C842B15A639E4DA23`,
    customerName: 'SYEDA FARHANA RAHMAN',
    customerAddress: 'FLAT 5B, HOUSE 24, ROAD 11, BANANI, DHAKA 1213',
    branchName: 'Banani Branch',
    branchAddress: 'Holding 32, Road 11, Block D, Banani, Dhaka-1213',
    accountNo: '1331890048125',
    productName: 'EBL Maxima Savings',
    periodFrom: '01-JUL-2025  -  31-DEC-2025',
    currencyName: 'BANGLADESH TAKA',
    branchCode: '142',
    customerId: '4819204',
    transactions: stmt3Transactions,
  },
];

async function generateHtml(s) {
  // Generate high-resolution base64 QR code directly from target URL
  const qrBase64 = await QRCode.toDataURL(s.qrUrl, {
    errorCorrectionLevel: 'H',
    margin: 1,
    width: 400,
    color: {
      dark: '#000000',
      light: '#ffffff',
    },
  });

  const trRows = s.transactions.map(t => `
    <tr>
      <td class="col-date">${t.date}</td>
      <td class="col-desc">${t.desc}</td>
      <td class="col-ref">${t.ref || ''}</td>
      <td class="col-amt debits">${t.debits || ''}</td>
      <td class="col-amt credits">${t.credits || ''}</td>
      <td class="col-amt balance">${t.balance}</td>
    </tr>
  `).join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>${s.customerName} - Eastern Bank Statement</title>
<style>
  @page {
    size: 210mm 297mm; /* Standard A4 */
    margin: 0;
  }
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  body {
    font-family: Arial, Helvetica, sans-serif;
    color: #000000;
    background: #ffffff;
    width: 210mm;
    min-height: 297mm;
    height: 297mm;
    margin: 0 auto;
    position: relative;
    overflow: hidden;
    padding: 10mm 12mm 0 12mm;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  /* ── Header Area ── */
  .header-grid {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 5mm;
    position: relative;
    z-index: 2;
  }

  .header-left {
    width: 42%;
  }
  .customer-name {
    font-size: 10.5pt;
    font-weight: bold;
    color: #000;
    letter-spacing: 0.2px;
    margin-bottom: 3px;
    text-transform: uppercase;
  }
  .customer-address {
    font-size: 8pt;
    color: #111;
    margin-bottom: 12px;
    line-height: 1.25;
  }
  .branch-name {
    font-size: 9pt;
    font-weight: normal;
    color: #111;
    margin-bottom: 3px;
  }
  .branch-address {
    font-size: 8pt;
    color: #222;
    line-height: 1.3;
    max-width: 380px;
  }

  /* QR in Center */
  .header-center {
    width: 18%;
    display: flex;
    justify-content: center;
    padding-top: 0;
  }
  .qr-img {
    width: 32mm;
    height: 32mm;
    display: block;
  }

  /* Right Side: Logo & Head Office & Meta */
  .header-right {
    width: 40%;
    padding-left: 10px;
  }
  .logo-and-headoffice {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    margin-bottom: 6px;
  }
  .statement-logo {
    width: 30mm;
    height: auto;
    display: block;
  }
  .head-office-box {
    flex: 1;
    font-size: 7.5pt;
  }
  .head-office-title {
    font-weight: bold;
    font-size: 8pt;
    border-bottom: 1px solid #c0c0c0;
    padding-bottom: 1.5px;
    margin-bottom: 1.5px;
  }
  .head-office-line {
    border-bottom: 1px solid #c0c0c0;
    padding-bottom: 1.5px;
    margin-bottom: 1.5px;
    font-size: 7.5pt;
    color: #111;
  }

  /* Metadata Table */
  .meta-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 8pt;
    margin-top: 4px;
  }
  .meta-table td {
    padding: 1.5px 0;
    vertical-align: top;
  }
  .meta-lbl {
    width: 105px;
    color: #111;
  }
  .meta-colon {
    width: 12px;
    text-align: left;
  }
  .meta-val {
    font-weight: normal;
    color: #000;
  }

  /* ── Watermark in Center ── */
  .watermark {
    position: absolute;
    top: 50%;
    left: 49%;
    transform: translate(-50%, -50%);
    font-size: 58pt;
    font-weight: bold;
    color: rgba(226, 235, 243, 0.55);
    letter-spacing: 2px;
    pointer-events: none;
    z-index: 1;
    user-select: none;
    white-space: nowrap;
  }

  /* ── Transaction Table ── */
  .statement-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 7.6pt;
    position: relative;
    z-index: 2;
  }
  .statement-table th {
    font-size: 8pt;
    font-weight: bold;
    color: #000;
    padding: 4px 4px 6px 4px;
    text-align: left;
    border: none;
    letter-spacing: 0.2px;
  }
  .statement-table th.col-amt {
    text-align: right;
  }
  .statement-table td {
    padding: 2.2px 4px;
    vertical-align: top;
    font-size: 7.6pt;
    line-height: 1.2;
    color: #000;
    border: none;
  }

  .col-date {
    width: 78px;
    white-space: nowrap;
  }
  .col-desc {
    padding-right: 12px;
  }
  .col-ref {
    width: 70px;
  }
  .col-amt {
    width: 88px;
    text-align: right;
    white-space: nowrap;
  }

  /* ── Footer ── */
  .footer-container {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    z-index: 10;
  }
  .footer-text-area {
    padding: 0 12mm 10px 12mm;
    text-align: center;
    border-top: 1px solid #444;
    padding-top: 6px;
    font-size: 7.8pt;
    line-height: 1.35;
    color: #111;
  }
  .footer-text-area a {
    color: #003876;
    text-decoration: underline;
  }
  .footer-gold-bar {
    width: 100%;
    height: 9mm;
    background-color: #F5C518;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
</style>
</head>
<body>

  <!-- Watermark -->
  <div class="watermark">e-statement</div>

  <!-- Header Grid -->
  <div class="header-grid">
    <!-- Left: Customer info & Branch -->
    <div class="header-left">
      <div class="customer-name">${s.customerName}</div>
      <div class="customer-address">${s.customerAddress}</div>

      <div class="branch-name">${s.branchName}</div>
      <div class="branch-address">${s.branchAddress}</div>
    </div>

    <!-- Center: QR Code -->
    <div class="header-center">
      <img src="${qrBase64}" class="qr-img" alt="Verification QR Code">
    </div>

    <!-- Right: Logo & Head Office & Meta -->
    <div class="header-right">
      <div class="logo-and-headoffice">
        <img src="${logoBase64}" class="statement-logo" alt="Eastern Bank PLC. Simple Math">
        <div class="head-office-box">
          <div class="head-office-title">HEAD OFFICE</div>
          <div class="head-office-line">100 Gulshan Avenue</div>
          <div class="head-office-line">Gulshan</div>
          <div class="head-office-line">Dhaka 1212</div>
          <div class="head-office-line">Bangladesh</div>
        </div>
      </div>

      <table class="meta-table">
        <tr>
          <td class="meta-lbl">Account No</td>
          <td class="meta-colon">:</td>
          <td class="meta-val">${s.accountNo}</td>
        </tr>
        <tr>
          <td class="meta-lbl">Product Name</td>
          <td class="meta-colon">:</td>
          <td class="meta-val">${s.productName}</td>
        </tr>
        <tr>
          <td class="meta-lbl">Period From</td>
          <td class="meta-colon">:</td>
          <td class="meta-val">${s.periodFrom}</td>
        </tr>
        <tr>
          <td class="meta-lbl">Page</td>
          <td class="meta-colon">:</td>
          <td class="meta-val">1</td>
        </tr>
        <tr>
          <td class="meta-lbl">Currency Name</td>
          <td class="meta-colon">:</td>
          <td class="meta-val">${s.currencyName}</td>
        </tr>
        <tr>
          <td class="meta-lbl">Branch Code</td>
          <td class="meta-colon">:</td>
          <td class="meta-val">${s.branchCode}</td>
        </tr>
        <tr>
          <td class="meta-lbl">Customer ID</td>
          <td class="meta-colon">:</td>
          <td class="meta-val">${s.customerId}</td>
        </tr>
      </table>
    </div>
  </div>

  <!-- Table -->
  <table class="statement-table">
    <thead>
      <tr>
        <th style="width: 78px;">TRN. DATE</th>
        <th>DESCRIPTION</th>
        <th style="width: 75px;">REFERENCE</th>
        <th class="col-amt">DEBITS</th>
        <th class="col-amt">CREDITS</th>
        <th class="col-amt">BALANCE</th>
      </tr>
    </thead>
    <tbody>
      ${trRows}
    </tbody>
  </table>

  <!-- Footer Container with Gold Bar -->
  <div class="footer-container">
    <div class="footer-text-area">
      This document is verifiable by scanning the above QR code and doesn't require a seal or signature. Verify only via
      [<a href="${s.qrUrl}">https://selfservicehubebl-bd.vercel.app</a>]<br>
      IP: +88 09666777325, Email: info@ebl-bd.com, Contact Center: 16230 or +88 096 777 16230, Web: www.ebl.com.bd, Swift: EBLBDDH
    </div>
    <div class="footer-gold-bar"></div>
  </div>

</body>
</html>
`;
}

async function renderStatements() {
  for (const s of statements) {
    console.log(`\nGenerating: ${s.title}`);
    console.log(` Target QR URL: ${s.qrUrl}`);

    const html = await generateHtml(s);

    const htmlPath = path.join(rootDir, `my-asset/${s.filename}.html`);
    const pdfPath = path.join(rootDir, `my-asset/${s.filename}.pdf`);
    const pngPath = path.join(rootDir, `my-asset/${s.filename}.png`);

    fs.writeFileSync(htmlPath, html);

    // Render to exact 1-page A4 PDF using Chrome
    execSync(
      `google-chrome --headless --disable-gpu --no-sandbox --print-to-pdf-no-header --print-to-pdf="${pdfPath}" "${htmlPath}" 2>/dev/null`
    );
    console.log(` Created PDF: my-asset/${s.filename}.pdf`);

    // Render to high-res screenshot
    execSync(
      `google-chrome --headless --disable-gpu --no-sandbox --window-size=1320,1842 --screenshot="${pngPath}" "${htmlPath}" 2>/dev/null`
    );
    console.log(` Created PNG: my-asset/${s.filename}.png`);
  }

  console.log('\n All statements updated and rendered successfully!');
}

renderStatements().catch(console.error);
