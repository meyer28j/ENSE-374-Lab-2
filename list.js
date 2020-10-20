// given "this" is the <input type="checkbox"/>
// toggle visibility of text strike-through and abandon button
function check() {
    let parent = $(this).parent().parent().parent(); // it's gross, I know
    parent.children("span").toggleClass("line-through"); // add / remove line through effect
    parent.children().last().toggleClass("hidden"); // add / remove abandon button visibility
    console.log("Task '" + parent.find("span").text() + "' checked");

}

// prepends checkbox to given parent element
function addCheckbox(parent) {
    let mrSet = $("<div></div>").addClass("input-group-prepend"); // create input group prepend div
    let mrSetJr = $("<div></div>").addClass("input-group-text"); // create input group text div
    mrSetJr.append($("<input/>").attr("type", "checkbox")); // create checkbox
    mrSetJr.children().first().click(check); // attach event listener to checkbox click
    mrSet.append(mrSetJr); // attach checkbox to div
    parent.prepend(mrSet); // attach checkbox div to parent div
}

// deletes checkbox from given parent element
function removeCheckbox(parent) {

    let prepend = parent.children().first(); // get first child of element
    console.log(prepend.find("input"));
    if (prepend.find("input").length > 0) { // check there is a checkbox prepended
        prepend.remove(); // remove prepended element
        console.log("Checkbox removed");
    }
}

// assume the event was attached with the "one()" method
// change button text to "claim" and add event listener
function abandon() {

    let btn = $(this); // get button element
    let parent = btn.parent().parent(); // get button grandparent
    btn.text("Claim"); // change text to "claim"
    btn.one("click", claim); // add abandon event handler

    removeCheckbox(parent); // hide checkbox
    console.log("Task '" + parent.find("span").text() + "' abandoned");
}

// assume the event was attached with the "one()" method
// change button text to "abandon" and add event listener
function claim() {

    let btn = $(this); // get button element
    let parent = btn.parent().parent(); // get button grandparent
    btn.text("Abandon"); // change text to "abandon"
    btn.one("click", abandon); // add claim event listener

    addCheckbox(parent); // add checkbox
    console.log("Task '" + parent.find("span").text() + "' claimed");
}

// creates and prepends a div with a checkbox, an
// abandon button, and text from "new task" field
function addTask() {
    let newText = $("#newTask").val(); // get text from "add" element
    if (newText == "" || newText == null) { return; } // no text added!?!? Get outta here!

    let newTask = $("<div></div>").addClass("input-group mb-3"); // create parent div

    addCheckbox(newTask); // create checkbox prepend

    // create task text
    mrSet = $("<span></span>").addClass("input-group-text form-control"); // create input group text span
    mrSet.text(newText); // insert new text into span
    newTask.append(mrSet); // attach text span

    // create abandon button
    mrSet = $("<div></div>").addClass("input-group-append") // create input group append div
    mrSetJr = $("<button></button>").addClass("btn btn-outline-secondary"); // create abandon button
    mrSetJr.attr("type", "button"); // add button attribute
    mrSetJr.text("Abandon"); // add button text
    mrSetJr.first().one("click", abandon); // attach event listener to abandon click
    mrSet.append(mrSetJr); // append button to div
    newTask.append(mrSet); // append button div to parent div

    let addTask = $("#newTask"); // get "add new task" bar
    addTask.parent().before(newTask); // insert new task before "add new task" bar
    addTask.val(""); // clear add task text

    console.log("New task '" + newText + "' added");

}

// remove all completed tasks
function removeComplete () {
    $("span.line-through").parent().remove();
    console.log("Completed tasks removed");
}

$(document).ready(function () {
    console.log("list.js jQuery loaded successfully.");


    // add click event listeners for existing checkboxes
    $(":checkbox").each( function() { // for every checkbox
        // (SOLVED) PROBLEM: refreshing the page resets the form element and keeps the checkmark
        // line is striked and box unchecked OR line is unstriked and box is checked
        if ($(this).prop("checked") && !($(this).parent().parent().next().hasClass("line-through")) ||
        !($(this).prop("checked")) && $(this).parent().parent().next().hasClass("line-through")) {
            $(this).click(); // toggle the check in the 'mismatched' cases
        }
        $(this).click(check); // add line-through change for checkbox click
    })

    // add click event listeners for existing buttons, excluding 'add' and 'remove'
    $(":button").each( function() { // for every button
        console.log($(this));
        if ($(this).id == "buttonAdd") return false; // break once 'Add' button is reached
        // if abandon button, add event listener for abandon, else add listener for claim
        ($(this).text() == "Abandon") ? $(this).one("click", abandon) : $(this).one("click", claim);
    })

    // add event listeners for 'add' and 'remove' buttons
    $("#buttonAdd").click(addTask); // create new task when you click the add button
    $("#buttonRemove").click(removeComplete); // remove completed tasks when you click the remove button
});

/*
3. Non-persistent interactivity (30 Marks)
In this section you will add simplified interactive tasks for one user. Using JavaScript or jQuery DOM manipulation, add the following functionality
- If the user enters text and clicks the add task button, create and add a simple task
    - Have a textbox which matches the input text content, but is no longer editable
    - Have a checkbox to the left of the task for the user to click on when finished
    - Experiment with jQuery animations for adding the new task
- When the user clicks on the checkbox, cross off the task
- If the user unchecks the checkbox, return the task to normal
- Finally, when the user clicks remove complete, remove all of the completed tasks
    - Experiment with jQuery animations for removing completed tasks
    */