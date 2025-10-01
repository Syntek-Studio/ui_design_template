import React from 'react';

export default function DesktopHeader() {
  return (
    <header className="hidden md:flex items-center justify-between w-full bg-[var(--color-text-light)] p-4 shadow-md">
      {/* Logo */}
      <div className="flex items-center space-x-3">
        <span className="font-heading text-[var(--color-logo)] text-xl">
          MyBrand
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex space-x-6 font-sans text-[var(--color-logo)]">
        <a href="#" className="hover:text-[var(--color-text-muted)]">Home</a>
        <a href="#" className="hover:text-[var(--color-text-muted)]">About</a>
        <a href="#" className="hover:text-[var(--color-text-muted)]">Services</a>
        <a href="#" className="hover:text-[var(--color-text-muted)]">Contact</a>
      </nav>

      {/* Optional CTA */}
      <div>
        <button className="px-4 py-2 rounded-lg bg-[var(--color-logo)] text-[var(--color-text-light)] hover:opacity-80">
          Sign Up
        </button>
      </div>
    </header>
  );
}
