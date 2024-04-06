export const toTitle = (text: string): string => {

    const words = text.split('_');

    if (words.length > 0) {
        words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1).toLowerCase();
    }

    return words.join(' ');
}