require('dotenv').config()
const { Telegraf } = require('telegraf')
const Markup = require('telegraf/markup')
const COUNTRIES_LIST = require('./constants')
const https = require('https')
 
const bot = new Telegraf(process.env.BOT_TOKEN);

// Функция для запроса к API - получаем актуальные данные
function getCovidData(country) {
    return new Promise((resolve, reject) => {
        const url = `https://disease.sh/v3/covid-19/countries/${encodeURIComponent(country)}?strict=true`
        https.get(url, (res) => {
            let data = ''
            res.on('data', chunk => data += chunk)
            res.on('end', () => {
                try {
                    const json = JSON.parse(data)
                    if (json.message) {
                        reject(new Error(json.message))
                    } else {
                        // Используем yesterday данные если today = 0 (актуальнее)
                        const todayCases = json.todayCases || 0
                        const yesterdayCases = json.yesterdayCases || 0
                        const todayDeaths = json.todayDeaths || 0
                        const yesterdayDeaths = json.yesterdayDeaths || 0
                        
                        resolve({
                            country: json.country,
                            cases: todayCases > 0 ? todayCases : yesterdayCases,
                            deaths: todayDeaths > 0 ? todayDeaths : yesterdayDeaths,
                            totalCases: json.cases,
                            totalDeaths: json.deaths,
                            totalRecovered: json.recovered,
                            updated: json.updated
                        })
                    }
                } catch (e) {
                    reject(e)
                }
            })
        }).on('error', reject)
    })
}
bot.start((ctx) =>
	ctx.reply(
		`Привет, ${ctx.message.from.first_name}! 👋

Добро пожаловать в COVID-19 информационный бот! 🦠

Этот бот предоставляет актуальную статистику по коронавирусу в реальном времени с официальных сайтов и статистических органов мира.

🌍 **Как использовать:**
• Введите название страны на русском или английском языке
• Получите самую свежую информацию о случаях, смертях и выздоровлениях

📋 Для полного списка стран используйте команду /help

🔍 **Примеры:**
• Россия, russia
• Казахстан, kazakhstan
• США, usa

Начнем! 🚀`,
		Markup.keyboard([
			['🇺🇸 США', '🇬🇧 UK'],
			['🇸🇾 Сирия', '🇹🇷 Турция'],
			['🇷🇺 Россия', '🇺🇦 Украина'],
			['🇰🇿 Казахстан', '🇺🇿 Узбекистан'],
		]).extra()
	)
);

bot.help((ctx) => ctx.reply(COUNTRIES_LIST))

