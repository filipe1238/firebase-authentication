import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import ApiTesting from './ApiTesting';

const ClientProviderAPI = () => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider
      contextSharing={true}
      client={queryClient}>
      <ApiTesting />
    </QueryClientProvider>
  )
}

export default ClientProviderAPI