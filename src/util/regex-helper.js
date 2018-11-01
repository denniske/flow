
export class RegexHelper {
    static getMatches(regex, str) {
        const matches = [];
        const clone = new RegExp(regex.source, regex.flags);
        let match = null;
        do {
            match = clone.exec(str);
            if (match) {
                matches.push(match);
            }
        } while (match);
        return matches;
    }
}
