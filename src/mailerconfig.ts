// import { HandlebarsAdapter } from '@nestjs-modules/mailer';
//konfiguracja maila
export = {
  // nazwa uzytkownika: haslo @ host : port
  transport: `smtp://headhunter@bilka.networkmanager.pl:123456@mail.bilka.networkmanager.pl:587`,
  defaults: {
    from: 'headhunter@bilka.networkmanager.pl', //od kogo
  },
};
