import React, { ReactNode, useEffect, useState } from 'react';
import {
  FatalHttpErrorPayload,
  subscribeToFatalHttpErrors,
} from '@/shared/services/http/httpErrorBus';

class HttpBoundaryError extends Error {
  constructor(public payload: FatalHttpErrorPayload) {
    super(
      `[HTTP ${payload.status}] ${payload.method} ${payload.endpoint}: ${payload.message || payload.statusText}`
    );
    this.name = 'HttpBoundaryError';
  }
}

interface HttpErrorBoundaryBridgeProps {
  children: ReactNode;
}

export const HttpErrorBoundaryBridge: React.FC<HttpErrorBoundaryBridgeProps> = ({ children }) => {
  const [fatalError, setFatalError] = useState<HttpBoundaryError | null>(null);

  useEffect(() => {
    const unsubscribe = subscribeToFatalHttpErrors((payload) => {
      setFatalError(new HttpBoundaryError(payload));
    });

    return unsubscribe;
  }, []);

  if (fatalError) {
    throw fatalError;
  }

  return <>{children}</>;
};
