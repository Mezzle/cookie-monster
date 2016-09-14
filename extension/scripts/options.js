(function ($) {
    $(function () {
        chrome.storage.sync.get(
            ['sound', 'clearLocalStorage', 'clearSessionStorage'],
            function (data) {
                $('#sound').prop("checked", data.sound);
                $('#local-storage').prop("checked", data.clearLocalStorage);
                $('#session-storage').prop("checked", data.clearSessionStorage);
            }
        );

        $('#save_btn').closest('form').submit(function (e) {
            e.preventDefault();
            chrome.storage.sync.set({
                'sound': $('#sound').prop("checked"),
                'clearLocalStorage': $('#local-storage').prop('checked'),
                'clearSessionStorage': $('#session-storage').prop('checked')
            }, function () {
                window.alert('The options have been saved!');
            });
        });
    });
})(jQuery);
