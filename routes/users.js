// создаём роутер на экспрессе
const usersRouter = require('express').Router();

const fs = require('fs'); // модуль для работы с файлами, его методы делают разные штуки
const path = require('path'); // модуль для собирания пути до файла

// собираем адрес до "бд" с юзерами
const usersDataPath = path.join(__dirname, '../data/users.json');

// импорт нашей якобы "бд" юзердатой
// здесь мы читаем json-файл с помощью метода fs.readFileSync,
// а затем переводим его в форма JSON, потому что именно json нужен нам по заданию
// здесь используется не асинхронный метод fs.readFileSync, не уверена насчёт синх или асинх
const usersJSON = JSON.parse(fs.readFileSync(usersDataPath, { encoding: 'utf8' }));

// роутер для адреса localhost:3000/users
// в аргументе написан '/', а не '/users', потому что этот конкретный роутер запускается уже
// для запросов, начинающийхся на localhost:3000/users
usersRouter.get('/', (req, res) => {
  res.send(usersJSON); // возвращает users.json
});

// роутер для адресов типа localhost:3000/users/8340d0ec33270a25f2413b69
usersRouter.get('/:id', (req, res) => {
  // получаем объект типа { "id": "123" }, вынув из параметров запроса id пользователя
  const { id } = req.params;

  // метод arr.find перебирает все элементы массива, и возвращает текущий элемент массива
  // или undefined. В нашем случае вернётся объект массива usersJSON, если его свойство _id
  // равно запрошенному в адресной строке
  const user = usersJSON.find((obj) => obj._id === id);

  if (!user) { // если user = undefined, т.е. пользователь не найден
    res.status(404).send({ message: 'Нет пользователя с таким id' });
  } else { // иначе возвращаем объект с данными пользователя из файла users.json
    res.send(user);
  }
});

module.exports = usersRouter;
