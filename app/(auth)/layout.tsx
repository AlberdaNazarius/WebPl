import React from 'react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="main-style global-top-padding">
      {children}
    </main>
  );
};

export default Layout;