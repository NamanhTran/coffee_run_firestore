(function (window) {
    'use strict';
    var FORM_SELECTOR = '[data-coffee-payment="form"]';
    var App = window.App;
    var FormHandler = App.FormHandler;
    var formHandler = new FormHandler(FORM_SELECTOR);
    formHandler.addSubmitHandler(function (data) {
        var $div = $('<div></div>', {
            'id': 'paymentModal',
            'class': "modal"
        });

        var $p = $('<p></p>');
        var $a = $('<a></a>', {
            'href': "#",
            'rel': "modal:close"
        });

        var description = 'Thank you for your payment, ';

        if (data.title) {
            description += data.title + ' ';
        }

        description += data.username;

        $div.append($p);
        $div.append($a);
        $a.append("Close");
        $p.append(description);

        $('body').append($div);
        $("#paymentModal").modal();
    });
})(window);