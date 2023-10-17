const container = document.getElementById('map');
let hoverImage = document.getElementById('hoverImage');
let image = container.getElementsByTagName('img')[0];
let areas = document.getElementsByTagName('area');

/*const containerRect = container.getBoundingClientRect();
let contX = containerRect.left;
let contY = containerRect.top;

let central = './assets/images/Central.PNG';
let north = './assets/images/North.jpg';
let southwest = './assets/images/Southwest.jpg';
let orchard = './assets/images/OrchardHill.jpg';
let northeast = './assets/images/Northeast.jpg';
let sylvan = './assets/images/Sylvan.jpg';
let honors = './assets/images/Honors.jpg';


/*let regions = [
  { x1: 440, y1: 283, x2: 504, y2: 324, image: central},
  { x1: 286, y1: 26, x2: 339, y2: 52, image: north},
  { x1: 140, y1: 510, x2: 207, y2: 557, image: southwest},
  { x1: 487, y1: 208, x2: 584, y2: 245, image: orchard},
  { x1: 322, y1: 104, x2: 377, y2: 197, image: northeast},
  { x1: 394, y1: 25, x2: 454, y2: 67, image: sylvan},
  { x1: 170, y1: 343, x2: 220, y2: 389, image: honors},
];*/

function showImage(imageUrl){
  let hoverImage = document.getElementById('hoverImage');
  hoverImage.src = imageUrl;
}


/*<script>
  function navigateToPage(url) {
    window.location.href = url;
  }
</script>*/





container.addEventListener("mousemove", function(event) {
  let contX = container.offsetLeft;
  let contY = container.offsetTop;  
  let mouseX = event.pageX - contX - image.offsetLeft;
  let mouseY = event.pageY - contY - image.offsetTop;
  //console.log(`Mouse position within container: x=${mouseX}, y=${mouseY}`);
  
  let areas = document.getElementsByTagName('area');
  for(let i = 0; i < areas.length; i++){
    let coords = areas[i].coords.split(',');
    //console.log(coords);
    let x1 = parseInt(coords[0]);
    let y1 = parseInt(coords[1]);
    let x2 = parseInt(coords[2]);
    let y2 = parseInt(coords[3]);

    //console.log(`x1: ${x1}`);
    if(mouseX >= x1 && mouseX <= x2 && mouseY >= y1 && mouseY <= y2) {
      let imageUrl = areas[i].getAttribute('data-image');
      if(hoverImage !== null){
        if(imageUrl == ""){
          hoverImage.style.display = 'none';
        }
        else{
           //console.log(imageUrl);
          showImage(imageUrl);
          hoverImage.style.left = event.pageX + 'px';
          hoverImage.style.top = event.pageY + 'px';
          hoverImage.style.display = 'block';
          break;
        }
      }
    } /*else {
      //console.log("test");
      if(hoverImage !== null){
        hoverImage.style.display = 'none';
      }*/
    //}
  }
});
  
  /*let source = "";
  regions.forEach(function(region) {
    if(x >= region.x1 && x <= region.x2 && y >= region.y1 && y <= region.y2) {
      source = region.image;
    }
  });
  if(source === ""){
    image.onerror = function(){
      image.style.display = "none";
    };
  }
  if(hoverImage.src !== source){
    hoverImage.src = source;
    showImage(event);
    hoverImage.style.transform = "translate("+ x +"px, "+ y + "px)";
  }*/