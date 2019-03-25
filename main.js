$(document).ready(function(){


    document.addEventListener(
        "mouseup",
        function() {
          var highlightedText = getSelectionText();
          if (highlightedText.length > 0) {
            // check there's some text selected
            word = highlightedText;
            dictionarySearch();
            console.log(highlightedText); // logs whatever textual content the user has selected on the page
          }
        },
        false
      );

      function getSelectionText() {
        var selectedText = "";
        if (window.getSelection) {
          // all modern browsers and IE9+
          selectedText = window.getSelection().toString();
        }
        return selectedText;
      }

      function dictionarySearch() {
          $("#data_paragraph").html("");
          let url = "https://cors-anywhere.herokuapp.com/https://jisho.org/api/v1/search/words/?keyword=" + word;
          $.ajax({
            type: 'GET',
            url: url,
            success: function(res) {
                $.each(res.data, function(i, item) {
                    $("#data_paragraph").append("<li>" + JSON.stringify(item.senses[0].english_definitions) + " " + JSON.stringify(item.japanese[0].word) + " " + JSON.stringify(item.japanese[0].reading) + "</li>");
                })
    
            }
        })
        }
      

});

