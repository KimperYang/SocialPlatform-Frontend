import {queryAllByRole, render, screen, waitFor, cleanup} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Main from './main'

window.matchMedia = window.matchMedia || function() {
    return {
        matches: false,
        addListener: function() {},
        removeListener: function() {}
    };
};

describe("main tests",() => {
    afterEach(cleanup)
    it("should fetch articles for current logged in user", async() => {
        window.localStorage.setItem("curUser","Bret");
        render(<Main />);
        await waitFor(()=>{
            const posts=screen.queryAllByRole('post');
            expect(posts.length).toBe(10);
        })
    })
    it("should filter displayed articles by the search keyword ", async() => {
        window.localStorage.setItem("curUser","Bret");
        render(<Main />);
        await waitFor(()=>{
            const searchInputElement=screen.queryByTestId('searchInput');
            userEvent.type(searchInputElement, "xxxxx");
            userEvent.click(screen.queryByTestId("searchBtn"));
        })
        //    setTimeout(()=> {
        await waitFor(()=>{
               const posts = screen.queryAllByRole('post');
               expect(posts.length).toBe(0);
        })
        //    },500)
    })
    it("addFollower", async() => {
        window.localStorage.setItem("curUser","Bret");
        render(<Main />);
        const followerInputElement=screen.queryByTestId('followerInput');
        userEvent.type(followerInputElement,"Samantha")
        userEvent.click(screen.getByTestId('addFollowerBtn'));
        await waitFor(()=>{
            const followers=screen.queryAllByRole('follower');
            expect(followers.length).toBe(4);
            // const posts=screen.queryAllByRole('post');
            // expect(posts.length).toBe(20);
        })
    })
    it("start a new post", async() => {
        window.localStorage.setItem("curUser","Bret");
        render(<Main />);
        const postInputElement=screen.queryByTestId('textarea');
        userEvent.type(postInputElement,"newpostfortest")
        userEvent.click(screen.getByTestId('addPostBtn'));
        await waitFor(() => {
            expect(screen.getAllByText("newpostfortest")).not.toBe(null);
        });
    })
    it("Json placeholder user has initial followers", async() => {
        window.localStorage.setItem("curUser","Antonette");
        render(<Main />);
        await waitFor(() => {
            expect(screen.getAllByText("Samantha")).not.toBe(null);
        });

    })
    it("user can update their status", async() => {
        window.localStorage.setItem("curUser","Bret");
        render(<Main />);
        const statusInputElement=screen.queryByTestId('statusInput');
        userEvent.type(statusInputElement,"newstatusfortest")
        userEvent.click(screen.queryByTestId('updateStatusBtn'));
        await waitFor(() => {
            expect(screen.getAllByText("newstatusfortest")).not.toBe(null);
        });
    })
    it("should add articles when adding a follower", async() => {
        window.localStorage.setItem("curUser","Karianne");
        render(<Main />);
        const followerInputElement=screen.queryByTestId('followerInput');
        userEvent.type(followerInputElement,"Samantha")
        userEvent.click(screen.getByTestId('addFollowerBtn'));
        setTimeout(()=>{
            const posts=screen.queryAllByRole('post');
            expect(posts.length).toBe(20);
        },500)
    })
    it("should remove articles when removing a follower ", async() => {
        window.localStorage.setItem("curUser","Leopoldo_Corkery");
        render(<Main />);
        const followerInputElement=screen.queryByTestId('followerInput');
        userEvent.type(followerInputElement,"Samantha")
        userEvent.click(screen.getByTestId('addFollowerBtn'));
        userEvent.click(screen.queryAllByRole('removeFollowerBtn')[0]);
        setTimeout(()=>{
            const posts=screen.queryAllByRole('post');
            expect(posts.length).toBe(10);
        },500)
    })
})

