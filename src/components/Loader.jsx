import { motion } from "framer-motion";
import { nrLogo } from "../assets/images/nrLogo";

const Loader = ({ title }) => (
  <div className="w-full flex justify-center items-center flex-col">
    <motion.img
      src={nrLogo}
      className="h-20 mx-auto mb-5"
      animate={{
        scale: [1, 1, 0, 0.5, 1],
        rotate: [0, 0, 200, 200, 0],
        borderRadius: ["20%", "20%", "50%", "50%", "20%"],
      }}
      transition={{ duration: 1.33 }}
    />
    <h1 className="font-bold text-2xl text-white m-2">
      {title || "Welcome..."}
    </h1>
  </div>
);

export default Loader;
