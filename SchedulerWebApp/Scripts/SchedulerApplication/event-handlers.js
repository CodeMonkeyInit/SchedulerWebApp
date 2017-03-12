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
        if (newValue.length <= DESCRIPTION_MAX_LENGTH)
        {
            $.ajax({
                url: "update",
                method: "POST",
                data: {
                    id: id,
                    updatedDescription: newValue
                },
                success: function (response, status) {
                    alertHandler.printTaskListAlert(AlertType.success, "Успешно отредактированно!");
                },
                error: function (response, status, errorCode) {
                    alertHandler.printTaskListAlert(AlertType.error, "Возникла внутренняя ошибка!");
                    updateTaskList();
                }
            });
        }
        else
        {
            alertHandler.printTaskListAlert(AlertType.error, "Новое описание более " + DESCRIPTION_MAX_LENGTH + " символов");
            updateTaskList();
        }
    }
    else
    {
        alertHandler.printTaskListAlert(AlertType.error, "Поле не может быть пустым оно будет удалено!");
        removeTask(id);
    }
}

function onRemoveClick(event)
{
    var id = event.currentTarget.id.replace("remove-", "");
    removeTask(id);
}