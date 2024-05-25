// src/components/GoogleLoginComponent.tsx
import { GoogleOAuthProvider } from '@react-oauth/google';
import React from 'react';

const CLIENT_ID = 'YOUR_GOOGLE_CLIENT_ID';

interface Props {
  onSuccess: (response: any) => void;
  onFailure: (response: any) => void;
}

const GoogleLoginComponent: React.FC<Props> = ({ onSuccess, onFailure }) => {
  return (
    <GoogleOAuthProvider
      clientId={CLIENT_ID}
      onSuccess={onSuccess}
      onFailure={onFailure}
      cookiePolicy={'single_host_origin'}
    ></GoogleOAuthProvider>
  );
};

export default GoogleLoginComponent;
