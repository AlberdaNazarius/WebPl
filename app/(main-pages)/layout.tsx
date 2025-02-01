import React from 'react';
import Sidebar from '@/app/components/common/sidebar/Sidebar';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className='main-style global-padding'>
      <Sidebar />
      {children}
    </main>
  );
};

export default Layout;