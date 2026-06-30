import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SelectAsset from '@/app/components/SelectAsset';
import { useFilters } from '@/app/hooks/useFilters';

// Filter state lives in the URL (nuqs); mock the hook (factory avoids loading nuqs).
jest.mock('../hooks/useFilters', () => ({ useFilters: jest.fn() }));

describe('SelectAsset', () => {
    const initialAvailableAssets = ['Mcknight, Beasley and Stewart', 'Acevedo-Kennedy', 'Ware PLC'];
    const mockSetAsset = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
        useFilters.mockReturnValue({ asset: '', setAsset: mockSetAsset });
    });

    test('renders all available assets', () => {
        render(<SelectAsset initialAvailableAssets={initialAvailableAssets} />);
        expect(screen.getByText('All Assets')).toBeInTheDocument();
        initialAvailableAssets.forEach((asset) => {
            expect(screen.getByText(asset)).toBeInTheDocument();
        });
    });

    test('calls setAsset when the selection changes', () => {
        render(<SelectAsset initialAvailableAssets={initialAvailableAssets} />);
        fireEvent.change(screen.getByTestId('selectAsset'), { target: { value: 'Acevedo-Kennedy' } });
        expect(mockSetAsset).toHaveBeenCalledWith('Acevedo-Kennedy');
    });
});
