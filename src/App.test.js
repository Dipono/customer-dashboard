import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import App from './App';
import { api } from './services/api';

beforeEach(() => {
  localStorage.clear();
  document.documentElement.removeAttribute('data-theme');
  let themeColor = document.querySelector('meta[name="theme-color"]');
  if (!themeColor) {
    themeColor = document.createElement('meta');
    themeColor.name = 'theme-color';
    document.head.appendChild(themeColor);
  }
  themeColor.setAttribute('content', '#0b0b0c');
});

test('renders the customer spending dashboard', async () => {
  render(<App />);
  const heading = await screen.findByRole('heading', {
    name: /customer spending insights/i
  });
  expect(heading).toBeInTheDocument();
});

test('starts in dark mode and switches between monochrome themes', async () => {
  render(<App />);

  const lightModeButton = await screen.findByRole('button', { name: /switch to light mode/i });
  await waitFor(() => {
    expect(document.documentElement).toHaveAttribute('data-theme', 'dark');
    expect(document.querySelector('meta[name="theme-color"]')).toHaveAttribute('content', '#0b0b0c');
  });
  expect(localStorage.getItem('dashboard-theme')).toBe('dark');

  fireEvent.click(lightModeButton);
  await waitFor(() => {
    expect(document.documentElement).toHaveAttribute('data-theme', 'light');
    expect(document.querySelector('meta[name="theme-color"]')).toHaveAttribute('content', '#f4f4f5');
  });
  expect(localStorage.getItem('dashboard-theme')).toBe('light');

  fireEvent.click(screen.getByRole('button', { name: /switch to dark mode/i }));
  await waitFor(() => {
    expect(document.documentElement).toHaveAttribute('data-theme', 'dark');
  });
});

test('restores a saved light-mode preference', async () => {
  localStorage.setItem('dashboard-theme', 'light');
  render(<App />);

  await screen.findByRole('button', { name: /switch to dark mode/i });
  expect(document.documentElement).toHaveAttribute('data-theme', 'light');
});

test('returns category totals for an inclusive custom date range', async () => {
  const data = await api.getCategories('12345', '30d', {
    startDate: '2024-09-01',
    endDate: '2024-09-05'
  });

  expect(data.dateRange).toEqual({
    startDate: '2024-09-01',
    endDate: '2024-09-05'
  });
  expect(data.totalAmount).toBeCloseTo(
    data.categories.reduce((total, category) => total + category.amount, 0),
    2
  );
});
