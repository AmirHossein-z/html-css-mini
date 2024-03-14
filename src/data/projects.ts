interface IProject {
    href: string;
    title: string;
    description: string;
}

export const projects: IProject[] = [
    {
        title: "Birthday",
        description: "happy birthday to your programmer friend! 😍",
        href: "/birthday",
    },
    { title: "Caesar-cipher", description: "", href: "/caesar-cipher" },
    {
        title: "Card",
        description: "a collection of cards with diffrent animations",
        href: "/card",
    },
    {
        title: "Form validation quera",
        description: "",
        href: "/form-validation-quera",
    },
    { title: "List person", description: "", href: "/list-person" },
    { title: "Register login", description: "", href: "/register-login" },
    {
        title: "Select courses university",
        description: "",
        href: "/select-courses-uni",
    },
    { title: "Song wave", description: "", href: "/song-wave" },
];
