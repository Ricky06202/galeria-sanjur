/**
 * Convierte un valor hexadecimal de color (ej. "#RRGGBB" o "RRGGBB") a un objeto RGB.
 */
function hexToRgb(hex: string): { r: number, g: number, b: number } | null {
    // Eliminar el '#' si está presente
    hex = hex.startsWith('#') ? hex.slice(1) : hex;

    // Expandir la forma abreviada (ej. "03F" a "0033FF")
    if (hex.length === 3) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }

    // Asegurarse de que el hex tiene 6 caracteres (ignorando el alfa si lo tuviera)
    if (hex.length !== 6) {
        console.warn("Advertencia: El valor hexadecimal no es de 3 o 6 dígitos (sin alfa).");
        return null; // O podrías lanzar un error
    }

    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    return { r, g, b };
}

/**
 * Normaliza un componente de color RGB (0-255) a un valor de 0-1.
 * Luego aplica la corrección de gamma (linealización sRGB) según WCAG.
 */
function srgbToLinear(c: number): number {
    const s = c / 255; // Normalizar a 0-1
    return s <= 0.04045 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
}

/**
 * Calcula la luminancia relativa de un color RGB.
 * Fórmula WCAG: L = 0.2126 * R_linear + 0.7152 * G_linear + 0.0722 * B_linear
 */
function getRelativeLuminance(rgb: { r: number; g: number; b: number }): number {
    const rLinear = srgbToLinear(rgb.r);
    const gLinear = srgbToLinear(rgb.g);
    const bLinear = srgbToLinear(rgb.b);

    return 0.2126 * rLinear + 0.7152 * gLinear + 0.0722 * bLinear;
}

/**
 * Calcula la relación de contraste entre dos luminancias.
 * Fórmula WCAG: (L1 + 0.05) / (L2 + 0.05)
 */
function getContrastRatio(l1: number, l2: number): number {
    const lighter = Math.max(l1, l2);
    const darker = Math.min(l1, l2);
    return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Determina si el texto debe ser blanco o negro para un color de fondo dado,
 * basándose en la relación de contraste WCAG.
 */
export function getAppropriateTextColor(backgroundColorHex: string): '#000000' | '#FFFFFF' {
    const bgColorRgb = hexToRgb(backgroundColorHex);

    if (!bgColorRgb) {
        // En caso de color inválido, por defecto podríamos devolver negro o blanco
        // o lanzar un error, según la lógica de tu aplicación.
        console.error("Color hexadecimal de fondo inválido:", backgroundColorHex);
        return '#000000'; // Por defecto negro si el fondo es inválido
    }

    const bgLuminance = getRelativeLuminance(bgColorRgb);

    // Luminancia del blanco puro (1) y negro puro (0)
    const whiteLuminance = 1;
    const blackLuminance = 0;

    // Calcular la relación de contraste del fondo con el blanco
    const contrastWithWhite = getContrastRatio(bgLuminance, whiteLuminance);
    // Calcular la relación de contraste del fondo con el negro
    const contrastWithBlack = getContrastRatio(bgLuminance, blackLuminance);

    // Elegir el color de texto que proporcione el mayor contraste.
    // WCAG AA para texto normal requiere 4.5:1.
    // WCAG AAA para texto normal requiere 7:1.
    // Este algoritmo elige el que tenga MAYOR contraste, garantizando el mejor resultado.
    if (contrastWithWhite > contrastWithBlack) {
        return '#FFFFFF'; // Blanco si contrasta más con el fondo
    } else {
        return '#000000'; // Negro si contrasta más con el fondo
    }

    // Una alternativa más simple (basada en un umbral de luminancia, menos precisa que el contraste real):
    // const threshold = 0.179; // Valor derivado de la fórmula WCAG para este punto de equilibrio
    // return bgLuminance > threshold ? '#000000' : '#FFFFFF';
}

// --- Ejemplos de uso ---

// Colores claros
// console.log(`Fondo #F0F0F0 (Gris claro): Texto -> ${getAppropriateTextColor('#F0F0F0')}`); // Debería ser negro
// console.log(`Fondo #FFFF00 (Amarillo): Texto -> ${getAppropriateTextColor('#FFFF00')}`);   // Debería ser negro
// console.log(`Fondo #00FF00 (Verde brillante): Texto -> ${getAppropriateTextColor('#00FF00')}`); // Debería ser negro

// Colores oscuros
// console.log(`Fondo #000000 (Negro): Texto -> ${getAppropriateTextColor('#000000')}`);     // Debería ser blanco
// console.log(`Fondo #333333 (Gris oscuro): Texto -> ${getAppropriateTextColor('#333333')}`); // Debería ser blanco
// console.log(`Fondo #000080 (Azul marino): Texto -> ${getAppropriateTextColor('#000080')}`); // Debería ser blanco
// console.log(`Fondo #8B0000 (Rojo oscuro): Texto -> ${getAppropriateTextColor('#8B0000')}`); // Debería ser blanco

// Colores intermedios / saturados
// console.log(`Fondo #FF0000 (Rojo puro): Texto -> ${getAppropriateTextColor('#FF0000')}`);   // Debería ser blanco
// console.log(`Fondo #0000FF (Azul puro): Texto -> ${getAppropriateTextColor('#0000FF')}`);   // Debería ser blanco

// Colores abreviados
// console.log(`Fondo #FFF (Blanco): Texto -> ${getAppropriateTextColor('#FFF')}`);           // Debería ser negro
// console.log(`Fondo #000 (Negro): Texto -> ${getAppropriateTextColor('#000')}`);           // Debería ser blanco