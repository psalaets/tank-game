#Interfaces
Depending on a few properies, we will be hiding and showing interface elements, and using the device orientation as user confermation of state.
 
Information that we need to query from a devices playing the game:

####Resolution 
#####Phones 
Devices less than 768px in width (CONTROLLER) will be used as controllers, to update game state

#####Tablets
Equal to or greated than 768px (GAMEVIEW) will display gameplay.

####Orientation
- Portrait (PAUSE/SETUP)
- Landscape (PLAY/READY)

##Views

###Menu
####Gameview
- Create Game (Button)

####Controller
- Game Number (Text Field: Enter Game Number)
- Join Game (Button)

___

###Loading/Waiting/Countdown/Paused/GameOver
####Gameview
- Icon(Animated)
- Title
- Subtitle
- Stats

####Controler
- Icon(Animated)
- Title
- Subtitle
- Back (Button)

___

###Lobby
####Gameview
- Game Number
- Countdown
- Player Slots 4x(2x2)
	- UserName(Title) 
	- Postion(Subtitle: Gunner/Driver), 
	- Tank Color

####Controller
- Game number (Display)
- Callsign(Input: Text)
- Back (button)
- Tank Color Select (button) 

___

###Game View
####Gameview
####Controller

___


###Controller
####Gameview
####Controller


