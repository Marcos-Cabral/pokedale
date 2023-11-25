export function typesMatch(type: string, types: string[], position: number) {
    if (!types[position] && !type) {
        return "#92cc41";
    } else if (!types.includes(type)) {
        return "#e76e55";
    } else if (types[position] && types[position] == type) {
        return "#92cc41";
    } else {
        return "#f7d51d";
    }
}