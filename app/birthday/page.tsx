"use client";
import { useEffect, useRef } from "react";
import party from "party-js";

const wait = (time: number) =>
  new Promise((resolve) => setTimeout(resolve, time));

export default function Birthday() {
  const span1 = useRef<null | HTMLSpanElement>(null);
  const span2 = useRef<null | HTMLSpanElement>(null);

  useEffect(() => {
    // document.addEventListener("DOMContentLoaded", haveParty);
    haveParty();
  }, []);

  // const myFont = localFont({ src: "./(fonts)/ScholarlyAmbition-Regular.ttf" });
  // font kar nemikone

  const haveParty = async () => {
    for (let i = 0; i < 5; i++) {
      span1.current?.click();
      span2.current?.click();
      await wait(1000);
    }
  };

  const partyfunction = (target: EventTarget) => {
    const element = target as HTMLSpanElement;
    party.confetti(element, {
      count: party.variation.range(20, 40),
    });
  };

  return (
    <section
      id="div1"
      className="flex flex-col w-full justify-center items-center mt-[100px] bg-black m-0 p-0 box-border"
    >
      <span onClick={(e) => partyfunction(e.target)} ref={span1}></span>
      {/* <p className="text-3xl font-bold back sm:text-4xl md:text-5xl lg:text-[50px] xl:text-[53px]">Happy Programmer&apos;s Day :)</p> */}
      <p className="text-3xl font-bold back sm:text-4xl md:text-5xl lg:text-[50px] xl:text-[53px] bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-transparent bg-clip-text">
        Happy Programmer&apos;s Day :)
      </p>
      <span onClick={(e) => partyfunction(e.target)} ref={span2}></span>
    </section>
  );
}
