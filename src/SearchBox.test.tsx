import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchBox from './SearchBox';

describe('SearchBox:', () => {
    test('input change', () => {
        const mockOnSearchHanlder = jest.fn();
        render(<SearchBox onSearchHanlder={mockOnSearchHanlder} />);
        const inputEl = screen.getByPlaceholderText('Type to search');

        expect(inputEl).toBeInTheDocument();
        expect(inputEl).toHaveValue('');

        fireEvent.change(inputEl, { target: { value: 'Pilot' } });
        expect(inputEl).toHaveValue('Pilot');
        expect(mockOnSearchHanlder).toHaveBeenCalledWith('Pilot');
    });
    test('keyboard change', async () => {
        const mockOnSearchHanlder = jest.fn();
        render(<SearchBox onSearchHanlder={mockOnSearchHanlder} />);
        const inputEl = screen.getByPlaceholderText('Type to search');

        await userEvent.type(inputEl, 'Pilot');
        expect(mockOnSearchHanlder).toHaveBeenCalledTimes(5);
        expect(mockOnSearchHanlder).toHaveBeenNthCalledWith(1, 'P');
        expect(mockOnSearchHanlder).toHaveBeenNthCalledWith(2, 'Pi');
        expect(mockOnSearchHanlder).toHaveBeenNthCalledWith(3, 'Pil');
        expect(mockOnSearchHanlder).toHaveBeenNthCalledWith(4, 'Pilo');
        expect(mockOnSearchHanlder).toHaveBeenNthCalledWith(5, 'Pilot');
    })
})