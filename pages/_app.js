import 'tailwindcss/tailwind.css'
import './global.css'
import React, { useState } from 'react'
import Router from 'next/router'
import { motion, AnimatePresence } from 'framer-motion'
import PageTransition from '../components/PageTransition'


function MyApp({ Component, pageProps }) {

  // Page Transition
  var [loading, setLoading] = useState(false)

  // Root Inital Page Transition
  var [rootPath, setRootPath] = useState(0)


  Router.events.on('routeChangeStart', () => {
    // Untuk memastikan hanya muncul di root dan awal page
    if (rootPath == 0 && Router.pathname === "/"){
      setRootPath(rootPath + 1)
    }  
    setLoading(true)
  })

  Router.events.on('routeChangeComplete', () => {
    setTimeout(() => { setLoading(false) }, 2000)
    console.log(Router.pathname)
  })


  return (
    <>
      <motion.div
        className="fixed w-screen h-screen bg-white z-50 flex items-center justify-center"
        initial={{
          y: 0
        }}
        animate={{
          y: "-100vh"
        }}
        transition={{
          duration: 1,
          delay: 2,
          ease: [0,1,.46,1] // ini kalau mau pake cubic-bezier
        }}
        
      >
        <motion.span
        initial={{
          opacity: 0,
          y: "10vh"
        }}
        animate={{
          opacity: 1,
          y: 0
        }}
        transition={{
          duration: 0.3,
        }}
        >
        Welcome to the page
        </motion.span>

      </motion.div>

      <PageTransition load={loading}/>

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