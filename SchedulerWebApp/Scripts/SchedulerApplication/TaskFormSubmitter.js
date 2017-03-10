function TaskFormSubmitter(form)
{
    function onSuccess()
    {
        printAlert("success", "Успешно добавленно!");
        $(".task-input").val('');
        updateTaskList();
    }

    function onError(response, status, errorCode)
    {
        printAlert("error", "Ошибка при добавлении (" + errorCode + ")");
    }

    function isValid(data)
    {
        var description = data.replace("description=", "");
        if (description != "")
        {
            return true;
        }
        else
        {
            return false;
        }
    }

    this.submit = function ()
    {
        var data = $(form).serialize();

        if (isValid(data))
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