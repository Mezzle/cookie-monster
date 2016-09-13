(function ($) {
    $(function () {
        chrome.storage.sync.get("sound", function(data) {
            $('#sound').prop("checked", data.sound);
            console.log(data);
        });

        $('#save_btn').closest('form').submit(function (e) {
            e.preventDefault();
            chrome.storage.sync.set({
                "sound": $('#sound').prop("checked"),
                "clearLocalStorage": $('#local-storage').prop("checked"),
                "clearSessionStorage": $('#session-storage').prop("checked"),
            }, function() {
                window.alert('The options have been saved!');
            });
        });
    });
})(jQuery);
