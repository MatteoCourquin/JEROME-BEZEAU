import Image from 'next/image';

export default function Home() {
  return (
    <>
      <section className="relative flex h-screen flex-col items-center justify-center">
        <Image
          src="/images/JB.jpeg"
          width={1920}
          height={1080}
          alt=""
          className="absolute inset-0  h-screen w-screen -z-[1] object-cover"
        />
        <h1>JÉRÔME BEZEAU</h1>
        <p className="subtitle">Art Director & Digital designer</p>
      </section>
      <section className="relative flex h-screen flex-col items-center justify-center">
        <Image
          src="/images/JB.jpeg"
          width={1920}
          height={1080}
          alt=""
          className="absolute inset-0 -z-10 h-screen w-screen"
        />
        <h1>JÉRÔME BEZEAU</h1>
        <p className="subtitle">Art Director & Digital designer</p>
      </section>
    </>
  );
}
