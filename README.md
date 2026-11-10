# Eastern Bank PLC — Document Verification Portal

Production-grade, pixel-accurate frontend application replicating the **Eastern Bank PLC (EBL)** official document verification service, built with **React**, **TypeScript**, **Material-UI (MUI)**, and **Vite**.

---

## 🚀 Features

- **Pixel-Accurate Verification UI**: Matches the exact visual hierarchy, fonts, gold accent branding (`#F5C518`), corporate navy blue (`#003876`), and layout of Eastern Bank PLC's production portal (`selfservicehub.ebl-bd.com`).
- **Authentic Dynamic CAPTCHA**:
  - Distorted character rendering with interference lines, noise speckles, and rotational jitter.
  - Case-insensitive submission with automatic regeneration on failure.
  - Interactive refresh button (`↻`) and audio read-aloud support for accessibility.
- **Document Verification State**:
  - Displays green verification seal (`#1a8a4a`) and confirmation details:
    - Customer Name: `MD. SHAFIQUL HAQUE`
    - Account No: `1331440025228`
    - Document Type: `CASA Statement`
    - Issue Date: `29-OCT-2026 02:39 PM`
    - Closing Balance: `439.82`
  - Tamper-proof digital badge and "Verify Another Document" flow.
- **Official E-Statement Document Viewer**:
  - Full statement view matching the authentic PDF/image, including branch info, customer address, full transaction ledger with debits, credits, running balance, and printable layout.
- **Official QR Code Suite**:
  - Built-in QR Code Generator & Scanner tool.
  - Presets for:
    - **Live Browser Origin** (auto-detected origin + verification route)
    - **Local Network Wi-Fi IP** (`http://192.168.1.77:5173/ebl-cert-portal-flat/verify.php?qr=...`) allowing instant phone camera scanning!
    - **Production EBL Hub** (`https://selfservicehub.ebl-bd.com//ebl-cert-portal-flat/verify.php?qr=...`)
    - Custom URL input.
  - Direct High-Resolution PNG download.
- **URL & Route Compliance**:
  - Exact route: `/ebl-cert-portal-flat/verify.php?qr=B5B80F8F46A78378F37C409D126211C4E4E947B518B1EF38BAB467EA41CB96CB`
  - Graceful fallback routes: `/ebl-cert-portal-flat/verify`, `/verify.php`, `/verify`, and root `/` redirection preserving query tokens.
- **Fully Responsive**: Flawless experience across mobile, tablet, and desktop viewports.
- **Automated Test Suite**: 18 unit and integration tests with **Vitest** and **React Testing Library**.

---

## 🛠️ Tech Stack

- **Runtime & Bundler**: Vite 6, Node.js (ES modules)
- **Framework**: React 18
- **Language**: TypeScript (strict mode)
- **UI & Styling**: Material UI (MUI v6) + Emotion
- **Routing**: React Router DOM v6
- **QR Engine**: `qrcode` & `qrcode.react`
- **Testing**: Vitest, React Testing Library, `@testing-library/jest-dom`, `jsdom`

---

## 📦 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Dev Server
```bash
npm run dev
```
The application will be served with network host enabled:
- Local: `http://localhost:5173/ebl-cert-portal-flat/verify.php`
- Network (scan with phone on same Wi-Fi): `http://192.168.1.77:5173/ebl-cert-portal-flat/verify.php`

### 3. Generate High-Res QR Code Assets
```bash
npm run generate-qr
```
This generates and outputs high-resolution QR codes to:
- `public/ebl-portal-qr.png`
- `my-asset/ebl-portal-qr.png`
- `public/ebl-qr-lan.png`
- `public/ebl-qr-official.png`

### 4. Run Automated Tests
```bash
npm run test
```

### 5. Production Build
```bash
npm run build
```
Outputs optimized, gzipped static bundle in `dist/`.

---

## 🔒 Security & Privacy Notice
All banking data represented in mock databases complies strictly with sample test fixtures from provided reference documents.
