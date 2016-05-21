$(function(){

	// канвас подложка под курсор
	// CanvasBG.init({
	//   Loc: {
	//     x: window.innerWidth / 2.1,
	//     y: window.innerHeight / 2.3
	//   },
	// });

	// вызов фенсибокса
	$('[fancybox]').fancybox();

	// открываем языковую панель
	var currentLang = $('.header__info-languages-current'),
		langItem = $('.header__info-languages-item');
		langList = $('.header__info-languages-list');

	currentLang.on('click', function(){
		$(this).toggleClass('open');
		langList.slideToggle(400);
	});

	// замена языка
	langItem.on('click', function(){
		langItem.removeClass('active');
		$(this).addClass('active');
		currentLang.removeClass('open');
		currentLang.html($(this).html());
		langList.slideUp(400);
	});

	// закрываем языковую панель по клику вне области
	$(document).mouseup(function(e) {
		if (langList.has(e.target).length === 0 && currentLang.has(e.target).length === 0) {
			langList.slideUp('500');
			currentLang.removeClass('open');
			langList.removeClass('active');
		}
	});


	// обработка слайдера на главной
	$('.slider__list-item').click(function(){
		$('.slider__list-item').removeClass('active');
		$(this).addClass('active');
	});
	
	// меняем высоту слайдера
	$(window).on('load resize', function(){
		$('.slider__list').height($(window).height() - $('.header').innerHeight()); // динамически изменяем высоту слайдера на главной
		// $('.slider__list-video').height($('.slider__list-item').height() + 15);
		// $('.slider__list-video').width($('.slider__list-item').width() + 10);

	});

});