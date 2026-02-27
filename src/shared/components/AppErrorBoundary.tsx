import React, { ReactNode } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

interface AppErrorBoundaryProps {
  children: ReactNode;
}

interface AppErrorBoundaryState {
  hasError: boolean;
  errorMessage: string;
}

export class AppErrorBoundary extends React.Component<
  AppErrorBoundaryProps,
  AppErrorBoundaryState
> {
  state: AppErrorBoundaryState = {
    hasError: false,
    errorMessage: '',
  };

  static getDerivedStateFromError(error: Error): AppErrorBoundaryState {
    return {
      hasError: true,
      errorMessage: error.message,
    };
  }

  componentDidCatch(error: Error): void {
    console.error('[AppErrorBoundary]', error);
  }

  private handleRetry = (): void => {
    this.setState({
      hasError: false,
      errorMessage: '',
    });
  };

  render() {
    if (!this.state.hasError) {
      return this.props.children;
    }

    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: 24,
          gap: 16,
          backgroundColor: '#FFFFFF',
        }}
      >
        <Text style={{ fontSize: 22, fontWeight: '700', color: '#3c3c3b', textAlign: 'center' }}>
          Ocurrio un error inesperado
        </Text>
        <Text style={{ fontSize: 14, color: '#6f6f6e', textAlign: 'center' }}>
          {this.state.errorMessage || 'No pudimos completar la operacion. Intenta nuevamente.'}
        </Text>
        <TouchableOpacity
          onPress={this.handleRetry}
          style={{
            backgroundColor: '#f20a64',
            paddingHorizontal: 20,
            paddingVertical: 12,
            borderRadius: 10,
          }}
        >
          <Text style={{ color: '#FFFFFF', fontWeight: '600' }}>Reintentar</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
