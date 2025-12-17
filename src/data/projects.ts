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
  { title: "Caesar-cipher", description: "Encrypt/decrypt your desired text with classic cryptography 👨‍💻", href: "/caesar-cipher" },
  {
    title: "Card",
    description: "a collection of cards with diffrent animations 🗂️",
    href: "/card",
  },
  {
    title: "Form validation quera",
    description: "",
    href: "/form-validation-quera",
  },
  { title: "List person", description: "Create list of person with search/filter features 📋", href: "/list-person" },
  { title: "Register login", description: "", href: "/register-login" },
  {
    title: "Select courses university",
    description: "Easily do your next course registration in university 👨‍🎓",
    href: "/select-courses-uni",
  },
  { title: "Song wave", description: "See song UIs 🎵", href: "/song-wave" },
];
