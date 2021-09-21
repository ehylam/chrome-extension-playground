
let interval;
let maxThreshold = 500;


const handleLights = async () => {
	try {
		let res = await fetch("https://api.lifx.com/v1/lights/all", {
			headers: {
				Authorization: `Bearer ${key}`
			}
		});

		let lightData = await res.json();
		// Best to have it here incase the we haven't fetched the lights yet.
		setLightState(lightData[0]);

	} catch(e) {
		console.log(e);
	}
};

const setLightState = async (light) => {
	try {
		if(light.power !== 'on' && light.connected === true) {
			let res = await fetch(`https://api.lifx.com/v1/lights/${light.id}/state`, {
				headers: {
					Authorization: `Bearer ${key}`,
					"Content-Type": "application/json"
				},
				method: 'PUT',
				body: JSON.stringify({
					power: 'on',
					brightness: 1.0,
					color: 'kelvin:5000'
				})
			});
		}
	} catch (e) {
		console.log(e);
	}


};



interval = setInterval(() => {
	const target = document.querySelector('#quote-header-info div:nth-child(3) span:first-child');
	if(target !== null || target !== undefined) {
		const targetValue = target.innerHTML;
		console.log(targetValue);

		// if targetValue exceeds maxThreshold
		if (targetValue > maxThreshold) {
			clearInterval(interval);

			handleLights();
		}
	}
}, 10000);

