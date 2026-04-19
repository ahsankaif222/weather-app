const apiKey = "48fad5a1666c4489b0473107261904";

// Suggestions
async function getSuggestions() {
    const input = document.getElementById("cityInput").value.trim();
    const box = document.getElementById("suggestions");

    if (input.length < 2) {
        box.innerHTML = "";
        return;
    }

    const res = await fetch(`https://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${input}`);
    const data = await res.json();

    box.innerHTML = "";

    data.forEach(city => {
        const div = document.createElement("div");
        div.className = "suggestion";
        div.textContent = `${city.name}, ${city.country}`;

        div.onclick = () => {
            document.getElementById("cityInput").value = `${city.name}, ${city.country}`;
            box.innerHTML = "";
        };

        box.appendChild(div);
    });
}

// Weather
async function getWeather() {
    const city = document.getElementById("cityInput").value.trim();
    const result = document.getElementById("result");
    const loader = document.getElementById("loader");

    if (!city) {
        result.innerText = "Enter a city!";
        return;
    }

    loader.style.display = "block";
    result.innerHTML = "";

    try {
        const res = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`);
        const data = await res.json();

        loader.style.display = "none";

        if (data.error) {
            result.innerText = "City not found!";
            return;
        }

        result.innerHTML = `
            <h2>${data.location.name}</h2>
            <p>${data.location.country}</p>
            <img class="weather-icon" src="https:${data.current.condition.icon}">
            <h1>${data.current.temp_c}°C</h1>
            <p>${data.current.condition.text}</p>
        `;
    } catch {
        loader.style.display = "none";
        result.innerText = "Error fetching data";
    }
}