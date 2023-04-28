import Image from "next/image";
import Link from "next/link";

function Header() {
  return (
    <header className="flex p-5 justify-between sticky top-0 z-50 bg-white shadow-md">
      {/*left div*/}
      <div className="flex space-x-2 items-center">
        <Image
          alt="logo"
          src="https://www.shutterstock.com/image-vector/chatbot-icon-bot-sign-design-260nw-1083788342.jpg"
          height={30}
          width={30}
        />
        <div>
          <h1 className="font-bold">
            The Dalle 2.0 powered <span className="text-violet-500">AI </span>
            Image Generator.
          </h1>
          <h2 className="text-xs">
            Powered by Dalle 2.0, Chat GPT and Microsoft Azure
          </h2>
        </div>
        {/*right div*/}
      </div>
      <div className="flex text-xs md:text-base divide-x items-center text-gray-500">
        <Link href="https://github.com/gsinghg19" className="px-2 font-light">
          My github profile
        </Link>
        <Link
          href="https://github.com/gsinghg19/Dalle_project"
          className="px-2 font-light"
        >
          This Project&apos;s Repo
        </Link>
      </div>
    </header>
  );
}

export default Header;
