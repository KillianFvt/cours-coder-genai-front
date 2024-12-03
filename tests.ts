import { getCurrentCart } from './src/services/getCurrentCart';
import { API_URL } from './src/constants';
import 'jest';

global.fetch = jest.fn();

describe('getCurrentCart', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('returns cart data with total items when response is successful', async () => {
        const mockResponse = {
            ok: true,
            json: jest.fn().mockResolvedValue({
                items: [
                    { quantity: 4 },
                    { quantity: 5 }
                ]
            })
        };
        (fetch as jest.Mock).mockResolvedValue(mockResponse);

        const data = await getCurrentCart();

        expect(data.totalItems).toBe(9);
        expect(fetch).toHaveBeenCalledWith(`${API_URL}/shopping/carts/current/`, {
            method: 'GET',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        });
    });

    it('throws an error when response is not ok', async () => {
        const mockResponse = {
            ok: false,
            status: 404
        };
        (fetch as jest.Mock).mockResolvedValue(mockResponse);

        await expect(getCurrentCart()).rejects.toThrow('HTTP error! status: 404');
    });

    it('returns cart data with total items as 0 when cart is empty', async () => {
        const mockResponse = {
            ok: true,
            json: jest.fn().mockResolvedValue({
                items: []
            })
        };
        (fetch as jest.Mock).mockResolvedValue(mockResponse);

        const data = await getCurrentCart();

        expect(data.totalItems).toBe(0);
    });
});