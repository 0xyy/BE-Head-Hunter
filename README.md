
# 🚀 HeadHunter - backend v0.1 

## This is a final project of MegaK Course. The main goal of application is to help recruiters get employees from the database of the company which will be using it.




## 🛠 Technologies used in this project:
- TypeScript
- NestJS
- TypeORM

## 🛠 Packages used in this project:
- @nestjs-modules/mailer: "^1.7.1",
- @nestjs/axios: "^0.1.0,
- @nestjs/passport: "^9.0.0",
- @nestjs/throttler: "^3.0.0",
- @nestjs/typeorm: "^9.0.0",
- axios: "^0.27.2",
- class-transformer: "^0.5.1",
- class-validator: "^0.13.2",
- cookie-parser: "^1.4.6",
- mime: "^3.0.0",
- multer: "^1.4.5-lts.1",
- mysql2: "^2.3.3",
- nodemailer: "^6.7.7",
- passport: "^0.6.0",
- passport-jwt: "^4.0.0",
- reflect-metadata: "^0.1.13",
- rimraf: "^3.0.2",
- rxjs: "^7.2.0",
- typeorm: "^0.3.7",
- uuid: "^8.3.2"

## 🛠 Main API Reference
## Auth EP
#### User Login request into system

```http
  POST /auth/login
```

| Body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `email`      | `string` | user email |
| `pwd`      | `string` | user password  |


#### User logout request from the system

```http
  GET /auth/logout
```

| Body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `user`      | `User` | user entity |

#### User auto login into system

```http
  GET /auth/auto-login
```

| Body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `user`      | `User` | user entity |

## Admin EP

```http
  POST /admin/createUsersFromFile
```


### 👋 Project is not finished and is completed in 70%
## Authors

- [@0xyy](https://github.com/0xyy)
- [@hydraChaosu](https://github.com/hydraChaosu)
- [@BilkaDev](https://github.com/BilkaDev)




