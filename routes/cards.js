// создаём роутер на экспрессе
const cardsRouter = require('express').Router();

const fs = require('fs'); // модуль для работы с файлами, его методы делают разные штуки
const path = require('path'); // модуль для собирания пути до файла

// собираем адрес до "бд" с карточками
const cardsDataPath = path.join(__dirname, '../data/cards.json');

// импорт нашей якобы "бд" с карточками
// здесь мы читаем json-файл с помощью метода fs.readFileSync,
// а затем переводим его в форма JSON, потому что именно json нужен нам по заданию
// здесь используется не асинхронный метод fs.readFileSync, не уверена насчёт синх или асинх
const cardsJSON = JSON.parse(fs.readFileSync(cardsDataPath, { encoding: 'utf8' }));

// возвращает JSON со всеми карточками при запросе GET localhost:3000/cards
cardsRouter.get('/', (req, res) => {
  res.send(cardsJSON);
});

module.exports = cardsRouter;
