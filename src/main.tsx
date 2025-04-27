import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';
import { QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter, Route, Routes } from 'react-router';

import './index.css';
import App from './App';
import Caracter from './Character';
import Episode from './Episode';
import EpisodeList from './EpisodeList';

const queryClient = new QueryClient();

const persister = createSyncStoragePersister({
  storage: window.localStorage,
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister }}
    >
      <HashRouter>
        <Routes>
          <Route element={<App />}>
            <Route path="/episode?" element={<EpisodeList />} />
            <Route path="episode/:id" element={<Episode />} />
            <Route path="character/:id" element={<Caracter />} />
          </Route>
        </Routes>
      </HashRouter>
      <ReactQueryDevtools initialIsOpen />
    </PersistQueryClientProvider>
  </StrictMode>
);
