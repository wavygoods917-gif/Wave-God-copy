import Link from 'next/link'

export default function ProductCard({p, onAdd}) {
  return (
    <div className="card">
      <img src={p.image} alt={p.title} />
      <div className="card-body">
        <div>
          <div className="card-title">{p.title}</div>
          <div className="card-meta">${(p.price/100).toFixed(2)}</div>
        </div>
        <div className="controls">
          <Link href={`/product/${p.id}`}><a className="btn" style={{background:'#333'}}>View</a></Link>
          <button className="btn" onClick={()=>onAdd(p)}>Add</button>
        </div>
      </div>
    </div>
  )
}
