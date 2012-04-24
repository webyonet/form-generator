/*
 * FormGenerate jQuery Plugin v2.0.0.2
 * Licensed under the MIT license.
 * Copyright 2012 G.Burak Demirezen
 */ 
(function ($) {
    $.fn.formCreate = function (options) {
        var defaults = {
            questionText: 'Type your question',
            userInputText: 'User input box',
            userRadioText: 'Demo Radio Button',
            userCheckboxText: 'Demo Checkbox Button',
            userDatePickerText: 'MM/DD/YY',
            userAddButton: 'Add',
            userAddInput: 'type names for your categories / items'
        },
            settings = $.extend(defaults, options);

        var
        $inputTextId = 0,
            $pickerId = 0,
            $textareaId = 0,
            $demoRadio = 0,
            $demoRadioGroup = 0,
            $demoCheckGroup = 0,
            $demoCheck = 0,
            $newRadioNameCount = 0,
            $newCheckNameCount = 0,
            $sliderCount = 0,
            $newRadioId = 0,
            $newCheckId = 0,
            $slider = [],
            $radioExist = [],
            $checkExist = [],
            $formDataJSON = null,
            sliderOptions = {
                max: 100,
                min: 0,
                step: 1,
                value: 50
            };

        $.fn.formCreate.CreateElement = function (value) {
            switch (value) {
            case 'Text':
                $.inputCreate();
                break;
            case 'Textarea':
                $.textareaCreate();
                break;
            case 'Radiobutton':
                $.radioCreate();
                break;
            case 'Checkboxbutton':
                $.checkCreate();
                break;
            case 'Scaleslider':
                $.sliderCreate();
                break;
            case 'Datepicker':
                $.pickerCreate();
                break;
            default:
                console.error('Invalid Dom Type');
                break;
            }
        };

        $.appendElement = function ($dom, $id) {
            $('ul.formFrame').append($dom);
            $('.formInputRadioFrame, .formInputCheckFrame').buttonset();
            $('html,body').animate({
                scrollTop: $('#' + $id).offset().top
            }, 1000);
        };

        $.appendPicker = function ($dom, $id) {
            $('ul.formFrame').append($dom);
            $(".formPicker").datepicker();
            $('html,body').animate({
                scrollTop: $('#' + $id).offset().top
            }, 1000);
        };

        $.appendSlider = function ($dom) {
            $('ul.formFrame').append($dom[0]);
            $($dom[1]).slider({
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
            $('html,body').animate({
                scrollTop: $($dom[1]).offset().top
            }, 1000);
        };

        $.pickerCreate = function () {
            var id = 'pickerCreate_' + $pickerId,
                $domContent = '<li class="fieldFrame fromPicker"><nav class="hoverPosition clearBg"><input type="text" class="formTextQuestions" value="' + settings.questionText + '" /><p class="formQuestions">' + settings.questionText + '</p><input type="text" id="pickerCreate_' + $pickerId + '" class="formPicker" placeholder="' + settings.userDatePickerText + '" name="pickerGroup_' + $pickerId + '"/><a href="#" class="formElementDelete"></a> <a href="#" class="formElementSave"></a> <a href="#" class="formElementRequired"></a></nav><p class="formSeperator"></p><div class="sortArrow"></div><a href="#" class="formEdit"></a></li>';
            $pickerId++;
            return $.appendPicker($domContent, id);
        };

        $.inputCreate = function () {
            var id = 'inputCreate_' + $inputTextId,
                $domContent = '<li class="fieldFrame formTextbox"><nav class="hoverPosition clearBg"><input type="text" class="formTextQuestions" value="' + settings.questionText + '" placeholder="' + settings.questionText + '" /><p class="formQuestions">' + settings.questionText + '</p><input type="text" id="inputCreate_' + $inputTextId + '" name="inputGroup_' + $inputTextId + '" class="formTextUser" value="' + settings.userInputText + '" readonly="true"/><a href="#" class="formElementDelete"></a> <a href="#" class="formElementSave"></a> <a href="#" class="formElementRequired"></a></nav><p class="formSeperator"></p><div class="sortArrow"></div><a href="#" class="formEdit"></a></li>';
            $inputTextId++;
            return $.appendElement($domContent, id);
        };

        $.textareaCreate = function () {
            var id = 'textareaCreate_' + $textareaId,
                $domContent = '<li class="fieldFrame fromTextarea"><nav class="hoverPosition clearBg"><input type="text" class="formTextQuestions" value="' + settings.questionText + '" placeholder="' + settings.questionText + '" /><p class="formQuestions">' + settings.questionText + '</p><textarea id="textareaCreate_' + $textareaId + '" name="textareaGroup_' + $textareaId + '" class="formTextareaUser" readonly="true">' + settings.userInputText + '</textarea><a href="#" class="formElementDelete"></a> <a href="#" class="formElementSave"></a> <a href="#" class="formElementRequired"></a> </nav><p class="formSeperator"></p><div class="sortArrow"></div><a href="#" class="formEdit"></a></li>';
            $textareaId++;
            return $.appendElement($domContent, id);
        };

        $.radioCreate = function () {
            var id = 'demoRadio_' + $demoRadio,
                $domContent = '<li class="fieldFrame formRadio"><nav class="hoverPosition clearBg"><input type="text" class="formTextQuestions" value="' + settings.questionText + '" placeholder="' + settings.questionText + '"/><p class="formQuestions">' + settings.questionText + '</p><input class="formCheckboxUser" placeholder="' + settings.userAddInput + '" /><input type="button" value="' + settings.userAddButton + '" class="formAddElementUser"/><div class="checkGroupFrame"></div><div class="formInputRadioFrame"><input type="radio" id="demoRadio_' + $demoRadio + '" name="demoRadioGroup_' + $demoRadioGroup + '" checked="true"/><label for="demoRadio_' + $demoRadio + '" class="rbLabel">' + settings.userRadioText + '</label><input type="radio" id="demoRadio_' + ($demoRadio + 1) + '" name="demoRadioGroup_' + $demoRadioGroup + '"/><label for="demoRadio_' + ($demoRadio + 1) + '" class="rbLabel">' + settings.userRadioText + '</label></div><a href="#" class="formElementDelete"></a> <a href="#" class="formRadioSaveGroup"></a> <a href="#" class="formElementRequired"></a> </nav><p class="formSeperator"></p><div class="sortArrow"></div><a href="#" class="formEdit"></a></li>';
            $demoRadio += 2;
            $demoRadioGroup++;
            return $.appendElement($domContent, id);
        };

        $.checkCreate = function () {
            var id = 'demoCheckbox_' + $demoCheck,
                $domContent = '<li class="fieldFrame formCheckbox"><nav class="hoverPosition clearBg"><input type="text" class="formTextQuestions" value="' + settings.questionText + '" placeholder="' + settings.questionText + '"/><p class="formQuestions">' + settings.questionText + '</p><input class="formCheckboxUser" placeholder="' + settings.userAddInput + '" /><input type="button" value="' + settings.userAddButton + '" class="formAddElementUser"/><div class="checkGroupFrame"></div><div class="formInputCheckFrame"><input type="checkbox" id="demoCheckbox_' + $demoCheck + '" name="demoCheckboxGroup_' + $demoCheckGroup + '" checked="true"/><label for="demoCheckbox_' + $demoCheck + '" class="cbLabel">' + settings.userCheckboxText + '</label><input type="checkbox" id="demoCheckbox_' + ($demoCheck + 1) + '" name="demoCheckboxGroup_' + $demoCheckGroup + '"/><label for="demoCheckbox_' + ($demoCheck + 1) + '" class="cbLabel">' + settings.userCheckboxText + '</label></div><a href="#" class="formElementDelete"></a> <a href="#" class="formCheckboxSaveGroup"></a> <a href="#" class="formElementRequired"></a> </nav><p class="formSeperator"></p><div class="sortArrow"></div><a href="#" class="formEdit"></a></li>';
            $demoCheck += 2;
            $demoCheckGroup++;
            return $.appendElement($domContent, id);
        };

        $.sliderCreate = function () {
            $slider.length = 0;
            var $domContent = '<li class="fieldFrame formSlider"><nav class="hoverPosition clearBg"><input type="text" class="formTextQuestions" value="' + settings.questionText + '" placeholder="' + settings.questionText + '"/><p class="formQuestions">' + settings.questionText + '</p> <div class="sliderOptionsFrame"><input type="text" class="sliderOptions" name="max" value="100"/><input type="text" class="sliderOptions" name="min" value="0"/><input type="text" class="sliderOptions" name="step" value="1"/><input type="text" class="sliderOptions" name="value" value="50"/></div><div class="sliderFrame"><div id="slider_' + $sliderCount + '" class="slider"></div><span class="sliderInfo"><span id="slider-result_' + $sliderCount + '" class="slider-result">50</span> %</span><input type="hidden" class="sliderHiddenField" name="sliderValues_' + $sliderCount + '" value="50"/></div><a href="#" class="formElementDelete"></a> <a href="#" class="formSliderSave"></a> <a href="#" class="formElementRequired"></a> </nav><p class="formSeperator"></p><div class="sortArrow"></div><a href="#" class="formEdit"></a></li>';
            $slider.push($domContent);
            $slider.push('#slider_' + $sliderCount);
            $sliderCount++;
            return $.appendSlider($slider);
        };

        $.fn.formCreate.ElementDelete = function (event) {
            $(event.target).closest('li.fieldFrame').slideUp('normal', function () {
                $(this).remove();
            });
        };

        $.fn.formCreate.TempElementAdd = function (event) {
            var $val = $(event.target).prev('input.formCheckboxUser').val();
            if ($val != '') {
                $(event.target).prev('input.formCheckboxUser').val('');
                $(event.target).next('div').append('<p>' + $val + '<a href="#"></a></p>');
            }
        };

        $.fn.formCreate.TempElementDelete = function (event) {
            $(event.target).parent('p').remove();
        };

        $.fn.formCreate.ExistingRadioCreate = function (event) {
            var
            $dom = $(event.target).closest('li.fieldFrame'),
                $val = $dom.find('input.formTextQuestions').val(),
                control = $(event.target).prevAll('div.checkGroupFrame').children('p'),
                inputFrame = $(event.target).prevAll('div.formInputRadioFrame'),
                $temp = $radioExist.indexOf(parseInt(stringClear(inputFrame.children('input').attr('name'))));
            if (control.size() <= 0) {
                $dom.find('input.formCheckboxUser').css({
                    'color': '#FB696A'
                });
                return false;
            } else {
                $dom.find('input.formCheckboxUser').css({
                    'color': '#949494'
                });
            }
            $dom.find('p.formQuestions').text($val);
            if ($dom.find('a.formElementRequired').hasClass('active')) $dom.find('p.formQuestions').append('<span class="required"></span>');
            $(event.target).prevAll('div.checkGroupFrame').find('p').hide();
            $dom.find('a, input, div.sortArrow').hide();
            $dom.find('p.formQuestions').show();
            $(event.target).closest('nav').addClass('clearBg');
            inputFrame.html('').show();

            if ($temp == -1) {
                control.each(function (index) {
                    inputFrame.append('<input type="radio" id="createRadio_' + $newRadioNameCount + '_' + $newRadioId + '" name="radioGroup_' + $newRadioNameCount + '"/><label for="createRadio_' + $newRadioNameCount + '_' + $newRadioId + '" class="rbLabel">' + $(this).text() + '</label>');
                    $newRadioId++;
                });
                $radioExist.push($newRadioNameCount);
                $newRadioNameCount++;
            } else {
                control.each(function (index) {
                    inputFrame.append('<input type="radio" id="createRadio_' + $temp + '_' + $newRadioId + '" name="radioGroup_' + $temp + '"/><label for="createRadio_' + $temp + '_' + $newRadioId + '" class="rbLabel">' + $(this).text() + '</label>');
                    $newRadioId++;
                });
            }
            $('div.formInputRadioFrame').buttonset('refresh');
            $newRadioId = 0;
        };

        $.fn.formCreate.ExistingCheckCreate = function (event) {
            var
            $dom = $(event.target).closest('li.fieldFrame'),
                $val = $dom.find('input.formTextQuestions').val(),
                control = $(event.target).prevAll('div.checkGroupFrame').children('p'),
                inputFrame = $(event.target).prevAll('div.formInputCheckFrame'),
                $temp = $checkExist.indexOf(parseInt(stringClear(inputFrame.children('input').attr('name'))));
            if (control.size() <= 0) {
                $dom.find('input.formCheckboxUser').css({
                    'color': '#FB696A'
                });
                return false;
            } else {
                $dom.find('input.formCheckboxUser').css({
                    'color': '#949494'
                });
            }
            $dom.find('p.formQuestions').text($val);
            if ($dom.find('a.formElementRequired').hasClass('active')) $dom.find('p.formQuestions').append('<span class="required"></span>');
            $(event.target).prevAll('div.checkGroupFrame').find('p').hide();
            $dom.find('a, input, div.sortArrow').hide();
            $dom.find('p.formQuestions').show();
            $(event.target).closest('nav').addClass('clearBg');
            inputFrame.html('').show();

            if ($temp == -1) {
                control.each(function (index) {
                    inputFrame.append('<input type="checkbox" id="createCheckbox_' + $newCheckNameCount + '_' + $newCheckId + '" name="checkGroup_' + $newCheckNameCount + '"/><label for="createCheckbox_' + $newCheckNameCount + '_' + $newCheckId + '" class="cbLabel">' + $(this).text() + '</label>');
                    $newCheckId++;
                });
                $checkExist.push($newCheckNameCount);
                $newCheckNameCount++;
            } else {
                control.each(function (index) {
                    inputFrame.append('<input type="radio" id="createCheckbox_' + $temp + '_' + $newCheckId + '" name="checkGroup_' + $temp + '"/><label for="createCheckbox_' + $temp + '_' + $newCheckId + '" class="cbLabel">' + $(this).text() + '</label>');
                    $newCheckId++;
                });
            }
            $('div.formInputCheckFrame').buttonset('refresh');
            $newCheckId = 0;
        };

        $.fn.formCreate.ElementSave = function (event) {
            var $dom = $(event.target).closest('li.fieldFrame'),
                $val = $dom.find('input.formTextQuestions').val(),
                $nav = $dom.children('nav.hoverPosition');
            $dom.find('p.formQuestions').text($val);
            $nav.addClass('clearBg');
            $nav.find('a, input.formTextQuestions').hide();
            if ($dom.find('a.formElementRequired').hasClass('active')) $dom.find('p.formQuestions').append('<span class="required"></span>');
            $dom.find('p.formQuestions').show();
            $dom.find('div.sortArrow').hide();
        };

        $.fn.formCreate.SliderSave = function (event) {
            var $dom = $(event.target).closest('li.fieldFrame'),
                $val = $dom.find('input.formTextQuestions').val(),
                $nav = $dom.children('nav.hoverPosition'),
                $options = $dom.find('div.sliderOptionsFrame');
            $dom.find('p.formQuestions').text($val);
            $nav.addClass('clearBg');
            $nav.find('a, input.formTextQuestions').hide();
            if ($dom.find('a.formElementRequired').hasClass('active')) $dom.find('p.formQuestions').append('<span class="required"></span>');
            $dom.find('p.formQuestions').show();
            $dom.find('div.sortArrow, div.sliderOptionsFrame').hide();
            sliderOptions.max = parseInt($options.children('input[name=max]').val());
            sliderOptions.min = parseInt($options.children('input[name=min]').val());
            sliderOptions.step = parseInt($options.children('input[name=step]').val());
            sliderOptions.value = parseInt($options.children('input[name=value]').val());
            $.sliderNewOptions(event);
        };

        $.sliderNewOptions = function (event) {
            var dom = $(event.target).closest('li.fieldFrame'),
                element = dom.find('div.slider');
            $(element).slider("option", sliderOptions);
            dom.find('span.slider-result').text(sliderOptions.value);
        };

        $.fn.formCreate.ElementEdit = function (event) {
            var $dom = $(event.target).closest('li.fieldFrame'),
                $val = $dom.find('p.formQuestions').text();
            $dom.children('nav.hoverPosition').removeClass('clearBg');
            $dom.find('input.formTextQuestions').val($val);
            $dom.find('*').show();
            $dom.find('p.formQuestions, div.formInputCheckFrame, div.formInputRadioFrame').hide();
            $(event.target).hide();
        };

        $.fn.formCreate.FormEncode = function () {
            var $domCount = $('li.fieldFrame').size();
            $formDataJSON = '{"data":[{';
            $('li.fieldFrame').each(function (index, $dom) {
                if ($(this).hasClass('formTextbox')) $.inputEncode($dom);
                if ($(this).hasClass('fromTextarea')) $.textareaEncode($dom);
                if ($(this).hasClass('fromPicker')) $.pickerEncode($dom);
                if ($(this).hasClass('formSlider')) $.sliderEncode($dom);
                if ($(this).hasClass('formRadio')) $.radioEncode($dom);
                if ($(this).hasClass('formCheckbox')) $.checkboxEncode($dom);
                $formDataJSON += $domCount != (index + 1) ? '},{' : '}]}';
            });
            return $formDataJSON;
        };

        $.inputEncode = function ($dom) {
            var $property = $($dom).find('input.formTextUser'),
                $question = $($dom).find('p.formQuestions').text(),
                $required = $($dom).find('a.formElementRequired').hasClass('active') ? 'true' : 'false';
            $formDataJSON += '"title":"' + $question + '",';
            $formDataJSON += '"type":"text",';
            $formDataJSON += '"id":"' + $property.attr('id') + '",';
            $formDataJSON += '"name":"' + $property.attr('name') + '",';
            $formDataJSON += '"required":"' + $required + '"';
        };

        $.textareaEncode = function ($dom) {
            var $property = $($dom).find('textarea.formTextareaUser'),
                $question = $($dom).find('p.formQuestions').text(),
                $required = $($dom).find('a.formElementRequired').hasClass('active') ? 'true' : 'false';
            $formDataJSON += '"title":"' + $question + '",';
            $formDataJSON += '"type":"textarea",';
            $formDataJSON += '"id":"' + $property.attr('id') + '",';
            $formDataJSON += '"name":"' + $property.attr('name') + '",';
            $formDataJSON += '"required":"' + $required + '"';
        };

        $.pickerEncode = function ($dom) {
            var $property = $($dom).find('input.formPicker'),
                $question = $($dom).find('p.formQuestions').text(),
                $required = $($dom).find('a.formElementRequired').hasClass('active') ? 'true' : 'false';
            $formDataJSON += '"title":"' + $question + '",';
            $formDataJSON += '"type":"picker",';
            $formDataJSON += '"id":"' + $property.attr('id') + '",';
            $formDataJSON += '"name":"' + $property.attr('name') + '",';
            $formDataJSON += '"required":"' + $required + '"';
        };

        $.sliderEncode = function ($dom) {
            var $question = $($dom).find('p.formQuestions').text(),
                $required = $($dom).find('a.formElementRequired').hasClass('active') ? 'true' : 'false',
                max = parseInt($($dom).find('input[name=max]').val()),
                min = parseInt($($dom).find('input[name=min]').val()),
                step = parseInt($($dom).find('input[name=step]').val()),
                value = parseInt($($dom).find('input[name=value]').val());
            $formDataJSON += '"title":"' + $question + '",';
            $formDataJSON += '"type":"slider",';
            $formDataJSON += '"id":"' + $($dom).find("div.slider").attr("id") + '",';
            $formDataJSON += '"required":"' + $required + '",';
            $formDataJSON += '"sliderOptions":{"max":' + max + ',"min":' + min + ',"step":' + step + ',"value":' + value + '}';
        };

        $.radioEncode = function ($dom) {
            var $property = $($dom).find('div.formInputRadioFrame'),
                $question = $($dom).find('p.formQuestions').text(),
                $choice = $property.children('label'),
                $choiceCount = $choice.size(),
                $required = $($dom).find('a.formElementRequired').hasClass('active') ? 'true' : 'false';
            $formDataJSON += '"title":"' + $question + '",';
            $formDataJSON += '"type":"radio",';
            $formDataJSON += '"name":"' + $choice.prev('input').attr('name') + '",';
            $formDataJSON += '"required":"' + $required + '",';
            $formDataJSON += '"choice":[{';
            $choice.each(function (index) {
                $formDataJSON += '"id":"' + $(this).prev('input').attr('id') + '",';
                $formDataJSON += '"text":"' + $(this).text();
                $formDataJSON += $choiceCount != (index + 1) ? '"},{' : '"}]';
            });
        };

        $.checkboxEncode = function ($dom) {
            var $property = $($dom).find('div.formInputCheckFrame'),
                $question = $($dom).find('p.formQuestions').text(),
                $choice = $property.children('label'),
                $choiceCount = $choice.size(),
                $required = $($dom).find('a.formElementRequired').hasClass('active') ? 'true' : 'false';
            $formDataJSON += '"title":"' + $question + '",';
            $formDataJSON += '"type":"checkbox",';
            $formDataJSON += '"name":"' + $choice.prev('input').attr('name') + '",';
            $formDataJSON += '"required":"' + $required + '",';
            $formDataJSON += '"choice":[{';
            $choice.each(function (index) {
                $formDataJSON += '"id":"' + $(this).prev('input').attr('id') + '",';
                $formDataJSON += '"text":"' + $(this).text();
                $formDataJSON += $choiceCount != (index + 1) ? '"},{' : '"}]';
            });
        };

        $.fn.formCreate.FormParser = function ($data) {
            var $parse = $.parseJSON($data);
            $.each($parse["data"], function (i) {
                switch ($parse["data"][i].type) {
                case 'text':
                    $.editTextParse($parse["data"][i]);
                    break;
                case 'textarea':
                    $.editTextareaParse($parse["data"][i]);
                    break;
                case 'picker':
                    $.editPickerParse($parse["data"][i]);
                    break;
                case 'slider':
                    $.editSliderParse($parse["data"][i]);
                    break;
                case 'radio':
                    $.editRadioParse($parse["data"][i]);
                    break;
                case 'checkbox':
                    $.editCheckboxParse($parse["data"][i]);
                    break;
                }
            });

            $('.formInputRadioFrame, .formInputCheckFrame').buttonset();
            $(".formPicker").datepicker();
        };

        $.parseApennd = function (dom) {
            $('ul.formFrame').append(dom);
        };

        $.editTextParse = function ($object) {
            var $requiredDom = $object.required == 'true' ? '<p class="formQuestions">' + $object.title + '<span class="required"></span></p>' : '<p class="formQuestions">' + $object.title + '</p>',
                $requiredClass = $object.required == 'true' ? 'class="formElementRequired active"' : 'class="formElementRequired"',
                $prs = '<li class="fieldFrame formTextbox"><nav class="hoverPosition clearBg"><input type="text" class="formTextQuestions" value="' + settings.questionText + '" placeholder="' + settings.questionText + '" />' + $requiredDom + '<input type="text" id="' + $object.id + '" name="' + $object.name + '" class="formTextUser" value="' + settings.userInputText + '" placeholder="' + settings.userInputText + '" readonly="true"/><a href="#" class="formElementDelete"></a> <a href="#" class="formElementSave"></a> <a href="#" ' + $requiredClass + '></a></nav><p class="formSeperator"></p><div class="sortArrow"></div><a href="#" class="formEdit"></a></li>';
            $.parseApennd($prs);
        };

        $.editTextareaParse = function ($object) {
            var $requiredDom = $object.required == 'true' ? '<p class="formQuestions">' + $object.title + '<span class="required"></span></p>' : '<p class="formQuestions">' + $object.title + '</p>',
                $requiredClass = $object.required == 'true' ? 'class="formElementRequired active"' : 'class="formElementRequired"',
                $prs = '<li class="fieldFrame fromTextarea"><nav class="hoverPosition clearBg"><input type="text" class="formTextQuestions" value="' + settings.questionText + '" placeholder="' + settings.questionText + '" />' + $requiredDom + '<textarea id="' + $object.id + '" name="' + $object.name + '" class="formTextareaUser" placeholder="' + settings.userInputText + '" readonly="true">' + settings.userInputText + '</textarea><a href="#" class="formElementDelete"></a> <a href="#" class="formElementSave"></a> <a href="#" ' + $requiredClass + '></a> </nav><p class="formSeperator"></p><div class="sortArrow"></div><a href="#" class="formEdit"></a></li>';
            $.parseApennd($prs);
        };

        $.editPickerParse = function ($object) {
            var $requiredDom = $object.required == 'true' ? '<p class="formQuestions">' + $object.title + '<span class="required"></span></p>' : '<p class="formQuestions">' + $object.title + '</p>',
                $requiredClass = $object.required == 'true' ? 'class="formElementRequired active"' : 'class="formElementRequired"',
                $prs = '<li class="fieldFrame fromPicker"><nav class="hoverPosition clearBg"><input type="text" class="formTextQuestions" value="' + settings.questionText + '" placeholder="' + settings.questionText + '" />' + $requiredDom + '<input type="text" id="' + $object.id + '" class="formPicker" placeholder="' + settings.userDatePickerText + '" name="' + $object.name + '"/><a href="#" class="formElementDelete"></a> <a href="#" class="formElementSave"></a> <a href="#" ' + $requiredClass + '></a></nav><p class="formSeperator"></p><div class="sortArrow"></div><a href="#" class="formEdit"></a></li>';
            $.parseApennd($prs);
        };

        $.editSliderParse = function ($object) {
            var $requiredDom = $object.required == 'true' ? '<p class="formQuestions">' + $object.title + '<span class="required"></span></p>' : '<p class="formQuestions">' + $object.title + '</p>',
                $requiredClass = $object.required == 'true' ? 'class="formElementRequired active"' : 'class="formElementRequired"',
                $prs = '<li class="fieldFrame formSlider"><nav class="hoverPosition clearBg"><input type="text" class="formTextQuestions" value="' + settings.questionText + '" placeholder="' + settings.questionText + '" />' + $requiredDom + '<div class="sliderOptionsFrame"><input type="text" class="sliderOptions" name="max" value="' + $object.sliderOptions.max + '"/><input type="text" class="sliderOptions" name="min" value="' + $object.sliderOptions.min + '"/><input type="text" class="sliderOptions" name="step" value="' + $object.sliderOptions.step + '"/><input type="text" class="sliderOptions" name="value" value="' + $object.sliderOptions.value + '"/></div><div class="sliderFrame"><div id="' + $object.id + '" class="slider"></div><span class="sliderInfo"><span id="slider-result_' + stringClear($object.id) + '" class="slider-result">' + $object.sliderOptions.value + '</span> %</span><input type="hidden" class="sliderHiddenField" name="sliderValues_' + stringClear($object.id) + '" value="' + $object.sliderOptions.value + '"/></div><a href="#" class="formElementDelete"></a> <a href="#" class="formElementSave"></a> <a href="#" ' + $requiredClass + '></a> </nav><p class="formSeperator"></p><div class="sortArrow"></div><a href="#" class="formEdit"></a></li>';
            $('ul.formFrame').append($prs);
            $('#' + $object.id).slider({
                animate: true,
                range: 'min',
                value: $object.sliderOptions.value,
                min: $object.sliderOptions.min,
                max: $object.sliderOptions.max,
                step: $object.sliderOptions.step,
                disabled: false,
                slide: function (event, ui) {
                    $(this).closest('div.sliderFrame').find('span.slider-result').html(ui.value);
                },
                change: function (event, ui) {
                    $(this).closest('div.sliderFrame').find('input.sliderHiddenField').attr('value', ui.value);
                }
            });
        };

        $.editRadioParse = function ($object) {
            var tempInput = '',
                tempDiv = '',
                $prs, $requiredDom = $object.required == 'true' ? '<p class="formQuestions">' + $object.title + '<span class="required"></span></p>' : '<p class="formQuestions">' + $object.title + '</p>',
                $requiredClass = $object.required == 'true' ? 'class="formElementRequired active"' : 'class="formElementRequired"';
            $.each($object.choice, function (i, j) {
                tempInput += '<input type="radio" id="' + $object.choice[i].id + '" name="' + $object.name + '"/><label for="' + $object.choice[i].id + '" class="rbLabel">' + $object.choice[i].text + '</label>';
                tempDiv += '<p style="display:none">' + $object.choice[i].text + '<a href="#"></a></p>';
            });
            $prs = '<li class="fieldFrame formRadio"><nav class="hoverPosition clearBg"><input type="text" class="formTextQuestions" value="' + settings.questionText + '" placeholder="' + settings.questionText + '" />' + $requiredDom + '<input class="formCheckboxUser" placeholder="' + settings.userAddInput + '" /><input type="button" value="' + settings.userAddButton + '" class="formAddElementUser"/><div class="checkGroupFrame">' + tempDiv + '</div><div class="formInputRadioFrame">' + tempInput + '</div><a href="#" class="formElementDelete"></a> <a href="#" class="formRadioSaveGroup"></a> <a href="#" ' + $requiredClass + '></a> </nav><p class="formSeperator"></p><div class="sortArrow"></div><a href="#" class="formEdit"></a></li>';
            $.parseApennd($prs);
        };

        $.editCheckboxParse = function ($object) {
            var tempInput = '',
                tempDiv = '',
                $prs, $requiredDom = $object.required == 'true' ? '<p class="formQuestions">' + $object.title + '<span class="required"></span></p>' : '<p class="formQuestions">' + $object.title + '</p>',
                $requiredClass = $object.required == 'true' ? 'class="formElementRequired active"' : 'class="formElementRequired"';
            $.each($object.choice, function (i, j) {
                tempInput += '<input type="checkbox" id="' + $object.choice[i].id + '" name="' + $object.name + '"/><label for="' + $object.choice[i].id + '" class="cbLabel">' + $object.choice[i].text + '</label>';
                tempDiv += '<p style="display:none">' + $object.choice[i].text + '<a href="#"></a></p>';
            });
            $prs = '<li class="fieldFrame formCheckbox"><nav class="hoverPosition clearBg"><input type="text" class="formTextQuestions" value="' + settings.questionText + '" placeholder="' + settings.questionText + '" />' + $requiredDom + '<input class="formCheckboxUser" placeholder="' + settings.userAddInput + '" /><input type="button" value="' + settings.userAddButton + '" class="formAddElementUser"/><div class="checkGroupFrame">' + tempDiv + '</div><div class="formInputCheckFrame">' + tempInput + '</div><a href="#" class="formElementDelete"></a> <a href="#" class="formCheckboxSaveGroup"></a> <a href="#" ' + $requiredClass + '></a> </nav><p class="formSeperator"></p><div class="sortArrow"></div><a href="#" class="formEdit"></a></li>';
            $.parseApennd($prs);
        };

        function stringClear(val) {
            var $pattern = new RegExp(/[^0-9]/g);
            if (typeof val != 'undefined' && val.indexOf('demo') < 0) val = val.replace($pattern, '');
            else val = '';
            return val;
        };

        if (!Array.prototype.indexOf) {
            Array.prototype.indexOf = function (elt) {
                var len = this.length >>> 0;
                var from = Number(arguments[1]) || 0;
                from = (from < 0) ? Math.ceil(from) : Math.floor(from);
                if (from < 0) from += len;
                for (; from < len; from++) {
                    if (from in this && this[from] === elt) return from;
                }
                return -1;
            };
        };
    };
})(jQuery);