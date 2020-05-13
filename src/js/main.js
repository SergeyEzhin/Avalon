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

// Слайдер Похожие вакансии

$('.similar-vacancies-slider-wrapper').owlCarousel({
  loop:true, //Зацикливаем слайдер
  items:4,
  margin:20, //Отступ от элемента справа в 50px
  nav:true, //Отключение навигации
  dots: false,
  autoplay: false, //Автозапуск слайдера
  smartSpeed:300, //Время движения слайда
  autoplayTimeout:300, //Время смены слайда
  mouseDrag: false,
  touchDrag: false,
  navContainer: '.navigation-similar-vacancies',
  navText: ["<div class='arrow-slider'><img src='./img/arrow_slider_left.svg'></div>", "<div class='arrow-slider'><img src='./img/arrow_slider_right.svg'></div>"],
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

if(inputBirthday)
{
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
}


// Карта

// Вставка скрипта api-key

function getScript(source, callback) 
{
  let script = document.createElement('script');
  let prior = document.getElementsByTagName('script')[0];
  script.async = 1;

  script.onload = script.onreadystatechange = function( _, isAbort ) {
      if(isAbort || !script.readyState || /loaded|complete/.test(script.readyState) ) {
          script.onload = script.onreadystatechange = null;
          script = undefined;

          if(!isAbort && callback) setTimeout(callback, 0);
      }
  };
  script.src = source;
  prior.parentNode.insertBefore(script, prior);
}


document.addEventListener('DOMContentLoaded', () => { 

  let vacanciesMap = document.querySelector('#vacancies-map');
  let companiesMap = document.querySelector('#companies-map');
  if(vacanciesMap)
  {
    fetch('./php/vacancies.php')
    .then(response => response.json())
    .then(data => {
        
        let apiKey = 'e158c5a2-b717-4552-9b2d-e21a7b7d540b';
        getScript('https://api-maps.yandex.ru/2.1/?lang=ru_RU&apikey=' + apiKey, function(){
            ymaps.ready(function () {

                let map = new ymaps.Map('vacancies-map', {
                    center: [55.751574, 37.573856],
                    zoom: 12,
                    controls: []
                })

                let objectManagerData = {
                    "type": "FeatureCollection",
                    "features": []
                };

                
                let MyBalloonContentLayout = ymaps.templateLayoutFactory.createClass(
                  '<div class="balloon-header-vacancy"><div class="balloon-header-vacancy__left"><p>$[properties.nameWork]</p><p>$[properties.salary]</p></div><div class="balloon-header-vacancy__right"><a class="button-text" href="current-vacancy.html"><img class="img-svg" src="./img/arrow_balloon.svg"></a></div></div>' +
                  '<div class="balloon-content-vacancy"><div class="balloon-content-vacancy-block"><div class="balloon-content-vacancy-block__image"><img src="$[properties.logoCompany]"></div><p class="balloon-content-vacancy-block__name">$[properties.nameCompany]</p></div></div>'
                );

                data.forEach((item, index) => {

                    let featureObj = {
                        "type": "Feature",
                        "id": index,
                        "geometry": {
                            "type": "Point", 
                            "coordinates": item.coords
                        }, 
                        "properties": {
                            "nameWork": item.nameWork,
                            "salary": item.salary,
                            "nameCompany": item.nameCompany,
                            "logoCompany":item.logoCompany
                        },
                        "options": {
                            "iconLayout": "default#image",
                            "iconColor": "#dc3535",
                            "iconImageHref": "./img/icon_pin.svg",
                            "iconImageSize": [33, 47],
                            "balloonOffset": [-70, -45],
                            "balloonContentLayout": MyBalloonContentLayout,
                            "hideIconOnBalloonOpen": false,
                            "balloonCloseButton": false,
                            "zIndex": 100,
                            "zIndexHover": 500,
                            "zIndexActive": 1000
                        }
                    };

                    objectManagerData["features"].push(featureObj);
                });

                let objectManager = new ymaps.ObjectManager({
                    clusterize: true,
                    gridSize: 128,
                    clusterIconLayout: "default#pieChart",
                    clusterIconPieChartStrokeWidth: 0
                });

                map.geoObjects.add(objectManager);
                objectManager.add(objectManagerData);
                map.setBounds(map.geoObjects.getBounds());

                objectManager.objects.events.add('click', function (e) {

                    var objectId = e.get('objectId');
                    if (objectManager.objects.balloon.isOpen(objectId)) {
                        objectManager.objects.balloon.close();
                    }

                    map.events.add('click', function (e) 
                    {
                      if(e.get('target') === map) 
                      { 
                        objectManager.objects.balloon.close();
                      }
                    });
                });

                objectManager.objects.events.add('balloonopen', function(e) {
                    objectManager.objects.setObjectOptions(e.get('target')._objectIdWithOpenBalloon, {'iconImageHref': './img/icon_pin_active.svg', 'zIndex': 1000});
                });

                objectManager.objects.events.add('balloonclose', function(e) {
                    objectManager.objects.setObjectOptions(e.get('target')._objectIdWithOpenBalloon, {'iconImageHref': './img/icon_pin.svg', 'zIndex': 250});
                });

            })
          })
      });

  }
  if(companiesMap)
  {
    fetch('./php/companies.php')
    .then(response => response.json())
    .then(data => {
        
        let apiKey = 'e158c5a2-b717-4552-9b2d-e21a7b7d540b';
        getScript('https://api-maps.yandex.ru/2.1/?lang=ru_RU&apikey=' + apiKey, function(){
            ymaps.ready(function () {

                let map = new ymaps.Map('companies-map', {
                    center: [55.751574, 37.573856],
                    zoom: 12,
                    controls: []
                })

                let objectManagerData = {
                    "type": "FeatureCollection",
                    "features": []
                };

                
                let MyBalloonContentLayout = ymaps.templateLayoutFactory.createClass(
                  '<div class="balloon-header-companies"><div class="balloon-header-companies__left"><div class="balloon-content-companies-block"><div class="balloon-content-companies-block__image"><img src="$[properties.logoCompany]"></div><p class="balloon-content-companies-block__name">$[properties.nameCompany]</p></div></div><div class="balloon-header-companies__right"><a class="button-text" href="current-company.html"><img class="img-svg" src="./img/arrow_balloon.svg"></a></div></div>'
                );

                data.forEach((item, index) => {

                    let featureObj = {
                        "type": "Feature",
                        "id": index,
                        "geometry": {
                            "type": "Point", 
                            "coordinates": item.coords
                        }, 
                        "properties": {
                            "nameCompany": item.nameCompany,
                            "logoCompany":item.logoCompany
                        },
                        "options": {
                            "iconLayout": "default#image",
                            "iconColor": "#dc3535",
                            "iconImageHref": "./img/icon_pin.svg",
                            "iconImageSize": [33, 47],
                            "balloonOffset": [-70, -45],
                            "balloonContentLayout": MyBalloonContentLayout,
                            "hideIconOnBalloonOpen": false,
                            "balloonCloseButton": false,
                            "zIndex": 100,
                            "zIndexHover": 500,
                            "zIndexActive": 1000
                        }
                    };

                    objectManagerData["features"].push(featureObj);
                });

                let objectManager = new ymaps.ObjectManager({
                    clusterize: true,
                    gridSize: 128,
                    clusterIconLayout: "default#pieChart",
                    clusterIconPieChartStrokeWidth: 0
                });

                map.geoObjects.add(objectManager);
                objectManager.add(objectManagerData);
                map.setBounds(map.geoObjects.getBounds());

                objectManager.objects.events.add('click', function (e) {

                    var objectId = e.get('objectId');
                    if (objectManager.objects.balloon.isOpen(objectId)) {
                        objectManager.objects.balloon.close();
                    }

                    map.events.add('click', function (e) 
                    {
                      if(e.get('target') === map) 
                      { 
                        objectManager.objects.balloon.close();
                      }
                    });
                });

                objectManager.objects.events.add('balloonopen', function(e) {
                    objectManager.objects.setObjectOptions(e.get('target')._objectIdWithOpenBalloon, {'iconImageHref': './img/icon_pin_active.svg', 'zIndex': 1000});
                });

                objectManager.objects.events.add('balloonclose', function(e) {
                    objectManager.objects.setObjectOptions(e.get('target')._objectIdWithOpenBalloon, {'iconImageHref': './img/icon_pin.svg', 'zIndex': 250});
                });

            })
        })
    });
  }
});

// Форма Поделиться 

let radioShareVk = document.querySelector('#share-vk');
let radioShareEmail = document.querySelector('#share-email');
let dataEmailShare = document.querySelector('.data-email-share');

radioShareVk.addEventListener('change', () => {
  if(radioShareVk.checked)
  {
    dataEmailShare.style.display = 'none';
  }
});

radioShareEmail.addEventListener('change', () => {
  if(radioShareEmail.checked)
  {
    dataEmailShare.style.display = 'inline-block';
  }
});





