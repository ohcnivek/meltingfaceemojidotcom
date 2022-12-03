import clsx from "clsx";
import Head from "next/head";
import { useState } from "react";

interface EmojiCardProps {
  emoji: React.ReactNode;
  copyContent: string;
}

const EmojiCard = ({ emoji, copyContent }: EmojiCardProps) => {
  const [copied, setCopied] = useState<boolean>(false);

  const unicodeToChar = (text: string) => {
    return text.replace(/\\u[\dA-F]{4}/gi, (match: string) => {
      return String.fromCharCode(parseInt(match.replace(/\\u/g, ""), 16));
    });
  };

  return (
    <button
      className="min-w-md w-full md:w-1/2 p-6 bg-white border border-gray-200 rounded-lg shadow-md hover:bg-gray-100 shadow-lg shadow-green-700/50"
      onClick={(e) => {
        //prevent default call to /
        e.preventDefault();
        setCopied(true);
        navigator.clipboard.writeText(unicodeToChar(copyContent));
      }}
    >
      <div className="flex flex-col items-center justify-center pb-12">
        <div>{emoji}</div>
        <p
          className={clsx(
            "flex font-extrabold text-xl md:text-5xl",
            copied && "text-green-400",
            !copied && "text-blue-400"
          )}
        >
          {copied ? "Copied ✅" : "Copy"}
        </p>
      </div>
    </button>
  );
};

export default function Home() {
  return (
    <div className="p-12 min-h-screen">
      <Head>
        <title> Copy/ Paste Melting Face Emojis</title>
        <meta
          name="description"
          content="Copy / paste the melting face emoji"
        />
        <meta name="robots" content="index, follow" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="md:flex">
        <div className="flex">
          <div className="flex flex-col font-extrabold text-transparent bg-clip-text bg-gradient-to-tl from-green-400 to-blue-500 text-5xl md:text-8xl lg:text-9xl">
            <p>Melting</p>
            <p>Face</p>
            <p>Emoji</p>
            <p>.com</p>
          </div>
        </div>
        <div className="flex flex-col items-center md:items-stretch md:flex-row grow p-12 space-y-4 md:space-y-0 md:space-x-12">
          <EmojiCard
            emoji={
              <div className="flex w-40 text-6xl md:text-7xl justify-center">
                🫠
              </div>
            }
            copyContent="🫠"
          ></EmojiCard>
        </div>
      </div>
      <footer className="font-semibold text-gray-500">
        more epic emojis coming soon ⚠️
      </footer>
    </div>
  );
}
