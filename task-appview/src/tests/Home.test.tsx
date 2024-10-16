import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import Home from '../features/home/components/Home';

test('renders hello message', () => {
    render(<Home />);
    const helloElement = screen.getByText(/Home/i);
    expect(helloElement).toBeInTheDocument();
});
