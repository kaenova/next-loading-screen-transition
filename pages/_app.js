import 'tailwindcss/tailwind.css'
import './global.css'
import React, { useState } from 'react'
import Router from 'next/router'
import { motion, AnimatePresence } from 'framer-motion'
import PageTransition from '../components/PageTransition'
import InitialAnimation from '../components/InitialAnimation'


function MyApp({ Component, pageProps }) {

  // Page Transition
  var [loading, setLoading] = useState(null)

  // Root Inital Page Transition
  var [rootPath, setRootPath] = useState(0)


  Router.events.on('routeChangeStart', () => {
    // Untuk memastikan hanya muncul di root dan awal page
    if (rootPath == 0 && Router.pathname === "/") {
      setRootPath(rootPath + 1)
    }
    setLoading(true)

  })

  Router.events.on('routeChangeComplete', () => {
    if (loading != null) {
      setTimeout(() => { setLoading(false) }, 1000)
    }
    console.log(Router.pathname)
  })


  return (
    <>
    <AnimatePresence exitBeforeEnter>
        {
          // Animating for changing page
          !loading &&
          <motion.div
            className="sticky top-0 z-0"
            initial={{
              scale: 0.3,
              opacity: 0
            }}
            animate={{
              scale: 1,
              opacity: 1
            }}
            exit={{
              scale: 0.3,
              opacity: 0
            }}
            transition={{ easings: "linear" }}
          >
            { /* Main component */ }
            <Component {...pageProps} />
          </motion.div>
        }
      </AnimatePresence>
      <InitialAnimation activate="true"/>
      <PageTransition load={loading} activate="true"/>
    </>
  )
}

export default MyApp