import { render, screen } from '@testing-library/react';
import App from '../App';

test('test_case01', () => {
  render(<App />);
  const linkElement = screen.getByText(/Search by Movies Name/i);
  expect(linkElement).toBeInTheDocument();
})
test('test_case02', () => {
  render(<App />);
  const linkElement = screen.getByRole('button');
  expect(linkElement).toBeInTheDocument();
})
test('test_case03', () => {
  render(<App />);
  const linkElement = screen.getByRole('textbox')
  expect(linkElement).toBeInTheDocument();
});