console.log('hi');
import '../scss/style.scss';
// import { tns } from "../../node_modules/tiny-slider/src/tiny-slider";
// import tns from 'tiny-slider';
import 'owl.carousel';

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

// $('img.img-svg').each(function(){
//   var $img = $(this);
//   var imgClass = $img.attr('class');
//   var imgURL = $img.attr('src');
//   $.get(imgURL, function(data) {
//     var $svg = $(data).find('svg');
//     if(typeof imgClass !== 'undefined') {
//       $svg = $svg.attr('class', imgClass+' replaced-svg');
//     }
//     $svg = $svg.removeAttr('xmlns:a');
//     if(!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
//       $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
//     }
//     $img.replaceWith($svg);
//   }, 'xml');
// });

// console.log(tns);

// var topCompanies = tns({
//   container: '.top-companies-slider-wrapper',
//   slideBy: 1,
//   items: 3,
//   auto: false,
//   speed: 500,
//   autoplayTimeout: 500, 
//   nav: false,
//   // controlsContainer: '.partners-slider-controls',
//   mouseDrag: true,
//   // responsive: {
//   //     0: 
//   //     {
//   //         items: 1
//   //     },
//   //     400:
//   //     {
//   //         items: 2
//   //     },
//   //     620: 
//   //     {
//   //         items: 3
//   //     },
//   //     1031:
//   //     {
//   //         items: 5
//   //     }
//   // }
// });

// console.log($('.container'));

$('.top-companies-slider-wrapper').owlCarousel({
  loop:true, //Зацикливаем слайдер
  items:3,
  margin:20, //Отступ от элемента справа в 50px
  nav:true, //Отключение навигации
  dots: false,
  autoplay: false, //Автозапуск слайдера
  smartSpeed:300, //Время движения слайда
  autoplayTimeout:300, //Время смены слайда
  mouseDrag: false,
  touchDrag: false,
  navContainer: '.navigation-top-companies',
  navText: ["<div class='arrow-slider'><img src='./img/arrow_slider_left.svg'></div>", "<div class='arrow-slider'><img src='./img/arrow_slider_right.svg'></div>"],
});

$('.usage-steps-slider-wrapper').owlCarousel({
  loop:true, //Зацикливаем слайдер
  items:1,
  margin:0, //Отступ от элемента справа в 50px
  nav:true, //Отключение навигации
  dots: false,
  autoplay: false, //Автозапуск слайдера
  smartSpeed:300, //Время движения слайда
  autoplayTimeout:300, //Время смены слайда
  mouseDrag: false,
  touchDrag: false,
  navContainer: '.navigation-steps-slider',
  navText : ["<div class='arrow-steps arrow-steps__left'><img src='./img/arrow_right_step.svg' style='transform:rotateZ(180deg)'>Шаг <span></span></div>","<div class='arrow-steps arrow-steps__right'>Шаг <span></span><img src='./img/arrow_right_step.svg'></div>"],
  onInitialized: function(e) {
    // $('.arrow-steps__right span')..text('/ '+ this.items().length / 4);
    $('.arrow-steps__right span').text('2');
    let currentGroupSlider = $('.count-slider-nav span').eq(0).text();
    let lengthGroupSlider  = this.items().length / 4;
    // console.log(lengthGroupSlider);
    console.log(currentGroupSlider);

    $('.dairy-complexes-slider-nav .owl-next').click(function()
    {
      if(currentGroupSlider < lengthGroupSlider)
      {
        currentGroupSlider++;
        $('.count-slider-nav span').eq(0).text(currentGroupSlider);
      }
    });

    $('.dairy-complexes-slider-nav .owl-prev').click(function()
    {
      if(currentGroupSlider > 1)
      {
        currentGroupSlider--;
        $('.count-slider-nav span').eq(0).text(currentGroupSlider);
      }
    });

  }

});

// $('.dairy-complexes-slider').owlCarousel({
//   loop:false, //Зацикливаем слайдер
//   margin:30, //Отступ от элемента справа в 50px
//   nav:true, //Отключение навигации
//   smartSpeed:300, //Время движения слайда
//   autoplayTimeout:300, //Время смены слайда
//   dots: false,
//   items: 4,
//   slideBy: 4,
//   navContainer: '.dairy-complexes-slider-nav',
//   navText : ["<img src='img/img_arrow_left.svg'>", "<img src='img/img_arrow_right.svg'>"],
//   onInitialized: function(e) {
//     $('.count-slider-nav span').eq(1).text('/ '+ this.items().length / 4);
//     let currentGroupSlider = $('.count-slider-nav span').eq(0).text();
//     let lengthGroupSlider  = this.items().length / 4;
//     // console.log(lengthGroupSlider);
//     console.log(currentGroupSlider);

//     $('.dairy-complexes-slider-nav .owl-next').click(function()
//     {
//       if(currentGroupSlider < lengthGroupSlider)
//       {
//         currentGroupSlider++;
//         $('.count-slider-nav span').eq(0).text(currentGroupSlider);
//       }
//     });

//     $('.dairy-complexes-slider-nav .owl-prev').click(function()
//     {
//       if(currentGroupSlider > 1)
//       {
//         currentGroupSlider--;
//         $('.count-slider-nav span').eq(0).text(currentGroupSlider);
//       }
//     });

//   }

// });



