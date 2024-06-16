# TODO

## Подготовка
Необходимо настроить использование прокси
```
npm config set registry http://rpm.svc/repository/npm-all/
npm config set @svyazcom:registry http://rpm.svc/repository/npm-stable/
```

## Подключение в проекты не по шаблону
```shell
npm i @svyazcom/ui-kit
npm i -D tailwindcss postcss autoprefixer
```

Собрать переменные цветов 
```
node build-variables-theme.js
```
