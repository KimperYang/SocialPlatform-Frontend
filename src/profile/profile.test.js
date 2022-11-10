import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Profile from './profile'

window.matchMedia = window.matchMedia || function() {
    return {
        matches: false,
        addListener: function() {},
        removeListener: function() {}
    };
};

describe("profile tests",() => {
    it ("should fetch the user's profile username and user can update information in profile", async() => {
        window.localStorage.setItem("curUser","Bret");
        window.localStorage.setItem("curUser","Bret");
        render(<Profile />)
        const userNameInputElement = screen.queryByTestId('usernameInput');
        const emailInputElement = screen.queryByTestId('emailInput');
        const zipInputElement = screen.queryByTestId('zipInput');
        const telInputElement = screen.queryByTestId('telInput');
        const passwordInputElement = screen.queryByTestId('pwdInput');
        userEvent.type(userNameInputElement, "Jingbo");
        userEvent.type(emailInputElement, "jy107@rice.edu");
        userEvent.type(zipInputElement, "77005");
        userEvent.type(telInputElement, "567-567-5678");
        userEvent.type(passwordInputElement, "helloworld");
        userEvent.click(screen.queryByTestId("updateBtn"));
        await waitFor(()=>{
            expect(screen.getAllByText("Jingbo")).not.toBe(null);
            expect(screen.getAllByText("jy107@rice.edu")).not.toBe(null);
            expect(screen.getAllByText("77005")).not.toBe(null);
            expect(screen.getAllByText("567-567-5678")).not.toBe(null);
            expect(screen.getAllByText("helloworld")).not.toBe(null);
        })
    })
})

