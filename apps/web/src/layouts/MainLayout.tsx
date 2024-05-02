import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { AppBar } from '../components/AppBar';

export function MainLayout() {
  return (
    <>
      <AppBar />
      <main className="p-4">
        <Suspense fallback={<div>Loading...</div>}>
          <Outlet />
        </Suspense>
      </main>
    </>
  );
}
