import '../scss/style.scss';
import Choices from  '../../node_modules/choices.js/src/scripts/choices';
import 'owl.carousel';
import datepicker from 'js-datepicker';

// Вывод svg

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

// Слайдеры на главной


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
  loop:false, //Зацикливаем слайдер
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
  onInitialized: function(e) 
  {
    let nextSlider = 2;
    let prevSlider = 0;

    $('.arrow-steps__right span').text(nextSlider);
    let lengthSlider  = this.items().length;

    console.log(nextSlider);

    $('.navigation-steps-slider .owl-next').click(function()
    {
      if(nextSlider <= lengthSlider)
      {
        nextSlider++;
        prevSlider++;
        $('.arrow-steps__right span').text(nextSlider);
        $('.arrow-steps__left span').text(prevSlider);
      }
    });

    $('.navigation-steps-slider .owl-prev').click(function()
    {
      if(nextSlider > 2)
      {
        nextSlider--;
        prevSlider--;
        $('.arrow-steps__right span').text(nextSlider);
        $('.arrow-steps__left span').text(prevSlider);
      }
    });

  }

});

// Аккордеон

try
{
    let accordionContentBlock = document.querySelectorAll('.accordion-content-block');
    accordionContentBlock.forEach((elem) => 
    {
      elem.addEventListener('click', function(e)
      {
        e.preventDefault();
        elem.classList.toggle('accordion-content-block_hide');
      })
    });
}
catch (e) {
    console.log(e);
}

// Проверка изображения в карточке статьи

let articleBlocks = document.querySelectorAll('.article-block');

articleBlocks.forEach(article => {
  if(!article.querySelector('.article-block__image'))
  {
    article.querySelector('.article-block__content').style.height = '100%';
  }
});


// Кастомизированный селект

var elemsSelect = document.querySelectorAll('select');

if(elemsSelect.length > 0)
{
  elemsSelect.forEach(function(elem)
  {
    new Choices(elem, {
      choices: [],
      placeholder: false,
      searchEnabled: false,
      itemSelectText: ''
    });
  });
}

// Определение прокрутки шапки и задание фиксированной шапки

let headerHeight = document.querySelector('.header').clientHeight;
let headerScroll = document.querySelector('.header-scroll');

function fixedAdaptiveHeader(block, height)
{
  var scroll = window.pageYOffset || document.documentElement.scrollTop;
  var heightBlock = block.clientHeight;
  var wrapperContent = document.querySelector('.wrapper-content');
    
  if (scroll >= height) 
  {
    block.classList.add('header_fixed');
    // wrapperContent.style.paddingTop = heightBlock + 'px';
  } 
  else 
  {
    block.classList.remove('header_fixed');
    // wrapperContent.style.paddingTop = '0px';
  }
}

window.addEventListener('scroll', function()
{
  fixedAdaptiveHeader(headerScroll, headerHeight);
});

fixedAdaptiveHeader(headerScroll, headerHeight);


// Для input[type="file"]

var inputFile = document.querySelectorAll('input[type="file"]');

if(inputFile.length > 0)
{
    inputFile.forEach(function(input) 
    {
        input.addEventListener('change', function(e)
        {
            var value = input.value;
            value = value.replace( 'C:\\fakepath\\', '');
            input.parentElement.querySelector('.file-value').innerHTML = value;
        });
    });
}


// Табы 

var tabs = document.querySelectorAll('.tabs');

if(tabs.length > 0)
{
  tabs.forEach(function(elem, index)
  {
    var tabsItem = elem.querySelectorAll('.tabs-item');
    var tabsContent = elem.querySelector('.tabs-content');
    var tabsItems = elem.querySelector('.tabs-items')

    tabsItem.forEach(function(elem, index)
    {
      elem.addEventListener('click', function(e)
      {
        e.preventDefault();
        if(!elem.classList.contains('tabs-item_active'))
        {
          // var prevDataTab = tabsItems.querySelector('.tabs-item_active').dataset.tab;
          tabsItems.querySelector('.tabs-item_active').classList.remove('tabs-item_active');
          elem.classList.add('tabs-item_active');
          var dataTab = elem.dataset.tab;
          if(tabsContent.querySelectorAll('.tabs-content-block_active').length > 0)
          {
            let oldTabsContent = tabsContent.querySelectorAll('.tabs-content-block_active');
            oldTabsContent.forEach(tab => {
              tab.classList.remove('tabs-content-block_active');
            });
            // tabsContent.querySelector('.tabs-content-block_active').classList.remove('tabs-content-block_active');
          }
          if(tabsContent.querySelectorAll('div[data-tab="' + dataTab + '"]').length > 0)
          {
            let newTabsContent = tabsContent.querySelectorAll('div[data-tab="' + dataTab + '"]');
            newTabsContent.forEach(tab => {
              tab.classList.add('tabs-content-block_active');
            });
            // tabsContent.querySelector('div[data-tab="' + dataTab + '"]').classList.add('tabs-content-block_active');
          }
        }
      });
    });
  });
}


// Datapicker 


let inputBirthday = document.querySelector('#birthday');

const picker = datepicker(inputBirthday, {
  formatter: (input, date, instance) => 
  {
    const value = date.toLocaleDateString();
    input.value = value; // => '1/1/2099'
  },
  startDay: 0,
  customDays: ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'],
  customMonths: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
  showAllDates: true, 
  overlayButton: 'Выбрать', 
  overlayPlaceholder: 'Укажите год'

});

// if(document.querySelector('.qs-datepicker'))
// {
//   document.querySelector('.qs-left').appendChild('<img src="../img/arrow_left_datapicker.svg">');
//   document.querySelector('.qs-right').appendChild('<img src="../img/arrow_right_datapicker.svg">');
// }





