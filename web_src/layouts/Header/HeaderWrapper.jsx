import React from 'react';
import DesktopHeader from './DesktopHeader';
import MobileHeader from './MobileHeader';

export default function HeaderWrapper() {
  return (
    <>
      <DesktopHeader />
      <MobileHeader />
    </>
  );
}
