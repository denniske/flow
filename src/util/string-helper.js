
export class StringHelper {
    static replaceAll(str, search, replacement) {
        return str.split(search).join(replacement);
    }
}