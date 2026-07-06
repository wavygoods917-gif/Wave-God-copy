// Server-side helper: fetch the homepage and extract image URLs.
// This returns an array of absolute image URLs from https://wavegodmaxb.com/
// Note: This is a simple HTML-scrape and may be adjusted if the site changes.

export default async function handler(req, res) {
  try {
    const target = 'https://wavegodmaxb.com/'
    const resp = await fetch(target, { headers: { 'User-Agent': 'Mozilla/5.0' } })
    if (!resp.ok) {
      res.status(500).json({ error: 'Failed to fetch remote site' })
      return
    }
    const html = await resp.text()

    const imgs = []
    const imgRegex = /<img[^>]+src=["']([^"']+)["']/gi
    let m
    while ((m = imgRegex.exec(html)) !== null) {
      let url = m[1].trim()
      if (!url) continue
      // Resolve protocol-relative and root-relative URLs
      if (url.startsWith('//')) url = 'https:' + url
      else if (url.startsWith('/')) url = 'https://wavegodmaxb.com' + url
      else if (!/^https?:\/\//i.test(url)) url = 'https://wavegodmaxb.com/' + url
      if (!imgs.includes(url)) imgs.push(url)
      if (imgs.length >= 30) break
    }

    // fallback: if none found, return the homepage itself as an image (rare)
    if (imgs.length === 0) imgs.push('https://wavegodmaxb.com/')

    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=300')
    res.status(200).json({ images: imgs })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'scrape error' })
  }
}
