let hamburger = document.querySelector('.hamburger');
let toolbar = document.querySelector('.tool-bar');

let pencilTool = document.querySelector('.pencil-tool');
let eraserTool = document.querySelector('.eraser-tool');

let pencil = document.querySelector('.pencil');
let eraser = document.querySelector('.eraser');

let pencilFLag = false;
let eraserFlag = false;
let flag = true;

hamburger.addEventListener('click', (e) => {
    flag = !flag;
    if (flag) {
        let iconClass = hamburger.children[0];
        iconClass.classList.remove('fa-bars');
        iconClass.classList.add('fa-times');
        toolbar.style.display = 'none';

        pencilTool.style.display = 'none';
        eraserTool.style.display = 'none';
    }
    else {
        let iconClass = hamburger.children[0];
        iconClass.classList.remove('fa-times');
        iconClass.classList.add('fa-bars');
        toolbar.style.display = 'flex';
    }
});

pencil.addEventListener('click', (e) => {

    pencilFLag = !pencilFLag;
    if (pencilFLag) {
        pencilTool.style.display = 'block';
    }
    else {
        pencilTool.style.display = 'none';
    }
});

eraser.addEventListener('click', (e) => {

    eraserFlag = !eraserFlag;
    if (eraserFlag) {
        eraserTool.style.display = 'flex';
    }
    else {
        eraserTool.style.display = 'none';
    }
});

// sticky notes

let stickyNotes = document.querySelector('.sticky-notes');
stickyNotes.addEventListener('click', (e) => {

    let stickyCont = document.createElement('div');
    stickyCont.setAttribute('class', 'sticky-cont');

    stickyCont.innerHTML = `
    <div class="head">
    <div class="mini"></div>
    <div class="del"></div>
    </div>
    <div class="base">
    <textarea></textarea>
    </div>
    `;
    document.body.appendChild(stickyCont);

    //minimize and remove 
    let mm = stickyCont.querySelector('.mini');
    let dd = stickyCont.querySelector('.del');
    noteActions(mm,dd,stickyCont);


    // drag and drop
    stickyCont.onmousedown = function (event) {
        dragAndDrop(stickyCont, event);
    };
    stickyCont.ondragstart = function () {
        return false;
    }
});

function noteActions(mm,dd,stickyCont)
{
    dd.addEventListener('click', (e)=>{
        console.log('*');
        stickyCont.remove();
    });

    // mminimize.addEventListener('click',(e)=>{
    //     let base = stickyCont.querySelector('.base');
    //     let display = getComputedStyle(base).getPropertyValue('display');

    //     if(display === 'none') base.style.display='block';
    //     else
    //     base.style.display = 'none';

    // });
}


function dragAndDrop(element, event) {
    let shiftX = event.clientX - element.getBoundingClientRect().left;
    let shiftY = event.clientY - element.getBoundingClientRect().top;

    element.style.position = 'absolute';
    element.style.zIndex = 1000;
    document.body.append(element);

    moveAt(event.pageX, event.pageY);

    // moves the element at (pageX, pageY) coordinates
    // taking initial shifts into account
    function moveAt(pageX, pageY) {
        element.style.left = pageX - shiftX + 'px';
        element.style.top = pageY - shiftY + 'px';
    }

    function onMouseMove(event) {
        moveAt(event.pageX, event.pageY);
    }

    // move the element on mousemove
    document.addEventListener('mousemove', onMouseMove);

    // drop the element, remove unneeded handlers
    element.onmouseup = function () {
        document.removeEventListener('mousemove', onMouseMove);
        element.onmouseup = null;
    };
};