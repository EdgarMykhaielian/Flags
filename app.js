const cardsContainer = document.querySelector(".card");
const card = document.querySelector(".card__inner");
const startScreen = document.querySelector(".start-screen");
const preloader = document.getElementById("preloader");
const seenCards = [];

startScreen.addEventListener("click", (e) => {
    if (e.target.closest(".start-btn")) {
        startScreen.style.display = "none";
        preloader.style.display = "block";

        setTimeout(function () {
            cardsContainer.hidden = false;
            getCountries();
            document.body.style.backgroundColor = "lightblue";
        }, 4000);
    }
});

function getCountries() {
    return fetch("./countries.json")
        .then((response) => response.json())
        .then((data) => startGame(data));
}

function startGame(data) {
    const valuesToRemove = [
        "446",
        "531",
        "710",
        "744",
        "850",
        "334",
        "584",
        "652",
        "535",
        "540",
        "260",
        "678",
        "612",
        "238",
        "654",
        "166",
        "659",
        "796",
        "732",
        "580",
        "028",
        "670",
        "772",
        "574",
        "336",
        "500",
        "570",
        "016",
        "831",
        "520",
        "308",
        "583",
        "850",
        "312",
        "533",
        "662",
        "798",
        "652",
        "534",
        "660",
        "832",
        "638",
        "663",
        "480",
        "316",
        "174",
    ];
    const filteredData = data.filter(
        (item) => !valuesToRemove.includes(item.ccn3)
    );
    data = filteredData;
    console.log(data);
    playNextCard();

    card.addEventListener("click", (e) => {
        if (e.target.closest(".next-btn")) {
            playNextCard();
        }
    });

    function playNextCard() {
        const cardData = getRandomCardData(data);
        showCard(cardData);
    }
}

function getRandomCardData(data) {
    let random;
    do {
        random = Math.floor(Math.random() * data.length) + 1;
    } while (seenCards.includes(random));

    seenCards.push(random);
    console.log(seenCards);
    return data[random];
}

function formatNumber(num) {
    if (num < 1000000) {
        return new Intl.NumberFormat().format(num);
    }
    if (num > 1000000000) {
        const numInBillions = (num / 1000000000).toFixed(2) + " bln";
        return numInBillions;
    } else {
        const numInMillions = (num / 1000000).toFixed(2) + " mln";
        return numInMillions;
    }
}

function getCurrency(currencies) {
    const firstCurrency = Object.keys(currencies)[0];
    const currencyName = currencies[firstCurrency].name;
    return currencyName;
}

function getLanguages(languages) {
    const lngs = Object.values(languages);
    if (lngs.length > 8) {
        const lngsShort = lngs.slice(0, 5);
        const lngsFormatted = lngsShort.join(", ") + "...";
        return lngsFormatted;
    }
    const lngsFormatted = lngs.join(", ");
    return lngsFormatted;
}

