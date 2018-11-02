import {StringHelper} from "./string-helper";

it('replaceAll should replace all occurences of search string', () => {
    const result = StringHelper.replaceAll("hello world. hello world.", "hello", "hi");
    expect(result).toEqual("hi world. hi world.");
});
