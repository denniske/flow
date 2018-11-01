import {GeogebraParser} from "./util/geogebra-parser";

it('parses result with one variable', () => {
    const result = new GeogebraParser().parse("{x = -2, x = 2}");
    expect(result).toEqual(
        [{
            "x": {
                "symbol": "x",
                "expr": "-2",
            },
        },
            {
                "x": {
                    "symbol": "x",
                    "expr": "2",
                },
            },
        ]);
});

it('parses result with multiple variables', () => {
    const result = new GeogebraParser().parse("{{x = 2, y = 2}, {x = -2, y = -2}}");
    expect(result).toEqual(
        [{
            "x": {
                "symbol": "x",
                "expr": "2",
            },
            "y": {
                "symbol": "y",
                "expr": "2",
            },
        },
            {
                "x": {
                    "symbol": "x",
                    "expr": "-2",
                },
                "y": {
                    "symbol": "y",
                    "expr": "-2",
                },
            },
        ]);
});
