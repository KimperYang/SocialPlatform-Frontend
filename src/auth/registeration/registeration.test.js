import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Registeration from './registeration'
import  {BrowserRouter} from 'react-router-dom';

window.matchMedia = window.matchMedia || function() {
    return {
        matches: false,
        addListener: function() {},
        removeListener: function() {}
    };
};

describe("registration tests",() => {
    it ("should login in and store status in local storage", async() => {
        render(
            <BrowserRouter>
                <Registeration />
            </BrowserRouter>)
        const userNameInputElement = screen.queryByTestId('usernameInput');
        const displayNameInputElement = screen.queryByTestId('displayInput');
        const emailInputElement = screen.queryByTestId('emailInput');
        const bdayInputElement = screen.queryByTestId('bdayInput');
        const zipInputElement = screen.queryByTestId('zipInput');
        const telInputElement = screen.queryByTestId('telInput');
        const passwordInputElement = screen.queryByTestId('pwdInput');
        const passwordConInputElement = screen.queryByTestId('pwdConInput');
        userEvent.type(userNameInputElement, "Jingbo");
        userEvent.type(displayNameInputElement, "Jingbo");
        userEvent.type(emailInputElement, "jy107@rice.edu");
        userEvent.type(bdayInputElement, "20000507");
        userEvent.type(zipInputElement, "77005");
        userEvent.type(telInputElement, "123-123-1234");
        userEvent.type(passwordInputElement, "Kulas Light");
        userEvent.type(passwordConInputElement, "Kulas Light");
        userEvent.click(screen.queryByTestId("regBtn"));
        await waitFor(()=>{
            const username = window.localStorage.getItem('curUser');
            const userlist = window.localStorage.getItem("userlists")
            // expect(username).not.toBe(null);
            expect(username).toBe("Jingbo");
            expect(userlist).toBe("Jingbo");
        })
    })
    // it ("should login in and store status in local storage", async() => {
    //     window.localStorage.setItem("userList","Jingbo,Mack");
    //     render(<Registeration />)
    //     const userNameInputElement = screen.queryByTestId('usernameInput');
    //     const displayNameInputElement = screen.queryByTestId('displayInput');
    //     const emailInputElement = screen.queryByTestId('emailInput');
    //     const bdayInputElement = screen.queryByTestId('bdayInput');
    //     const zipInputElement = screen.queryByTestId('zipInput');
    //     const telInputElement = screen.queryByTestId('telInput');
    //     const passwordInputElement = screen.queryByTestId('pwdInput');
    //     const passwordConInputElement = screen.queryByTestId('pwdConInput');
    //     userEvent.type(userNameInputElement, "Jingbo");
    //     userEvent.type(displayNameInputElement, "Jingbo");
    //     userEvent.type(emailInputElement, "jy107@rice.edu");
    //     userEvent.type(bdayInputElement, "20000507");
    //     userEvent.type(zipInputElement, "77005");
    //     userEvent.type(telInputElement, "123-123-1234");
    //     userEvent.type(passwordInputElement, "Kulas Light");
    //     userEvent.type(passwordConInputElement, "Kulas Light");
    //     userEvent.click(screen.queryByTestId("regBtn"));
    //     await waitFor(()=>{
    //         const username = window.localStorage.getItem('curUser');
    //         expect(username).toBe(null);
    //     })
    // })
})

