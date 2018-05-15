var quoteModel = (function($) {
  function _api(url, method, data) {
    var deferred = $.Deferred();

    $.ajax({
      url: url,
      method: method,
      data: data,
      success: function(res) {
        if (res.result === 'success') {
          deferred.resolve(res);
        } else {
          deferred.reject(res);
        }
      },
      error: function(err) {
        console.log('API 호출 실패 :', url, err);
      }
    });

    return deferred.promise();
  }

  return {
    modifyQuote: function(modifyname, modifyquote) {
      return _api('/quotes', 'put', {'name': modifyname, 'quote': modifyquote});
    },

    deleteQuote: function(delname) {
      return _api('/quotes', 'delete', {'name': delname});
    }
  }
})(jQuery);

var quoteView = (function($) {
  var self;
  var $els = {};

  var _onClickModifyBtn = function() {
    var modifyname = document.querySelector('.modify_name').value;
    var modifyquote = document.querySelector('.modify_quote').value;

    $(self).trigger('modifyQuote', [modifyname, modifyquote]);
  };

  var _onClickDeleteBtn = function() {
    var delname = document.querySelector('.del_name').value;

    $(self).trigger('deleteQuote', [delname]);
  };

  return {
    init: function() {
      self = this;

      this.cacheElements();
      this.bindEvents();
    },

    cacheElements: function() {
      $els.quoteModify = $('#modify');
      $els.quoteDelete = $('#delete');
    },

    bindEvents: function() {
      $els.quoteModify.on('click', _onClickModifyBtn);
      $els.quoteDelete.on('click', _onClickDeleteBtn);
    },

    modifyQuote: function() {

    },

    deleteQuote: function() {

    }
  }
})(jQuery);

var quoteController = (function($, model, view){
  var self;

  var _onModifyQuote = function(modifyname, modifyquote) {
    model
      .modifyQuote(modifyname, modifyquote)
      .then(function(res) {
        window.location.reload();
      });
  };

  var _onDeleteQuote = function(delname) {
    model
      .deleteQuote(delname)
      .then(function(res) {
        window.location.reload();
      });
  };

  return {
    init: function() {
      self = this;

      view.init();

      this.bindEvents();
    },

    bindEvents: function() {
      var $view = $(view);

      $view
        .on('modifyQuote', _onModifyQuote)
        .on('deleteQuote', _onDeleteQuote);
    }
  }
})(jQuery, quoteModel, quoteView).init();