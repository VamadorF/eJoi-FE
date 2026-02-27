import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react';
import { ENABLE_WEBSOCKET, SOCKET_URL } from '@/app/config/env';
import { io, Socket } from 'socket.io-client';
import { getAuthToken } from '@/shared/services/storage/secure';

interface SocketProviderProps {
  children: ReactNode;
}

interface SocketContextType {
  socket: Socket | null;
  isConnected: boolean;
  connect: () => Promise<void>;
  disconnect: () => void;
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const socketRef = useRef<Socket | null>(null);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  const connect = useCallback(async () => {
    if (!ENABLE_WEBSOCKET) {
      return;
    }
    if (!socketRef.current) {
      return;
    }
    const token = await getAuthToken();
    socketRef.current.auth = token ? { token } : {};
    socketRef.current.connect();
  }, []);

  const disconnect = useCallback(() => {
    if (!ENABLE_WEBSOCKET) {
      return;
    }
    if (!socketRef.current) {
      return;
    }
    socketRef.current.disconnect();
  }, []);

  useEffect(() => {
    if (!ENABLE_WEBSOCKET) {
      setIsConnected(false);
      setSocket(null);
      socketRef.current = null;
      return;
    }
    if (!SOCKET_URL) {
      return;
    }

    const socket = io(SOCKET_URL, {
      autoConnect: false,
      transports: ['websocket'],
      reconnection: true,
    });
    socketRef.current = socket;
    setSocket(socket);

    socket.on('connect', () => {
      setIsConnected(true);
      console.info('[SocketProvider] connected');
    });
    socket.on('disconnect', () => {
      setIsConnected(false);
      console.info('[SocketProvider] disconnected');
    });
    socket.on('connect_error', (error) => {
      setIsConnected(false);
      // #region agent log
      fetch('http://127.0.0.1:7658/ingest/39857839-993a-4106-aeaf-5c248ccc31b2',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'eaafaf'},body:JSON.stringify({sessionId:'eaafaf',runId:'cycle-dbg-1',hypothesisId:'H4',location:'SocketProvider.tsx:connect_error',message:'socket connection failed',data:{errorMessage:error?.message??'unknown',socketUrl:SOCKET_URL},timestamp:Date.now()})}).catch(()=>{});
      // #endregion
      console.warn('[SocketProvider] connect_error', error.message);
    });

    void connect();

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('connect_error');
      socket.disconnect();
      socketRef.current = null;
      setSocket(null);
      setIsConnected(false);
    };
  }, [connect]);

  const value = useMemo(
    () => ({
      socket,
      isConnected,
      connect,
      disconnect,
    }),
    [connect, disconnect, isConnected, socket]
  );

  return <SocketContext.Provider value={value}>{children}</SocketContext.Provider>;
};

export const useSocket = (): SocketContextType => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};
