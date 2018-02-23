$(document).ready(function () {

    // Array of cast members to populate buttons
    var castMembers = ["Will Ferrell", "Eddie Murphy", "Bill Murray", "Tina Fey", "Amy Poehler"];

    // Loop through the castMembers array and make buttons
    function renderButtons() {
        $("#buttons-view").empty();

        for (var i = 0; i < castMembers.length; i++) {
            
            var newButton = $("<button>");
            newButton.addClass("actor" + "btn btn-secondary");
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
        renderButtons();
    })

    renderButtons();

    // This function renders the HTML to display appropriate content
    function displayActorGif() {

        // Get the actor name from the button clicked
        var actorName = $(this).attr("data-name");

        // Create div elements for the returned gifs
        // $("#gif-view").empty();

        // Construct the giphy URL
        var key = "pqiitu4zMJkZ8McUt0eKXF5mwcAZy2AQ";
        var giphyURL = "https://api.giphy.com/v1/gifs/search?q=" + actorName + "&api_key=" + key + "&limit=10";

        // Create an AJAX call for specific actor name being clicked
        $.ajax({
            url: giphyURL,
            method: "GET"
        }).then(function (response) {

            for (var i = 0; i < response.data.length; i++) {

                var newDiv = $("<div>");
                newDiv.addClass("actorGif");

                var newImg = $("<img>");
                newImg.attr("src", response.data[i].images.original_still.url);
                newImg.attr("data-still", response.data[i].images.original_still.url);
                newImg.attr("data-animate", response.data[i].images.original.url);
                newImg.attr("data-state", "still");
                newImg.attr("class", "gif");

                newDiv.append(newImg);

                var newRating = response.data[i].rating;
                console.log(response);
                var pRating = $("<p>").text("Rating: " + rating);

                newDiv.append(pRating);

                $("gif-view").append(newDiv);
            }

        });
    }

    displayActorGif();
    // $(document).on("click", "#add-cast", displayActorGif);

});





/*
var key = "pqiitu4zMJkZ8McUt0eKXF5mwcAZy2AQ";
var gifURL = "https://api.giphy.com/v1/gifs/search?q=Saturday+Night+Live&api_key=" + key + "&limit=10";
console.log(gifURL);

$.ajax({
    url: gifURL,
    method: "GET"
}).then(function (response) {

    for (var i = 0; i < 10; i++) {
        var newGif = response.data[i].images.fixed_height_still.url;

        var test = $("<img>").attr("src", newGif);

        test.addClass("dynamic");

        $("#gif").append(test);
    }

    $(".dynamic").click(function () {

        var clickedURL = $(this).attr("src");
        console.log('---------------------');
        console.log(clickedURL);
        console.log('---------------------');
        console.log('+++++++++++++++++++++++++');
        var splitURL = clickedURL.split('_');
        console.log(splitURL[0]);
        console.log('+++++++++++++++++++++++++');
        console.log('=========================');
        var dynamicURL = splitURL[0] + '.gif';
        console.log(dynamicURL);
        console.log('=========================');
        $(this).attr("src", dynamicURL);

    })

})*/