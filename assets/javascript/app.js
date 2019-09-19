$(document).ready(function () {
    var topics = ["skiing","biking","mountain biking","flying","hang gliding","rafting","kayaking","dogs"];

createButtons();
$(document).on("click", ".topics", displayTopics);
$(document).on("click", ".images", animateTopics);

    function createButtons(){
        $("#buttons-list").empty();
        for (var i = 0; i < topics.length; i++){
            var newButton = $("<button>");
            newButton.addClass("topics btn btn-info btn-sm");
            newButton.attr("data-topics", topics[i]);
            newButton.text(topics[i]);
            $("#buttons-list").append(newButton);
        }
    };

    function displayTopics(){
        $("#gif-output").empty();
        var subject = $(this).attr("data-topics");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
          subject + "&api_key=EgR37bUnv5cf12zpF20tXid6iGcdTI2E&limit=10";
  
        $.ajax({
        url: queryURL,
        method: "GET"
        })
        .then(function(response) {
            for (var i = 0; i < 10; i++){
                var imageDiv = $("<div class=gifs>");
                var rating = response.data[i].rating;
                var imageRating = $("<p>").text("Rating: " + rating);
                var stillImage = response.data[i].images.fixed_height_still.url;
                var imageHold = $("<img>").attr("src" , stillImage);
                imageHold.attr("data-hold" , stillImage);
                var movingImage = response.data[i].images.fixed_height.url;
                imageHold.attr("data-moving", movingImage);            
                imageHold.attr("data-status" , "hold");
                imageHold.addClass("images img-fluid");
                imageDiv.append(imageHold);
                imageDiv.append(imageRating);
                $("#gif-output").append(imageDiv);
            }
        });
    };
    
    function animateTopics(){
        var state = $(this).attr("data-status");
        if (state === "hold"){
            $(this).attr("src", $(this).attr("data-moving"));
            $(this).attr("data-status", "moving");
        }
        else {
            $(this).attr("src", $(this).attr("data-hold"));
            $(this).attr("data-status", "hold");
        }
    };

    $("#add-topic").on("click", function(event) {
        event.preventDefault();
        var newTopic = $("#topics-input").val().trim();
        $("#topics-input").val("");
        if (topics.includes(newTopic) === false && newTopic !== ""){
            topics.push(newTopic);
            createButtons();
        }
    });
});