function showCard(cardData) {
    /* OPTION FOR FLAGS IMAGES FROM API */
    // const image = new Image();
    // image.src = cardData.flags.png;
    // image.onload = () => {
    card.classList.remove("is-flipped");
    setTimeout(() => {
        card.innerHTML = `
    <div class="card__face card__face--front">
                <h2>Guess the country to flip the card</h2>
                <div class="flag">
                    <img src="./assets/flagsImg/${cardData.code.toLowerCase()}.png">
                </div>
                <div class="inputs"></div>
                <button class="hint">Hint</button>
                <button id="flip-btn-front" disabled class="flip-btn"><svg width="60" height="42" viewBox="0 0 60 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.3067 26.4335C8.2469 24.9668 5.33353 23.0467 3.92029 20.9265C6.83331 16.5863 15.7536 13.3 26.667 12.7331V17.1798C26.667 17.2933 26.8605 17.3463 26.9805 17.2663L39.2068 8.73985C39.2375 8.72032 39.2561 8.68637 39.2561 8.64963C39.2561 8.61336 39.2375 8.57941 39.2068 8.55988L26.9805 0.0329701C26.8605 -0.0470168 26.667 0.0329703 26.667 0.119467V4.7331C11.6871 5.46647 0 11.073 0 17.8595V23.9929C0 26.2995 1.33323 28.5061 3.75327 30.4332C5.73389 31.9311 7.92976 33.1202 10.2666 33.9601C11.5998 34.467 13.28 33.8736 13.28 32.8868V27.5532C13.2293 27.0101 12.8378 26.5595 12.3067 26.4335Z" fill="#2A2C35" fill-opacity="0.8"/>
                    <path d="M56.2466 11.419C54.266 9.92114 52.0702 8.73208 49.7333 7.89219C48.4001 7.3853 46.72 7.97868 46.72 8.96549V14.299C46.7841 14.8296 47.1729 15.2635 47.6933 15.3858C51.7531 16.8856 54.6665 18.8057 56.0797 20.9258C53.1667 25.2659 44.2464 28.5523 33.333 29.1192V24.6725C33.333 24.559 33.1395 24.506 33.0195 24.586L20.7932 33.1124C20.7625 33.132 20.7439 33.1659 20.7439 33.2026C20.7439 33.2389 20.7625 33.2729 20.7932 33.2924L33.0195 41.8193C33.1395 41.8993 33.333 41.8193 33.333 41.7328V37.1192C48.3129 36.3858 60 30.7788 60 23.9916V17.8582C60 15.5516 58.6668 13.345 56.2467 11.4183L56.2466 11.419Z" fill="#2A2C35" fill-opacity="0.8"/>
                    </svg>
                    </button>
            </div>
            <div class="card__face card__face--back">
                <div class="dark-block">
                    <h6>${cardData.subregion}</h6>
                </div>
                <div class="map-block" id="map">
                </div>
                <div class="dark-block">
                <a href="https://en.wikipedia.org/wiki/${
                    cardData.name.common
                }" target="_blank"><h5>${cardData.name.common} ${
            cardData.flag
        }</h5></a>
                </div>
                <div class="dark-block small">
                    <p>area: ${formatNumber(cardData.area)} km²</p>
                    <p>population: ${formatNumber(cardData.population)}</p>
                </div>
                <div class="wrapper">
                    <div class="info-block">
                        <p><i>language: </i>${getLanguages(
                            cardData.languages
                        )}</p>
                        <p><i>currency: </i>${getCurrency(
                            cardData.currencies
                        )}</p>
                        <p><i>capital: </i><button class="capital">${
                            cardData.capital
                        }</button></p>
                        <div class="capitalTime"></div>
                        <div class="capitalWeather"></div>
                    </div>
                    <div class="btn-block">
                        <button class="flip-btn" id="flip-btn-back"><svg width="60" height="42" viewBox="0 0 60 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.3067 26.4335C8.2469 24.9668 5.33353 23.0467 3.92029 20.9265C6.83331 16.5863 15.7536 13.3 26.667 12.7331V17.1798C26.667 17.2933 26.8605 17.3463 26.9805 17.2663L39.2068 8.73985C39.2375 8.72032 39.2561 8.68637 39.2561 8.64963C39.2561 8.61336 39.2375 8.57941 39.2068 8.55988L26.9805 0.0329701C26.8605 -0.0470168 26.667 0.0329703 26.667 0.119467V4.7331C11.6871 5.46647 0 11.073 0 17.8595V23.9929C0 26.2995 1.33323 28.5061 3.75327 30.4332C5.73389 31.9311 7.92976 33.1202 10.2666 33.9601C11.5998 34.467 13.28 33.8736 13.28 32.8868V27.5532C13.2293 27.0101 12.8378 26.5595 12.3067 26.4335Z" fill="#2A2C35" fill-opacity="0.8"/>
                            <path d="M56.2466 11.419C54.266 9.92114 52.0702 8.73208 49.7333 7.89219C48.4001 7.3853 46.72 7.97868 46.72 8.96549V14.299C46.7841 14.8296 47.1729 15.2635 47.6933 15.3858C51.7531 16.8856 54.6665 18.8057 56.0797 20.9258C53.1667 25.2659 44.2464 28.5523 33.333 29.1192V24.6725C33.333 24.559 33.1395 24.506 33.0195 24.586L20.7932 33.1124C20.7625 33.132 20.7439 33.1659 20.7439 33.2026C20.7439 33.2389 20.7625 33.2729 20.7932 33.2924L33.0195 41.8193C33.1395 41.8993 33.333 41.8193 33.333 41.7328V37.1192C48.3129 36.3858 60 30.7788 60 23.9916V17.8582C60 15.5516 58.6668 13.345 56.2467 11.4183L56.2466 11.419Z" fill="#2A2C35" fill-opacity="0.8"/>
                            </svg>
                            </button>
                        <button class="next-btn"><svg width="60" height="31" viewBox="0 0 60 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M52.0005 8.92294C47.7367 4.65861 42.3027 1.75584 36.3873 0.58214C30.472 -0.591147 24.3419 0.0175868 18.7728 2.33156C13.2036 4.64564 8.44672 8.56068 5.10478 13.5803C1.76308 18.6003 -0.0138475 24.4993 8.12634e-05 30.5304C1.41188 24.7133 4.85037 19.5896 9.69935 16.0791C14.5479 12.5681 20.4886 10.9 26.4555 11.3734C32.4233 11.8473 38.0264 14.4324 42.2604 18.6642L34.2604 26.6642L60 26.6647V0.923918L52.0005 8.92294Z" fill="#2A2C35" fill-opacity="0.8"/>
                            </svg>
                            </button>
                    </div>
                </div>
            </div>
        `;
        if (preloader) {
            preloader.remove();
        }
        const capitalBtn = document.querySelector(".capital");
        capitalBtn.addEventListener("click", function () {
            showCapitalInfo(cardData);
        });
        assignCardFlipListener();
        makeInput(cardData);
        initMap(cardData);
    }, 250);
}
// }

