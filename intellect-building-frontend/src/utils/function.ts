import { ProductSimple } from "../models/product";
import { format } from 'date-fns';
//import { enAU } from 'date-fns/locale';

export const compute_total = (products: Array<ProductSimple>) => {
    let total = 0;
    products.forEach((product) => {
        if (product.price > 0) {
            total += (product.quantity ?? 1) * product.price;
        }
    });
    return total;
};


export function formatDate(date: Date): string {
    return format(date, "MMMM d, yyyy : HH'h' mm");
}

export const customScrollTo = (targetY: number, duration: number) => {
    const start = window.scrollY;
    const startTime = performance.now();

    const easeInOutQuad = (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

    const animateScroll = (currentTime: number) => {
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        const ease = easeInOutQuad(progress);
        window.scrollTo(0, start + (targetY - start) * ease);

        if (timeElapsed < duration) {
            requestAnimationFrame(animateScroll);
        }
    };

    requestAnimationFrame(animateScroll);
};

export const limitContent = (input: string, number?: number): string => {
    // Supprimer les balises HTML
    const strippedString = input.replace(/<\/?[^>]+(>|$)/g, "");

    // Extraire les 5 premiers caractères
    return strippedString.slice(0, number ?? 20);
};

export function imageToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        // Événement déclenché lorsque la lecture est terminée avec succès
        reader.onloadend = () => {
            resolve(reader.result as string);
        };

        // Événement déclenché en cas d'erreur lors de la lecture
        reader.onerror = () => {
            reject(new Error("Erreur lors de la lecture du fichier"));
        };

        // Lire le fichier en tant que Data URL (qui est une chaîne Base64)
        reader.readAsDataURL(file);
    });
}

export function base64ToFile(base64String: string, filename?: string): File {
    // Extraire uniquement la partie Base64 de la chaîne (en supprimant le préfixe MIME)
    const tab = base64String.split(',')
    const byteString = atob(tab[1]);

    // Créer un tableau de 8 bits pour les données binaires
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const uint8Array = new Uint8Array(arrayBuffer);

    for (let i = 0; i < byteString.length; i++) {
        uint8Array[i] = byteString.charCodeAt(i);
    }

    const mimeType = tab[0].split(":")[1].split(";")[0]
    const blob = new Blob([uint8Array], { type: mimeType });

    return new File([blob], filename ?? "image." + mimeType.split('/')[1], { type: mimeType });
}