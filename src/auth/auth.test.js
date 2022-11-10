import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Router from "../router";
import  {BrowserRouter} from 'react-router-dom';
import Auth from './auth'

window.matchMedia = window.matchMedia || function() {
    return {
        matches: false,
        addListener: function() {},
        removeListener: function() {}
    };
};

describe("auth tests",() => {
    it("should logout a user", () => {
        render(

                <Auth />
            )
        const username = localStorage.getItem('curUser')
        expect(username).toBe(null)
    })
    it ("should login in a user and store status in local storage", async() => {
        render(

                <Auth />
            )
        const inputUsername = "Bret"
        const userNameInputElement = screen.queryByTestId('Username');
        const passwordInputElement = screen.queryByTestId('Password');
        userEvent.type(userNameInputElement, inputUsername);
        userEvent.type(passwordInputElement, "Kulas Light");
        userEvent.click(screen.queryByTestId("LoginBtn"));
        await waitFor(()=>{
            const username = window.localStorage.getItem('curUser');
            // expect(username).not.toBe(null);
            expect(username).toBe(inputUsername);
        })
    })
    it ("should not log in a invalid user", async() => {
        render(

                <Auth />
            )
        const inputUsername = "Bret"
        const userNameInputElement = screen.queryByTestId('Username');
        const passwordInputElement = screen.queryByTestId('Password');
        userEvent.type(userNameInputElement, inputUsername);
        userEvent.type(passwordInputElement, "WrongPassword");
        userEvent.click(screen.queryByTestId("LoginBtn"));
        await waitFor(()=>{
            const username = window.localStorage.getItem('curUser');
            expect(username).toBe(null);
        })
    })
})

