(function($){

  Drupal.behaviors.qelluchaska = {
    attach: function(context, settings) {
      var form = $('.add-to-cart form', context);
      var select = form.find('select');
      var options = select.find('option');
      var template = $('<ul id="cart-options"></ul>');
      var template_item = $('<li data-opt="{value}">{name}</li>');
      var template_button = $('<button type="button" id="do-payment"></button>');
      var text_to_replace = 'Adelanto, +';

      template_button.text(Drupal.t('Make Payment'));

      template_button.click(function(e) {
        //e.preventDefault();
        form.submit();
      });

      template.appendTo('.bar-visa');
      template_button.appendTo('.bar-visa');

      form.css({display: 'none'});

      options.each(function(i){
        _this = $(this);
        if (_this.val() != '') {
          var item = template_item.clone();
          item.data('opt', _this.val());
          item.html(_this.html().replace(text_to_replace, ''));
          item.click(function(e) {
            // Form handler.
            select.find('option').removeAttr('selected');
            select.find('option[value="'+ item.data('opt') +'"]').attr('selected', 'selected');

            // Styles handler.
            template.find('li').removeClass('selected');
            item.addClass('selected').slideDown();
          });
          item.appendTo(template);
        }
      });

      initPayment = function() {
        select.find('option').removeAttr('selected');
        select.find('option:eq(3)').attr('selected', 'selected');

        template.find('li:eq(2)').addClass('selected');
      }

      initPayment();
  
    }
  }
})(jQuery);
