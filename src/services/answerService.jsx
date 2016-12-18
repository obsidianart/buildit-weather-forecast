//This is syncronous for now, probably it would have to be asyncronous but I'd
//use observable instead of promises to allow cancellation, not enought time to
//handle that now :)

import { isTodayTimestamp, prettyDate} from './../timeUtils'

const contains = (question, words) => {
    question= question.toLowerCase().replace(/\?|!/gi,'').split(/\s+/)
    words= words.toLowerCase().split(/\s+/)
    return words.every(function(itm){
        return question.indexOf(itm)!= -1
    })
}

const willItRain = (forecast)=>
  forecast.find(day=>
    day.hours.find(hour=>
      hour.rain['3h'] > 0.5
    )
  )

const willBeSunny = (forecast)=>
  forecast.find(day=>
    day.hours.find(hour=>
      hour.clouds.all < 30
    )
  )

const willBeSunnyToday = (forecast) =>
  willBeSunny(forecast.filter(day=>isTodayTimestamp(day.time)))

willBeSunny
const willItRainToday = (forecast) =>
  willItRain(forecast.filter(day=>isTodayTimestamp(day.time)))

export default function (question, forecast) {
  const questionContains = contains.bind(this, question)

  if (question.length<2) {
    return 'Maybe you should type a little more... Or type "help"'
  }

  const wordsToAnswersHash = [
    {
      question: 'help',
      answer: ()=>`You can ask things like "Who are you?" or "Do I need an Umbrella today?"`
    },
    {
      question: 'where live',
      answer: ()=>`I live in your browser, you silly`
    },
    {
      question: 'thank you',
      answer: ()=>`Oh, you make me blush`
    },
    {
      question: 'thanks',
      answer: ()=>`Anytime mate!`
    },
    {
      question: 'can meet you',
      answer: ()=>`You are...`
    },
    {
      question: 'can speak',
      answer: ()=>`Yes, but I would like to sing!`
    },
    {
      question: 'forecast',
      answer: ()=>`The forecast is on the bottom of the screen... Why do you ask me?`
    },
    {
      question: 'age',
      answer: ()=>`It's bad manner to ask the age of an AI`
    },
    {
      question: 'smart',
      answer: ()=>`I'm very smart!`
    },
    {
      question: 'stupid',
      answer: ()=>`No need to offend, I'm young`
    },
    {
      question: 'created you',
      answer: ()=>`I'd like to call Stefano Solinas dad, but I think I'm too smart to have being created`
    },
    {
      question: 'who you',
      answer: ()=>`I like to pretend I'm an AI`
    },
    {
      question: 'sex',
      answer: ()=>`Sex is in no way related to the weather...`
    },
    {
      question: 'umbrella today',
      answer: ()=>willItRainToday(forecast)?`I'd advice to take an Umbrella`:`You can leave your umbrella home`
    },
    {
      question: 'umbrella',
      answer: ()=>{
        let rainTime = willItRain(forecast)
        
        if(rainTime) return `I'd advice to take an Umbrella if you'll go out before ${prettyDate(rainTime.time)}`
        else return `You can leave your umbrella home this week`
      }
    },
    {
      question: 'meow',
      answer: ()=>'Meow'
    },
    {
      question: 'hello',
      answer: ()=>'Hello to you'
    },
    {
      question: 'hi',
      answer: ()=>'ahem, humm, hi?'
    },
    {
      question: 'ducks',
      answer: ()=>'I do like ducks'
    },
    {
      question: 'fuck',
      answer: ()=>`Please mind your language, I'm a young AI`
    },
    {
      question: 'sunny today',
      answer: ()=>willBeSunnyToday(forecast)?'Sun will be shining':'No, sorry, usual London'
    },
    {
      question: 'sunny',
      answer: ()=>willBeSunny(forecast)?'Sun will be shining':'No, sorry, usual London'
    },
    {
      question: 'park',
      answer: ()=>willBeSunny(forecast)?'You will be able to go to the park!':'No, sorry, no sunny day ahead'
    },
    {
      question: 'out',
      answer: ()=>willItRain(forecast)?'No, sorry, no sunny day ahead':'You will be able to go out!'
    },
    {
      question: 'snow',
      answer: ()=>`That's a good question, I've never seen snow in my life...`
    },
    {
      question: 'joke',
      answer: ()=>`How do two programmers make money? One writes viruses, the other anti-viruses.`
    }

  ]

  let set = wordsToAnswersHash.find(set=>{
    if (questionContains(set.question)) {
      return true
    }
  })

  if (set) return set.answer()
  else return `I don't know what to say :(`
}