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
  themeColor.setAttribute('content', '#f8fafc');
});

test('renders the customer spending dashboard', async () => {
  render(<App />);
  const heading = await screen.findByRole('heading', {
    name: /customer spending insights/i
  });
  expect(heading).toBeInTheDocument();
});

test('switches between light and dark dashboard themes', async () => {
  render(<App />);

  const darkModeButton = await screen.findByRole('button', { name: /switch to dark mode/i });
  expect(document.documentElement).toHaveAttribute('data-theme', 'light');
  expect(document.querySelector('meta[name="theme-color"]')).toHaveAttribute('content', '#f8fafc');

  fireEvent.click(darkModeButton);
  await waitFor(() => {
    expect(document.documentElement).toHaveAttribute('data-theme', 'dark');
    expect(document.querySelector('meta[name="theme-color"]')).toHaveAttribute('content', '#0f172a');
  });
  expect(localStorage.getItem('dashboard-theme')).toBe('dark');

  fireEvent.click(screen.getByRole('button', { name: /switch to light mode/i }));
  await waitFor(() => {
    expect(document.documentElement).toHaveAttribute('data-theme', 'light');
  });
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
