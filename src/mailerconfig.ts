// import { HandlebarsAdapter } from '@nestjs-modules/mailer';
//konfiguracja maila
export = {
  // nazwa uzytkownika: haslo @ host : port
  transport: `smtp://admin123:admin456@localhost:2500`,
  defaults: {
    from: 'admin@test.example.com', //od kogo
  },
};
