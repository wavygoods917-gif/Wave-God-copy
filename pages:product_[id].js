import { useRouter } from 'next/router'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import Header from '../../components/Header'

export default function ProductPage(){
  const router = useRouter()
  const { id } = router.query
  const [product, setProduct] = useState(null)
  const [loading,setLoading] = useState(true)

  useEffect(()=>{
    if (!id) return
    async function load(){
      setLoading(true)
      const res = await fetch('/api/images')
      const j = await res.json()
      const imgs = j.images || []
      const idx = Math.max(0, Math.min(imgs.length-1, Number(id)-1))
      const p = {
        id: String(Number(id)),
        image: imgs[idx] || '',
        title: `Wave Item ${id}`,
        price: 1999
      }
      setProduct(p)
      setLoading(false)
    }
    load()
  },[id])

  if (loading) return <>
    <Header cartCount={0} />
    <div className="container"><p>Loading...</p></div>
  </>

  if (!product) return <>
    <Header cartCount={0} />
    <div className="container"><p>Product not found</p></div>
  </>

  return (
    <div>
      <Header cartCount={0} />
      <div className="container" style={{paddingTop:18}}>
        <Link href="/"><a style={{color:'#aaa'}}>← Back</a></Link>
        <div style={{display:'flex',gap:18,marginTop:18,alignItems:'flex-start',flexWrap:'wrap'}}>
          <img src={product.image} alt={product.title} style={{width:420,height:320,objectFit:'cover',borderRadius:8}} />
          <div style={{flex:1}}>
            <h1 style={{marginTop:0}}>{product.title}</h1>
            <p className="card-meta">Price: ${(product.price/100).toFixed(2)}</p>
            <p style={{color:'#ddd'}}>This product is created from images scraped from the original site for demo purposes.</p>
            <div style={{marginTop:12}}>
              <button className="btn" onClick={()=>{ alert('Add to cart from product page (not wired in this demo)') }}>Add to cart</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
