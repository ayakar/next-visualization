import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SelectYear from '@/app/components/SelectYear';

import { useFilterContext } from '@/app/contexts/FilterContext';

// Mocking FilterContext
jest.mock('../contexts/FilterContext');

describe('SelectYear', () => {
    const initialAvailableYears = [2030, 2040, 2050];
    const mockSetSelectedYear = jest.fn(); // making mock function
    // initialize selected year value for each testing case
    beforeEach(() => {
        useFilterContext.mockReturnValue({
            selectedYear: '',
            setSelectedYear: mockSetSelectedYear,
        });
    });

    test('should call useFilterContext', () => {
        render(<SelectYear initialAvailableYears={initialAvailableYears} />);
        expect(useFilterContext).toHaveBeenCalled();
    });

    test('should render all available years', () => {
        useFilterContext.mockReturnValue({ selectedYear: '', setSelectedYear: jest.fn() });
        render(<SelectYear initialAvailableYears={initialAvailableYears} />);

        expect(screen.getByText('All Year')).toBeInTheDocument();
        initialAvailableYears.forEach((year) => {
            expect(screen.getByText(year)).toBeInTheDocument();
        });
    });

    test('should call set SelectedYear when select value is changed', () => {
        render(<SelectYear initialAvailableYears={initialAvailableYears} />);
        const selectEl = screen.getByTestId('selectYear');
        fireEvent.change(selectEl, { target: { value: 2030 } });
        expect(mockSetSelectedYear).toHaveBeenCalledWith(2030);
    });
});
