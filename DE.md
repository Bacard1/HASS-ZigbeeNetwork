![BANNER](/img/banner.png)  

# 🛜 Erstellung/Integration eines Zigbee-Netzwerks in Home Assistant  
[![Home Assistant](https://img.shields.io/badge/🏠_Home_Assistant-41BDF5?logo=homeassistant)](https://www.home-assistant.io/) [![Donate via PayPal](https://img.shields.io/badge/PayPal-Donate-blue?logo=paypal)](https://www.paypal.com/donate/?hosted_button_id=AAWFZVF2XCP5A)  
![Script](https://img.shields.io/badge/logo-yaml-green?logo=yaml)  
[![Български](https://img.shields.io/badge/BG_Български-език-green?logo=translate&labelColor=gray&style=flat-square&link=https://example.com/bg)](BG.md)  
[![Deutch](https://img.shields.io/badge/DE_Deutsche-sprache-green?logo=translate&labelColor=gray&style=flat-square&link=https://example.com/bg)](DE.md)  
[![English](https://img.shields.io/badge/EN_English-language-green?logo=translate&labelColor=gray&style=flat-square&link=https://example.com/bg)](README.md)  

Die Integration eines Zigbee-Netzwerks in Home Assistant ermöglicht die Steuerung von Geräten wie Sensoren, Schaltern und Lampen über eine lokale, drahtlose Kommunikation. Erforderlich ist ein Zigbee-Koordinator (z. B. ein Zigbee-USB-Stick), der über Zigbee2MQTT oder ZHA (Zigbee Home Automation) mit Home Assistant verbunden wird. Nach der Installation und Konfiguration der Integration werden die Geräte dem Netzwerk hinzugefügt (Pairing) und sind für Automatisierungen und Visualisierungen in Home Assistant verfügbar.  

---  

## 📦 Inhalt  

- [🛜 Erstellung/Integration eines Zigbee-Netzwerks in Home Assistant](#-erstellungintegration-eines-zigbee-netzwerks-in-home-assistant)
	- [📦 Inhalt](#-inhalt)
	- [Hardwarevorbereitung:](#hardwarevorbereitung)
	- [Softwarevorbereitung:](#softwarevorbereitung)

---  

<br>  

## Hardwarevorbereitung:  

- Installation und Konfiguration von Home Assistant OS auf Hardware oder als virtuelle Maschine ist unerheblich. Falls Sie diesen Schritt noch nicht abgeschlossen haben, lesen Sie [HIER](https://www.home-assistant.io/installation/) nach.  
  - In diesem Projekt wurde ein "RaspberryPi 4B 8GB" verwendet 🔽:<br> <img align="center" src="/img/RASP PI 4B.png" width="50%" height="50%">  

- "SONOFF Zigbee 3.0 USB Dongle Plus" oder ein anderer, der das Zigbee-Netzwerk erstellt. Falls Sie noch keinen besitzen, sehen Sie sich die folgenden Links an 🔽:  
  - [Amazon](https://www.amazon.de/dp/B09KZX4WSB?ref=ppx_yo2ov_dt_b_fed_asin_title)  
  - [Aliexpress](https://de.aliexpress.com/item/1005004266559661.html?spm=a2g0o.productlist.main.1.29cfYELkYELkj7&algo_pvid=d6c4c86f-f945-433c-addd-962a0da0c955&algo_exp_id=d6c4c86f-f945-433c-addd-962a0da0c955-0&pdp_npi=4%40dis%21EUR%2138.16%2120.99%21%21%2140.55%2122.30%21%402103890117306177577828936efd34%2112000028571354347%21sea%21DE%21749630241%21X&curPageLogUid=DHGOVitBimE5&utparam-url=scene%3Asearch%7Cquery_from%3A)  
  - In diesem Projekt wurde der SONOFF Zigbee 3.0 USB Dongle Plus verwendet 🔽: <br> <img align="center" src="/img/Sonoff zigbee3.0 Dongel.png" width="50%" height="50%">  

> [!WARNING]  
> EMPFEHLUNG: Verwenden Sie den "SONOFF Zigbee 3.0 USB Dongle Plus" mit einer USB-Verlängerung. Der Grund dafür ist, dass alle Zigbee 3.0 USB Dongles von der Hardwarearbeit beeinflusst werden und Netzwerkprobleme verursachen können! Falls Sie unsicher sind, welchen Sie wählen sollen, sehen Sie sich den Link unten an. 🔽:  
>    - [Aliexpress](https://de.aliexpress.com/item/1005007442670601.html?spm=a2g0o.order_list.order_list_main.75.6e4f5c5f9wWYJ0&gatewayAdapt=glo2deu)  

## Softwarevorbereitung:  
- **Firmware-Update für "SONOFF Zigbee 3.0 USB Dongle Plus":** Obwohl der Dongle brandneu ist, ist ein Firmware-Update obligatorisch. Dadurch vermeiden Sie unerwünschte Kompatibilitätsprobleme zwischen Add-ons oder Geräten. In den folgenden Links finden Sie alles, was Sie dafür benötigen. 🔽:  
  - [Treiber:](https://www.silabs.com/developer-tools/usb-to-uart-bridge-vcp-drivers?tab=downloads) Laden Sie zunächst die VCP-Treiber auf einem Windows- oder MAC-Gerät herunter und installieren Sie sie. Starten Sie anschließend das Betriebssystem neu.  
  - [Flash-Software:](https://zig-star.com/radio-docs/quick-start/#5have-fun) Laden Sie ZigStar herunter und schließen Sie den "SONOFF Zigbee 3.0 USB Dongle Plus" an einen der USB-Ports an.  
  - [Firmware Coordinator:](https://github.com/Koenkk/Z-Stack-firmware/tree/master/coordinator/Z-Stack_3.x.0/bin) Laden Sie die neueste Version herunter und fügen Sie sie in ZigStar ein.  
  - [Dokumentation:](https://sonoff.tech/wp-content/uploads/2022/11/SONOFF-Zigbee-3.0-USB-dongle-plus-firmware-flashing-.pdf) Offizielle Dokumentation von SONOFF  

- **Installation eines MQTT-Brokers in Home Assistant:** Falls Sie noch keinen MQTT-Broker haben, klicken Sie auf die Schaltfläche unten. 🔽:<br>  
<a href="https://my.home-assistant.io/redirect/supervisor_addon/?addon=core_mosquitto">  
    <img align="center" src="/img/button ADD-ON ON.svg" >  
</a><br>  

- **Aktivieren Sie nach der Installation die Funktion "Automatischer Start beim Systemstart" und starten Sie Home Assistant neu. 🔽:**  
![Automatischer Start beim Systemstart](/img/mqtt_autostart.png)  
  - Öffnen Sie nach dem Neustart die Konfiguration von "Mosquitto broker" und wechseln Sie in den "YAML bearbeiten"-Modus. Ersetzen Sie alles mit folgendem Code 🔽:  

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
> Tragen Sie unter "server" die IP-Adresse des Geräts ein, auf dem Home Assistant installiert ist 🔼.  
  - Fügen Sie die folgenden Zeilen in "secrets.yaml" ein. Ohne dies ist die Konfiguration ungültig 🔽.  

    ```yaml  
    # MQTT login daten  
    mqtt_user: _____________  
    mqtt_pass: _____________  
    ```  

> [!WARNING]  
> Geben Sie Ihren bevorzugten Benutzernamen und Ihr Passwort ein, mit denen Sie sich bei MQTT anmelden werden. Speichern Sie die Änderungen und starten Sie den "Mosquitto broker". Stellen Sie sicher, dass der "Mosquitto broker" erfolgreich gestartet wurde, und fahren Sie mit der Installation von "Zigbee2MQTT" fort.  

- **Installation von Zigbee2MQTT in Home Assistant:**  
  - Klicken Sie auf die Schaltfläche unten, um das Zigbee2MQTT-Repository zu Ihren Add-ons hinzuzufügen 🔽:  

[![repo](/img/button%20ADD%20ADD-ON%20REPOSITORY%20TO%20MY.svg)](https://my.home-assistant.io/redirect/supervisor_add_addon_repository/?repository_url=https%3A%2F%2Fgithub.com%2Fzigbee2mqtt%2Fhassio-zigbee2mqtt)  
  - Nachdem Sie das Repository hinzugefügt haben, aktualisieren Sie die Seite und Sie werden Folgendes finden 🔽:  
![repoo](/img/zigbee2mqtt_repo.png)  
Öffnen und installieren Sie Zigbee2MQTT, starten Sie anschließend das System neu.  
  - Öffnen Sie nach dem Neustart die Konfiguration von Zigbee2MQTT und wechseln Sie in den "YAML bearbeiten"-Modus. Ersetzen Sie alles mit folgendem Code 🔽:  
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
> Unter "server:" müssen Sie dieselbe IP-Adresse eintragen, die auch Home Assistant hat 🔼. Unter "port:" folgen Sie den Schritten im Bild unten 🔽:  
>  
>![server](/img/patch_usb_port002.gif)  
>  
> Speichern Sie die Änderungen! Aktivieren Sie den automatischen Start mit dem System und starten Sie das Add-on 🔽:  
>  
>![Änderungen speichern](/img/Zegbee_save_and_start.gif)  

> [!WARNING]  
> Starten Sie das gesamte System neu, falls das Add-on nicht sofort starten möchte. Nach dem Neustart wird es automatisch gestartet.  
> Glückwunsch, Sie haben jetzt ein funktionierendes Zigbee-Netzwerk!  

> [!TIP]  
> Falls Ihnen dieses Projekt gefallen hat, finden Sie [HIER](https://github.com/Bacard1?tab=repositories) weitere interessante Repositories von mir.<br>  
> Falls Sie auf Schwierigkeiten stoßen oder Fragen haben, zögern Sie nicht, mich zu kontaktieren.  