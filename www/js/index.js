var app = {

    initialize: function () {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    onDeviceReady: function () {
        bluetoothSerial.isEnabled(app.listPairedDevices, function () {
            app.showError('Enable bluetooth')
        });

        $('#paired-devices button').click(app.listPairedDevices);
        $('#paired-devices form').submit(app.selectDevice);
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

    selectDevice: function (event) {
        event.preventDefault();

        var $label = $('#paired-devices input[name=device]:checked').parent();

        var name = $label.find('.name').text();
        var address = $label.find('input').val();

        if (!address) {
            app.showError('Select paired device to connect');
            return;
        }

        var $selectedDevice = $('#selected-device');

        $selectedDevice.find('.name').text(name);
        $selectedDevice.find('.address').text(address);
        $selectedDevice.find('.status').text('Connecting...');

        // Attempt to connect device with specified address, call app.deviceConnected if success
        bluetoothSerial.connect(address, app.deviceConnected, function (error) {
            $selectedDevice.find('.status').text('Disconnected');
            app.showError(error);
        });
    },

    deviceConnected: function () {
        $('#selected-device .status').text('Connected');
    },

    showError: function (error) {
        alert(error);
    }

};

app.initialize();
