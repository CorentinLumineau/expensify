import { Metadata } from 'next'

interface PageMetadata {
  title: string;
  description: string;
}

export function getMetadata(pathname: string): PageMetadata {
  switch (pathname) {
    case '/dashboard':
      return {
        title: 'Dashboard | Expensify',
        description: 'View your financial overview and insights',
      };
    case '/allocations':
      return {
        title: 'Allocations | Expensify',
        description: 'Manage your budget allocations',
      };
    case '/compound-interest':
      return {
        title: 'Compound Interest Calculator | Expensify',
        description: 'Calculate compound interest with our advanced tool',
      };
    case '/debt-ratio':
      return {
        title: 'Debt Ratio Calculator | Expensify',
        description: 'Calculate your debt ratio with our advanced tool',
      };
    default:
      return {
        title: 'Expensify',
        description: 'Manage your finances with ease',
      };
  }
}

export function generateMetadata(pathname: string): Metadata {
  const { title, description } = getMetadata(pathname);
  return {
    title,
    description,
    icons: {
      icon: '/icon-512x512.png',
    },
  };
}