export interface FatalHttpErrorPayload {
  status: number;
  statusText: string;
  endpoint: string;
  method: string;
  message: string;
}

type FatalHttpErrorListener = (payload: FatalHttpErrorPayload) => void;

const listeners = new Set<FatalHttpErrorListener>();

export const subscribeToFatalHttpErrors = (
  listener: FatalHttpErrorListener
): (() => void) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};

export const publishFatalHttpError = (payload: FatalHttpErrorPayload): void => {
  listeners.forEach((listener) => {
    listener(payload);
  });
};
