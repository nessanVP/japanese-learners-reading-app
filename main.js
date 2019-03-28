$(document).ready(function() {
  var $data_paragraph = $("#data-paragraph");
  var $passage = $("#passage");
  var $title = $("#title");

  document.addEventListener(
    "mouseup",
    function() {
      var highlightedText = getSelectionText();
      if (highlightedText.length > 0) {
        // check there's some text selected
        word = highlightedText.toLowerCase();
        dictionarySearch();
        console.log(highlightedText); // logs whatever textual content the user has selected on the page
      }
    },
    false
  );

  document.addEventListener(
    "touchend",
    function() {
      console.log("successful");
      var highlightedText = getSelectionText();
      if (highlightedText.length > 0) {
        // check there's some text selected
        word = highlightedText.toLowerCase();
        dictionarySearch();
        console.log(highlightedText); // logs whatever textual content the user has selected on the page
      }
    },
    false
  );

  // Save button click event
  $("#save-passage").on("click", function() {
    var item = {
      title: $title.val(),
      passage: $passage.val()
    };

    $.ajax({
      type: 'POST',
      url: './api/saved_passages',
      data: item,
      success: function(newItem) {
        alert('passage saved');
      },
      error: function() {
        alert('error saving passage')
      }
    });
  });

  // Grabs selected text
  function getSelectionText() {
    var selectedText = "";
    if (window.getSelection) {
      // all modern browsers and IE9+
      selectedText = window.getSelection().toString();
    }
    return selectedText;
  }

  // API request dictionary search
  function dictionarySearch() {
    $data_paragraph.html("");
    let url =
      "https://cors-anywhere.herokuapp.com/https://jisho.org/api/v1/search/words/?keyword=" +
      word;
    console.log(url);
    $.ajax({
      type: "GET",
      url: url,
      success: function(res) {
        console.log(res);
        $.each(res.data, function(i, item) {
          $data_paragraph.append(
            "<li id='dictionary-item' class='dictionary-item'>" +
              JSON.stringify(item.senses[0].english_definitions) +
              " " +
              JSON.stringify(item.japanese[0].word) +
              " " +
              JSON.stringify(item.japanese[0].reading) +
              "</li>"
          );
        });
      }
    });
  }
});
