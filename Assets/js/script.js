

$(function() {
  // Add a listener for click events on the save button.
  $(".saveBtn").on("click", function() {
    // Get the id of the containing time-block.
    var key = $(this).closest(".time-block").attr("id");
    // Get the user input from the corresponding textarea.
    var value = $(this).siblings(".description").val();
    // Save the key-value pair in local storage.
    localStorage.setItem(key, value);
  });

  // Apply the past, present, or future class to each time block.
  var currentHour = dayjs().hour();
  $(".time-block").each(function() {
    var hour = parseInt($(this).attr("id").split("-")[1]);
    if (hour < currentHour) {
      $(this).addClass("past").removeClass("present future");
    } else if (hour === currentHour) {
      $(this).addClass("present").removeClass("past future");
    } else {
      $(this).addClass("future").removeClass("past present");
    }
  });

  // Get any user input that was saved in localStorage and set the textarea values.
  $(".time-block").each(function() {
    var key = $(this).attr("id");
    var value = localStorage.getItem(key);
    if (value !== null) {
      $(this).find(".description").val(value);
    }
  });

  // Display the current date in the header.
  var currentDate = dayjs().format('MMMM D, YYYY');
  $("#currentDay").text(currentDate);
});
