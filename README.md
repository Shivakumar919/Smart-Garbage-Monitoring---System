Smart Garbage Monitoring System

A real-time IoT-based Smart Garbage Monitoring System using ESP32, Ultrasonic Sensor, and Gas Sensor. The system monitors garbage-bin fill levels and odor/gas status through a live web dashboard. The collected data from IoT devices is sent to the backend, where the status of each bin is updated and displayed on an interactive map.

Features
Real-time garbage level monitoring
Odor and harmful gas detection
ESP32-based wireless monitoring
Live web dashboard using WiFi
Automatic IoT data updates
Color indication based on bin fill level
Gas alert system for bad odor detection
Individual bin identification and location tracking
Collection route generation based on IoT-reported bin levels
Route displayed on the live map for bins requiring collection
Technologies Used
ESP32
Arduino IDE
HTML/CSS
WiFi
Embedded C++
React
Node.js
Express.js
Leaflet / OpenStreetMap
Components Used
ESP32 Development Board
Ultrasonic Sensor (HC-SR04)
MQ Gas Sensor
Jumper Wires
Garbage Bin Prototype
Working

The ultrasonic sensor measures the distance between the sensor and the garbage, allowing the system to calculate the bin fill percentage. The gas sensor detects odor and potentially harmful gases inside the bin. The ESP32 collects this sensor data and sends the information through WiFi to the backend.

The backend associates the received IoT data with the corresponding bin ID and updates its current fill level and status. The web dashboard receives the latest data and displays each bin at its assigned location on the map. The bin marker color changes according to the received fill level.

When a bin's fill level exceeds 50%, it is considered for collection. The system identifies these high-level bins and generates a collection route based on the IoT-reported fill levels, prioritizing bins with higher levels first. The route and bin status are displayed on the live map so that collection personnel can identify and visit priority bins efficiently.

Output
Live bin fill percentage
Distance measurement in cm
Fresh / Bad Odor / Harmful Gas status
Real-time colored bin indicators
Individual bin location on the map
IoT-based bin status updates
Automatic collection route for bins above 50%
Priority route based on higher garbage levels
Live dashboard for monitoring all bins
