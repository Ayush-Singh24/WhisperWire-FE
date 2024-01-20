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
        <div className="absolute top-O h-full flex flex-col items-center justify-evenly">
          <div className="invisible"></div>
          <span className="tracking-[0.25rem] text-center text-5xl font-extrabold bg-gradient-text bg-clip-text text-transparent sm:text-6xl sm:tracking-[0.5rem] md:text-8xl  md:tracking-[1rem]">
            WhisperWire
          </span>
          <div className="flex gap-5">
            <Button
              className="text-xl tracking-widest font-bold px-5"
              size={"lg"}
            >
              Login
            </Button>
            <Button
              className="text-xl tracking-widest font-bold px-5"
              size={"lg"}
            >
              SignUp
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
