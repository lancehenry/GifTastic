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

})