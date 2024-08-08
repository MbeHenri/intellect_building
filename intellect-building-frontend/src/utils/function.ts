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