# 🚀 HeadHunter - backend v0.1

## This is a final project of MegaK Course. The main goal of application is to help recruiters get employees from the database of the company which will be using it.

# Requirements

install mysql
install nodejs

## Installation

you need to create a config-database.ts file in the config directory (src/config).
and add the data to the database connection.
```bash
$ npm install

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
| `email`      | `string` | user email `REQUIRED`|
| `pwd`      | `string` | user password  `REQUIRED`|


#### User logout request from the system

```http
  GET /auth/logout
```

| Context | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `user`      | `User` | user entity `REQUIRED`|

#### User auto login into system

=======
| Body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `user`      | `User` | user entity |

#### User auto login into system

```http
  GET /auth/auto-login
```

| Context | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `user`      | `User` | user entity `REQUIRED`|

## Admin EP

#### creates coursants account from file

```http
  POST /admin/createUsersFromFile
```

| Body | Type     | Description                       |
|:-----| :------- | :-------------------------------- |
| `file`  | `JSON file` | array of objects (user data) `REQUIRED`|

fe.

{
`email` : string required,
`courseCompletion` : number required from 0 to 5,
`courseEngagment` : number required from 0 to 5,
`projectDegree` : number required from 0 to 5,
`teamProjectDegree` : number required from 0 to 5,
`token` : string jwttoken,
`bonusProjectUrls` : Array of strings which are  github urls
}

#### creates hr user

```http
  POST /admin/addHr
```

| Body | Type     | Description                                                          |
| :-------- | :------- |:---------------------------------------------------------------------|
| `email`      | `string` | email adress `REQUIRED`                                              |
| `fullName`      | `string` | full name of hr user `REQUIRED`                                      |
| `company`      | `string` | company name of hr `REQUIRED`                                        |
| `maxReservedStudents`      | `number` | from 1 to 999 how many assigments can hr user reserve with coursant `REQUIRED` |

## HR EP

#### Get all avaiable students

```http
  GET /hr/students/available
```

| Query                            | Type               | Description                                          |
|:---------------------------------|:-------------------|:-----------------------------------------------------|
| `currentPage`                    | `number`           | number of currentPage`OPTIONAL`                      |
| `pageSize`                       | `number`           | amount of visible coursant on page `OPTIONAL`        |
| `search`                         | `string`           | search string for searching coursant `OPTIONAL`      |
| `courseCompletion`               | `number`           | note for course  completion `OPTIONAL`               |
| `courseEngagment`                | `number`           | note for course  engagement `OPTIONAL`               |
| `projectDegree`                | `number`           | note for project `OPTIONAL`                          |
| `teamProjectDegree`                | `number`           | note for team Project `OPTIONAL`                     |
| `ExpectedTypeWork`                | `array string`     | what type of work coursant expect `OPTIONAL`         |
| `ExpectedContractType`                | `array string`     | what type of contract coursant expect `OPTIONAL`     |
| `expectedSalaryMin`                | `number`           | minimal expected salary coursant expects `OPTIONAL`  |
| `expectedSalaryMax`                | `number`           | maximal expected salary coursant expects `OPTIONAL`  |
| `canTakeApprenticeship`                | `string` "Tak/Nie" | can take apprenticeship `OPTIONAL`                   |
| `monthsOfCommercialExp`                | `number`           | howy many months of experience coursant have `OPTIONAL` |

#### find all students avaiable for inteview

```http
  GET /hr/interview
