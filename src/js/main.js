console.log('hi');
import '../scss/style.scss';


var imgSvg = document.querySelectorAll('.img-svg');

for(var i = 0; i < imgSvg.length; i++)
{
    var img = imgSvg[i];
    var imgClass = img.getAttribute('class');
    var imgUrl = img.getAttribute('src');

    var request = new XMLHttpRequest();
    request.open('GET', imgUrl, false);

    request.onload = function() {
        if (this.status >= 200 && this.status < 400) {
          // Success!
          var data = this.response;
          var parser = new DOMParser();
          var htmlSvg = parser.parseFromString(data, 'text/html');
          var svg = htmlSvg.querySelector('svg');

          svg.setAttribute('class', 'img-svg');
          console.log(svg);

          // img.replaceWith(svg);
          img.parentElement.insertBefore(svg, img);
          img.parentElement.removeChild(img);
          
        }
        else 
        {
          console.log('error!');
        }
      };
      
      request.onerror = function(e) {
          console.log(e);
        // There was a connection error of some sort
      };
      
      request.send();
}

