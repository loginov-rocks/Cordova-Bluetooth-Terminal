/**
 * Bridge script for Arduino Uno using SoftwareSerial
 * Created by Danila Loginov, December 23, 2016
 * https://github.com/1oginov/Cordova-Bluetooth-Terminal
 *
 * Wire bluetooth module to Arduino Uno as mentioned below, upload script, open Serial Monitor on PC and pair smartphone
 * with BT module. Open Terminal app, select paired device, connect to it and now whatever you send in Serial Monitor on
 * PC will appear in app and vice versa. Because of using SoftwareSerial this script is not reliable at all, some
 * symbols can be skipped, etc. So... buy Mega! Or STM32.
 *
 * Bluetooth (HC-05) to Arduino Uno wiring:
 * VCC - 5V
 * RX  - 3
 * TX  - 2
 * GND - GND
 */

#define PC_BAUDRATE 115200
#define BLUETOOTH_BAUDRATE 38400
#define LED_PIN 13

#include <SoftwareSerial.h>

SoftwareSerial SerialBT(2, 3); // RX, TX

void setup() {
    pinMode(LED_PIN, OUTPUT);

    Serial.begin(PC_BAUDRATE);
    SerialBT.begin(BLUETOOTH_BAUDRATE);
}

void loop() {
    if (SerialBT.available()) {
        digitalWrite(LED_PIN, HIGH);
        Serial.write(SerialBT.read());
        digitalWrite(LED_PIN, LOW);
    }

    if (Serial.available()) {
        digitalWrite(LED_PIN, HIGH);
        SerialBT.write(Serial.read());
        digitalWrite(LED_PIN, LOW);
    }
}
