$(document).ready(function() {

    setInterval(function() {
        $.each($('.nH.Hd, .ip'), function(i, v) {
            if (typeof($(v).attr('data-gm-signature-id')) === 'undefined') {
                $(v).addClass('gm-signature');
                $(v).attr('data-gm-signature-id', new Date().getTime());
                $(v).attr('data-gm-signature-added', '0');
            }
        });
    }, 1000);

    $('body').on('click', '.gm-signature', function() {

        var id = $(this).attr('data-gm-signature-id');

        var string = $('*[data-gm-signature-id="' + id + '"] .a8i').text();

        var email = string.split(' ');
        email = email[email.length - 1]

        if (email === '') {
            string = $('title').text();
            var regex = /\S+[a-z0-9]@[a-z0-9\.]+/img;
            var result = string.match(regex);
            email = result[0];
        }
        addSignature(email, id);
    });

});

function addSignature(email, containerId) {


    // If we've already added the signature don't re-add (especially if the user has manually deleted it)
/*
    if ($('.gm-signature[data-gm-signature-id="' + containerId + '"]').attr('data-gm-signature-added') != 0) {
	    alert("ahoj");
        return;
    }
*/

alert("ahoj");


    // Get the signature URL which matches the selected email
    chrome.storage.sync.get(null, function(obj) {
        var url = null;
        var data = obj.data;
        var messageBody = '.Am.Al.editable';
        $(data).each(function(i, v) {
            if (email.match(v.email) != null) {
                url = v.url;
            }
        });
        if (url === null) {

            // If no signature URL set remove any existing one
            $('.gm-signature[data-gm-signature-id="' + containerId + '"] ' + messageBody + ' *[align="gm-signature"]')
                .remove();
            $('.gm-signature[data-gm-signature-id="' + containerId + '"] ' + messageBody + ' *[align="gm-signature-br"]')
                .remove();

        } else {

            // Create signature container if one doesn't currently exist
            if ($('.gm-signature[data-gm-signature-id="' + containerId + '"] ' + messageBody + ' *[align="gm-signature"]').length === 0) {
                $('.gm-signature[data-gm-signature-id="' + containerId + '"] ' + messageBody)
                    .append('<br align="gm-signature-br"><br align="gm-signature-br"><div align="gm-signature" contenteditable="true"/>');
            }

            // If the user has selected a different email mark it as unset, in need of updating
            if (window.gmLastUrl != url) {
                $('.gm-signature[data-gm-signature-id="' + containerId + '"] ' + messageBody + ' *[align="gm-signature"]')
                    .removeAttr('width');
            }

            // If signature container marked as not set add 'loading' styles and fetch signature from URL
            if ($('.gm-signature[data-gm-signature-id="' + containerId + '"] ' + messageBody + ' *[align="gm-signature"][width="gm-set"]').length === 0) {

                $.ajax({
                    url: url,
                    cache: false,
                    dataType: 'html',
                    success: function(data) {
                        $('.gm-signature[data-gm-signature-id="' + containerId + '"] ' + messageBody + ' *[align="gm-signature"]').attr('height', 'gm-loading').html(data);

                        $('.gm-signature[data-gm-signature-id="' + containerId + '"] ' + messageBody + ' *[align="gm-signature"]').removeAttr('height', 'gm-loading').attr('width', 'gm-set');
                    }
                });

                window.gmLastUrl = url;
            }

            $('.gm-signature[data-gm-signature-id="' + containerId + '"]').attr('data-gm-signature-added', '1');

        }
    });
}