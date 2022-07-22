export  class CoursantDto{
    id: number;
    /**
        Adres e-mail.Zawiera @. Unikalny w systemie.
    */
    email: string;

    tel: string;
    firstName: string;
    lastName: string;

    /**
        Login GitHuba.Należy sprawdzić za pomocą API GH lub innym sposobem, czy taka osoba istnieje. Unikalny w systemie.
    */
    githubUsername: string;

    /**
        Tablica URL-i do portfolio.
    */
    portfolioUrls: string[];

    /**
        Tablica URL-i do GitHuba projektu zaliczeniowego.
    */
    projectUrls: string[];

    bio: string;

    /**  Oczekiwanie w stosunku do zatrudnienia:
     *  Preferowanego miejsce pracy
     *  Wybór preferowanego miejsca pracy:
     *  Na miejscu;
     *  Gotowość do przeprowadzki;
     *  Wyłącznie zdalnie;
     *  Hybrydowo
     *  Bez znaczenia (domyślnie).
     */

    /** Docelowe miasto, gdzie chce pracować kandydat */
    targetWorkCity: string;

    /**
     *   Oczekiwanie w stosunku do zatrudnienia:
     *   Oczekiwany typ kontraktu Oczekiwany typ kontraktu.
     *   Wybór:
     *   Tylko UoP;
     *   Możliwe B2B;
     *   Możliwe UZ/UoD;
     *   Brak preferencji (domyślnie).
     */
    expectedContractType: string;

    /** Oczekiwane wynagrodzenie miesięczne netto */
    expectedSalary: string;

    /** Czy kandydat wyraża zgodę na odbycie bezpłatnych praktyk/stażu na początek  */
    canTakeApprenticeship: string;

    /** Ilość miesięcy doświadczenia komercyjnego kandydata w programowaniu  */
    monthsOfCommercialExp: string;

    /**
     *   Przebieg edukacji;
     */
    education: string;

    /**
     *   Przebieg kariery zawodowej.
     */
    workExperience: string;

    /**
        Kursy i certyfikaty związane z programowaniem.
    */
    courses: string;
}