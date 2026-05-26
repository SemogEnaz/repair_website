import { supabase } from "./supabase";

function insertIP(ip_address) {
	supabase
		.from('ip_addresses')
		.insert({ ip_address })
		.then(({ error }) => {
			if (error) {
				console.error('Supabase insert error:', error);
			}
		})
		.catch((err) => {
			console.error('Unexpected Supabase insert error:', err);
		});
}

export function recordIP() {
	fetch("https://api.ipify.org?format=json")
  .then(res => res.json())
  .then(data => {
		insertIP(data.ip);
    }
  );
}
