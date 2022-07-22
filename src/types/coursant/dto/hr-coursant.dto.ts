export class HrCoursantDto{
    id: number;

    /** Imię i Nazwisko */
    fullName: string;

    /**
     * Ocena przerobienia materiału na Mega K - z gwiazdkami w skali 0 - 5;
     */
    courseCompletion: number;

    /**
     *  Ocena zaangażowania na Mega K - z gwiazdkami w skali 0 - 5;
     */
    courseEngagment: number;

    /**
     *   Ocena za kod własny w projekcie zaliczeniowym na Mega K - z gwiazdkami w skali 0 - 5;
     */
    projectDegree: number;

    /**
     *  Ocena pracy w zespole w projekcie Scrumowym na Mega K - z gwiazdkami w skali 0 - 5;
     */
    teamProjectDegree:number;

    /**  Oczekiwanie w stosunku do zatrudnienia:
     *  Preferowanego miejsce pracy
     *  Wybór preferowanego miejsca pracy:
     *  Na miejscu;
     *  Gotowość do przeprowadzki;
     *  Wyłącznie zdalnie;
     *  Hybrydowo
     *  Bez znaczenia (domyślnie).
     */
    expectedTypeWork: string;

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

}