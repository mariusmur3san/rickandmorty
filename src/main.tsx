import React from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import './index.css'
import App from './App'
import Episode from './Episode'
import Caracter from './Character'
import EpisodeList from './EpisodeList'


const queryClient = new QueryClient();

const persister = createSyncStoragePersister({
  storage: window.localStorage,
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister }}
    >
      <BrowserRouter>
        <Routes>
          <Route element={<App />}>
            <Route path="/episode?" element={<EpisodeList />} />
            <Route path="episode/:id" element={<Episode />} />
            <Route path="character/:id" element={<Caracter />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen />
    </PersistQueryClientProvider>
  </StrictMode >,
)
