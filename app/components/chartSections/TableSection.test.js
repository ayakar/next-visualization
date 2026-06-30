import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import TableSection from './TableSection';
import { useFilters } from '@/app/hooks/useFilters';

// Filter state lives in the URL (nuqs); mock the hook (factory avoids loading nuqs).
jest.mock('../../hooks/useFilters', () => ({ useFilters: jest.fn() }));

const renderWithClient = (ui) => {
    const client = new QueryClient({ defaultOptions: { queries: { retry: false, staleTime: Infinity } } });
    return render(<QueryClientProvider client={client}>{ui}</QueryClientProvider>);
};

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

    beforeEach(() => {
        jest.clearAllMocks();
        useFilters.mockReturnValue({
            filters: { year: null, asset: '', category: '', riskFactors: [], location: '' },
            hasActiveFilters: false,
        });
    });

    test('should render a table with initial data', () => {
        renderWithClient(<TableSection initialTableResponse={initialTableResponse} />);

        const tableRows = screen.getAllByRole('row');
        expect(tableRows).toHaveLength(initialTableResponse.data.length + 1); // + 1 is for table header
        initialTableResponse.data.forEach((row) => {
            expect(screen.getByText(row['Asset Name'])).toBeInTheDocument();
            expect(screen.getByText(row['Lat'])).toBeInTheDocument();
        });
    });

    test('should render NoResult component when data is empty', () => {
        renderWithClient(<TableSection initialTableResponse={{ data: [], totalPages: 0, currentPage: 0 }} />);
        expect(screen.getByTestId('no-result')).toBeInTheDocument();
    });
});
