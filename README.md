# BuildIt Weather App
- The test can be seen live here [http://www.obsidianart.com/projects/ai-weather/](http://www.obsidianart.com/projects/ai-weather/)
- Please refer to other public projects for more complex applications (e.g. [https://github.com/obsidianart/react-course-2048](React course 2048))
- This project uses a very simple structure, it's an experiment to apply some tecniques (like full image import and component-like css)



# What would I do next?
- Read again everything, few things need readeability improvment
- Write unit tests, starting from the answerService
- Write more e2e
- Remove the phone frame on small devices and adapt the size
- Improve speech recognition and check https://www.talater.com/annyang/ to see if this project fits better
- Fix speech recognition in Firefox https://hacks.mozilla.org/2016/01/firefox-and-the-web-speech-api/
- Deploy on https so it shoudn't ask permission all the time for voice services
- Is there any way to automate speech recognition in an e2e?
- Create a mock server middleware to have consistent e2e results and deeper e2e tests
- starts listening with a button
- Add more phrases (they are the funny part for the user experience)

## Requirements
- [https://nodejs.org/en/](Node installer) (tested on version 6.9.2, current stable, expected to work on version >=4.5)
- Tested on Chrome/Firefox (IE might have problem with svg animations and a couple of css lines)

## E2e tests
- e2e tests require global installed dependencies, they can be removed depending on the enviroment but jenkins (and so on) have better alternative than npm install every time. I understand this is against the generic request of avoiding external dependencies and I'm happy to discuss this choice.
- ``` npm install -g nightwatch```
- To install Selenium please refer to http://nightwatchjs.org/getingstarted#installation or https://www.npmjs.com/package/webdriver-manager (I personally prefer the latter)
- run the project and selenium (e.g. npm run start, webdriver-manager start)
- ```nightwatch``` to run the test

## Run & Build
- ```npm install``` Install dependencies
- ```npm run start``` To start the webserver with hot reloader (served at http://127.0.0.1:8888/)
- ```npm run build``` To build the distribuition (deploy the folder "public")

