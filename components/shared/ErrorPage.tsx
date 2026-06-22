"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const ErrorPage = () => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="h-screen flex flex-col items-center justify-center gap-10 bg- "
      >
        <span className="text-3xl font-bold tracking-tighter uppercase">
          Evoria.
        </span>

        <div className="flex justify-center flex-col items-center space-y-4  ">
          <h2 className="font-bold text-accent text-3xl font-serif">
            Hello Explorer!
          </h2>
          <p className="text-center ">
            This page does not exist on Evoria&apos;s Universe. <br /> It might
            have been moved, deleted, or you may have entered an incorrect URL.{" "}
            <br /> Don&apos;t worry, you can always head back to the homepage
            and continue your adventure!
          </p>

          <Button
            onClick={() => window.history.back()}
            size="lg"
            className=" text-white gap-[16px] text-[16px] group-hover:translate-x-1 border py-[16px] font-medium   transition-all duration-300 ease-in-out rounded-none cursor-pointer"
          >
            Take me back
          </Button>
        </div>
      </motion.div>
    </>
  );
};

export default ErrorPage;