function initMap(cardData) {
    const country = { lat: cardData.latlng[0], lng: cardData.latlng[1] };
    const capital = {
        lat:
            cardData.capitalInfo && cardData.capitalInfo.latlng
                ? cardData.capitalInfo.latlng[0]
                : cardData.latlng[0],
        lng:
            cardData.capitalInfo && cardData.capitalInfo.latlng
                ? cardData.capitalInfo.latlng[1]
                : cardData.latlng[1],
    };

    let featureLayer;
    const map = new google.maps.Map(document.getElementById("map"), {
        disableDefaultUI: true,
        keyboardShortcuts: false,
        center: country,
        zoom: 5,
        mapId: "21f9395126d7372d",
    });
    const marker = new google.maps.Marker({
        position: capital,
        map: map,
    });
    featureLayer = map.getFeatureLayer(google.maps.FeatureType.COUNTRY);

    const featureStyleOptions = {
        strokeColor: "#1357a6",
        strokeOpacity: 1.0,
        strokeWeight: 1.0,
    };

    featureLayer.style = (options) => {
        if (options.feature.m == cardData.name.common) {
            return featureStyleOptions;
        }
    };
}

function assignCardFlipListener() {
    const frontBtn = document.getElementById("flip-btn-front");
    const backBtn = document.getElementById("flip-btn-back");
    frontBtn.addEventListener("click", function () {
        card.classList.toggle("is-flipped");
        frontBtn.disabled = true;
    });
    backBtn.addEventListener("click", function () {
        card.classList.toggle("is-flipped");
        setTimeout(() => {
            frontBtn.disabled = false;
        }, 500);
    });
}

function makeInput(cardData) {
    const inputContainer = document.querySelector(".inputs");
    const newName = cardData.name.common
        .toLowerCase()
        .replace(/[^a-z\s]/gi, "");
    let html = "";
    for (let i = 0; i < newName.length; i++) {
        html += `
        <input class="input" type="text" pattern="([a-zA-z\s]){2,}" maxlength="1" placeholder=${newName[i]}>`;
    }
    inputContainer.innerHTML = html;
    // inputContainer.firstElementChild.disabled = false;
    handleInput(newName);
}

