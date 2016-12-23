var app = {

    initialize: function () {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    onDeviceReady: function () {
        bluetoothSerial.isEnabled(app.listPairedDevices, function () {
            app.showError('Enable bluetooth, please')
        });

        $('#paired-devices button').click(app.listPairedDevices);
    },

    listPairedDevices: function () {
        bluetoothSerial.list(function (devices) {
            var $list = $('#paired-devices .list');

            if (!devices.length) {
                $list.text('Not found');
                return;
            }

            $list.text('');
            devices.forEach(function (device) {
                $list.append('<label><input type="radio" name="device" value="' + device.address +
                    '"><span class="name">' + device.name + '</span> <span class="address">' + device.address +
                    '</span></label>');
            });

        }, app.showError);
    },

    showError: function (error) {
        alert(error);
    }

};

app.initialize();
