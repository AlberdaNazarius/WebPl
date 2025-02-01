import React from 'react';
import Sidebar from '@/app/components/common/sidebar/Sidebar';
import WebPlayer from '@/app/components/web-player/WebPlayer';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className='main-style global-padding'>
      <Sidebar />
      {children}
      <WebPlayer />
    </main>
  );
};

export default Layout;