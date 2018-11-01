import {GeogebraParser} from "./geogebra-parser";

export class GeogebraService {
    static load(onLoaded) {
        this.onLoaded = onLoaded;
        const parameters = {
            "id": "applet",
            "appletOnLoad": () => {
                this.applet = window.applet;
                this.handleAppletLoaded()
            },
            "appName": "web3d",
            "width": 435,
            "height": 185,
            "showToolBar": false,
            "borderColor": null,
            "showMenuBar": false,
            "showAlgebraInput": false,
            "showResetIcon": true,
            "enableLabelDrags": false,
            "enableShiftDragZoom": true,
            "enableRightClick": false,
            "capturingThreshold": null,
            "showToolBarHelp": false,
            "errorDialogsActive": true,
            "useBrowserForJS": false
        };
        this.applet = new window.GGBApplet(parameters, '5.0');
        this.applet = this.applet.inject('applet-container');
    }

    static handleAppletLoaded() {
        if (this.applet.evalCommandCAS("2*x") === "2x") {
            this.onLoaded();
            return;
        }
        setTimeout(() => this.handleAppletLoaded(), 200);
    }

    static ggbCommand(command) {
        console.log(command);
        return this.applet.evalCommand(command);
    }

    static casCommand(command) {
        console.log(command);
        return this.applet.evalCommandCAS(command);
    }

    static casSolve(equations, variables) {
        const command = "Solve({" + equations.join(",") + "}, {" + variables.join(",") + "})";
        let result = this.casCommand(command);
        return new GeogebraParser().parse(result);
    }
}
