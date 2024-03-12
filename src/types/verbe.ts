export type VerbeTempsPersonne = {
    value: string;
    syllabes: number;
}

export type VerbeTemps = {
    "1s": VerbeTempsPersonne;
    "2s": VerbeTempsPersonne;
    "3s": VerbeTempsPersonne;
    "1p": VerbeTempsPersonne;
    "2p": VerbeTempsPersonne;
    "3p": VerbeTempsPersonne;
}

export type Verbe = {
    themes: string[];
    present: VerbeTemps;
    passe: VerbeTemps;
    futur: VerbeTemps
}
