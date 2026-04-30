import { renderHook, act, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import useFetch from './useFetch';

describe('useFetch', () => {
    const originalFetch = global.fetch;
    let consoleErrorSpy: jest.SpyInstance;

    beforeEach(() => {
        consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
        global.fetch = originalFetch;
        consoleErrorSpy.mockRestore();
        jest.clearAllMocks();
    });

    test('starts with no errorMessage', () => {
        const { result } = renderHook(() => useFetch());
        expect(result.current.errorMessage).toBeNull();
    });

    test('passes parsed JSON to the callback on a successful response', async () => {
        const payload = { hello: 'world' };
        global.fetch = jest.fn().mockResolvedValue({
            ok: true,
            json: jest.fn().mockResolvedValue(payload),
        }) as jest.Mock;

        const callback = jest.fn();
        const { result } = renderHook(() => useFetch());

        await act(async () => {
            await result.current.fetchData('/api/test', callback);
        });

        expect(global.fetch).toHaveBeenCalledWith('/api/test');
        expect(callback).toHaveBeenCalledWith(payload);
        expect(result.current.errorMessage).toBeNull();
    });

    test('does not throw when no callback is supplied', async () => {
        global.fetch = jest.fn().mockResolvedValue({
            ok: true,
            json: jest.fn().mockResolvedValue({}),
        }) as jest.Mock;

        const { result } = renderHook(() => useFetch());

        await act(async () => {
            await result.current.fetchData('/api/test');
        });

        expect(result.current.errorMessage).toBeNull();
    });

    test('sets errorMessage when the response is not ok', async () => {
        global.fetch = jest.fn().mockResolvedValue({
            ok: false,
            json: jest.fn().mockResolvedValue({ error: 'bad request' }),
        }) as jest.Mock;

        const callback = jest.fn();
        const { result } = renderHook(() => useFetch());

        await act(async () => {
            await result.current.fetchData('/api/test', callback);
        });

        await waitFor(() => {
            expect(result.current.errorMessage).toBe('Something went wrong. Please try again.');
        });
        expect(callback).not.toHaveBeenCalled();
    });

    test('sets errorMessage when fetch rejects', async () => {
        global.fetch = jest.fn().mockRejectedValue(new Error('network down')) as jest.Mock;

        const callback = jest.fn();
        const { result } = renderHook(() => useFetch());

        await act(async () => {
            await result.current.fetchData('/api/test', callback);
        });

        await waitFor(() => {
            expect(result.current.errorMessage).toBe('Something went wrong. Please try again.');
        });
        expect(callback).not.toHaveBeenCalled();
    });

    test('clears a previous errorMessage on a new successful call', async () => {
        global.fetch = jest.fn().mockRejectedValueOnce(new Error('boom')).mockResolvedValueOnce({
            ok: true,
            json: jest.fn().mockResolvedValue({ ok: 1 }),
        }) as jest.Mock;

        const { result } = renderHook(() => useFetch());

        await act(async () => {
            await result.current.fetchData('/api/test');
        });
        await waitFor(() => {
            expect(result.current.errorMessage).toBe('Something went wrong. Please try again.');
        });

        await act(async () => {
            await result.current.fetchData('/api/test');
        });
        await waitFor(() => {
            expect(result.current.errorMessage).toBeNull();
        });
    });
});
