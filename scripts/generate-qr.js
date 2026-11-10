import QRCode from 'qrcode';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const BASE_VERCEL_URL = 'https://selfservicehubebl-bd.vercel.app/ebl-cert-portal-flat/verify.php';

const targets = [
  {
    name: 'Default Vercel Portal QR (Original Document)',
    token: 'B5B80F8F46A78378F37C409D126211C4E4E947B518B1EF38BAB467EA41CB96CB',
    url: `${BASE_VERCEL_URL}?qr=B5B80F8F46A78378F37C409D126211C4E4E947B518B1EF38BAB467EA41CB96CB`,
    files: [
      'public/ebl-portal-qr.png',
      'my-asset/ebl-portal-qr.png',
      'my-asset/qr-statement-original.png',
    ],
  },
  {
    name: 'Statement 1 (New User Name, Same Everything Else)',
    token: 'A1C49F7D832B10E659D824E312759B4A091E72D8534C118A620F93E417C2B801',
    url: `${BASE_VERCEL_URL}?qr=A1C49F7D832B10E659D824E312759B4A091E72D8534C118A620F93E417C2B801`,
    files: [
      'public/qr-statement-1.png',
      'my-asset/qr-statement-1.png',
    ],
  },
  {
    name: 'Statement 2 (Same User Name, Changed Amounts)',
    token: 'C2D81E5F943A21F760E935F423860C5B102F83E9645D229B731A04F528D3C912',
    url: `${BASE_VERCEL_URL}?qr=C2D81E5F943A21F760E935F423860C5B102F83E9645D229B731A04F528D3C912`,
    files: [
      'public/qr-statement-2.png',
      'my-asset/qr-statement-2.png',
    ],
  },
  {
    name: 'Statement 3 (New Name and Changed Amounts)',
    token: 'E3F92A6B054B32A871FA46A534971D6C213A94FA756E330C842B15A639E4DA23',
    url: `${BASE_VERCEL_URL}?qr=E3F92A6B054B32A871FA46A534971D6C213A94FA756E330C842B15A639E4DA23`,
    files: [
      'public/qr-statement-3.png',
      'my-asset/qr-statement-3.png',
    ],
  },
];

async function generateAllQRs() {
  for (const target of targets) {
    console.log(`Generating QR for: ${target.name}`);
    console.log(`URL: ${target.url}`);

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

    for (const relPath of target.files) {
      const fullPath = path.join(rootDir, relPath);
      fs.mkdirSync(path.dirname(fullPath), { recursive: true });
      fs.writeFileSync(fullPath, buffer);
      console.log(` Saved: ${relPath}`);
    }
  }

  const meta = {
    generatedAt: new Date().toISOString(),
    baseUrl: BASE_VERCEL_URL,
    targets: targets.map((t) => ({
      name: t.name,
      token: t.token,
      url: t.url,
      primaryFile: t.files[0],
    })),
  };

  fs.writeFileSync(
    path.join(rootDir, 'public/qr-metadata.json'),
    JSON.stringify(meta, null, 2)
  );

  console.log('\n All 4 QR codes generated successfully for Vercel deployment!');
}

generateAllQRs().catch((err) => {
  console.error('Error generating QR codes:', err);
  process.exit(1);
});
