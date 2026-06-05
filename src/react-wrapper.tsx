import React, { useEffect, useState } from 'react';

export interface HelpSidebarWidgetProps {
  baseUrl: string;
  embedKey: string;
  theme?: 'auto' | 'light' | 'dark';
  buttonStyle?: 'navbar' | 'minimal' | 'hidden';
  userName?: string;
  userEmail?: string;
  guideUrl?: string;
  userRole?: string;
}

export function HelpSidebarWidget({
  baseUrl,
  embedKey,
  theme = 'auto',
  buttonStyle = 'navbar',
  userName = '',
  userEmail = '',
  guideUrl = '',
  userRole = '',
}: HelpSidebarWidgetProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Dynamically import the custom element script on client mount
    import('./help-sidebar-widget.js');
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    // @ts-ignore
    <help-sidebar-widget
      base-url={baseUrl}
      embed-key={embedKey}
      theme={theme}
      button-style={buttonStyle}
      user-name={userName}
      user-email={userEmail}
      guide-url={guideUrl}
      user-role={userRole}
    />
  );
}
