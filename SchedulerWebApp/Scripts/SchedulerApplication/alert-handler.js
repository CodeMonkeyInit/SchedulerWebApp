function getAlert(type, message) {
    if (type == "success") {
        return "<div class=\"alert alert-success task-list-alert col-md-12\"> <a href=\"#\" class=\"close\" data-dismiss=\"alert\" aria-label=\"close\">&times;</a>" + message + "</div>";
    }
    else (type == "error")
    {
        return "<div class=\"alert alert-danger task-list-alert col-md-12\"> <a href=\"#\" class=\"close\" data-dismiss=\"alert\" aria-label=\"close\">&times;</a>" + message + "</div>";

    }
}

function printAlert(type, message) {
    $(".alerts-container").empty();
    $(".alerts-container").append(getAlert(type, message));
}