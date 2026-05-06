/**
 * Tests for js/script.js
 *
 * Run with: npm test
 * Run with coverage: npm run test:coverage
 */

// Rebuild the DOM before each test so module init code runs cleanly
function setupDOM() {
    document.body.innerHTML = `
        <h1 id="header"></h1>
        <button id="testButton">Click me</button>
        <form>
            <input type="text" id="color" value="">
        </form>
        <select id="mySelect">
            <option value="apple">Apple</option>
            <option value="banana">Banana</option>
            <option value="orange">Orange</option>
        </select>
    `;
    document.body.style.background = "";
}

describe("script.js", () => {
    let script;

    beforeEach(() => {
        jest.resetModules();
        setupDOM();
        script = require("../js/script");
    });

    // -------------------------------------------------------------------------
    // Initialization
    // -------------------------------------------------------------------------
    describe("initialization", () => {
        test("sets header to welcome message with version number", () => {
            expect(document.getElementById("header").innerHTML).toBe(
                "Welcome to my website! V.1.01"
            );
        });

        test("attaches change listener to mySelect", () => {
            const consoleSpy = jest
                .spyOn(console, "log")
                .mockImplementation(() => {});
            const select = document.getElementById("mySelect");
            select.value = "orange";
            select.dispatchEvent(new Event("change"));
            expect(consoleSpy).toHaveBeenCalledWith("fruit ran", "orange");
            consoleSpy.mockRestore();
        });
    });

    // -------------------------------------------------------------------------
    // changeColor()
    // -------------------------------------------------------------------------
    describe("changeColor()", () => {
        test("sets body background to the value in the color input", () => {
            document.getElementById("color").value = "red";
            script.changeColor();
            expect(document.body.style.background).toBe("red");
        });

        test("accepts named color values", () => {
            document.getElementById("color").value = "lightblue";
            script.changeColor();
            expect(document.body.style.background).toBe("lightblue");
        });

        test("accepts hex color values", () => {
            document.getElementById("color").value = "#ff0000";
            script.changeColor();
            // jsdom normalises hex to rgb
            expect(document.body.style.background).toBe("rgb(255, 0, 0)");
        });

        test("clears background when color input is empty", () => {
            document.body.style.background = "red";
            document.getElementById("color").value = "";
            script.changeColor();
            expect(document.body.style.background).toBe("");
        });
    });

    // -------------------------------------------------------------------------
    // resetColor()
    // -------------------------------------------------------------------------
    describe("resetColor()", () => {
        test("resets body background to lightblue", () => {
            document.body.style.background = "red";
            script.resetColor();
            expect(document.body.style.background).toBe("lightblue");
        });

        test("resets from any arbitrary background", () => {
            document.body.style.background = "green";
            script.resetColor();
            expect(document.body.style.background).toBe("lightblue");
        });

        test("is idempotent — calling twice leaves background as lightblue", () => {
            script.resetColor();
            script.resetColor();
            expect(document.body.style.background).toBe("lightblue");
        });
    });

    // -------------------------------------------------------------------------
    // runFruit()
    // -------------------------------------------------------------------------
    describe("runFruit()", () => {
        test("logs the currently selected fruit", () => {
            const consoleSpy = jest
                .spyOn(console, "log")
                .mockImplementation(() => {});
            document.getElementById("mySelect").value = "banana";
            script.runFruit();
            expect(consoleSpy).toHaveBeenCalledWith("fruit ran", "banana");
            consoleSpy.mockRestore();
        });

        test("logs the first option when no explicit selection is made", () => {
            const consoleSpy = jest
                .spyOn(console, "log")
                .mockImplementation(() => {});
            script.runFruit();
            expect(consoleSpy).toHaveBeenCalledWith("fruit ran", "apple");
            consoleSpy.mockRestore();
        });

        test("logs each option correctly when iterated", () => {
            const consoleSpy = jest
                .spyOn(console, "log")
                .mockImplementation(() => {});
            const values = ["apple", "banana", "orange"];

            values.forEach((v) => {
                document.getElementById("mySelect").value = v;
                script.runFruit();
            });

            expect(consoleSpy).toHaveBeenCalledTimes(values.length);
            values.forEach((v) => {
                expect(consoleSpy).toHaveBeenCalledWith("fruit ran", v);
            });
            consoleSpy.mockRestore();
        });
    });

    // -------------------------------------------------------------------------
    // runTestButton()
    // -------------------------------------------------------------------------
    describe("runTestButton()", () => {
        test("logs 'testButton' to the console", () => {
            const consoleSpy = jest
                .spyOn(console, "log")
                .mockImplementation(() => {});
            script.runTestButton();
            expect(consoleSpy).toHaveBeenCalledWith("testButton");
            consoleSpy.mockRestore();
        });
    });

    // -------------------------------------------------------------------------
    // testButton click handler (wired up in script.js)
    // -------------------------------------------------------------------------
    describe("testButton click event", () => {
        test("calls runTestButton when testButton is clicked", () => {
            const consoleSpy = jest
                .spyOn(console, "log")
                .mockImplementation(() => {});
            const alertMock = jest
                .spyOn(window, "alert")
                .mockImplementation(() => {});

            document.getElementById("testButton").click();

            expect(consoleSpy).toHaveBeenCalledWith("testButton");

            consoleSpy.mockRestore();
            alertMock.mockRestore();
        });

        test("shows an alert containing the click message when testButton is clicked", () => {
            const consoleSpy = jest
                .spyOn(console, "log")
                .mockImplementation(() => {});
            const alertMock = jest
                .spyOn(window, "alert")
                .mockImplementation(() => {});

            document.getElementById("testButton").click();

            expect(alertMock).toHaveBeenCalledWith(
                expect.stringContaining("Button was clicked!")
            );

            consoleSpy.mockRestore();
            alertMock.mockRestore();
        });

        test("alert message includes the current date/time string", () => {
            const consoleSpy = jest
                .spyOn(console, "log")
                .mockImplementation(() => {});
            const alertMock = jest
                .spyOn(window, "alert")
                .mockImplementation(() => {});

            document.getElementById("testButton").click();

            const alertArg = alertMock.mock.calls[0][0];
            // The date portion should look like a locale date string (non-empty)
            const datePart = alertArg.replace("Button was clicked!!!!!!!", "").trim();
            expect(datePart.length).toBeGreaterThan(0);

            consoleSpy.mockRestore();
            alertMock.mockRestore();
        });
    });
});
