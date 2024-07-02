//----------------------main.js----------------------------
var cnvs,ctx,w,h,data,img;

addEventListener('load',function(){
    init();  
})



function init(){
    var file=document.getElementById("file");
    img=document.getElementById('image');
    file.onchange=function(e){
        var file=e.target.files[0];
        img.src=URL.createObjectURL(file);
        var btn=document.getElementById('fileSelectionDoneButton');        
        btn.disabled=false;
        img.onload=preFormat;
        // if(img.width>0) //its loaded 
        //     preFormat();
    }
    // for debugging
    // document.body.prepend(cnvs);
}

var isImageLoaded=0;



function preFormat(){
    isImageLoaded=1;

    cnvs=document.createElement('canvas');
    ctx=cnvs.getContext('2d');
    w=cnvs.width=img.naturalWidth;
    h=cnvs.height=img.naturalHeight;
    
    ctx.drawImage(img,0,0);
    data=ctx.getImageData(0,0,w,h).data;
}


// var block=50; //todo: make this preperty accessable with html





function format(shouldDispCanvas=0){
    if(shouldDispCanvas){
        document.getElementById("canvasPreviewContiner").innerHTML="Loading Preview...";
    }
    var block=100-getSeekValue();
    if(block<1){ //just in case
        block=1;
    }else if(block>100){
        block=100;
    }
    var inpt=document.getElementById("code");
    var outpt=document.getElementById('formatted');
    var inDat=inpt.value.replace(/[\s\n]/gmi,'');
    //todo: add any minifier api or code it 
    // inDat=preProcessText(inDat);
    var dataIdx=0;
    outpt.value='';
    ctx.clearRect(0,0,w,h);
    for(var y=0;y<h;y+=block){
        for(var x=0;x<w;x+=block){
            var i=(x+y*w)*4;
            var avg=(data[i]+data[i+1]+data[i+2])/3;
            ctx.fillStyle=`rgb(${avg},${avg},${avg})`;
            ctx.fillRect(x,y,block,block);
            if(!shouldDispCanvas){
                if(avg<=112){
                    outpt.value+='  ';
                }else{
                    if(dataIdx+1<(inDat.length-1)){
                        outpt.value+=inDat[dataIdx]+inDat[dataIdx+1];
                                    
                        dataIdx+=2;
                    } else if(dataIdx==(inDat.length-1)){
                        outpt.value+=inDat[dataIdx];
                        dataIdx+=1;
                    }
                }
                if(x==0){
                    outpt.value+='\n';
                }
            }
        }
    }
    if(!shouldDispCanvas){
        for(dataIdx;dataIdx<inDat.length;dataIdx++){
            outpt.value+=inDat[dataIdx];
        }    
    }
    if(shouldDispCanvas){
        var cnvsContainer=document.getElementById("canvasPreviewContiner");
        cnvsContainer.innerHTML='';
        cnvsContainer.appendChild(cnvs);
    }
}


//this is expexted to perform a code compression by removing extra spaces 
//todo : add a functionality to check if compressed code is valid
// function preProcessText(code){
//     var ret='';
//     var wasPreviousOneSpace=0;
//     for(var i=0;i<code.length;i++){
//         if(!(code[i]==' ' && wasPreviousOneSpace)){
//             ret+=code[i];
//         }
//     }
//     return ret;
// }



// -------------------------seekbar.js-----------------------------

var seekBar=document.getElementById('seekBar');
var seekTrack=document.getElementById('seekTrack');
var seekTrack=document.getElementById('seekTrack');
var seekTrackFilled=document.getElementById('seekTrackFilled');
var seekTrackThumb=document.getElementById('seekTrackThumb');

var isDraggingSeekbar=0;

seekBar.onmousedown=function(){
    isDraggingSeekbar=1;
}

window.addEventListener('mouseup',function(){
    isDraggingSeekbar=0;
});
window.addEventListener('mousemove',function(e){
    if(isDraggingSeekbar){
        slideSeekBarTo(e.clientX);
    }
})


seekBar.addEventListener('click',function(e){
    slideSeekBarTo(e.clientX);
})

addEventListener('load',function(){
    seekTrack.style.width='50%'
})

function slideSeekBarTo(x){
    var seekBarPos={
        'x':seekBar.offsetLeft,
        'w':seekBar.offsetWidth,
    }
    if(x>=seekBarPos.x && x<=seekBarPos.x+seekBarPos.w){
        var percent=Math.round(100*((x-seekBarPos.x)/seekBarPos.w));
        seekTrack.style.width=percent+'%';        
    }

}

function getSeekValue(){ //in percent
    return (Number(seekTrack.style.width.replace(/\D/gmi,'')));
}