```

| Query                            | Type               | Description                                          |
|:---------------------------------|:-------------------|:-----------------------------------------------------|
| `currentPage`                    | `number`           | number of currentPage`OPTIONAL`                      |
| `pageSize`                       | `number`           | amount of visible coursant on page `OPTIONAL`        |
| `search`                         | `string`           | search string for searching coursant `OPTIONAL`      |
| `courseCompletion`               | `number`           | note for course  completion `OPTIONAL`               |
| `courseEngagment`                | `number`           | note for course  engagement `OPTIONAL`               |
| `projectDegree`                | `number`           | note for project `OPTIONAL`                          |
| `teamProjectDegree`                | `number`           | note for team Project `OPTIONAL`                     |
| `ExpectedTypeWork`                | `array string`     | what type of work coursant expect `OPTIONAL`         |
| `ExpectedContractType`                | `array string`     | what type of contract coursant expect `OPTIONAL`     |
| `expectedSalaryMin`                | `number`           | minimal expected salary coursant expects `OPTIONAL`  |
| `expectedSalaryMax`                | `number`           | maximal expected salary coursant expects `OPTIONAL`  |
| `canTakeApprenticeship`                | `string` "Tak/Nie" | can take apprenticeship `OPTIONAL`                   |
| `monthsOfCommercialExp`                | `number`           | howy many months of experience coursant have `OPTIONAL` |

| Context      | Type     | Description                       |
|:-------| :------- | :-------------------------------- |
| `user` | `User` | user entity `REQUIRED`|

#### get CV of a coursant

```http
  GET /hr/cv/:id
```

| Param | Type | Description        |
|:------|:-----|:-------------------|
| `id`   | `string`  | id of cv `REQUIRED` |

#### reservation of talk with coursant 

```http
  PATCH /hr/reservation
```

| Body | Type     | Description           |
| :-------- | :------- |:----------------------|
| `studentId`      | `string` | coursant id `REQUIRED` |

| Context      | Type     | Description                       |
|:-------| :------- | :-------------------------------- |
| `user` | `User` | user entity `REQUIRED`|

#### hire coursant

```http
  PATCH /hr/hired
```

| Body | Type     | Description           |
| :-------- | :------- |:----------------------|
| `studentId`      | `string` | coursant id `REQUIRED` |

| Context      | Type     | Description                       |
|:-------| :------- | :-------------------------------- |
| `user` | `User` | user entity `REQUIRED`|

#### don't intereset in coursant

```http
  PATCH /hr/disinterest
```

| Body | Type     | Description           |
| :-------- | :------- |:----------------------|
| `studentId`      | `string` | coursant id `REQUIRED` |

| Context      | Type     | Description                       |
|:-------| :------- | :-------------------------------- |
| `user` | `User` | user entity `REQUIRED`|

## Student EP 

#### update data of coursant

```http
  PATCH /student/update
```

| Query                   | Type               | Description                                    |
|:------------------------|:-------------------|:-----------------------------------------------|
| `tel`                   | `string`           | phone number max length 15 `OPTIONAL`          |
| `firstName`             | `string`           | name of coursant length from 2 to 60           |
| `lastName`              | `string`           | last name of coursant length from 2 to 100     |
| `githubUsername`        | `string`           | github name of coursant length from 2 to 255   |
| `portfolioUrls`         | `array of string`  | array of links with projects                   |
| `projectUrls`           | `array of string`  | array of links with projects                   |
| `bio`                   | `string`           | bio `OPTIONAL`                                 |
| `targetWorkCity`        | `string`           | in which city coursant want to work `OPTIONAL` |
| `ExpectedTypeWork`      | `string`     | what type of work coursant expect              |
| `ExpectedContractType`  | `string`     | what type of contract coursant expect          |
| `education`             | `string`     | coursants education                            |
| `expectedSalary`      | `number`           | expected salary coursant expects `OPTIONAL`    |
| `canTakeApprenticeship` | `string` "Tak/Nie" | can take apprenticeship                        |
| `monthsOfCommercialExp` | `number`           | howy many months of experience coursant have   |
| `workExperience` | `string`           | is coursant having comercial experience        |
| `courses` | `string`           | finished courses                               |
| `status` | `string`           | current status of coursant                       |

| Context      | Type     | Description                       |
|:-------| :------- |:----------------------------------|
| `user` | `User` | user entity `REQUIRED`            |

#### deactivation of coursant

```http
  PATCH /student/deactivation
```

| Body | Type     | Description           |
|:-----| :------- |:----------------------|
| `userId`  | `string` | coursant id `REQUIRED` |

### 👋 Project is not finished and is completed in 70%
## Authors

- [@0xyy](https://github.com/0xyy)
- [@hydraChaosu](https://github.com/hydraChaosu)
- [@BilkaDev](https://github.com/BilkaDev)