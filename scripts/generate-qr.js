import QRCode from 'qrcode';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const qrToken = 'B5B80F8F46A78378F37C409D126211C4E4E947B518B1EF38BAB467EA41CB96CB';

const targets = [
  {
    name: 'Official EBL Hub Portal',
    url: `https://selfservicehub.ebl-bd.com//ebl-cert-portal-flat/verify.php?qr=${qrToken}`,
    files: ['public/ebl-qr-official.png', 'my-asset/ebl-qr-official.png'],
  },
  {
    name: 'Local Network Portal (Scan from Phone on WiFi)',
    url: `http://192.168.1.77:5173/ebl-cert-portal-flat/verify.php?qr=${qrToken}`,
    files: ['public/ebl-qr-lan.png', 'my-asset/ebl-qr-lan.png'],
  },
  {
    name: 'Default Portal QR (Primary)',
    url: `http://localhost:5173/ebl-cert-portal-flat/verify.php?qr=${qrToken}`,
    files: ['public/ebl-portal-qr.png', 'my-asset/ebl-portal-qr.png'],
  },
];

async function generateAllQRs() {
  const rootDir = path.resolve(__dirname, '..');

  for (const target of targets) {
    console.log(`Generating QR for ${target.name}: ${target.url}`);
    
    // Generate high resolution PNG
    const buffer = await QRCode.toBuffer(target.url, {
      errorCorrectionLevel: 'H',
      type: 'png',
      margin: 2,
      width: 600,
      color: {
        dark: '#000000',
        light: '#ffffff',
      },
    });

    for (const relativePath of target.files) {
      const fullPath = path.join(rootDir, relativePath);
      fs.mkdirSync(path.dirname(fullPath), { recursive: true });
      fs.writeFileSync(fullPath, buffer);
      console.log(` Saved: ${relativePath}`);
    }
  }

  // Also write a helper JSON metadata file
  const meta = {
    generatedAt: new Date().toISOString(),
    token: qrToken,
    targets: targets.map(t => ({ name: t.name, url: t.url, primaryFile: t.files[0] }))
  };
  fs.writeFileSync(
    path.join(rootDir, 'public/qr-metadata.json'),
    JSON.stringify(meta, null, 2)
  );

  console.log(' All QR codes generated successfully!');
}

generateAllQRs().catch(err => {
  console.error('Error generating QR codes:', err);
  process.exit(1);
});
