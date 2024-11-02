import React, { Suspense } from 'react';
import { ApolloProvider } from '@apollo/client';
import client from './apolloclient';

const App = React.lazy(() => import('./App'));

// Hata yakalamak için ErrorBoundary bileşeni
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ApolloProviderWrapper hata:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Bir hata oluştu. Lütfen daha sonra tekrar deneyin.</h1>;
    }
    return this.props.children;
  }
}

const ApolloProviderWrapper = ({ clientInstance = client, children }) => (
  <ApolloProvider client={clientInstance}>
    <ErrorBoundary>
      <Suspense fallback={<div>Yükleniyor...</div>}>
        {children || <App />}
      </Suspense>
    </ErrorBoundary>
  </ApolloProvider>
);

export default ApolloProviderWrapper;
