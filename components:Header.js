import Link from 'next/link'

export default function Header({ cartCount }) {
  return (
    <header className="header">
      <div className="brand">WaveGod Copy</div>
      <nav className="nav">
        <Link href="/"><a>Home</a></Link>
        <Link href="/"><a>Shop</a></Link>
        <a href="https://wavegodmaxb.com/" target="_blank" rel="noreferrer">Original</a>
        <span style={{marginLeft:12,color:'#fff',fontWeight:700}}>{cartCount ? `Cart (${cartCount})` : 'Cart'}</span>
      </nav>
    </header>
  )
}
