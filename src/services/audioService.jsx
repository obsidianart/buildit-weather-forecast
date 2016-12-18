export function say(text){
  return new Promise((resolve, reject)=>{
    if (!'speechSynthesis' in window) return

    var msg = new SpeechSynthesisUtterance()
    
    msg.text = text

    window.speechSynthesis.speak(msg)

    msg.onend = ()=>{
      resolve()}
  })
}

export function listen(){
  return new Promise((resolve, reject)=>{
    if (!'webkitSpeechRecognition' in window) return reject()

    var recognition = new webkitSpeechRecognition()

    recognition.continuous = false
    recognition.interimResults = false

    recognition.lang = "en-US"
    recognition.start()

    recognition.onresult = e=>{
      resolve(e.results[0][0].transcript)
      recognition.stop()
    }

    recognition.onerror = e=>{
      recognition.stop()
      reject(e)
    }
  })
}