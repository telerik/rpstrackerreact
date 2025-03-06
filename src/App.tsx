import React, { createContext } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

import { BacklogPage } from './modules/backlog/pages/backlog/backlog-page';
import { DashboardPage } from './modules/dashboard/pages/dashboard/dashboard-page';

import { DetailPage } from './modules/backlog/pages/detail/detail-page';

import { Store } from './core/state/app-store';
import { BacklogRepository } from './modules/backlog/repositories/backlog.repository';
import { BacklogService } from './modules/backlog/services/backlog.service';
import { DashboardRepository } from './modules/dashboard/repositories/dashboard.repository';
import { DashboardService } from './modules/dashboard/services/dashboard.service';
import { PtUserService } from './core/services/pt-user-service';
import MainMenu from './shared/components/main-menu/main-menu';
import AppBar from './shared/components/app-bar/app-bar';

import './App.css';

const queryClient = new QueryClient();

const store: Store = new Store();
const backlogRepo: BacklogRepository = new BacklogRepository();
const backlogService: BacklogService = new BacklogService(backlogRepo, store);
const dashboardRepo: DashboardRepository = new DashboardRepository();
const dashboardService: DashboardService = new DashboardService(dashboardRepo);
const userService: PtUserService = new PtUserService(store);

export const PtStoreContext = createContext(store);
export const PtBacklogServiceContext = createContext(backlogService);
export const PtDashboardServiceContext = createContext(dashboardService);
export const PtUserServiceContext = createContext(userService);

function App() {
    return (
      <PtStoreContext.Provider value={store}>
      <PtUserServiceContext.Provider value={userService}>
      <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <React.Fragment>
        <div className="page">
          <div className="backlog-container">
            <div className="app-header">
              <AppBar/>
            </div>
        
            <div className="main-content-wrapper">
              <MainMenu />
              <div className="content-container">
              <Routes>
                  <Route path="dashboard" element={
                    <PtDashboardServiceContext.Provider value={dashboardService}>
                      <DashboardPage/>
                    </PtDashboardServiceContext.Provider>
                  } />
                  <Route path="/" element={<Navigate replace to="/dashboard" />} />
                  <Route path="/backlog/:preset" element={
                    <PtBacklogServiceContext.Provider value={backlogService}>
                      <BacklogPage/>
                    </PtBacklogServiceContext.Provider>
                  } />
                  <Route path="backlog" element={<Navigate replace to="/backlog/open" />}/>
                  <Route path="/detail/:id" element={
                    <PtBacklogServiceContext.Provider value={backlogService}>
                      <DetailPage/>
                    </PtBacklogServiceContext.Provider>
                  } />
                  <Route path="/detail/:id/tasks" element={
                    <PtBacklogServiceContext.Provider value={backlogService}>
                      <DetailPage/>
                    </PtBacklogServiceContext.Provider>
                  } />
                  <Route path="/detail/:id/schedule" element={
                    <PtBacklogServiceContext.Provider value={backlogService}>
                      <DetailPage/>
                    </PtBacklogServiceContext.Provider>
                  } />
                                    <Route path="/detail/:id/chitchat" element={
                    <PtBacklogServiceContext.Provider value={backlogService}>
                      <DetailPage/>
                    </PtBacklogServiceContext.Provider>
                  } />
                </Routes>
          </div>
        </div>
      </div>
    </div>
        </React.Fragment>
      </BrowserRouter>
      </QueryClientProvider>
      </PtUserServiceContext.Provider>
      </PtStoreContext.Provider>
    );
}

export default App;
