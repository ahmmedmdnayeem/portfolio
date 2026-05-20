import { ImageResponse } from 'next/og';
import { SITE_CONFIG } from '@/lib/constants/navigation';

export const runtime = 'edge';
export const alt = `${SITE_CONFIG.name} — Software Engineer · Top 1% Freelancer`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 64,
          background:
            'radial-gradient(circle at 20% 30%, rgba(0,255,136,0.15), transparent 60%), radial-gradient(circle at 80% 70%, rgba(0,212,255,0.12), transparent 55%), #020408',
          color: '#e2e8f0',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: '50%',
              background: '#00ff88',
              boxShadow: '0 0 24px rgba(0,255,136,0.8)',
            }}
          />
          <div
            style={{
              fontFamily: 'monospace',
              fontSize: 22,
              color: '#00ff88',
              letterSpacing: 4,
              textTransform: 'uppercase',
            }}
          >
            &gt; NAYEEM_
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div
            style={{
              fontFamily: 'monospace',
              fontSize: 22,
              color: '#00d4ff',
              letterSpacing: 4,
              textTransform: 'uppercase',
            }}
          >
            // software engineer · freelancer · bangladesh
          </div>
          <div
            style={{
              fontSize: 96,
              fontWeight: 800,
              lineHeight: 1.02,
              letterSpacing: -2,
              color: '#ffffff',
              textShadow: '0 0 30px rgba(0,255,136,0.35)',
            }}
          >
            AHMMED MD
            <br />
            NAYEEM
          </div>
          <div style={{ fontSize: 30, color: '#a0aec0', lineHeight: 1.3, maxWidth: 1000 }}>
            Python · Full-Stack · Web3 · Blockchain · Cybersecurity
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div
            style={{
              display: 'flex',
              gap: 16,
              fontFamily: 'monospace',
              fontSize: 18,
              color: '#4a5568',
            }}
          >
            <span style={{ color: '#00ff88' }}>● Top 1% Upwork</span>
            <span>·</span>
            <span>$100K+ Revenue</span>
            <span>·</span>
            <span>Trilingual</span>
          </div>
          <div
            style={{
              fontFamily: 'monospace',
              fontSize: 18,
              color: '#4a5568',
            }}
          >
            ahmmednayeem.dev
          </div>
        </div>
      </div>
    ),
    size,
  );
}
