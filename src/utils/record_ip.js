import { supabase } from "./supabase";

async function insertIP(ip_address) {
	const { error } = await supabase
		.from('ip_addresses')
		.insert({ip_address: ip_address})

	if (error) {
		console.error('Supabase insert error:', error);
		return;
	}
}

export function recordIP() {
	fetch("https://api.ipify.org?format=json")
  .then(res => res.json())
  .then(data => {
		insertIP(data.ip);
    }
  );
}
