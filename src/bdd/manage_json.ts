import { writeFileSync } from 'fs';
export function updateJson(fichier: string, objetJson: object): boolean {
    try {
        const newJson: string = JSON.stringify(objetJson, null, 2);
        writeFileSync(`${fichier}`, newJson);
        return true;
    } catch (error) {
        console.error(`Erreur lors de la sauvegarde du JSON dans ${fichier} :`, error);
        return false;
    }
}
