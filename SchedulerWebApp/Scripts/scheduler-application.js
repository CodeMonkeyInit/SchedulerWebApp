function getAlert(type, message)
{
    if (type == "success")
    {
        return "<div class=\"alert alert-success task-list-alert col-md-12\"> <a href=\"#\" class=\"close\" data-dismiss=\"alert\" aria-label=\"close\">&times;</a>" + message + "</div>";
    }
    else (type == "error")
    {
        return "<div class=\"alert alert-danger task-list-alert col-md-12\"> <a href=\"#\" class=\"close\" data-dismiss=\"alert\" aria-label=\"close\">&times;</a>" + message + "</div>";

    }
}

function printAlert(type, message)
{
    $(".alerts-container").empty();
    $(".alerts-container").append(getAlert(type, message));
}

function onTasksLoad()
{
    $.fn.editable.defaults.mode = 'inline';
    $(".task-text").editable(
        {
            type: "text",
            title: "Редактирование",
            success: onEditableSave
        });

    $(".task-text").on("save", onEditableSave);
    $(".remove-button").on("click", onRemoveClick);
}

function updateTaskList()
{
    $.ajax({
        url: "view",
        method: "POST",
        success: function(response, status)
        {
            $(".tasks-container").empty();
            $(".tasks-container").append(response);
            onTasksLoad();
        }
    })
}

function onRemoveClick(event)
{
    var id = event.currentTarget.id.replace("remove-", "");

    $.ajax({
        url: "remove",
        method: "POST",
        data: {
            id: id
        },
        success: function(response, status)
        {
            printAlert("success", "Успешно удалено!");
            updateTaskList();
        }
    })
}

function onAddNewTaskSuccess()
{
    printAlert("success", "Успешно добавленно!");
    updateTaskList();
}

function onEditableSave(response, newValue)
{
    var unsaved = $(".editable-open");
    var id = unsaved.attr("id").replace("task-", "");

    $.ajax({
        url: "update",
        method: "POST",
        data: {
            id: id,
            updatedDescription: newValue
        },
        success: function (response, status) {
            printAlert("success", "Успешно отредактированно!");
        },
        error: function (response, status, errorCode) {
            $(".task-list-alert").remove();
            $(".alerts-container").append(getAlert("error", "Возникла внутренняя ошибка!"));
            updateTaskList();
        }
    });
}

$(document).ready()
{
    onTasksLoad();
    $(".new-task-form").on("submit", function (event) {
        event.preventDefault();
        $.ajax({
            url: "add",
            method: "POST",
            data: $(this).serialize(),
            success: updateTaskList
        });
    });
}