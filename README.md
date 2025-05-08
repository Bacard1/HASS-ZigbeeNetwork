# 🛜 Creating/Integrating a Zigbee Network in Home Assistant
[![PayPal donation](https://img.shields.io/badge/PayPal-donation-синьо?logo=paypal)](https://www.paypal.com/donate/?hosted_button_id=AAWFZVF2XCP5A)
![Script](https://img.shields.io/badge/logo-yaml-green?logo=yaml)
[![Български](https://img.shields.io/badge/Български-език-green?logo=translate&labelColor=gray&style=flat-square&link=https://example.com/bg)](BG.md)

Integrating a Zigbee network in Home Assistant allows you to control devices such as sensors, switches, and lights through local, wireless communication. A Zigbee coordinator (e.g., a Zigbee USB stick) is required, which connects to Home Assistant via Zigbee2MQTT or ZHA (Zigbee Home Automation). After installation and configuration of the integration, devices are added to the network (pairing) and become available for automation and visualization in Home Assistant.

---

## 📦 Contents

- [🛜 Creating/Integrating a Zigbee Network in Home Assistant](#-creatingintegrating-a-zigbee-network-in-home-assistant)
  - [📦 Contents](#-contents)
  - [Hardware Preparation:](#hardware-preparation)
  - [Software Preparation:](#software-preparation)

---

## Hardware Preparation:

- Installed and configured Home Assistant OS on hardware or as a virtual machine doesn't matter. If you haven't completed this step yet, check [HERE](https://www.home-assistant.io/installation/)
  - In this project, a "RaspberryPi 4B 8GB" was used 🔽:<br> <img align="center" src="/img/RASP PI 4B.png" width="50%" height="50%">


- "SONOFF Zigbee 3.0 USB Dongle Plus" or another one that creates the Zigbee network. If you don't have one yet, check the two links below 🔽:
  - [Amazon](https://www.amazon.de/dp/B09KZX4WSB?ref=ppx_yo2ov_dt_b_fed_asin_title)
  - [Aliexpress](https://de.aliexpress.com/item/1005004266559661.html?spm=a2g0o.productlist.main.1.29cfYELkYELkj7&algo_pvid=d6c4c86f-f945-433c-addd-962a0da0c955&algo_exp_id=d6c4c86f-f945-433c-addd-962a0da0c955-0&pdp_npi=4%40dis%21EUR%2138.16%2120.99%21%21%2140.55%2122.30%21%402103890117306177577828936efd34%2112000028571354347%21sea%21DE%21749630241%21X&curPageLogUid=DHGOVitBimE5&utparam-url=scene%3Asearch%7Cquery_from%3A) 
  - In this project, the SONOFF Zigbee 3.0 USB Dongle Plus was used 🔽: <br> <img align="center" src="/img/Sonoff zigbee3.0 Dongel.png" width="50%" height="50%">
> [!WARNING]
>RECOMMENDED: Use the "SONOFF Zigbee 3.0 USB Dongle Plus" with a USB extension cable. The reason is that all Zigbee 3.0 USB Dongles are affected by the operation of the hardware and cause problems in the network! If you are unsure which one to choose, check the link below 🔽:
>    - [Aliexpress](https://de.aliexpress.com/item/1005007442670601.html?spm=a2g0o.order_list.order_list_main.75.6e4f5c5f9wWYJ0&gatewayAdapt=glo2deu)

## Software Preparation:
- **Updating the Firmware on "SONOFF Zigbee 3.0 USB Dongle Plus":** even though it’s brand new, updating the firmware is mandatory. This avoids unwanted compatibility issues between add-ons or devices. The links below provide everything you need 🔽:
  - [Drivers:](https://www.silabs.com/developer-tools/usb-to-uart-bridge-vcp-drivers?tab=downloads) first download and install the VCP Drivers on a Windows or MAC device, then restart the OS.
  - [Flashing software:](https://zig-star.com/radio-docs/quick-start/#5have-fun) download ZigStar and connect the "SONOFF Zigbee 3.0 USB Dongle Plus" to one of the USB ports.
  - [Firmware coordinator:](https://github.com/Koenkk/Z-Stack-firmware/tree/master/coordinator/Z-Stack_3.x.0/bin) download the latest version and add it to ZigStar.
  - [Documentation:](https://sonoff.tech/wp-content/uploads/2022/11/SONOFF-Zigbee-3.0-USB-dongle-plus-firmware-flashing-.pdf) Official documentation from SONOFF
- **Installing MQTT Broker in Home Assistant:** If you don’t have an MQTT broker yet, click the button below 🔽:<br>
<a href="https://my.home-assistant.io/redirect/supervisor_addon/?addon=core_mosquitto">
    <img align="center" src="/img/button ADD-ON ON.svg" >
</a><br>

- **After installation, enable "Start on system boot" and restart Home Assistant 🔽:**
![Start on system boot](/img/mqtt_autostart.png)
  - After the system starts, open the configuration of "Mosquitto broker" and switch to "YAML Edit" mode. Replace everything with the following code 🔽:

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
>In "server", enter the IP address of the device where Home Assistant is installed 🔼.
  - Add the following lines to "secrets.yaml". If not done, the configuration won’t be valid 🔽.

```yaml
# MQTT login data
mqtt_user: _____________
mqtt_pass: _____________
```

> [!WARNING]
>Enter your preferred username and password that will be used to connect to MQTT. Save the changes and start the "Mosquitto broker". Ensure that it has started successfully before proceeding with the Zigbee2MQTT installation.
- **Installing Zigbee2MQTT in Home Assistant:**
  - Press the button below to add the Zigbee2MQTT repository to your add-ons 🔽:

[![repo](/img/button%20ADD%20ADD-ON%20REPOSITORY%20TO%20MY.svg)](https://my.home-assistant.io/redirect/supervisor_add_addon_repository/?repository_url=https%3A%2F%2Fgithub.com%2Fzigbee2mqtt%2Fhassio-zigbee2mqtt)
  - After adding the repository, refresh the page and you will see the following 🔽:
![repoo](/img/zigbee2mqtt_repo.png)
Open and install Zigbee2MQTT, then restart the system.
  - After the system starts, open the configuration in Zigbee2MQTT and switch to "YAML Edit" mode. Replace everything with the following code 🔽:

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
>In "server:", you must enter the same IP address as Home Assistant 🔼. For "port:", follow the steps shown in the image below 🔽:

![server](/img/patch_usb_port002.gif)

Save the changes! Check the box to start automatically with the system and start the add-on 🔽:

![Save and start](/img/Zegbee_save_and_start.gif)

> [!WARNING]
> Restart the entire system if the add-on doesn’t start right away. After reboot, it will start automatically.
> Congratulations, you now have a working Zigbee network!

> [!TIP]
> If you liked this project, [HERE](https://github.com/Bacard1?tab=repositories) you will find more interesting repositories made by me.<br>
> If you face any difficulties or have questions, feel free to contact me.
