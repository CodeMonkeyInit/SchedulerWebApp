const HIDE_ALERT_IN_MS = 200;

var AlertType =
    {
        error: 0,
        success: 1
    };

function AlertHandler(displayTimeInMs)
{
    function hideAlert()
    {
        setTimeout(function () {
            alert.hide(HIDE_ALERT_IN_MS);
        }, displayTimeInMs);
    }

    this.printAlert = function (alertjQuerryObject, type, message)
    {
        alert.removeClass("alert-danger alert-success");
        
        alert.text(message);

        if (type == AlertType.success)
        {
            alert.addClass("alert-success");
        }
        else if (type == AlertType.error)
        {
            alert.addClass("alert-danger");
        }
        alert.show();
        hideAlert();
    }

    this.printFormAlert = function (alertType, message)
    {
        alert = $(".task-form-alert");
        this.printAlert(alert, alertType, message);
    }

    this.printTaskListAlert = function (alertType, message)
    {
        alert = $(".task-list-alert");
        this.printAlert(alert, alertType, message);
    }
}



