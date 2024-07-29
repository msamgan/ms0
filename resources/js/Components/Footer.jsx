export default function Footer() {
    return (
        <footer className="px-4 divide-y bg-gray-100 text-gray-800">
            <p className={"py-2 text-lg text-center text-gray-600"}>
                Show some love by starting a project on{" "}
                <a className={"text-sky-600"} href={"https://github.com/msamgan/ms0"}>
                    GitHub
                </a>
            </p>
            <div className="py-2 text-lg text-center text-gray-600">
                © {new Date().getFullYear()}. All rights reserved. Made with ❤️ by{" "}
                <a className={"text-sky-600"} href={"https://msamgan.com"}>
                    {" "}
                    msamgan
                </a>
            </div>
        </footer>
    )
}
