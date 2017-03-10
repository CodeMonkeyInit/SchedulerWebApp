function onTasksLoad()
{
    initializeEditableParameters();
    setEventHandlers();
}

function onTaskUpdate(response, newValue)
{
    var unsaved = $(".editable-open");
    var id = unsaved.attr("id").replace("task-", "");

    if (newValue != "")
    {
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
    else
    {
        printAlert("error", "Поле не может быть пустым оно будет удалено!");
        removeTask(id);
    }
}

function onRemoveClick(event)
{
    var id = event.currentTarget.id.replace("remove-", "");
    removeTask(id);
}