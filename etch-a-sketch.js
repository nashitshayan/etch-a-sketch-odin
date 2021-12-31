
const container= document.querySelector('.container');

const btnReset = document.querySelector('.btn-reset');




for(let i=0; i<256; i++)
{
    let box= document.createElement('div');
    box.className='box';
    container.appendChild(box)
    
}



let childDivs= Array.from(container.children);


const handleMouseDown = ()=>{
    Array.from(container.children).map(child=>{
        child.addEventListener('mousemove', handleMouseMove)
    })
}

const handleMouseUp= ()=>{
    Array.from(container.children).map(child=>{
        child.removeEventListener('mousemove', handleMouseMove)
    })
}

const handleMouseMove = (e)=> e.target.style.backgroundColor='red'; //child

container.addEventListener('mousedown',handleMouseDown );
container.addEventListener('mouseup', handleMouseUp);




//console.log(childDivs)


btnReset.addEventListener('click', ()=>{
     let sqaureNum = prompt('How many squares per side?')
    container.style.setProperty('--gridRows', sqaureNum*sqaureNum);
    container.style.setProperty('--gridColumns', sqaureNum*sqaureNum);
    container.style.setProperty('--sideLength', sqaureNum);

    let children= Array.from(container.children);
    // console.log(childDivs.length)
      if(children.length>0)
        children.map(child=> container.removeChild(child))
     
    for(let i=0; i<sqaureNum*sqaureNum; i++)
        {
             let box= document.createElement('div');
             box.className='box';container.appendChild(box)
            }
    })
 