function handleInput(newName) {
    const hint = document.querySelector(".hint");
    const inputContainer = document.querySelector(".inputs");
    const inputs = document.querySelectorAll(".input");
    const lastInput = inputs[inputs.length - 1];

    let userGuess = "";

    inputContainer.addEventListener("change", () => {
        const values = Array.from(inputs)
            .map((input) => input.value)
            .join("");
        if (values.toLowerCase() === newName) {
            document.getElementById("flip-btn-front").disabled = false;
            hint.disabled = true;
            inputs.forEach((input) => {
                input.style.color = "#2E8B57";
                input.style.fontWeight = "600";
                input.disabled = true;
            });
        }
    });

    /* hint button */
    hint.addEventListener("click", function () {
        if (inputs[0].classList.contains("hint--odd")) {
            inputs.forEach((i) => {
                i.classList.add("hint--even");
                hint.style.opacity = "0";
                hint.style.cursor = "default";
            });
        }
        inputs.forEach((i) => {
            i.classList.add("hint--odd");
        });
        hint.innerText = "Show";
    });

    lastInput.addEventListener("input", () => {
        inputs.forEach((input) => {
            userGuess += input.value;
        });
        if (userGuess.toLowerCase() === newName) {
            document.getElementById("flip-btn-front").disabled = false;
            hint.disabled = true;
            inputs.forEach((input) => {
                input.style.color = "#2E8B57";
                input.style.fontWeight = "600";
                input.disabled = true;
            });
        } else {
            userGuess = "";
        }
    });

    inputs.forEach((input, index) => {
        input.addEventListener("input", () => {
            if (input.value.length === 1 || input.value === " ") {
                if (index === inputs.length - 1) {
                    return;
                }
                // input.nextElementSibling.disabled = false;
                input.nextElementSibling.focus();
            }
        });

        input.addEventListener("keydown", function (event) {
            const key = event.key;
            const nextElementSibling = input.nextElementSibling;

            if (key.length === 1 && input.value.length === 1) {
                input.value = key;
                // input.nextElementSibling.disabled = false;
                setTimeout(() => {
                    input.nextElementSibling.focus();
                });
            }

            if (key === "Backspace") {
                userGuess = userGuess.slice(0, -1);

                if (index === 0) {
                    return;
                }
                input.value = "";
                if (!nextElementSibling && input.value != "") {
                    return;
                }

                // input.disabled = true;
                setTimeout(() => {
                    input.previousElementSibling.focus();
                });
            }
        });
    });
}

function showCapitalInfo(cardData) {
    const capital = {
        lat:
            cardData.capitalInfo && cardData.capitalInfo.latlng
                ? cardData.capitalInfo.latlng[0]
                : cardData.latlng[0],
        lng:
            cardData.capitalInfo && cardData.capitalInfo.latlng
                ? cardData.capitalInfo.latlng[1]
                : cardData.latlng[1],
    };
    getCapitalTime(capital);
    getCapitalWeather(capital);
}

function getCapitalTime(capital) {
    const newDate = new Date();
    const timestamp =
        newDate.getTime() / 1000 + newDate.getTimezoneOffset() * 60;

    fetch(
        `https://maps.googleapis.com/maps/api/timezone/json?location=${capital.lat}%2C${capital.lng}&timestamp=${timestamp}&key=AIzaSyD-CJTk-t_1_pMOhzH2bVKk5K8XsqgKCrw`
    )
        .then((response) => response.json())
        .then((data) => getTimefromZone(data));

    function getTimefromZone(data) {
        const newDate = new Date();
        const timestamp =
            newDate.getTime() / 1000 + newDate.getTimezoneOffset() * 60;

        const offsets = data.rawOffset * 1000 + data.dstOffset * 1000;

        const nowLocal = new Date(timestamp * 1000 + offsets);
        const nowLocalString = nowLocal.toLocaleTimeString("ukr");
        const capitalTime = document.querySelector(".capitalTime");
        capitalTime.innerHTML = `
    <p class="capital-info"><i>local time: </i>${nowLocalString}</p>
    `;
    }
}

function getCapitalWeather(capital) {
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${capital.lat}&lon=${capital.lng}&appid=97436b7a7cd00fd666dc78d53977d438&units=metric`
    )
        .then((response) => response.json())
        .then((data) => showWeather(data));

    function showWeather(data) {
        const capitalWeather = document.querySelector(".capitalWeather");
        capitalWeather.innerHTML = `
        <p class="capital-info"><i>Local weather: ${
            Math.round(data.main.temp) + "°"
        } <img class="weatherIcon" src="https://openweathermap.org/img/wn/${
            data.weather[0].icon
        }@2x.png"></i></p>
        `;
    }
}
