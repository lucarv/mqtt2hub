# mqtt2hub 

1. set environmental variable CS with the iothub device connection string
2. set environmental variable BROKER with the url of the mqtt broker (e.g mqtt://test.mosquitto.org)
3. start the index script. this script is configured to subscribe to '#'
4. publish a message to the broker using your favorite client or using ther publisher scrip in this repo
5. a good strategy is to set the topic to the publisher's device id, but anything would basically do as we are subscribing to '#' 

the script can be run as a module in docker (you can use the docker file in this repo or create a slimmer one)
 
TODO: error handling, ability to choose what topics to subscribe to without editing the code, etc...