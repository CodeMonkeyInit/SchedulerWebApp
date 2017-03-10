function initializeEditableParameters()
{
    $.fn.editable.defaults.mode = 'inline';
    $(".task-text").editable({
        type: "text",
        title: "Редактирование",
        success: onTaskUpdate
    });
}

function setEventHandlers()
{
    $(".remove-button").on("click", onRemoveClick);
}


function updateTaskList()
{
    $.ajax({
        url: "view",
        method: "GET",
        success: function(response, status)
        {
            $(".tasks-container").empty();
            $(".tasks-container").append(response);
            onTasksLoad();
        },
        error: function(response, status, errorCode)
        {
            printAlert("error", "Возникла ошибка при обновлении(" + errorCode + ")");
        }
    })
}

function removeTask(id)
{
    $.ajax({
        url: "remove",
        method: "POST",
        data: {
            id: id
        },
        success: function (response, status) {
            printAlert("success", "Успешно удалено!");
            updateTaskList();
        },
        error: function (response, status, errorCode) {
            printAlert("error", "Возникла ошибка при удалении!(" + errorCode + ")");
        }
    });
}

$(document).ready()
{
    onTasksLoad();
    $(".new-task-form").on("submit", function (event) {
        var taskFormSubmitter = new TaskFormSubmitter(this);
        event.preventDefault();
        taskFormSubmitter.submit();
    });
}