export function loadClarity() {

  // Do not run in development mode
  if (!import.meta.env.PROD) return

  // Do not load for admin/testing users
  if (localStorage.getItem('admin-mode') === 'true') {
    console.log('Clarity disabled for admin')
    return
  }

  // Load Clarity
  ;(function(c,l,a,r,i,t,y){
    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)}
    t=l.createElement(r)
    t.async=1
    t.src="https://www.clarity.ms/tag/"+i
    y=l.getElementsByTagName(r)[0]
    y.parentNode.insertBefore(t,y)
  })(window, document, "clarity", "script", "wrzr8gzxb0")

  console.log('Clarity loaded')
}
