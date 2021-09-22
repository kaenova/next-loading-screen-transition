import React from 'react'
import BounceLoader from 'react-spinners/BounceLoader'
import { motion } from 'framer-motion'


const config = {
  tailwindClass: "fixed w-screen h-screen bg-gray-400 z-40 flex justify-center items-center",

  motion: {
    motionVariantsOut: {
      initial : {
        y: 0
      },
      animate: {
        y: "-100vh"
      },
      transition: {
        duration: 0.3
      }
    },

    motionVariantsIn: {
      initial : {
        y: "-100vh"
      },
      animate: {
        y: 0
      },
      transition: {
        duration: 0.3
      }
    },
  }
}


function PageTransition(props) {

  return (
    <motion.div className={config.tailwindClass}
        initial="initial"
        animate="animate"
        transition="transition"
        variants={!props.load ? config.motion.motionVariantsOut: config.motion.motionVariantsIn}
      >
        <BounceLoader />
    </motion.div>
  )
}

export default PageTransition
