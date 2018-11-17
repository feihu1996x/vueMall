# vue_mall

> 使用Vue2.0/Node.js/MongoDB打造的商城系统

## Tech Stack

- HTML/CSS/JavaScript
- Vue
- Webpack
- Node.js/Express
- MongoDB
- PM2
- Nginx

## Build Setup

``` bash
# 导入原始数据
mongoimport -d vueMall -c goods --file goods
mongoimport -d vueMall -c users --file users

# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test

# serve for production
cd server
npm install
npm run start
```

## Demo Link

[http://dev.feihu1996.cn/vueMall](http://dev.feihu1996.cn/vueMall 'vueMall')
