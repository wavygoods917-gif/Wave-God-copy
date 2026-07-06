import { useEffect, useState } from 'react'
import Header from '../components/Header'
import ProductCard from '../components/ProductCard'
import Link from 'next/link'

function useCart() {
  const [cart, setCart] = useState([])
  useEffect(()=>{
    try{
      const raw = localStorage.getItem('cart:v1')
      if (raw) setCart(JSON.parse(raw))
    }catch(e){}
  },[])
  useEffect(()=> {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cart:v1', JSON.stringify(cart))
    }
  },[cart])
  const add = (p) => {
    setCart(c => {
      const existing = c.find(x=>x.id===p.id)
      if (existing) return c.map(x=> x.id===p.id ? {...x, qty: x.qty+1} : x)
      return [...c, {...p, qty:1}]
    })
  }
  const removeOne = (id) => {
    setCart(c => c.flatMap(x => x.id===id ? (x.qty>1 ? [{...x, qty:x.qty-1}] : []) : [x]))
  }
  const clear = ()=> setCart([])
  return {cart, add, removeOne, clear}
}

export default function Home(){
  const [images, setImages] = useState([])
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const { cart, add, removeOne, clear } = useCart()

  useEffect(()=>{
    async function load(){
      setLoading(true)
      try{
        const res = await fetch('/api/images')
        const j = await res.json()
        const imgs = j.images || []
        setImages(imgs)
        const prods = imgs.map((img,i)=>({
          id: String(i+1),
          image: img,
          title: `Wave Item ${i+1}`,
          price: 1999 + (i*100 % 3000)
        }))
        setProducts(prods)
      }catch(e){
        console.error(e)
      } finally { setLoading(false) }
    }
    load()
  },[])

  const hero = images[0] || ''

  return (
    <div>
      <Header cartCount={cart.reduce((s,it)=>s+it.qty,0)} />
      <section className="hero">
        {hero ? <img src={hero} alt="hero" /> : <div style={{width:'100%',height:'100%',background:'#222'}}/>}
        <div className="big-label">Jon lodge made this</div>
      </section>

      <main className="container">
        <h2 style={{marginTop:6}}>Shop</h2>
        {loading ? <div className="empty">Loading images from wavegodmaxb.com…</div> : (
          <div className="grid">
            {products.map(p => (
              <ProductCard key={p.id} p={p} onAdd={add} />
            ))}
          </div>
        )}

        <section style={{marginTop:28}}>
          <h3>About this copy</h3>
          <p className="card-meta">This is a reproduction demo using images loaded from the original site. Replace content and enable payments to make this a full store.</p>
        </section>
      </main>

      <div className="cart" role="complementary" aria-label="cart">
        <h4>Cart</h4>
        {cart.length === 0 && <div className="empty">Cart empty</div>}
        {cart.map(item=>(
          <div key={item.id} className="cart-item">
            <img src={item.image} alt={item.title} />
            <div style={{flex:1}}>
              <div style={{fontWeight:700}}>{item.title}</div>
              <div className="card-meta">Qty: {item.qty} • ${(item.price/100).toFixed(2)}</div>
            </div>
            <div style={{display:'flex',flexDirection:'column',gap:8}}>
              <button className="btn" onClick={()=>removeOne(item.id)}>-</button>
            </div>
          </div>
        ))}
        {cart.length>0 && (
          <>
            <div style={{marginTop:8,fontWeight:700}}>Total: ${ (cart.reduce((s,i)=> s + i.price * i.qty,0)/100).toFixed(2)}</div>
            <div style={{display:'flex',gap:8,marginTop:8}}>
              <Link href="/checkout"><a className="btn" style={{flex:1}}>Checkout</a></Link>
              <button className="btn" onClick={clear} style={{background:'#666'}}>Clear</button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
