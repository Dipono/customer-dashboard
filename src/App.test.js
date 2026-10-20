import { render, screen } from '@testing-library/react';
import App from './App';
import { api } from './services/api';

test('renders the customer spending dashboard', async () => {
  render(<App />);
  const heading = await screen.findByRole('heading', {
    name: /customer spending insights/i
  });
  expect(heading).toBeInTheDocument();
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
