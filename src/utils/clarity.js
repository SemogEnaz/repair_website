export function loadClarity() {

	// Do not run in development mode
	if (!import.meta.env.PROD) return true;

	// Do not load for admin/testing users
	// Run this on the recorded sites console:
	// localStorage.setItem('admin-mode', 'true')
	if (localStorage.getItem('admin-mode') === 'true') {
		console.log('Clarity disabled for admin')
		return false;
	}

	// Blocking IP address of 35/2 Greenfeild drive
	const blockedIPs=['203.132.68.90'];
	fetch("https://api.ipify.org?format=json")
		.then(res => res.json())
		.then(data => {
			if (blockedIPs.includes(data.ip)) return false;
		});

	// Load Clarity
	;(function(c,l,a,r,i,t,y){
		c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)}
		t=l.createElement(r)
		t.async=1
		t.src="https://www.clarity.ms/tag/"+i
		y=l.getElementsByTagName(r)[0]
		y.parentNode.insertBefore(t,y)
	})(window, document, "clarity", "script", "wrzr8gzxb0")

	console.log('Clarity loaded');

	return true;
}
