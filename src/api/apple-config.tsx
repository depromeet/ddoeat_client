'use client';
import Script from 'next/script';

import { generateNonce } from '@utils/generateNonce';

export default function AppleProvider() {
  const handleLoadAppleScript = () => {
    if (typeof window !== 'undefined' && window.AppleID) {
      window.AppleID.auth.init({
        clientId: process.env.NEXT_PUBLIC_APPLE_CLIENT_ID,
        scope: 'name email',
        redirectURI: `${process.env.NEXT_PUBLIC_SITE_DOMAIN}`,
        state: 'origin:web',
        nonce: generateNonce(16),
        usePopup: false,
      });
    }
  };
  return (
    <Script
      type="text/javascript"
      src="https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js"
      onLoad={handleLoadAppleScript}
    />
  );
}
