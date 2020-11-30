function recipeSearch() {
    $("#recipes-list").empty()

    var name = document.getElementById("search").value
    var cusine = document.getElementById("cuisine").value
    var diet = document.getElementById("diet").value

    console.log(name, cusine, diet)

    $.ajax({
        url: "https://api.spoonacular.com/recipes/complexSearch?query=" + name
            + "&cuisine=" + cusine
            + "&diet=" + diet
            + "&fillIngredients=true"
            + "&addRecipeInformation=true"
            + "&instructionsRequired=true"
            + "&number=5"
            + "&apiKey=cfa7fbc94a1c47f6bf5226d691f51ab5",
        type: "GET",
        dataType: "json",
        success: function (data) {
            console.log(data)

            displayResults(data)
        }
    })
}

function displayResults(data) {
    var noResults = $("#no-results")

    if (data.results.length == 0) {
        noResults.show()

        return
    }

    noResults.hide()

    var recipesList = $("#recipes-list")

    $.each(data.results, function (index, element) {
        var recipe = $("#recipe").clone().attr("id", "")

        recipe.find("#recipe-name").text(element.title)
        recipe.find("#recipe-img").attr("src", element.image)
        recipe.find("#recipe-description").html(element.summary)

        var ingredients = element.extendedIngredients
        var ingredientsList = recipe.find("#ingredients-list")

        var viewMoreButton = recipe.find("#btn-view-more")
        var moreInfoView = recipe.find("#more-info")

        viewMoreButton.click(function () {

            if (moreInfoView.is(":hidden")) {
                // moreInfoView.show()
                moreInfoView.attr('hidden', false)
                viewMoreButton.text("View less")
            }
            else {
                // moreInfoView.hide()
                moreInfoView.attr('hidden', true)
                viewMoreButton.text("View more")
            }
        })

        $.each(ingredients, function (index, ingredient) {
            var item = $("#recipe-description-list-item").clone().attr("id", "")

            item.find("#item-label").text(ingredient.original)

            ingredientsList.append(item)
            item.show();
        });

        var instructions = element.analyzedInstructions[0].steps
        var instructionsList = recipe.find("#steps-list")

        $.each(instructions, function (index, instruction) {
            var item = $("#recipe-description-list-item").clone().attr("id", "")

            item.find("#item-label").text(instruction.step)

            instructionsList.append(item)

            item.show()
        });

        recipesList.append(recipe)

        recipe.show()
    });
}

document.getElementById("btn-search").addEventListener("click", recipeSearch)