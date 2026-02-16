import { ImageResponse } from 'next/og';

export const size = {
  width: 32,
  height: 32,
};
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 18,
          background: 'black',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '6px',
          color: '#ffffff',
          fontWeight: 'bold',
          fontFamily: 'monospace',
          letterSpacing: '-1px',
        }}
      >
        &lt;/&gt;
      </div>
    ),
    {
      ...size,
    }
  );
}
