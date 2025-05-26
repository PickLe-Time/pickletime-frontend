import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import AppBar from './AppBar.jsx';

// Mock react-router-dom Link to render children as simple anchor tags
vi.mock('react-router-dom', () => ({
  Link: ({ children, to, ...props }) => <a href={to} {...props}>{children}</a>,
}));

// Mock the useUser hook
vi.mock('../../hooks/useUser.jsx', () => ({
  __esModule: true, // mark as ES module
  default: vi.fn(() => ({
    user: null,
  })),
}));

import useUser from '../../hooks/useUser.jsx';

describe('AppBar', () => {
  it('renders app name and logo link', () => {
    render(<AppBar />);
    expect(screen.getByText('PickLeTime', { selector: 'a[href="/"]' })).toBeInTheDocument();
    expect(screen.getByText('PickLeTime', { selector: 'a[href="/scheduler"]' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'home' }).querySelector('svg')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'home' })).toHaveAttribute('href', '/');
  });

  it('shows settings menu when logged in', async () => {
    // Override the useUser mock to simulate logged-in state
    useUser.mockReturnValue({
      user: {
        username: 'xUser',
        displayName: 'X Usear',
        accessToken: 'token123',
        color: '#123456',
        role: 'USER',
      },
    });

    render(<AppBar />);
    expect(await screen.findByText('Profile')).toBeInTheDocument();
    expect(screen.getByText('Account')).toBeInTheDocument();
    expect(screen.getByText('Sign out')).toBeInTheDocument();
  });
});
