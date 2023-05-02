import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SelectAsset from '@/app/components/SelectAsset';

import { useFilterContext } from '@/app/contexts/FilterContext';

// Mocking FilterContext
jest.mock('../contexts/FilterContext');

describe('SelectAsset', () => {
    const initialAvailableAssets = ['Mcknight, Beasley and Stewart', 'Acevedo-Kennedy', 'Ware PLC'];
    const mockSetSelectedAsset = jest.fn(); // making mock function
    // initialize selected asset value for each testing case
    beforeEach(() => {
        useFilterContext.mockReturnValue({
            selectedAsset: '',
            setSelectedAsset: mockSetSelectedAsset,
        });
    });

    test('should call useFilterContext', () => {
        render(<SelectAsset initialAvailableAssets={initialAvailableAssets} />);
        expect(useFilterContext).toHaveBeenCalled();
    });

    test('should render all available assets', () => {
        useFilterContext.mockReturnValue({ selectedAsset: '', setSelectedAsset: jest.fn() });
        render(<SelectAsset initialAvailableAssets={initialAvailableAssets} />);

        expect(screen.getByText('All Assets')).toBeInTheDocument();
        initialAvailableAssets.forEach((asset) => {
            expect(screen.getByText(asset)).toBeInTheDocument();
        });
    });

    test('should call setSelectedAsset when select value is changed', () => {
        render(<SelectAsset initialAvailableAssets={initialAvailableAssets} />);
        const selectEl = screen.getByTestId('selectAsset');
        fireEvent.change(selectEl, { target: { value: 'Acevedo-Kennedy' } });
        expect(mockSetSelectedAsset).toHaveBeenCalledWith('Acevedo-Kennedy');
    });
});
