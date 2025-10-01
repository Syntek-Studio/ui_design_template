import React from 'react';

export default function DesktopFooter() {
  return (
    <footer className="hidden md:flex justify-between items-center w-full bg-[var(--color-logo)] text-[var(--color-text-light)] p-6">
      {/* Left side: Brand */}
      <div className="font-heading text-lg">
        MyBrand
      </div>

      {/* Center: Navigation */}
      <nav className="flex space-x-6 font-sans">
        <a href="#" className="hover:text-[var(--color-text-muted)]">Home</a>
        <a href="#" className="hover:text-[var(--color-text-muted)]">About</a>
        <a href="#" className="hover:text-[var(--color-text-muted)]">Services</a>
        <a href="#" className="hover:text-[var(--color-text-muted)]">Contact</a>
      </nav>

      {/* Right side: Legal */}
      <div className="text-sm">
        © {new Date().getFullYear()} MyBrand. All rights reserved.
      </div>
    </footer>
  );
}
