import { writeFileSync, existsSync, readFileSync } from 'fs';
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

export function readJson(fichier: string): object {
    let data = {};
    try {
        if (existsSync(fichier)) {
            data = JSON.parse(readFileSync(fichier, 'utf-8'));
        }
      } catch (error) {
        console.error("Erreur lors de la lecture du fichier jsonlogs.json :", error);
      }
    return data;
}

export function readJsonList(fichier: string): object[] {
    let data = [];
    try {
        if (existsSync(fichier)) {
            data = JSON.parse(readFileSync(fichier, 'utf-8'));
        }
      } catch (error) {
        console.error("Erreur lors de la lecture du fichier jsonlogs.json :", error);
      }
    return data;
}
