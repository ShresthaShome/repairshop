import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-black bg-home-bg bg-cover bg-center">
      <main
        className="flex flex-col justify-center text-center
      max-w-5xl mx-auto h-dvh"
      >
        <div
          className="flex flex-col gap-6 p-12 rounded-xl bg-black/90 w-4/5
         sm:max-w-96 mx-auto text-white sm:text-2xl"
        >
          <h1 className="text-4xl font-bold">
            Ullas&apos;s Computer
            <br />
            Repair Shop
          </h1>
          <address>
            Thana Para <br />
            Tangail, Bangladesh.
          </address>
          <p>Open: 10 A.M. to 8 P.M. (Daily)</p>
          <Link href="tel:+8801518946109" className="hover:underline">
            +8801518946109
          </Link>
        </div>
      </main>
    </div>
  );
}