bot.on('text', async (ctx) => {
    let data = {}
    
    // Расширенный маппинг с fallback вариантами
    const countryMapping = {
        'россия': 'russia',
        'сша': 'usa',
        'США': 'usa',
        'соединенные штаты': 'usa',
        'united states': 'usa',
        'united states of america': 'usa',
        'us': 'usa',
        'usa': 'usa',
        'казахстан': 'kazakhstan',
        'Казахстан': 'kazakhstan',
        'украина': 'ukraine',
        'Украина': 'ukraine',
        'беларусь': 'belarus',
        'Беларусь': 'belarus',
        'турция': 'turkey',
        'Турция': 'turkey',
        'сирия': 'syria',
        'Сирия': 'syria',
        'узбекистан': 'uzbekistan',
        'Узбекистан': 'uzbekistan',
        'великобритания': 'uk',
        'Великобритания': 'uk',
        'uk': 'uk',
        'united kingdom': 'uk',
        'британия': 'uk',
        'Британия': 'uk',
        'англия': 'uk',
        'Англия': 'uk',
        'германия': 'germany',
        'Германия': 'germany',
        'франция': 'france',
        'Франция': 'france',
        'италия': 'italy',
        'Италия': 'italy',
        'испания': 'spain',
        'Испания': 'spain',
        'китай': 'china',
        'Китай': 'china',
        'индия': 'india',
        'Индия': 'india',
        'бразилия': 'brazil',
        'Бразилия': 'brazil',
        'япония': 'japan',
        'Япония': 'japan',
        'канада': 'canada',
        'Канада': 'canada',
        'мексика': 'mexico',
        'Мексика': 'mexico',
        'польша': 'poland',
        'Польша': 'poland',
        'нидерланды': 'netherlands',
        'Нидерланды': 'netherlands',
        'бельгия': 'belgium',
        'Бельгия': 'belgium',
        'швеция': 'sweden',
        'Швеция': 'sweden',
        'норвегия': 'norway',
        'Норвегия': 'norway',
        'финляндия': 'finland',
        'Финляндия': 'finland',
        'дания': 'denmark',
        'Дания': 'denmark',
        'австрия': 'austria',
        'Австрия': 'austria',
        'швейцария': 'switzerland',
        'Швейцария': 'switzerland',
        'португалия': 'portugal',
        'Португалия': 'portugal',
        'греция': 'greece',
        'Греция': 'greece',
        'чехия': 'czech-republic',
        'Чехия': 'czech-republic',
        'венгрия': 'hungary',
        'Венгрия': 'hungary',
        'румыния': 'romania',
        'Румыния': 'romania',
        'болгария': 'bulgaria',
        'Болгария': 'bulgaria',
        'сербия': 'serbia',
        'Сербия': 'serbia',
        'хорватия': 'croatia',
        'Хорватия': 'croatia',
        'словакия': 'slovakia',
        'Словакия': 'slovakia',
        'словения': 'slovenia',
        'Словения': 'slovenia',
        'эстония': 'estonia',
        'Эстония': 'estonia',
        'латвия': 'latvia',
        'Латвия': 'latvia',
        'литва': 'lithuania',
        'Литва': 'lithuania',
        'молдова': 'moldova',
        'Молдова': 'moldova',
        'киргизия': 'kyrgyzstan',
        'Киргизия': 'kyrgyzstan',
        'таджикистан': 'tajikistan',
        'Таджикистан': 'tajikistan',
        'туркменистан': 'turkmenistan',
        'Туркменистан': 'turkmenistan',
        'грузия': 'georgia',
        'Грузия': 'georgia',
        'армения': 'armenia',
        'Армения': 'armenia',
        'азербайджан': 'azerbaijan',
        'Азербайджан': 'azerbaijan',
        'израиль': 'israel',
        'Израиль': 'israel',
        'иран': 'iran',
        'Иран': 'iran',
        'ирак': 'iraq',
        'Ирак': 'iraq',
        'афганистан': 'afghanistan',
        'Афганистан': 'afghanistan',
        'пакистан': 'pakistan',
        'Пакистан': 'pakistan',
        'бангладеш': 'bangladesh',
        'Бангладеш': 'bangladesh',
        'шри-ланка': 'sri-lanka',
        'Шри-ланка': 'sri-lanka',
        'непал': 'nepal',
        'Непал': 'nepal',
        'бутан': 'bhutan',
        'Бутан': 'bhutan',
        'мальдивы': 'maldives',
        'Мальдивы': 'maldives',
        'мьянма': 'myanmar',
        'Мьянма': 'myanmar',
        'тайланд': 'thailand',
        'Тайланд': 'thailand',
        'вьетнам': 'vietnam',
        'Вьетнам': 'vietnam',
        'малайзия': 'malaysia',
        'Малайзия': 'malaysia',
        'сингапур': 'singapore',
        'Сингапур': 'singapore',
        'индонезия': 'indonesia',
        'Индонезия': 'indonesia',
        'филиппины': 'philippines',
        'Филиппины': 'philippines',
        'южная корея': 'south-korea',
        'Южная Корея': 'south-korea',
        'северная корея': 'north-korea',
        'Северная Корея': 'north-korea',
        'монголия': 'mongolia',
        'Монголия': 'mongolia',
        'австралия': 'australia',
        'Австралия': 'australia',
        'новая зеландия': 'new-zealand',
        'Новая Зеландия': 'new-zealand',
        'юар': 'south-africa',
        'ЮАР': 'south-africa',
        'египет': 'egypt',
        'Египет': 'egypt',
        'ливия': 'libya',
        'Ливия': 'libya',
        'алжир': 'algeria',
        'Алжир': 'algeria',
        'марокко': 'morocco',
        'Марокко': 'morocco',
        'тунис': 'tunisia',
        'Тунис': 'tunisia',
        'нигерия': 'nigeria',
        'Нигерия': 'nigeria',
        'кения': 'kenya',
        'Кения': 'kenya',
        'эфиопия': 'ethiopia',
        'Эфиопия': 'ethiopia',
        'танзания': 'tanzania',
        'Танзания': 'tanzania',
        'уганда': 'uganda',
        'Уганда': 'uganda',
        'гана': 'ghana',
        'Гана': 'ghana',
        'кот-д-ивуар': 'cote-d-ivoire',
        'Кот-д-Ивуар': 'cote-d-ivoire',
        'сенегал': 'senegal',
        'Сенегал': 'senegal',
        'мали': 'mali',
        'Мали': 'mali',
        'буркина-фасо': 'burkina-faso',
        'Буркина-Фасо': 'burkina-faso',
        'нигер': 'niger',
        'Нигер': 'niger',
        'чад': 'chad',
        'Чад': 'chad',
        'камерун': 'cameroon',
        'Камерун': 'cameroon',
        'конго': 'congo',
        'Конго': 'congo',
        'демократическая республика конго': 'democratic-republic-of-the-congo',
        'Демократическая Республика Конго': 'democratic-republic-of-the-congo',
        'руанда': 'rwanda',
        'Руанда': 'rwanda',
        'бурунди': 'burundi',
        'Бурунди': 'burundi',
        'сомали': 'somalia',
        'Сомали': 'somalia',
        'джибути': 'djibouti',
        'Джибути': 'djibouti',
        'эритрея': 'eritrea',
        'Эритрея': 'eritrea',
        'судан': 'sudan',
        'Судан': 'sudan',
        'южный судан': 'south-sudan',
        'Южный Судан': 'south-sudan',
        'центральноафриканская республика': 'central-african-republic',
        'Центральноафриканская Республика': 'central-african-republic',
        'габон': 'gabon',
        'Габон': 'gabon',
        'гвинея': 'guinea',
        'Гвинея': 'guinea',
        'гвинея-бисау': 'guinea-bissau',
        'Гвинея-Бисау': 'guinea-bissau',
        'сьерра-леоне': 'sierra-leone',
        'Сьерра-Леоне': 'sierra-leone',
        'либерия': 'liberia',
        'Либерия': 'liberia',
        'того': 'togo',
        'Того': 'togo',
        'бенин': 'benin',
        'Бенин': 'benin',
        'мавритания': 'mauritania',
        'Мавритания': 'mauritania',
        'гамбия': 'gambia',
        'Гамбия': 'gambia',
        'кабо-верде': 'cabo-verde',
        'Кабо-Верде': 'cabo-verde',
        'сан-томе и принсипи': 'sao-tome-and-principe',
        'Сан-Томе и Принсипи': 'sao-tome-and-principe',
        'коморы': 'comoros',
        'Коморы': 'comoros',
        'сейшелы': 'seychelles',
        'Сейшелы': 'seychelles',
        'маврикий': 'mauritius',
        'Маврикий': 'mauritius',
        'мадагаскар': 'madagascar',
        'Мадагаскар': 'madagascar',
        'зимбабве': 'zimbabwe',
        'Зимбабве': 'zimbabwe',
        'замбия': 'zambia',
        'Замбия': 'zambia',
        'малави': 'malawi',
        'Малави': 'malawi',
        'мозамбик': 'mozambique',
        'Мозамбик': 'mozambique',
        'ботсвана': 'botswana',
        'Ботсвана': 'botswana',
        'намибия': 'namibia',
        'Намибия': 'namibia',
        'ангола': 'angola',
        'Ангола': 'angola',
        'экваториальная гвинея': 'equatorial-guinea',
        'Экваториальная Гвинея': 'equatorial-guinea'
    }

    try {
        // Прямой маппинг для кнопок с флагами - используем правильный регистр для API
        const buttonMapping = {
            '🇺🇸 США': 'USA',
            '🇬🇧 UK': 'UK', 
            '🇸🇾 Сирия': 'Syria',
            '🇹🇷 Турция': 'Turkey',
            '🇷🇺 Россия': 'Russia',
            '🇺🇦 Украина': 'Ukraine',
            '🇰🇿 Казахстан': 'Kazakhstan',
            '🇺🇿 Узбекистан': 'Uzbekistan'
        }
        
        let countryName = ctx.message.text
        
        // Проверяем прямой маппинг кнопок
        if (buttonMapping[countryName]) {
            countryName = buttonMapping[countryName]
            console.log('Button mapped to:', countryName)
        } else {
            // Оставляем только буквы и пробелы (убираем флаги, эмодзи, цифры)
            countryName = countryName
                .replace(/[^a-zA-Zа-яА-Я\s]/g, '')
                .trim()
            
            console.log('Original input:', ctx.message.text)
            console.log('Cleaned input:', countryName)
            
            // Если это русское или альтернативное название, заменяем на стандартное
            if (countryMapping[countryName]) {
                countryName = countryMapping[countryName]
                console.log('Mapped to:', countryName)
            } else {
                console.log('No mapping found for:', countryName)
                // Пробуем с заглавной буквы
                countryName = countryName.charAt(0).toUpperCase() + countryName.slice(1)
                console.log('Trying with capital letter:', countryName)
            }
        }
        
        console.log('Final country name for API:', countryName)
        
        // Делаем запрос к API с retry логикой
        const alternatives = {
            'Kazakhstan': ['Kazakhstan', 'KZ'],
            'USA': ['USA', 'United States', 'US'],
            'Turkey': ['Turkey', 'TR'],
            'Russia': ['Russia', 'Russian Federation', 'RU'],
            'Ukraine': ['Ukraine', 'UA'],
            'Uzbekistan': ['Uzbekistan', 'UZ']
        }
        
        let attempts = alternatives[countryName] ? alternatives[countryName] : [countryName]
        let countryData = null
        let lastError = null
        
        for (const attempt of attempts) {
            try {
                console.log('Trying API with:', attempt)
                countryData = await getCovidData(attempt)
                console.log('Success with:', attempt)
                break
            } catch (e) {
                lastError = e
                console.log('Failed with:', attempt, '-', e.message)
            }
        }
        
        if (!countryData) {
            throw lastError || new Error('No data found')
        }
        
        // Обрабатываем NaN и null значения
        const formatNumber = (num) => {
            if (num === undefined || num === null || num === 'NaN') {
                return 'Нет данных'
            }
            if (typeof num === 'number' && isNaN(num)) {
                return 'Нет данных'
            }
            if (typeof num === 'number') {
                return num.toLocaleString()
            }
            return String(num)
        }
        
        const formatData = `
🌍 **Страна:** ${countryData.country}
🕒 **Данные на:** ${new Date(countryData.updated).toLocaleDateString('ru-RU')}

⚡ **Актуальные данные:**
🦠 Новые случаи: ${formatNumber(countryData.cases)}
⚰️ Новые смерти: ${formatNumber(countryData.deaths)}

📊 **Всего с начала пандемии:**
🧪 Всего случаев: ${formatNumber(countryData.totalCases)}
💀 Всего смертей: ${formatNumber(countryData.totalDeaths)}
💚 Всего выздоровело: ${formatNumber(countryData.totalRecovered)}
        `
        ctx.reply(formatData, { parse_mode: 'Markdown' });
        
    } catch (error) {
        console.log('Final Error:', error);
        ctx.reply('❌ Ошибка! Пожалуйста, проверьте правильность названия страны или используйте /help для просмотра списка доступных стран.\n\n💡 Попробуйте написать название по-другому, например:\n• США → USA\n• UK → United Kingdom\n• Россия → Russia');
    }
});

bot.launch()
console.log('Yoo ✋, bot 🤖 is running');