export function sendTelegramMessage(payload) {
	const url = `${import.meta.env.VITE_API_URL}`;

	fetch(url, {
		method: "POST",
		headers: {
		"Content-Type": "application/json",
		"x-api-key": "supersecret123"
		},
		body: JSON.stringify(payload)
	});
}

export function sendFacebookMessage(message) {
	const encodedMessage = encodeURIComponent(message);

	window.open(
		`https://m.me/iphonerepairclayton?text=${encodedMessage}`,
		'_blank'
	);
}
