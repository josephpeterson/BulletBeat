//Class - InputReciever (Manages all incoming and outgoing keyboard and mouse events)

export const KeyboardMap = {
    KEY_LEFT: 37,
    KEY_UP: 38,
    KEY_RIGHT: 39,
    KEY_DOWN: 40,
    KEY_SHIFT: 16,
    KEY_CAPSLOCK: 20,
    KEY_CTRL: 17,
    KEY_ALT: 18,
    KEY_ENTER: 13,
    KEY_SPACE: 32,
    KEY_TAB: 9,
    KEY_ESC: 27,
    KEY_TILDE: 192
}
export default class InputReciever {
    constructor(gameCanvas) {
        this.listeners = new Array();
        this.gameCanvas = gameCanvas;
        this.canvas = gameCanvas.getCanvas();

        window.addEventListener("mousemove", this.mouseMove.bind(this));
        window.addEventListener("click", this.mouseClick.bind(this));
        window.addEventListener("contextmenu", this.mouseRightClick.bind(this));
        window.addEventListener("keydown", this.keyDown.bind(this));
        window.addEventListener("keyup", this.keyUp.bind(this));
    }
    emit(eventCallback, event) {
        this.listeners.forEach((listener) => {
            listener[eventCallback](event);
        });
    }
    update(event) {
        var x = event.pageX - this.canvas.offsetLeft;
        var y = event.pageY - this.canvas.offsetTop;

        this.MOUSE_X = x;
        this.MOUSE_Y = y;
    }
    mouseMove(event) {
        this.update(event);
        this.emit("onMouseMove", event);
    }
    mouseClick(event) {
        this.update(event);
        this.emit("onMouseClick", event);
    }
    mouseRightClick(event) {
        event.preventDefault();
        this.emit("onMouseRightClick", event);
    }
    keyDown(event) {
        this["K" + event.keyCode] = true;
        this.emit("onKeyDown", event);
    }
    keyUp(event) {
        this["K" + event.keyCode] = false;
        this.emit("onKeyUp", event);
    }
    getKey(val) {
        var v = this["K" + val];
        if (v != true)
            v = false;
        return v;
    }
    keyCode(char) {
        return char.toUpperCase().charCodeAt(0);
    }
}