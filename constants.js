const COUNTRIES_LIST = `
🌍 **Список доступных стран:**

🇦🇫 **Афганистан** - afghanistan
🇦🇱 **Албания** - albania  
🇩🇿 **Алжир** - algeria
🇦🇩 **Андорра** - andorra
🇦🇴 **Ангола** - angola
🇦🇮 **Ангилья** - anguilla
🇦🇬 **Антигуа и Барбуда** - antigua-and-barbuda
🇦🇷 **Аргентина** - argentina
🇦🇲 **Армения** - armenia
🇦🇼 **Аруба** - aruba
🇦🇺 **Австралия** - australia
🇦🇹 **Австрия** - austria
🇦🇿 **Азербайджан** - azerbaijan

🇧🇸 **Багамы** - bahamas
🇧🇭 **Бахрейн** - bahrain
🇧🇩 **Бангладеш** - bangladesh
🇧🇧 **Барбадос** - barbados
🇧🇾 **Беларусь** - belarus
🇧🇪 **Бельгия** - belgium
🇧🇿 **Белиз** - belize
🇧🇯 **Бенин** - benin
🇧🇲 **Бермуды** - bermuda
🇧🇹 **Бутан** - bhutan
🇧🇴 **Боливия** - bolivia
🇧🇦 **Босния и Герцеговина** - bosnia-and-herzegovina
🇧🇼 **Ботсвана** - botswana
🇧🇷 **Бразилия** - brazil
🇻🇬 **Британские Виргинские острова** - british-virgin-islands
🇧🇳 **Бруней** - brunei-darussalam
🇧🇬 **Болгария** - bulgaria
🇧🇫 **Буркина-Фасо** - burkina-faso
🇧🇮 **Бурунди** - burundi

🇨🇻 **Кабо-Верде** - cabo-verde
🇰🇭 **Камбоджа** - cambodia
🇨🇲 **Камерун** - cameroon
🇨🇦 **Канада** - canada
🇨🇼 **Карибские Нидерланды** - caribbean-netherlands
🇰🇾 **Каймановы острова** - cayman-islands
🇨🇫 **Центральноафриканская Республика** - central-african-republic
🇹🇩 **Чад** - chad
🇨🇳 **Китай** - china
🇨🇴 **Колумбия** - colombia
🇰🇲 **Коморы** - comoros
🇨🇬 **Конго** - congo
🇨🇷 **Коста-Рика** - costa-rica
🇨🇮 **Кот-д'Ивуар** - cote-d-ivoire
🇭🇷 **Хорватия** - croatia
🇨🇺 **Куба** - cuba
🇨🇼 **Кюрасао** - curacao
🇨🇾 **Кипр** - cyprus
🇨🇿 **Чехия** - czech-republic

🇨🇩 **Демократическая Республика Конго** - democratic-republic-of-the-congo
🇩🇰 **Дания** - denmark
🇩🇯 **Джибути** - djibouti
🇩🇲 **Доминика** - dominica
🇩🇴 **Доминиканская Республика** - dominican-republic

🇪🇨 **Эквадор** - ecuador
🇪🇬 **Египет** - egypt
🇸🇻 **Сальвадор** - el-salvador
🇬🇶 **Экваториальная Гвинея** - equatorial-guinea
🇪🇷 **Эритрея** - eritrea
🇪🇪 **Эстония** - estonia
🇪🇹 **Эфиопия** - ethiopia

🇫🇴 **Фарерские острова** - faeroe-islands
🇫🇰 **Фолклендские острова** - falkland-islands-malvinas
🇫🇯 **Фиджи** - fiji
🇫🇮 **Финляндия** - finland
🇫🇷 **Франция** - france
🇬🇫 **Французская Гвиана** - french-guiana
🇵🇫 **Французская Полинезия** - french-polynesia

🇬🇦 **Габон** - gabon
🇬🇲 **Гамбия** - gambia
🇬🇪 **Грузия** - georgia
🇩🇪 **Германия** - germany
🇬🇭 **Гана** - ghana
🇬🇮 **Гибралтар** - gibraltar
🇬🇷 **Греция** - greece
🇬🇱 **Гренландия** - greenland
🇬🇩 **Гренада** - grenada
🇬🇵 **Гваделупа** - guadeloupe
🇬🇹 **Гватемала** - guatemala
🇬🇳 **Гвинея** - guinea
🇬🇼 **Гвинея-Бисау** - guinea-bissau
🇬🇾 **Гайана** - guyana

🇭🇹 **Гаити** - haiti
🇻🇦 **Святой Престол** - holy-see
🇭🇳 **Гондурас** - honduras
🇭🇺 **Венгрия** - hungary

🇮🇸 **Исландия** - iceland
🇮🇳 **Индия** - india
🇮🇩 **Индонезия** - indonesia
🇮🇷 **Иран** - iran
🇮🇶 **Ирак** - iraq
🇮🇪 **Ирландия** - ireland
🇮🇲 **Остров Мэн** - isle-of-man
🇮🇱 **Израиль** - israel
🇮🇹 **Италия** - italy

🇯🇲 **Ямайка** - jamaica
🇯🇵 **Япония** - japan
🇯🇴 **Иордания** - jordan

🇰🇿 **Казахстан** - kazakhstan
🇰🇪 **Кения** - kenya
🇰🇼 **Кувейт** - kuwait
🇰🇬 **Кыргызстан** - kyrgyzstan

🇱🇦 **Лаос** - laos
🇱🇻 **Латвия** - latvia
🇱🇧 **Ливан** - lebanon
🇱🇷 **Либерия** - liberia
🇱🇾 **Ливия** - libya
🇱🇮 **Лихтенштейн** - liechtenstein
🇱🇹 **Литва** - lithuania
🇱🇺 **Люксембург** - luxembourg

🇲🇰 **Македония** - macedonia
🇲🇬 **Мадагаскар** - madagascar
🇲🇼 **Малави** - malawi
🇲🇾 **Малайзия** - malaysia
🇲🇻 **Мальдивы** - maldives
🇲🇱 **Мали** - mali
🇲🇹 **Мальта** - malta
🇲🇶 **Мартиника** - martinique
🇲🇷 **Мавритания** - mauritania
🇲🇺 **Маврикий** - mauritius
🇾🇹 **Майотта** - mayotte
🇲🇽 **Мексика** - mexico
🇲🇩 **Молдова** - moldova
🇲🇨 **Монако** - monaco
🇲🇳 **Монголия** - mongolia
🇲🇪 **Черногория** - montenegro
🇲🇸 **Монтсеррат** - montserrat
🇲🇦 **Марокко** - morocco
🇲🇿 **Мозамбик** - mozambique
🇲🇲 **Мьянма** - myanmar

🇳🇦 **Намибия** - namibia
🇳🇵 **Непал** - nepal
🇳🇱 **Нидерланды** - netherlands
🇳🇨 **Новая Каледония** - new-caledonia
🇳🇿 **Новая Зеландия** - new-zealand
🇳🇮 **Никарагуа** - nicaragua
🇳🇪 **Нигер** - niger
🇳🇬 **Нигерия** - nigeria
🇳🇴 **Норвегия** - norway

🇴🇲 **Оман** - oman

🇵🇰 **Пакистан** - pakistan
🇵🇦 **Панама** - panama
🇵🇬 **Папуа-Новая Гвинея** - papua-new-guinea
🇵🇾 **Парагвай** - paraguay
🇵🇪 **Перу** - peru
🇵🇭 **Филиппины** - philippines
🇵🇱 **Польша** - poland
🇵🇹 **Португалия** - portugal

🇶🇦 **Катар** - qatar

🇷🇪 **Реюньон** - reunion
🇷🇴 **Румыния** - romania
🇷🇺 **Россия** - russia
🇷🇼 **Руанда** - rwanda

🇧🇱 **Сен-Бартелеми** - saint-barthelemy
🇰🇳 **Сент-Китс и Невис** - saint-kitts-and-nevis
🇱🇨 **Сент-Люсия** - saint-lucia
🇲🇫 **Сен-Мартен** - saint-martin
🇻🇨 **Сент-Винсент и Гренадины** - saint-vincent-and-the-grenadines
🇸🇲 **Сан-Марино** - san-marino
🇸🇦 **Саудовская Аравия** - saudi-arabia
🇸🇳 **Сенегал** - senegal
🇷🇸 **Сербия** - serbia
🇸🇨 **Сейшелы** - seychelles
🇸🇱 **Сьерра-Леоне** - sierra-leone
🇸🇬 **Сингапур** - singapore
🇸🇽 **Синт-Мартен** - sint-maarten
🇸🇰 **Словакия** - slovakia
🇸🇮 **Словения** - slovenia
🇸🇴 **Сомали** - somalia
🇿🇦 **Южная Африка** - south-africa
🇰🇷 **Южная Корея** - south-korea
🇪🇸 **Испания** - spain
🇱🇰 **Шри-Ланка** - sri-lanka
🇵🇸 **Государство Палестина** - state-of-palestine
🇸🇩 **Судан** - sudan
🇸🇷 **Суринам** - suriname
🇸🇿 **Эсватини** - swaziland
🇸🇪 **Швеция** - sweden
🇨🇭 **Швейцария** - switzerland
🇸🇾 **Сирия** - syria

🇹🇼 **Тайвань** - taiwan
🇹🇿 **Танзания** - tanzania
🇹🇭 **Таиланд** - thailand
🇹🇱 **Тимор-Лесте** - timor-leste
🇹🇬 **Того** - togo
🇹🇹 **Тринидад и Тобаго** - trinidad-and-tobago
🇹🇳 **Тунис** - tunisia
🇹🇷 **Турция** - turkey
🇹🇨 **Теркс и Кайкос** - turks-and-caicos-islands

🇺🇬 **Уганда** - uganda
🇬🇧 **Великобритания** - uk
🇺🇦 **Украина** - ukraine
🇦🇪 **ОАЭ** - united-arab-emirates
🇺🇾 **Уругвай** - uruguay
🇺🇸 **США** - usa
🇺🇿 **Узбекистан** - uzbekistan

🇻🇪 **Венесуэла** - venezuela
🇻🇳 **Вьетнам** - viet-nam

🇿🇲 **Замбия** - zambia
🇿🇼 **Зимбабве** - zimbabwe

💡 **Подсказка:** Вы можете вводить названия стран как на русском, так и на английском языке!
`;

module.exports = COUNTRIES_LIST;