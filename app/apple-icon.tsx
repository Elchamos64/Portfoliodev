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
          fontSize: 120,
          background: 'black',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '40px',
          color: '#00f5ff',
          fontWeight: 'bold',
          fontFamily: 'system-ui',
        }}
      >
        P
      </div>
    ),
    {
      ...size,
    }
  );
}
