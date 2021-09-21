import 'tailwindcss/tailwind.css'
import React, { useState } from 'react'
import Router from 'next/router'
import BounceLoader from 'react-spinners/BounceLoader'
import { motion, AnimatePresence } from 'framer-motion'

function Loading(props) {

  return (!props.load ?
    <>

      <motion.div className="fixed w-screen h-screen bg-red-500 z-50 flex justify-center items-center"
        initial={{ y: 0 }}
        animate={{ y: "-100vh" }}
        transition={{ duration: 0.3 }}
      >
        <BounceLoader />
      </motion.div>
    </>

    :

    <motion.div className="fixed w-screen h-screen bg-red-500 z-50 flex justify-center items-center"
      initial={{ y: "-100vh" }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >

      <BounceLoader />

    </motion.div>
  )

}


function MyApp({ Component, pageProps }) {


  var [loading, setLoading] = useState(false)


  Router.events.on('routeChangeStart', () => {
    setLoading(true)
  })

  Router.events.on('routeChangeComplete', () => {
    setTimeout(() => { setLoading(false) }, 2000)
  })


  return (
    <>
      <Loading load={loading} />
      <AnimatePresence exitBeforeEnter>
      {
        !loading &&
          <motion.div
            initial={{
              scale: 0.3
            }}
            animate={{
              scale:1
            }}
            exit={{
              scale: 0.3
            }}
            transition={{easings: "linear"}}
          >
            <Component {...pageProps} />
          </motion.div> 
      }
      </AnimatePresence>



    </>


  )
}

export default MyApp



{/* {
        loading ?
          <motion.div
            className="z-0"
            initial={{
              opacity: 1,
              scale: 1
            }}
            animate={{
              opacity: 0,
              scale: 0.3
            }}
            transition={{
              duration: 0.1,
            }}
          >
            <Component {...pageProps} />
          </motion.div>

          :

          <motion.div className="z-0"
            initial={{
              opacity:0,
              scale: 0.3
            }}
            animate={{
              opacity: 1,
              scale: 1
            }}
            transition={{
              duration:0.1,
              delay:0.05
            }}
          >
            <Component {...pageProps} />
          </motion.div>

      } */}



    // <>
    // <Loading load={loading}/>

    // {loading ? 
    // <motion.div className="fixed w-screen h-screen" 
    // initial={{y: 0, opacity: 1, scale: 1}}
    // animate={{y: "100vh", opacity:0, scale: 0, backgroundColor: "white"}}
    // transition={{duration: 0.3}}
    // >
    //   {
    //    afterLoad && <Component {...pageProps} /> 
    //   }
    // </motion.div>
    // :
    // <motion.div className="fixed w-screen h-screen" 
    // initial={{y: "100vh", opacity:0, scale: 0}}
    // animate={{y: 0, opacity: 1, scale: 1}}
    // transition={{duration: 0.3}}
    // >
    //   {
    //     afterLoad ? <Component {...pageProps} /> : <></>
    //   }
    // </motion.div>
    // }

    // </>