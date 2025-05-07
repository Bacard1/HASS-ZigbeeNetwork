# 🛜 Creating/Integration of Zigbee Network in Home Assistant
[![PayPal дарение](https://img.shields.io/badge/PayPal-Дари-синьо?logo=paypal)](https://www.paypal.com/donate/?hosted_button_id=AAWFZVF2XCP5A)
![Скрипт](https://img.shields.io/badge/logo-yaml-green?logo=yaml)

The integration of a Zigbee network into Home Assistant allows managing devices such as sensors, switches and lamps through local, wireless communication.The Zigbee coordinator (eg Zigbee USB stick) is connected to Home Assistant via Zigbee2mqt or ZHA (Zigbee Home Automation).After installation and configuration of integration, the devices are added to the network (Pairing) and become available for automation and visualization in Home Assistant.

---

## 📦 Content

- [🛜 Creating/Integration of Zigbee Network in Home Assistant](#-creatingintegration-of-zigbee-network-in-home-assistant)
  - [📦 Content](#-content)
  - [Hardware preparation:](#hardware-preparation)
  - [Software preparation:](#software-preparation)

---

<br>

## Hardware preparation:

- Home Assistant OS for hardware or as a virtual machine is installed and configured.You are not ready with this step look at [Here](https://www.home-assistant.io/installation/)
  - This project used "Raspberrypi 4B 8GB" 🔽:<br> <img align="center" src="/img/RASP PI 4B.png" width="50%" height="50%">


- "Sonoff Zigbee 3.0 USB Dongle Plus" or other to create the Zigbee network.If you still don't have one see the two links below 🔽:
  - [Amazon](https://www.amazon.de/dp/B09KZX4WSB?ref=ppx_yo2ov_dt_b_fed_asin_title)
  - [Aliexpress](https://de.aliexpress.com/item/1005004266559661.html?spm=a2g0o.productlist.main.1.29cfYELkYELkj7&algo_pvid=d6c4c86f-f945-433c-addd-962a0da0c955&algo_exp_id=d6c4c86f-f945-433c-addd-962a0da0c955-0&pdp_npi=4%40dis%21EUR%2138.16%2120.99%21%21%2140.55%2122.30%21%402103890117306177577828936efd34%2112000028571354347%21sea%21DE%21749630241%21X&curPageLogUid=DHGOVitBimE5&utparam-url=scene%3Asearch%7Cquery_from%3A) 
  - Sonoff Zigbee 3.0 USB Dongle Plus was used in this project 🔽: <br> <img align="center" src="/img/Sonoff zigbee3.0 Dongel.png" width="50%" height="50%">
> [!WARNING]
>Deployment: Use "Sonoff Zigbee 3.0 USB Dongle Plus" with a USB extension.The reason is that all Zigbee 3.0 USB Dongle is influenced by the hardware operation and creates network problems!If you are hesitant about what to choose, look at the link below. 🔽:
>    - [Aliexpress](https://de.aliexpress.com/item/1005007442670601.html?spm=a2g0o.order_list.order_list_main.75.6e4f5c5f9wWYJ0&gatewayAdapt=glo2deu)
## Software preparation:
- **Firmware Update at Sonoff Zigbee 3.0 USB Dongle Plus":** Although a whole new Firmware update is a must.This avoids non-desirable problems with the compatibility between additives or devices.In the links below you will find everything you need to do so. 🔽:
  - [Drivers:](https://www.silabs.com/developer-tools/usb-to-uart-bridge-vcp-drivers?tab=downloads) Initially, download and install VCP Drivers on a Windows or MAC device, then restart the operating system.
  - [Flash software:](https://zig-star.com/radio-docs/quick-start/#5have-fun) Download Zigstar and connect "Sonoff Zigbee 3.0 USB Dongle Plus" to any of the USB ports.
  - [Firmware cordinator:](https://github.com/Koenkk/Z-Stack-firmware/tree/master/coordinator/Z-Stack_3.x.0/bin) Download the latest version and add it to Zigstar.
  - [Documentation:](https://sonoff.tech/wp-content/uploads/2022/11/SONOFF-Zigbee-3.0-USB-dongle-plus-firmware-flashing-.pdf) Sonoff's official documentation
- **Installing MQTT Broker in Home Assistant:** If you still don't have a MQTT broker click on the button below. 🔽:<br>
<a href="https://my.home-assistant.io/redirect/supervisor_addon/?addon=core_mosquitto">
    <img align="center" src="/img/button ADD-ON ON.svg" >
</a><br>

- **After installing, turn on the "Start -on -Loading" feature and restart Home Assistant. 🔽:**
![Starting when loading the system](/img/mqtt_autostart.png)
  - After launching the system, open the "Mosquitto Broker" configuration and go to Yaml Edit mode.Replace everything with this code 🔽:

```yaml
logins:
    - username: "!secret mqtt_user"
    password: "!secret mqtt_pass"
require_certificate: false
certfile: cer.pem
keyfile: key.pem
customize:
active: false
folder: mosquitto
anonymous: false
server: mqtt://_________________:1883
base_topic: zigbee2mqtt
debug: true
```
> [!WARNING]
>On "Server" fill in the IP address of the device where Home Assistant is installed 🔼.
  - Add the following lines to "Secrets.Yaml".If this is not done then the configuration cannot be valid 🔽.

    ```yaml
    # MQTT login daten
    mqtt_user: _____________
    mqtt_pass: _____________
    ```

> [!WARNING]
>Fill in your preferred username and password with them you will contact MQTT.Save the changes and start "Mosquitto Broker".Make sure "Mosquitto Broker" has started successfully and continue with the installation of "Zigbee2mqt"
- **Installing Zigbee2mqtt in Home Assistant:**
  - Press the button downstairs to add the Zigbee2mqtt storage to your additives 🔽:

[![repo](/img/button%20ADD%20ADD-ON%20REPOSITORY%20TO%20MY.svg)](https://my.home-assistant.io/redirect/supervisor_add_addon_repository/?repository_url=https%3A%2F%2Fgithub.com%2Fzigbee2mqtt%2Fhassio-zigbee2mqtt)
  - After adding the repository, update the page and you will find the following 🔽:
![repoo](/img/zigbee2mqtt_repo.png)
Open and install Zigbee2MQTT, then restart the system.
- After launching the system, open the configuration in Zigbee2MQTT and go to Yaml Edit mode.Replace everything with the following code 🔽:
    ```yaml
    data_path: /config/zigbee2mqtt
    socat:
    enabled: false
    master: pty,raw,echo=0,link=/tmp/ttyZ2M,mode=777
    slave: tcp-listen:8485,keepalive,nodelay,reuseaddr,keepidle=1,keepintvl=1,keepcnt=5
    options: "-d -d"
    log: true
    mqtt:
    server: mqtt://_____________:1883  
    user: "!secret mqtt_user"
    password: "!secret mqtt_pass"
    serial:
    port: ______________________________________
    ``` 
> [!CAUTION]
>To "Server:" You have to add the same IP address that has Home Assistant 🔼.Of "Port:" Follow the steps on the picture below  🔽:
>
>![server](/img/patch_usb_port002.gif)
>
>Save the changes!Check start automatically with the system and start the add -on 🔽:
>
>![Remember the changes](/img/Zegbee_save_and_start.gif)

> [!WARNING]
> Restart the whole system if the add -on does not want to start immediately.After the restart, it will start automatically.
> Congratulations already have a working Zibee network !

> [!TIP]
> If you liked this project, [here](https://github.com/Bacard1?tab=repositories) You will find more interesting borders made by me. <br>
> If you have difficulty or have questions, do not hesitate to contact me.
