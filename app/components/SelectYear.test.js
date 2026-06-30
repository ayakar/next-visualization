import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SelectYear from '@/app/components/SelectYear';
import { useFilters } from '@/app/hooks/useFilters';

// Filter state lives in the URL (nuqs); mock the hook (factory avoids loading nuqs).
jest.mock('../hooks/useFilters', () => ({ useFilters: jest.fn() }));

describe('SelectYear', () => {
    const initialAvailableYears = [2030, 2040, 2050];
    const mockSetYear = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
        useFilters.mockReturnValue({ year: null, setYear: mockSetYear });
    });

    test('renders all available years', () => {
        render(<SelectYear initialAvailableYears={initialAvailableYears} />);
        expect(screen.getByText('All Years')).toBeInTheDocument();
        initialAvailableYears.forEach((year) => {
            expect(screen.getByText(year)).toBeInTheDocument();
        });
    });

    test('calls setYear with the parsed number on change', () => {
        render(<SelectYear initialAvailableYears={initialAvailableYears} />);
        fireEvent.change(screen.getByTestId('selectYear'), { target: { value: '2030' } });
        expect(mockSetYear).toHaveBeenCalledWith(2030);
    });

    test('calls setYear with null when cleared', () => {
        render(<SelectYear initialAvailableYears={initialAvailableYears} />);
        fireEvent.change(screen.getByTestId('selectYear'), { target: { value: '' } });
        expect(mockSetYear).toHaveBeenCalledWith(null);
    });
});
