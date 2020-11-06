/*
	Future Imperfect by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function ($) {

	var $window = $(window),
		$body = $('body'),
		$menu = $('#menu'),
		$sidebar = $('#sidebar'),
		$main = $('#main');

	// Breakpoints.
	breakpoints({
		xlarge: ['1281px', '1680px'],
		large: ['981px', '1280px'],
		medium: ['737px', '980px'],
		small: ['481px', '736px'],
		xsmall: [null, '480px']
	});

	// Play initial animations on page load.
	$window.on('load', function () {
		window.setTimeout(function () {
			$body.removeClass('is-preload');
		}, 100);
	});

	// Menu.
	$menu
		.appendTo($body)
		.panel({
			delay: 500,
			hideOnClick: true,
			hideOnSwipe: true,
			resetScroll: true,
			resetForms: true,
			side: 'right',
			target: $body,
			visibleClass: 'is-menu-visible'
		});

	// Search (header).
	var $search = $('#search'),
		$search_input = $search.find('input');

	$body
		.on('click', '[href="#search"]', function (event) {

			event.preventDefault();

			// Not visible?
			if (!$search.hasClass('visible')) {

				// Reset form.
				$search[0].reset();

				// Show.
				$search.addClass('visible');

				// Focus input.
				$search_input.focus();

			}

		});

	$search_input
		.on('keydown', function (event) {

			if (event.keyCode == 27)
				$search_input.blur();

		})
		.on('blur', function () {
			window.setTimeout(function () {
				$search.removeClass('visible');
			}, 100);
		});

	// 웹페이지 이동 시 부드럽게 이동
	$('.smooth').click(function () {
		$('html, body').animate({
			scrollTop: $($.attr(this, 'href')).offset().top
		}, 1000);
		return false;
	});

	// Intro.
	var $intro = $('#intro');

	// Move to main on <=large, back to sidebar on >large.
	breakpoints.on('<=large', function () {
		$intro.prependTo($main);
	});

	breakpoints.on('>large', function () {
		$intro.prependTo($sidebar);
	});
})(jQuery);

function tabToAcor(id) {
	var link = "";
	var inn = "";
	var ic = "";
	var ic2 = "";
	$(id).removeClass();
	$(id).addClass("panel-group");
	$(id).find(".nav li").each(function (e) {
		if (e < 1) {
			inn = "in";
		} else {
			inn = "";
		}
		link = $(this).find("a").attr("href");
		ic2 = $(this).find("a").html();
		$(link).removeAttr("role");
		$(link).removeClass();
		$(link).css("padding", "0");
		$(link).addClass("panel panel-default pull-left col-xs-12 nopadding");
		ic = $(link).html();
		$(link).html("");
		$(link).prepend('<div class="panel-heading"><h4 class="panel-title"><a data-toggle="collapse" data-parent="' + link + '" href="' + link + '1">' + ic2 + '</a></h4></div>');
		$(link).append('<div id="' + link.substring(1, link.length) + '1" class="panel-collapse collapse ' + inn + '"><div class="panel-body"> ' + ic + '</div></div>');
	});
	$(id).find(".nav").remove();
}

function changeCoordMode(mode) {

	// 옷 설정 모드
	if (mode === 0) {
		$('#id-div-char-win').css('display', 'flex');
		$('#id-div-coord-win').css('display', 'none');

		const $parent = $('#id-div-mode-change');
		$parent.find('.btn-light').addClass('active')
		$parent.find('.btn-dark').removeClass('active')

		setTimeout(function () {
			setPartsHeights();
		}, 20)
	}
	// 코디하기 모드
	else {
		$('#id-div-char-win').css('display', 'none');
		$('#id-div-coord-win').css('display', 'flex');

		const $parent = $('#id-div-mode-change');
		$parent.find('.btn-light').removeClass('active')
		$parent.find('.btn-dark').addClass('active')

	}
}

$("div.row.control .btn-group > .btn").click(function () {
	$("div.row.control .btn-group > .btn").removeClass("active");
	$(this).addClass("active");
});

function ChangeBack(t) {
	if (t === '1') {
		$(".coord-post").css('background-image', "url(./images/spring.jpg)")
	}
	else if (t === '2') {
		$(".coord-post").css('background-image', "url(./images/summer.jpg)")
	}
	else if (t == 3) {
		$(".coord-post").css('background-image', "url(./images/autumn.jpg)")
	}
	else if (t == 4) {
		$(".coord-post").css('background-image', "url(./images/snow.jpg)")
	}
	else if (t == 5) {
		$(".coord-post").css('background-image', "url(./images/indoors.jpg)")
	}
}