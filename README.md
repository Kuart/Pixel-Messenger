# Pixel Messenger

##### Мессенджер реализованный c использованием самописной библиотеки по отрисовки интерфейсов.

### Структура библиотеки

- [root](https://github.com/Kuart/middle.messenger.praktikum.yandex/tree/main/src/utils/pixel/root) - Связывающий класс
- [parser](https://github.com/Kuart/middle.messenger.praktikum.yandex/tree/main/src/utils/pixel/parser) - Парсит html в VDOM
- [pixelDom](https://github.com/Kuart/middle.messenger.praktikum.yandex/tree/main/src/utils/pixel/pixelDom) - Работа с VDOM нодами
- [router](https://github.com/Kuart/middle.messenger.praktikum.yandex/tree/main/src/utils/pixel/router) - Работа с History api
- [store](https://github.com/Kuart/middle.messenger.praktikum.yandex/tree/main/src/utils/pixel/store) - Глобальное хранилище

### Страницы

- /login
- /register
- /messenger
- /error | 500 err
- /wrong | 404 err

### Команды

Запуск образа

```sh
npm i
npm run build
docker build -t <name> .
docker run -p 3000:3000 -d <name>
```

### **Ссылки**

- «[Heroku](https://pixel-messenger.herokuapp.com/)»,
- «[Макеты Figma](https://www.figma.com/file/J0pgivTE3a1LNOoGOEZOAV/PixelChat?node-id=1%3A20)»,
