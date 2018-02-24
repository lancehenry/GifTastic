$(document).ready(function () {

    // Array of cast members to populate buttons
    var castMembers = ["Chris Farley", "Eddie Murphy", "Bill Murray", "Tina Fey", "Amy Poehler"];

    // Loop through the castMembers array and make buttons
    function renderButtons() {
        $("#buttons-view").empty();

        for (var i = 0; i < castMembers.length; i++) {

            var newButton = $("<button>");
            newButton.addClass("btn btn-secondary");
            newButton.attr("id", "input");
            newButton.attr("data-name", castMembers[i]);
            newButton.text(castMembers[i]);
            $("#buttons-view").append(newButton);
        }
    }

    // Push the newly created actor name into the button
    $("#add-cast").on("click", function (event) {
        event.preventDefault();
        var actorName = $("#snl-input").val().trim();
        castMembers.push(actorName);
        $("form").trigger("reset");
        renderButtons();
    })

    // This function renders the HTML to display appropriate content
    function displayActorGif() {

        // Create div elements for the returned gifs
        $("#display-gif").empty();

        // Get the actor name from the button clicked
        var actorName = $(this).attr("data-name");

        // Construct the giphy URL
        var key = "pqiitu4zMJkZ8McUt0eKXF5mwcAZy2AQ";
        var giphyURL = "https://api.giphy.com/v1/gifs/search?q=" + actorName + "&api_key=" + key + "&limit=10";

        // Create an AJAX call for specific actor name being clicked
        $.ajax({
            url: giphyURL,
            method: "GET"
        }).then(function (response) {

            for (var i = 0; i < response.data.length; i++) {

                // Creates a new div and add's a class
                var newDiv = $("<div>");
                newDiv.addClass("actorGif");

                // Creates a new image element, populates it with correct parameters
                var newImg = $("<img>");
                newImg.attr("src", response.data[i].images.fixed_height_still.url);
                newImg.attr("data-still", response.data[i].images.fixed_height_still.url);
                newImg.attr("data-animate", response.data[i].images.fixed_height.url);
                newImg.attr("data-state", "still");
                newImg.attr("class", "gif");

                // Appends the newDiv variable with the newImg variable (img)
                newDiv.append(newImg);

                // Grabs the rating and stores it in newRating variable
                var newRating = response.data[i].rating;
                
                // Creates a paragraph tag and appends everything to the newDiv element above
                var pRating = $("<p>").text("Rating: " + newRating);
                newDiv.append(pRating);

                // Manipulates the DOM by appending newDiv element to the HTML id (display-gif)
                $("#display-gif").append(newDiv);
            }
        });
    }

    // Change state based on whether the gif is "still" or "animate"
    function changeState () {
        var state = $(this).attr("data-state");
        var animateImg = $(this).attr("data-animate");
        var stillImg = $(this).attr("data-still");

        if (state == "still") {
            $(this).attr("src", animateImg);
            $(this).attr("data-state", "animate");
        } else if (state == "animate") {
            $(this).attr("src", stillImg);
            $(this).attr("data-state", "still");
        }
    }

    renderButtons();

    $(document).on("click", "#input", displayActorGif);
    $(document).on("click", ".gif", changeState);
});