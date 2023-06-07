import React, { useState } from "react";
import Slideshow from "../components/Slideshow";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const FrontPage = ({ user }) => {
  const navigate = useNavigate();

  const [transitionOut, setTransitionOut] = useState(false);
  const [logoSpin, setLogoSpin] = useState(false);

  const handleRedirect = () => {
    setTransitionOut(true);

    // navigate to /discover after transition completes
    setTimeout(() => {
      navigate("/discover");
    }, 750); // 500ms matches transition duration
  };

  const pageTransition = {
    initial: {
      opacity: 0,
      x: "-1vw",
      transition: { type: "tween", ease: "easeInOut", duration: 1 },
    },
    in: {
      opacity: 1,
      x: 0,
    },
    out: {
      opacity: 0,
      x: "-10vw",
      transition: { duration: 1 }, // Shorter exit animation
    },
  };

  return (
    <AnimatePresence>
      {!transitionOut && (
        <motion.section
          className="flex flex-col"
          initial="initial"
          animate="in"
          exit="out"
          variants={pageTransition}
          transition="transition"
        >
          <section className="flex flex-col text-[whitesmoke]">
            <div className="md:flex h-full">
              <div className="flex-grow flex flex-col w-[400px] items-center text-center justify-center bg-gradient-to-br from-black to-[#921286] shadow-md mx-auto md:h-auto py-4">
                <motion.img
                  src="./logo/logo.png"
                  className="h-20 mx-auto md:mt-5 mb-5"
                  animate={{
                    scale: [1, 1, 0, 1, 1],
                    rotate: [0, 0, 200, 200, 0],
                    borderRadius: ["20%", "20%", "50%", "50%", "20%"],
                  }}
                  transition={{ duration: 1.33 }}
                />
                <p className="text-3xl font-bold ">Discover Your Vibe</p>
                <p className="leading-5 px-5 m-5 italic">
                  Where your favorite artists, songs and playlists reside
                </p>
                <a>
                  <button
                    className="bg-black text-white text-[18px] tracking-wide font-semibold h-[56px] w-[370px] rounded-lg"
                    onClick={handleRedirect}
                  >
                    Enter
                  </button>
                </a>
              </div>
              <Slideshow className="hidden-md" />
            </div>
          </section>
        </motion.section>
      )}
    </AnimatePresence>
  );
};

export default FrontPage;
