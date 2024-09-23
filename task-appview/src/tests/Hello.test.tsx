import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import Hello from '../Pages/Hello';

test('renders hello message', () => {
    render(<Hello />);
    const helloElement = screen.getByText(/Hello/i);
    expect(helloElement).toBeInTheDocument();
});
