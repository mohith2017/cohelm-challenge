// import Navbar from './navbar';
// import Footer from './footer';
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <p> Welcome to Co:helm AI copilot tool</p>
      <main>{children}</main>

    </>
  );
}
