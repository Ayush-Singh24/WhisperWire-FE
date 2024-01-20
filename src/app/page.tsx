"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Variants, motion } from "framer-motion";

const gojoAnimation: Variants = {
  initial: {
    opacity: 0,
    scale: 0,
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1.5,
    },
  },
};

const container: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      delayChildren: 1.5,
      staggerChildren: 0.5,
    },
  },
};

const item: Variants = {
  initial: {
    opacity: 0,
    y: 50,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      duration: 2,
    },
  },
};

export default function Home() {
  return (
    <section className="h-full bg-gradient-home text-primary-text flex justify-center items-center max-w-[1550px]">
      <div className="h-full relative flex justify-center items-center">
        <motion.div
          variants={gojoAnimation}
          initial="initial"
          animate="animate"
        >
          <Image
            src="/images/gojo.png"
            height={400}
            width={500}
            alt="Gojo"
            className=""
            priority={true}
          />
        </motion.div>
        <motion.div
          variants={container}
          initial="initial"
          animate="animate"
          className="absolute top-O h-full flex flex-col items-center justify-evenly"
        >
          <div className="invisible"></div>
          <motion.span
            variants={item}
            className="tracking-[0.25rem] text-center text-5xl font-extrabold bg-gradient-text bg-clip-text text-transparent sm:text-6xl sm:tracking-[0.5rem] md:text-8xl  md:tracking-[1rem]"
          >
            WhisperWire
          </motion.span>
          <motion.div variants={item} className="flex gap-5 sm:gap-7 md:gap-10">
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
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
