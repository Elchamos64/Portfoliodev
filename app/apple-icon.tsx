import { ImageResponse } from 'next/og';

export const size = {
  width: 180,
  height: 180,
};
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 88,
          background: '#222733',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#e8e8ec',
          fontWeight: 'bold',
          fontFamily: 'monospace',
          letterSpacing: '-4px',
        }}
      >
        &gt;_
      </div>
    ),
    {
      ...size,
    }
  );
}
