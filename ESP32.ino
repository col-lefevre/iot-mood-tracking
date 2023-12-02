#include <Arduino.h>
#include <ESP32_Supabase.h>
#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>
#include <ArduinoJson.h>

// Button vars
int button1State = 0;
int button2State = 0;
int button3State = 0;

#define button1Pin 32
#define button2Pin 33
#define button3Pin 25

// LED vars
#define led1Pin 18
#define led2Pin 17
#define led3Pin 16
#define ledWifi 19

// WiFi vars
const char* ssid = "REDACTED";
const char* password = "REDACTED";

// Supabase vars
Supabase db;
String records_table = "mood_tracking";
String ref_table = "mood_values";

String supabaseKey = "REDACTED";
String supabaseURL = "REDACTED";

bool upsert = false;

// OLED screen vars
#define SCREEN_WIDTH 128
#define SCREEN_HEIGHT 64
#define OLED_ADDR 0x3C

#define oled1_bus 4
#define oled2_bus 3
#define oled3_bus 2

#define RED 0xF800
#define GREEN 0x07E0
#define YELLOW 0xFFE0

Adafruit_SSD1306 display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, -1);

// Internal timer
int timeCount = 0;

void setup() {
  Serial.begin(9600);
  
  // Button setup
  pinMode(button1Pin, INPUT_PULLUP);
  pinMode(button2Pin, INPUT_PULLUP);
  pinMode(button3Pin, INPUT_PULLUP);

  // LED setup
  pinMode(led1Pin, OUTPUT);
  pinMode(led2Pin, OUTPUT);
  pinMode(led3Pin, OUTPUT);
  pinMode(ledWifi, OUTPUT);

  digitalWrite(led1Pin, LOW);
  digitalWrite(led2Pin, LOW);
  digitalWrite(led3Pin, LOW);
  digitalWrite(ledWifi, LOW);

  // WiFi connection setup
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(250);
  }

  digitalWrite(ledWifi, HIGH);

  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());

  // OLED Setup
  Wire.begin();

  setupAllOLEDs();

  displayAllOLEDs();
}

void loop() {
  // Read button states
  button1State = digitalRead(button1Pin);
  button2State = digitalRead(button2Pin);
  button3State = digitalRead(button3Pin);

  // Set buttonNum based on button
  int buttonNum = 0;
  if (button1State == LOW) {
      Serial.println("Button 1 pressed");
      buttonNum = 1;
  }
  if (button2State == LOW) {
      Serial.println("Button 2 pressed");
      buttonNum = 2;
  }
  if (button3State == LOW) {
      Serial.println("Button 3 pressed");
      buttonNum = 3;
  }

  // Pushes num if button is pressed, i.e., buttonNum is not the starter value
  if (buttonNum != 0) {
      writeMoodNum(buttonNum);
  }

  if (timeCount < 9) {
    timeCount++;
  } else {
    timeCount = 0;
    // Update OLEDs every second
    displayAllOLEDs();
  }
  delay(100);
  
}

void writeMoodNum(int moodNum) {
  // JSON object
  String JSON = "{\"mood_num\":" + String(moodNum) + "}";
  
  // Supabase setup
  db.begin(supabaseURL, supabaseKey);
  int code = db.insert(records_table, JSON, upsert);
  // db.urlQuery_reset();
  
  // HTTP code of request
  Serial.println("HTTP Code: " + String(code));

  // Flash LEDs if entry created
  if (code == 201) {
    if (moodNum == 1) {
      digitalWrite(led1Pin, HIGH);
      delay(1000);
      digitalWrite(led1Pin, LOW);
    } else if (moodNum == 2) {
      digitalWrite(led2Pin, HIGH);
      delay(1000);
      digitalWrite(led2Pin, LOW);
    } else if (moodNum == 3) {
      digitalWrite(led3Pin, HIGH);
      delay(1000);
      digitalWrite(led3Pin, LOW);
    }
    // prevent accidental multiple pushes
    delay(250);
  }
}

String getMoodName(int num){
  db.begin(supabaseURL, supabaseKey);
  String response = db.from(ref_table).select("*").eq("id", String(num)).limit(1).doSelect();
  
  DynamicJsonDocument doc(1024);
  deserializeJson(doc, response);

  String parsedResponse = doc[0]["mood_name"];
  return parsedResponse;

  // db.urlQuery_reset();
}

void TCA9548A(uint8_t bus) {
  Wire.beginTransmission(0x70);
  Wire.write(1 << bus);
  byte error = Wire.endTransmission();

  if (error == 0) {
    Serial.print("Connection to TCA9548A established. ");
    Serial.print("Switched to bus ");
    Serial.println(bus);
  } else {
    Serial.print("Error switching bus! Error code: ");
    Serial.println(error);
  }
}

void setupOLED(uint8_t num) {
  TCA9548A(num);
  if(!display.begin(SSD1306_SWITCHCAPVCC, OLED_ADDR)) {
    Serial.println(F("SSD1306 allocation failed"));
    for(;;);
  } 
  display.clearDisplay();
}

void setupAllOLEDs() {
  setupOLED(oled1_bus);
  setupOLED(oled2_bus);
  setupOLED(oled3_bus);
}

void displayOLED(String text, uint8_t num) {
  TCA9548A(num);
  display.clearDisplay();
  display.setTextSize(2);
  // if (num == oled1_bus) {
  //   display.setTextColor(GREEN);
  // } else if (num == oled2_bus) {
  //   display.setTextColor(YELLOW);
  // } else if (num == oled3_bus) {
  //   display.setTextColor(RED);
  // }
  display.setTextColor(WHITE);
  display.setCursor(0, 0);
  display.println(text);
  display.display(); 
}

void displayAllOLEDs() {
  displayOLED(getMoodName(1), oled1_bus);
  displayOLED(getMoodName(2), oled2_bus);
  displayOLED(getMoodName(3), oled3_bus);
}