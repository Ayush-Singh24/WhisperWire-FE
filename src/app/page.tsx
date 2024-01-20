import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <section className="h-full bg-gradient-home text-primary-text flex justify-center items-center max-w-[1550px]">
      <div className="h-full relative flex justify-center items-center">
        <Image
          src="/images/gojo.png"
          height={400}
          width={500}
          alt="Gojo"
          className=""
        />
        <span className="tracking-[0.5rem] text-center text-5xl font-bold bg-gradient-text bg-clip-text text-transparent absolute top-[calc(55%-3rem)]">
          WhisperWire
        </span>
      </div>
    </section>
  );
}
