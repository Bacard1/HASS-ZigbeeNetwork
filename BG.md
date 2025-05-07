# 🛜 Създаване/Интегриране на Zigbee мрежа в Home Assistant
[![PayPal дарение](https://img.shields.io/badge/PayPal-Дари-синьо?logo=paypal)](https://www.paypal.com/donate/?hosted_button_id=AAWFZVF2XCP5A)
![Скрипт](https://img.shields.io/badge/logo-yaml-green?logo=yaml)

Интегрирането на Zigbee мрежа в Home Assistant позволява управление на устройства като сензори, ключове и лампи чрез локална, безжична комуникация. Необходимо е Zigbee координатор (напр. Zigbee USB стик), който се свързва към Home Assistant чрез Zigbee2MQTT или ZHA (Zigbee Home Automation). След инсталиране и конфигуриране на интеграцията, устройствата се добавят в мрежата (pairing) и стават достъпни за автоматизации и визуализация в Home Assistant.

---

## 📦 Съдържание

- [Хардуерна подготовка](#хардуерна-подготовка)
- 


---

<br>

##  Хардуерна подготовка:

- Инсталиран и конфигуриран Home Assistant OS на хардуер или като виртуална машина е без значение. Ато не сте готови с тази стъпка погледни [ТУК](https://www.home-assistant.io/installation/)
  - В този проект беше използван "RaspberryPi 4B 8GB" 🔽:<br> <img align="center" src="/img/RASP PI 4B.png" width="50%" height="50%">


- "SONOFF Zigbee 3.0 USB Dongle Plus" или друг, който да създава Zigbee мрежата. Ако все още не разполагате с такъв виж двата линка по долу 🔽:
  - [Amazon](https://www.amazon.de/dp/B09KZX4WSB?ref=ppx_yo2ov_dt_b_fed_asin_title)
  - [Aliexpress](https://de.aliexpress.com/item/1005004266559661.html?spm=a2g0o.productlist.main.1.29cfYELkYELkj7&algo_pvid=d6c4c86f-f945-433c-addd-962a0da0c955&algo_exp_id=d6c4c86f-f945-433c-addd-962a0da0c955-0&pdp_npi=4%40dis%21EUR%2138.16%2120.99%21%21%2140.55%2122.30%21%402103890117306177577828936efd34%2112000028571354347%21sea%21DE%21749630241%21X&curPageLogUid=DHGOVitBimE5&utparam-url=scene%3Asearch%7Cquery_from%3A) 
  - В този проект беше използван SONOFF Zigbee 3.0 USB Dongle Plus 🔽: <br> <img align="center" src="/img/Sonoff zigbee3.0 Dongel.png" width="50%" height="50%">
> [!WARNING]
>ПРЕПОРАЧИТЕЛНО: Използвайте  "SONOFF Zigbee 3.0 USB Dongle Plus" със USB удължител. Причината е, че всички Zigbee 3.0 USB Dongle се влияе от работата на хардуера и създава проблеми на мрежата! Ако се колебаете какъв да изберете погледнете линкът по долу. 🔽:
>    - [Aliexpress](https://de.aliexpress.com/item/1005007442670601.html?spm=a2g0o.order_list.order_list_main.75.6e4f5c5f9wWYJ0&gatewayAdapt=glo2deu)
## Софтуерна подготовка:
- **Обновяване на Firmware в "SONOFF Zigbee 3.0 USB Dongle Plus":** въпреки, че е съвсем нов обновяването на Firmware е задължително. Така избягвате не-желани проблеми със съвместимостта между добавки или устройства. В линковете по долу ще намерите всичко необходимо за това. 🔽:
  - [Драивъри:](https://www.silabs.com/developer-tools/usb-to-uart-bridge-vcp-drivers?tab=downloads) първоначално изтеглете и инсталирайте VCP Drivers на устройство с Windows или MAC, след което рестартирайте операционната система.
  - [Флаш софтуер:](https://zig-star.com/radio-docs/quick-start/#5have-fun) изтеглете ZigStar и свържете "SONOFF Zigbee 3.0 USB Dongle Plus" към някой от USB портовете.
  - [Firmware cordinator:](https://github.com/Koenkk/Z-Stack-firmware/tree/master/coordinator/Z-Stack_3.x.0/bin) изтеглете най новата версия и я добавете във ZigStar.
  - [Документация:](https://sonoff.tech/wp-content/uploads/2022/11/SONOFF-Zigbee-3.0-USB-dongle-plus-firmware-flashing-.pdf) Официалната документация от SONOFF
- **Инсталиране на MQTT Broker в Home Assistant:** Ако все още нямате MQTT брокер щракни на бутонът долу. 🔽:<br>
<a href="https://my.home-assistant.io/redirect/supervisor_addon/?addon=core_mosquitto">
    <img align="center" src="/img/button ADD-ON ON.svg" >
</a><br>

- **След инсталирането включете функцията "Стартиране при зареждане на системата" и рестартирайте Home Assistant. 🔽:**
![Стартиране при зареждане на системата](/img/mqtt_autostart.png)
  - След стартирането на системата отворете конфигурацията на "Mosquitto broker" и преминете в режим "Редактиране в YAML". Заменете всичко с този код 🔽:

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
>На "server" попълнете IP адресът на устройството, където е инсталиран Home Assistant 🔼.
  - Добавете следните редове в "secrets.yaml". Ако това не бъде направено то конфигурацията неможе да бъде валидна 🔽.

    ```yaml
    # MQTT login daten
    mqtt_user: _____________
    mqtt_pass: _____________
    ```

> [!WARNING]
>Попълнете предпочитаните от Вас потребителско име и парола  с тях ще се свързвате с MQTT. Запазете промените и стартирайте "Mosquitto broker". Уверете се, че "Mosquitto broker" е стартирал успешно и продължете с инсталацията на "Zigbee2MQTT"
- **Инсталиране на Zigbee2MQTT в Home Assistant:**
  - Натисни бутонът по долу за да добавиш хранилището на Zigbee2MQTT в добавките си 🔽:

[![repo](/img/button%20ADD%20ADD-ON%20REPOSITORY%20TO%20MY.svg)](https://my.home-assistant.io/redirect/supervisor_add_addon_repository/?repository_url=https%3A%2F%2Fgithub.com%2Fzigbee2mqtt%2Fhassio-zigbee2mqtt)
  - След добавяне на хранилището обновете страницата и ще намерите следното 🔽:
![repoo](/img/zigbee2mqtt_repo.png)
Отворете и инсталирайте Zigbee2MQTT, след което рестартирайте системата.
  - След стартирането на системата отворете конфигурацията във Zigbee2MQTT и преминете в режим "Редактиране в YAML". Заменете всичко със следният код 🔽:
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
> [!WARNING]
>На "server:" трябва да добавиш същият ИП адрес, който има и Home Assistant 🔼. На "port:" следвай стъпките по картинката по долу  🔽:
>
>![server](/img/patch_usb_port002.gif)
>
>Запаметете промените! Отметнете стартиране автоматично със системата и стартирайте добавката 🔽:
>
>![Запаметете промените](/img/Zegbee_save_and_start.gif)

### Рестартирайте цялата система, ако добавката не иска да стартира веднага. След рестарта тя ще стартира автоматично.
### Поздравления вече имате работеща Zibee мрежа !
