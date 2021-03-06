// import {Figure} from '../src/Figure.js';
// import { ScatterModel, ScatterView, FigureModel, FigureView } from "../../";
import { expect } from "chai";
import * as ipyvolume from "../";
import {DummyManager} from "./dummy-manager";
import {create_figure_scatter, create_model, data_float32} from "./widget-utils";

// text pixel coordinate
const test_x = 300;
const test_y = 300;
const pixel_red = [255, 0, 0, 255];

describe("scatter >", () => {
    beforeEach(async function() {
        this.manager = new DummyManager({ipyvolume});
    });

    it("create", async function() {
        const x = data_float32([0, 1]);
        const y = data_float32([2, 3]);
        const z = data_float32([0, 3]);
        const { scatter, figure } = await create_figure_scatter(this.manager, [x], [y], [z]);
        expect(scatter.model.get("x")[0][0]).to.equal(0);
        expect(scatter.model.get("x")[0][1]).to.equal(1);
    });
    it("canvas/png render check", async function() {
        const x = data_float32([0.5]);
        const y = data_float32([0.5]);
        const z = data_float32([0.5]);
        const { scatter, figure } = await create_figure_scatter(this.manager, [x], [y], [z]);
        scatter.model.set("size", 100);
        figure._real_update();
        const pixel = await figure.debug_readPixel(test_x, test_y);
        const [red, green, blue, alpha] = pixel;
        expect(red).to.be.gt(150);
        expect(green).to.eq(0);
        expect(blue).to.eq(0);
        expect(alpha).to.eq(255);
    });
});
