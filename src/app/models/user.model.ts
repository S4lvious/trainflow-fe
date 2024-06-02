export interface User {
    AbilitaBetting?: boolean;
    AbilitaCasino?: boolean;
    AbilitaPoker?: boolean;
    AbilitaStreaming?: boolean;
    AbilitaVirtual?: boolean;
    CodicePromoter?: string | null;
    DefaultUser?: boolean;
    Fido?: number;
    MinutiViewRiserve?: number;
    RiskToken?: string;
    Saldo?: number;
    Seriale?: string | null;
    abilitacasinolive?: boolean;
    abilitaparametri?: any; // Modifica il tipo in base al dato reale
    agenzia?: boolean;
    askNewPassword?: boolean;
    attivo?: boolean;
    auth?: string;
    banca?: string;
    bonus?: number;
    bonus_rete?: number;
    c_bonus?: number;
    c_fido?: number;
    c_saldo?: number;
    cap?: string;
    cellulare?: string;
    cf?: string;
    codaschedina?: string;
    cognome?: string;
    conferma_email?: string;
    conflittoSessione?: boolean;
    currency?: string;
    datacreazione?: string;
    datanascita?: string | null;
    dataultimaoperazione?: string;
    email?: string;
    email_paypal?: string;
    externalID?: string;
    fax?: string;
    fido_rete?: number;
    id_contratto?: number;
    id_culture?: any; // Modifica il tipo in base al dato reale
    id_dominio?: number;
    id_padre?: number;
    id_utente?: number;
    id_wb_father?: string;
    id_wb_user?: string;
    idutentecasino?: number;
    indirizzo?: string;
    ip?: string;
    livello?: number;
    localita?: string;
    loginTry?: number;
    longdescription?: string;
    luogonascita?: string;
    mostraSaldoConto?: boolean;
    namedomain?: string;
    nazione?: string;
    nome?: string;
    normJ?: any; // Modifica il tipo in base al dato reale
    notarischio?: string;
    note?: string;
    nr_child?: number;
    nrchild?: number;
    numeroconto?: string;
    password?: string;
    prefix?: any; // Modifica il tipo in base al dato reale
    prov?: string;
    psw?: any; // Modifica il tipo in base al dato reale
    quoteprorprie?: boolean;
    ruolo?: string;
    saldo_rete?: number;
    saldofido?: number;
    sesso?: string;
    short_description?: string;
    stringa_paypal?: string;
    suffisso?: string[];
    telefono?: string;
    treetop?: string[];
    ultimaSessione?: string;
    username?: string;
    welcome_bonus?: number;
    withdrawable?: number;
}

export interface globalGameParameters {
    id_PUG: number;
    id_sport: number;
    id_nazione: number;
    id_campionato: number;
    id_evento: string;
    max_bet: number;
    max_win: number;
    tipologia: string;
    Tipo_blocco: string;
    id_utente: number;
    names: string;
    namec: string;
    namet: string;
    namee: string;
    nameid: string;
    ruolo: string;
    attivo: number;
}
