# Cordova Bluetooth Terminal

[![dependencies Status](https://david-dm.org/loginov-rocks/Cordova-Bluetooth-Terminal/status.svg)](https://david-dm.org/loginov-rocks/Cordova-Bluetooth-Terminal)

Simple app for communication with devices via bluetooth based on Apache Cordova (PhoneGap). It was made to fetch data
from one of IoT (Internet of Things) device, so it's source code can be helpful as a base for your own project.

![Paired devices screenshot](https://raw.githubusercontent.com/loginov-rocks/Cordova-Bluetooth-Terminal/master/misc/Paired-devices-screenshot.png)
![Terminal screenshot](https://raw.githubusercontent.com/loginov-rocks/Cordova-Bluetooth-Terminal/master/misc/Terminal-screenshot.png)

## Quick Start

Make sure you have [cordova-cli](https://cordova.apache.org/) installed globally, install with the help of
[npm](https://www.npmjs.com/) otherwise:

```sh
$ npm install -g cordova
```

Clone repository, jump into, pull platforms (only **android** by default) and plugins: 

```sh
$ git clone https://github.com/loginov-rocks/Cordova-Bluetooth-Terminal.git
$ cd Cordova-Bluetooth-Terminal
$ cordova prepare
```

Also, you can check Cordova requirements (optional or is something failed):

```sh
$ cordova requirements
```

Build:

```sh
$ cordova build
```

Or run on connected Android device via USB:

```sh
$ cordova run
```

Emulator is useless here, because you need working bluetooth module.

## Used
* [BluetoothSerial](https://github.com/don/BluetoothSerial/) Cordova plugin
* [jQuery 3.1.1](https://jquery.com/)
* [Reset CSS](http://meyerweb.com/eric/tools/css/reset/)

## Tests

### Android APK

You can try android build from [here](https://github.com/loginov-rocks/Cordova-Bluetooth-Terminal/blob/master/misc/android-build/android-debug.apk)
without installing anything.

### With Arduino Uno

#### Requirements
* Smartphone (tablet, etc)
* Arduino Uno
* Bluetooth module (HC-05 for example)
* PC

Use [`/misc/arduino-uno-bridge/arduino-uno-bridge.ino`](https://github.com/loginov-rocks/Cordova-Bluetooth-Terminal/blob/master/misc/arduino-uno-bridge/arduino-uno-bridge.ino)
script to make serial bridge between PC and device connected to Arduino Uno via bluetooth. Wire bluetooth module to
Arduino Uno as mentioned there, upload script, open Serial Monitor on PC and pair smartphone with BT module.

Open Terminal app, select paired device, connect to it and now whatever you send in Serial Monitor on PC will appear in
app and vice versa. Because of using SoftwareSerial this script is not reliable at all, some symbols can be skipped,
etc. So... buy Mega! Or STM32.
