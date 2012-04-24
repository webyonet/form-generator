$(function () {
    /*--------------------------PLUGING------------------------------------------*/
    $.fn.formCreate({
        questionText: 'deneme yazısı',
        userInputText: 'user deneme yazısı',
        userRadioText: 'radyo buton demosu',
        userCheckboxText: 'checkbox buton demosu',
        userDatePickerText: 'GG/AA/YY',
        userAddButton: 'Ekle',
        userAddInput: 'eklenecek elemanları yaz'
    });

    $(".formFrame").sortable({
        handle: '.sortArrow',
        axis: 'y',
        items: 'li'
    });
    $(".formInputCheckFrame, .formInputRadioFrame").buttonset();
    $(".formPicker").datepicker();
    $('.startEndPicker').datepicker({
        showOn: 'both'
    });
    /*-------------------------FORM EVENTS--------------------------------*/
    $('input.formCreateBtn').bind('click', function () {
        $.fn.formCreate.CreateElement($(this).attr('placeholder'));

    });

    $('a.formEdit').live('click', function (e) {
        $.fn.formCreate.ElementEdit(e);
        return false;
    });

    $('a.formElementSave').live('click', function (e) {
        $.fn.formCreate.ElementSave(e);
        return false;
    });

    $('a.formSliderSave').live('click', function (e) {
        $.fn.formCreate.SliderSave(e);
        return false;
    });

    $('a.formElementDelete').live('click', function (e) {
        $.fn.formCreate.ElementDelete(e);
        return false;
    });

    $('div.checkGroupFrame p > a').live('click', function (e) {
        $.fn.formCreate.TempElementDelete(e);
        return false;
    });

    $('input.formAddElementUser').live('click', function (e) {
        $.fn.formCreate.TempElementAdd(e);
    });

    $('a.formCheckboxSaveGroup').live('click', function (e) {
        $.fn.formCreate.ExistingCheckCreate(e);
        return false;
    });

    $('a.formRadioSaveGroup').live('click', function (e) {
        $.fn.formCreate.ExistingRadioCreate(e);
        return false;
    });
    /*------------------------------FORM TOOLKIT---------------------------------*/
    $('input.formCheckboxUser').live('keyup', function (e) {
        var keyCode = e ? (e.which ? e.which : e.keyCode) : event.keyCode;
        if (keyCode == 13) {
            $(this).next('input.formAddElementUser').click();
        }
    });

    $('input.preview').bind('click', function () {
        $.colorbox({
            inline: true,
            href: "#FormPreview"
        });
        $('.previewField').buttonset();
        $('div.slider').slider({
            animate: true,
            range: 'min',
            value: 50,
            min: 0,
            max: 100,
            step: 1,
            disabled: false,
            slide: function (event, ui) {
                $(this).closest('div.sliderFrame').find('span.slider-result').html(ui.value);
            },
            change: function (event, ui) {
                $(this).closest('div.sliderFrame').find('input.sliderHiddenField').attr('value', ui.value);
            }
        });
        $(".formPreviewPicker").datepicker({
            showOn: 'both'
        });
        return false;
    });

    $('a.formElementRequired').live('click', function () {
        if (!$(this).hasClass('active')) {
            $(this).addClass('active');
        } else {
            $(this).removeClass('active');
        }
        return false;
    });

    $('li.fieldFrame').live('mouseenter', function () {
        if ($(this).children('nav').hasClass('clearBg')) $(this).children('a.formEdit').fadeIn('fast');
    });

    $('li.fieldFrame').live('mouseleave', function () {
        $(this).children('a.formEdit').fadeOut('fast');
    });

    $('a.formNext').bind('click', function () {
        var $Json = null,
            validateControl = $('li.fieldFrame').size(),
            $control = 0;
        if (validateControl > 0) {
            $('li.fieldFrame').each(function () {
                if (!$(this).children('nav.hoverPosition').hasClass('clearBg')) {
                    $('html,body').animate({
                        scrollTop: $(this).offset().top
                    }, 1000);
                    $control++;
                    return false;
                }
            });
            if ($control <= 0) {
                $Json = $.fn.formCreate.FormEncode();
                //ajax yazılacak
                //$.fn.formCreate.FormParser($Json);
                console.log($Json);
            }
        } else {
            $.colorbox({
                inline: true,
                href: "#FormPreview"
            });
        }
        $('.previewField').buttonset();
        $('div.slider').slider({
            animate: true,
            range: 'min',
            value: 50,
            min: 0,
            max: 100,
            step: 1,
            disabled: false,
            slide: function (event, ui) {
                $(this).closest('div.sliderFrame').find('span.slider-result').html(ui.value);
            },
            change: function (event, ui) {
                $(this).closest('div.sliderFrame').find('input.sliderHiddenField').attr('value', ui.value);
            }
        });
        $(".formPreviewPicker").datepicker({
            showOn: 'both'
        });
    });

    /*-----------scroll side bar--------------------*/
    if ($(".menuColumn").length > 0) {
        var offset = $(".menuColumn").offset();
        $(window).scroll(function () {
            if ($(window).scrollTop() > offset.top) {
                $(".menuColumn").stop().animate({
                    marginTop: $(window).scrollTop() - offset.top
                }, 300, 'linear');
            } else {
                $(".menuColumn").stop().animate({
                    marginTop: 0,
                }, 300, 'linear');
            };
        });
    }

});