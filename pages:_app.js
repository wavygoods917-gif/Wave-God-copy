import '../styles/globals.css'
import { useEffect } from 'react'

function MyApp({ Component, pageProps }) {
  // optional: preload fonts or similar
  useEffect(()=>{
    // nothing for now
  },[])
  return <Component {...pageProps} />
}

export default MyApp
