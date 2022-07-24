import { HrStudentForInterviewDto } from '../../student/dto/hr-student-for-interview.dto';

export interface StudentInterface {}

export enum StudentStatus {
  ACCESSIBLE,
  PENDING,
  EMPLOYED,
}

export enum ExpectedTypeWork {
  ALL,
  REMOTE,
  STATIONARY,
  HYBRID,
}

export enum ExpectedContractType {
  NOPREFERENCE,
  UOP,
  B2B,
  UZUOD,
}

export type StudentResponse = {
  isSuccess: boolean;
};
export type ActiveStudentsResponse = {};
export type StudentForInterviewResponse = {
  currentPage: number;
  pageSize: number;
  pageCount: number;
  students: HrStudentForInterviewDto[];
};
export type StudentCvProfilResponse = {
  /**   Jeżeli ktoś nie uzupełnił loginu GitHub to wyświetlamy domyślną ikonkę awatarową. Np. taką jak na makiecie czy https://www.deviantart.com/karmaanddestiny/art/Default-user-icon-4-858661084 .
   *
   *        Jeżeli natomiast ktoś podał login, to ikonę generujemy automatycznie. Jest to bardzo proste.
   *
   *    Wystarczy stworzyć taki URL:
   *        https://github.com/<nazwa_usera_na_GitHub>.png
   *
   *    Np:
   *        https://github.com/Ami777.png
   */
  avatar: string;

  /**
   * Imię i Nazwisko
   */
  fullName: string;

  /**
   * Krótkie bio.
   */
  bio: string;

  /**
   *   Login GitHuba.
   */
  githubUsername: string;

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
  teamProjectDegree: number;

  /**
   *   Portfolio - linki klikalne;
   */
  portfolioUrls: string[];

  /**  Projekt w zespole Scrumowym:
   *   Linki do repozytoriów GitHub;
   */
  teamProjectGitHubs: string[];

  /**
   *  Projekt w zespole Scrumowym:
   *  Linki do kodu własnego GitHub - należy przekierować bezpośrednio do widoku commitów odpowiedniego użytkownika GitHub (np. https://github.com/Ami777/MegaKursTest/commits?author=Ami777 );
   */
  teamProjectGitHubOwnCode: string;

  /**
   *  Projekt w zespole Scrumowym:
   *  Linki do code review na GitHub - należy przekierować bezpośrednio do widoku wykonanych pull requestów na branchu develop odpowiedniego użytkownika GitHub (np. https://github.com/Ami777/MegaKursTest/pulls?q=is%3Apr+reviewed-by%3AAmi777 );
   */
  teamProjectGitHubOwnCodeReview: string;

  /**
   *  Projekt w zespole Scrumowym:
   *  Projekt na zaliczenie - są to linki, które przekierowują do widoku projektów na GitHub wykonanych w ramach pracy zaliczeniowej.
   */
  projectUrls: string[];

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

  /**
   *   Oczekiwanie w stosunku do zatrudnienia:
   *   Docelowe miasto, gdzie chce pracować kandydat
   */
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

  /**
   *   Oczekiwanie w stosunku do zatrudnienia:
   *   Oczekiwane wynagrodzenie miesięczne netto
   */
  expectedSalary: string;

  /**
   *  Oczekiwanie w stosunku do zatrudnienia:
   *  Czy kandydat wyraża zgodę na odbycie bezpłatnych praktyk/stażu na początek
   */
  canTakeApprenticeship: string;

  /**
   *   Ilość miesięcy doświadczenia komercyjnego kandydata w programowaniu
   */
  monthsOfCommercialExp: string;

  /**
   *   Przebieg edukacji;
   */
  education: string;

  /**
   *   Przebieg kariery zawodowej.
   */
  workExperience: string;
};
