// import { HandlebarsAdapter } from '@nestjs-modules/mailer';
//konfiguracja maila
export = {
    // nazwa uzytkownika: haslo @ host : port
    transport: {
        host: 'mail.bilka.networkmanager.pl',
        port: 587,
        ignoreTLS: true,
        secure: false,
        auth: {
            user: 'headhunter@bilka.networkmanager.pl',
            pass: '123456',
        },
    },
    defaults: {
        from: '"No Reply" <headhunter@bilka.networkmanager.pl>',
    },
    preview: true,
};
