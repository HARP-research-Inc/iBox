const { JSDOM } = require("jsdom");
const jQuery = require("jquery");
require('jsdom-global')();

let $;
let window;
let document;
let navigator;

beforeAll(async () => {
    const dom = await JSDOM.fromFile("index.html", {});
    window = dom.window;
    document = window.document;
    navigator = window.navigator;
    $ = jQuery(window);

    // Add jQuery, document, window, and navigator to the global scope
    global.jQuery = $;
    global.document = document;
    global.window = window;
    global.navigator = navigator;

    global.$ = $;
    require("jquery-ui-dist/jquery-ui");
    require("jquery-ui/ui/widgets/mouse");
    require("jquery-ui/ui/widgets/sortable");
});

describe("index.html interactions", () => {

    it("should have a populated list", () => {
        const listItems = $("li");
        expect(listItems.length).toBeGreaterThan(0);
    });

    it("should have jQuery UI sortable method available", () => {
        const list = $("#sortableList");
        expect(typeof list.sortable).toBe("function");
    });

    it("should initialize sortable on a list", () => {
        const list = $("#sortableList");
        list.sortable();
        expect(list.hasClass("ui-sortable")).toBe(true);
    });

    it("should move an item within the sortable list", () => {
        const list = $("#sortableList");
        list.sortable();

        const firstItemBefore = list.children().first().text();
        
        // Simulate moving the first item to the second position
        list.sortable("option", "start").call(list, null, { item: list.children().first() });
        list.sortable("option", "update").call(list, null, { item: list.children().first() });
        
        const firstItemAfter = list.children().first().text();
        
        expect(firstItemBefore).not.toBe(firstItemAfter);
    });

});

