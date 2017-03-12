function TaskFormSubmitter(form)
{
    var alertHandler = new AlertHandler(ALERTS_DELAY_IN_MS);

    function onSuccess()
    {
        alertHandler.printFormAlert(AlertType.success, "Успешно добавленно!");
        $(".task-input").val('');
        updateTaskList();
    }

    function onError(response, status, errorCode)
    {
        alertHandler.printFormAlert(AlertType.error, "Ошибка при добавлении (" + errorCode + ")");
    }

    function isValid(data)
    {
        var description = "";

        for (var i = 0; i < data.length; i++)
        {
            if (data[i].name == "description")
            {
                description = data[i].value;
            }
        }

        if (description != "")
        {
            if (description.length > DESCRIPTION_MAX_LENGTH)
            {
                alertHandler.printFormAlert(AlertType.error, "Длина описания дела больше " + DESCRIPTION_MAX_LENGTH + " символов!");
                return false;
            }
            else
            {
                return true;
            }
        }
        else
        {
            alertHandler.printFormAlert(AlertType.error, "Заполните поле \"Новое дело\"!");
            return false;
        }
    }

    this.submit = function ()
    {
        var data = $(form).serialize();
        var dataArray = $(form).serializeArray();

        if (isValid(dataArray))
        {
            $.ajax({
                url: "add",
                method: "POST",
                data: data,
                success: onSuccess,
                error: onError
            });
        }
    }
}