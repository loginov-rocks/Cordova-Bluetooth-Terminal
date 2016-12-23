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
        $('#selected-device button').click(app.toggleConnection);
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

        app.connect(address);
    },

    toggleConnection: function () {
        bluetoothSerial.isConnected(
            // Disconnect if connected
            function () {
                bluetoothSerial.disconnect(app.deviceDisconnected, app.showError);
            },

            // Reconnect to selected device if disconnected
            function () {
                var address = $('#selected-device .address').text();

                if (!address) {
                    app.showError('Select paired device to connect');
                    return;
                }

                app.connect(address);
            }
        );
    },

    connect: function (address) {
        $('#selected-device .status').text('Connecting...');

        // Attempt to connect device with specified address, call app.deviceConnected if success
        bluetoothSerial.connect(address, app.deviceConnected, function (error) {
            $('#selected-device .status').text('Disconnected');
            app.showError(error);
        });
    },

    deviceConnected: function () {
        // Subscribe to data receiving as soon as the delimiter is read
        bluetoothSerial.subscribe('\n', app.handleData, app.showError);

        var $selectedDevice = $('#selected-device');
        $selectedDevice.find('.status').text('Connected');
        $selectedDevice.find('button').text('Disconnect');
    },

    deviceDisconnected: function () {
        // Unsubscribe from data receiving
        bluetoothSerial.unsubscribe(app.handleData, app.showError);

        var $selectedDevice = $('#selected-device');
        $selectedDevice.find('.status').text('Disconnected');
        $selectedDevice.find('button').text('Connect');
    },

    handleData: function (data) {
        var $dataContainer = $('#data .container');

        $dataContainer.append(data);

        if ($('#data input[name=autoscroll]').is(':checked')) {
            $dataContainer.scrollTop($dataContainer[0].scrollHeight - $dataContainer.height());
        }
    },

    showError: function (error) {
        alert(error);
    }

};

app.initialize();
