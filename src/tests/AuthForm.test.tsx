import React from 'react';
import { render, screen } from '@testing-library/react';
import AuthForm from '@site/src/components/AuthForm';

describe('AuthForm', () => {
  it('renders login form correctly', () => {
    render(<AuthForm type="login" onSubmit={() => {}} loading={false} error={null} />);
    expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/email:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password:/i)).toBeInTheDocument();
    expect(screen.queryByLabelText(/name:/i)).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  it('renders signup form correctly', () => {
    render(<AuthForm type="signup" onSubmit={() => {}} loading={false} error={null} />);
    expect(screen.getByRole('heading', { name: /signup/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/email:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/name:/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign up/i })).toBeInTheDocument();
  });

  // Add more tests for form submission, error display, loading states etc.
});
