import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import TableSection from './TableSection';
import { useFilterContext } from '@/app/contexts/FilterContext';

// Mocking FilterContext
jest.mock('../../contexts/FilterContext');

describe('TableSection component', () => {
    const initialTableResponse = {
        data: [
            {
                'Asset Name': 'Mcknight, Beasley and Stewart',
                Lat: 46.1351,
                Long: -60.1831,
                'Business Category': 'Energy',
                'Risk Rating': 0.06,
                'Risk Factors': { Earthquake: 0.06 },
                Year: 2050,
            },
            {
                'Asset Name': 'Acevedo-Kennedy',
                Lat: 50.26729,
                Long: -119.27337,
                'Business Category': 'Technology',
                'Risk Rating': 0.14,
                'Risk Factors': { 'Extreme heat': 0.01, Wildfire: 0.04, Tornado: 0.03, Flooding: 0.02, Volcano: 0.01, Hurricane: 0.02, Earthquake: 0.01 },
                Year: 2050,
            },
        ],
        totalPages: 1,
        currentPage: 1,
    };
    const mockSetSelectedAsset = jest.fn(); // making mock function
    // initialize selected asset value for each testing case
    beforeEach(() => {
        useFilterContext.mockReturnValue({
            selectedAsset: '',
            setSelectedAsset: mockSetSelectedAsset,
        });
    });

    test('should render a table with initial data', () => {
        render(<TableSection initialTableResponse={initialTableResponse} />);

        // check if the table is rendered with data
        const tableRows = screen.getAllByRole('row');
        expect(tableRows).toHaveLength(initialTableResponse.data.length + 1); // + 1 is for table header
        initialTableResponse.data.forEach((row) => {
            expect(screen.getByText(row['Asset Name'])).toBeInTheDocument();
            expect(screen.getByText(row['Lat'])).toBeInTheDocument();
        });
    });

    test('should call useFilterContext', () => {
        render(<TableSection initialTableResponse={initialTableResponse} />);
        expect(useFilterContext).toHaveBeenCalled();
    });

    test('should render NoResult component when data is empty', () => {
        render(<TableSection initialTableResponse={{ data: [], totalPages: 0, currentPage: 0 }} />);
        const noResultElement = screen.getByTestId('no-result');
        expect(noResultElement).toBeInTheDocument();
    });
});
