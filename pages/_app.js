import 'tailwindcss/tailwind.css'
import './global.css'
import React, { useState } from 'react'
import Router, {useRouter} from 'next/router'
import { motion, AnimatePresence } from 'framer-motion'
import PageTransition from '../components/PageTransition'
import InitialAnimation from '../components/InitialAnimation'


function MyApp({ Component, pageProps }) {

  // Router
  var router = useRouter()

  // Page Transition
  var [loading, setLoading] = useState(false)

  // Root Inital Page Transition
  var [onRoot, setRoot] = useState(router.pathname === "/")
  var [counter, setCounter] = useState(0)


  Router.events.on('routeChangeStart', () => {
    // Untuk memastikan hanya muncul di root dan awal page
    setCounter(counter + 1)
    setRoot(false)
    setLoading(true)
  })

  Router.events.on('routeChangeComplete', () => {
    if (!loading) {
      setTimeout(() => { setLoading(false) }, 1000)
    }
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
              opacity: 0
            }}
            animate={{
              opacity: 1
            }}
            exit={{

              opacity: 0
            }}
            transition={{ easings: "linear" }}
          >
            { /* Main component */ }
            <Component {...pageProps} />
          </motion.div>
        }
      </AnimatePresence>

      {
        onRoot &&
        <InitialAnimation activate="true"/>
      }

      {
        counter==0 ?
        <PageTransition activate="true" load={loading} display="false"/>
        :
        <PageTransition activate="true" load={loading} display="true"/>
      }


    </>
  )
}

export default MyApp