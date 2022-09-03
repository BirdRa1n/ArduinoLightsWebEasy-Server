
# ArduinoLightsWebEasy Server

Local server for the operation of the Arduino LightsWeb Easy application.

## API Documentation

#### Returns data from arduino.json file

```http
  GET /getLights
```

#### Defines the keys and values ​​of the arduino.json file through parameters

```http
  GET /setLights
```

| Parameter   | Type       | Value                                   |
| :---------- | :--------- | :------------------------------------------ |
| `Switch_1`      | `string` | true |
| `Switch_2`      | `string` | true |
| `Switch_3`      | `string` | true |

#### Do you want to test the server?
```http
  GET /Test
```
##### Expected Return
```http
  OK
```


