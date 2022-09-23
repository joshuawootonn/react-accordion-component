import { AnimatePresence, motion } from "framer-motion";
import { Faq, content } from "lib/types";
import { useState } from "react";
import { Less, More } from "./icons";

const Toggle = (props: Faq) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <button
      className="flex flex-col text-left w-full bg-light p-3 rounded-lg"
      onClick={() => setIsOpen((prev) => !prev)}
    >
      <div className="flex justify-between items-center w-full">
        <div className="text-2xl font-semibold">{props.title}</div>
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={isOpen ? "minus" : "plus"}
            initial={{
              rotate: isOpen ? -90 : 90,
            }}
            animate={{
              zIndex: 1,
              rotate: 0,
              transition: {
                type: "tween",
                duration: 0.15,
                ease: "circOut",
              },
            }}
            exit={{
              zIndex: 0,
              rotate: isOpen ? -90 : 90,
              transition: {
                type: "tween",
                duration: 0.15,
                ease: "circIn",
              },
            }}
          >
            {isOpen ? <Less /> : <More />}
          </motion.div>
        </AnimatePresence>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={{
              initial: {
                height: "0px",
                opacity: 0,
              },
              animate: {
                height: ["auto", "auto"],
                opacity: [0, 1],
              },
              exit: {
                height: ["auto", "0px"],
                opacity: [0, 0],
              },
            }}
            initial="initial"
            animate="animate"
            exit="exit"
            key="test"
            className="text-lg font-light"
          >
            {props.description}
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
};

export const AnimatedWithKeyframes = () => {
  return (
    <div className="flex flex-col w-[400px] justify-center items-center space-y-7">
      {content.map((c, i) => (
        <Toggle key={i} {...c} />
      ))}
    </div>
  );
};
