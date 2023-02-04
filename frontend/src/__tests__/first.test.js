import { render, screen, act, fireEvent, getByText, getByRole } from '@testing-library/react';
import React from 'react';
import LogIn, { onPost } from '../login';
import mockAxios from '../__mocks__/axios';

afterEach(() => {
    mockAxios.reset();
})

describe("login form on submit", () => {
    test("login form's inputs should accept text", () => {
        // const initialErrorMessages = 'Error Initial';
        // React.useState = jest.fn().mockReturnValue([initialErrorMessages, {}])
        const { container } = render(<LogIn/>);
        
        const usernameInputNode = container.querySelector(`input[name="uname"]`);
        const passwordInputNode = container.querySelector(`input[name="pass"]`);

        expect(usernameInputNode.value).toMatch("");
        fireEvent.change(usernameInputNode, {target: {value: 'test'}});
        expect(usernameInputNode.value).toMatch("test");

        expect(passwordInputNode.value).toMatch("");
        fireEvent.change(passwordInputNode, {target: {value: 'test'}});
        expect(passwordInputNode.value).toMatch("test");
    });

    test("should be able to submit form", () => {
        const { getByRole } = render(<LogIn />);
        const buttonNode = getByRole("button");
        fireEvent.submit(buttonNode);
    });
});
