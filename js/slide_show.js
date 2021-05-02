

window.addEventListener('load',function(e){
    step();
});

function step(page=0){
    var slide_show=document.getElementById('slide_show');
    if(!slide_show) return;
    var children=slide_show.children;
    var numSlides=children.length-1;
    
    if((children.length==1 && children[0].id=='slide_dots') || children.length==0){ //no slides
        console.log('empty');
        return;
    }

    if(page<0){
        page=numSlides+page;
    }
    page%=numSlides;
    var slide_dots=document.getElementById('slide_dots');
    
    if(!slide_dots){
        slide_dots=document.createElement('div');
        slide_dots.setAttribute('id','slide_dots');
        slide_show.appendChild(slide_dots);
    }

    slide_dots.classList.add('active');
    
    var dots=slide_dots.children;
    if(dots.length<numSlides){
        for(var i=dots.length;i<numSlides+1;i++){
            var dot=document.createElement('div');
            dot.setAttribute('data-idx',i);
            slide_dots.appendChild(dot);
            dot.onclick=function(e){
                var dt=e.target;
                var idx=Number(dt.getAttribute('data-idx'));
                step(idx);
            };
            // dots.push(dot);
        }
    }
    dots=slide_dots.children;
    for(var i=0;i<numSlides;i++){
        if(i==page){
            dots[i].classList.add('active');
            children[i].classList.add('active');
        }
        else{
            dots[i].classList.remove('active');
            children[i].classList.remove('active');
        }
    }

    
}