async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data); // Можно выбрать другой алгоритм, например, SHA-512
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray
        .map((b) => b.toString(16).padStart(2, '0'))
        .join('');
    return hashHex;
}

export let initialTours = [
    {
        "id": 1,
        "city": "Пхукет",
        "country": "Таиланд",
        "category": "Пляжный",
        "img": "resources/thailand.jpg",
        "description": "Пхукет — популярный остров-курорт Таиланда, который славится прекрасными пляжами, живописной природой соседних островов и разнообразными развлечениями. "
    },
    {
        "id": 2,
        "city": "Париж",
        "country": "Франция",
        "category": "Культурный",
        "img": "resources/france.jpg",
        "description": "Париж — столица и крупнейший город Франции. Находится на севере государства, в центральной части Парижского бассейна, на реке Сена. "
    },
    {
        "id": 3,
        "city": "Лондон",
        "country": "Великобритания",
        "category": "Экологический",
        "img": "resources/england.jpg",
        "description": "Лондон — столица и крупнейший город Англии и Великобритании. Расположен на юго-востоке острова Великобритания, на равнине в устье Темзы, вблизи Северного моря. "
    },
    {
        "id": 4,
        "city": "Москва",
        "country": "Россия",
        "category": "Культурный",
        "img": "resources/russia.jpg",
        "description": "Москва — столица и крупнейший город России. Считается одним из самых красивых и комфортных мегаполисов мира. "
    },
    {
        "id": 5,
        "city": "Каир",
        "country": "Египет",
        "category": "Пляжный",
        "img": "resources/egypt.jpg",
        "description": "Каир — столица Египта, крупнейший город Ближнего Востока и третий по величине город Африки."
    },
    {
        "id": 6,
        "city": "Венеция",
        "country": "Италия",
        "category": "Культурный",
        "img": "resources/italy.jpg",
        "description": "Венеция — город на севере Италии, порт Адриатического моря. Большая часть города расположена на островах в Венецианской лагуне, которые соединены между собой огромным количеством мостов."
    }
]

export let initialAdmins = [
    {
        "id": 1,
        "login": "kateminaa",
        "password": await hashPassword('1234'),
    }
]