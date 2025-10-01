import React from 'react';

export default function MobileFooter() {
  return (
    <footer className="md:hidden flex flex-col items-center justify-center w-full bg-[var(--color-logo)] text-[var(--color-text-light)] p-4 space-y-3">
      <div className="font-heading text-base">
        MyBrand
      </div>

      <nav className="flex flex-col space-y-2 font-sans text-center">
        <a href="#" className="hover:text-[var(--color-text-muted)]">Home</a>
        <a href="#" className="hover:text-[var(--color-text-muted)]">About</a>
        <a href="#" className="hover:text-[var(--color-text-muted)]">Services</a>
        <a href="#" className="hover:text-[var(--color-text-muted)]">Contact</a>
      </nav>

      <div className="text-sm text-center">
        © {new Date().getFullYear()} MyBrand. All rights reserved.
      </div>
    </footer>
  );
}
