export default class Controllable {
    constructor(props) {

    }
    onMouseMove(evt)
    {
        
    }
    onMouseClick(evt)
    {
        console.log("Controllable Default: Mouse has been clicked!");
    }
    onMouseRightClick(evt)
    {
        console.log("Controllable Default: Mouse has been right clicked!");
    }
    onKeyDown(evt)
    {
        console.log("Controllable Default: Keyboard key down");
    }
    onKeyUp(evt)
    {
        console.log("Controllable Default: Keyboard key up");
    }
}