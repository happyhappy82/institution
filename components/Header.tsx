import Image from "next/image";

export default function Header() {
  return (
    <header className="mb-14 flex flex-row place-content-between">
      <a href="/" className="flex items-center gap-3">
        <Image
          src="/logo.png"
          alt="정부지원금 알리미 로고"
          width={40}
          height={40}
          className="w-10 h-10"
        />
        <h1 className="text-2xl font-black text-blue-600">정부지원금 알리미</h1>
      </a>
    </header>
  );
}
