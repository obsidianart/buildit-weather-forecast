import React from 'react'
import styles from './AI.scss'
import Loader from './Loader'
import answerService from './../services/answerService'
import { say, listen } from './../services/audioService'

const ANSWER_DELAY = 1000;

export default class AI extends React.Component {
  constructor(props) {
    super(props)
    this.answerDelayTimeout = null
  
    this.state = {
      question:'',
      answer:'',
      loading:false
    }

    this.startListening()
  }

  handleSubmit(ev){
    ev.preventDefault()
    this.startAnswering()
  }

  startListening() {
    listen()
      .then(question=>{
        this.setState({question})
        this.startAnswering()
      })
      .catch(err=>console.log(err))
  }

  startAnswering(){
    this.setState({loading: true})
    this.answerDelayTimeout = setTimeout(()=>{
      let answer = answerService(this.state.question, this.props.forecast)
      this.setState({
        loading: false,
        answer: answer,
      })

      say(answer)
        .then(()=>this.startListening())
        .catch(err=>console.log(err))

    }, ANSWER_DELAY)
  }

  removeAnswer(){
    this.setState({
      loading:false,
      answer:''
    })

    this.answerDelayTimeout && clearTimeout(this.answerDelayTimeout)
  }

  handleTypingQuestion(ev) {
    let letter = ev.target.value

    //uppercase the first letter (looks prettier)
    if (this.state.question == '') {
      letter = letter.toLocaleUpperCase()
    }

    this.setState({ question:letter })

    this.removeAnswer()
  }

  render(){
    const { className='' } = this.props
    const { answer, loading, question } = this.state

    return (
      <div className={className}>
        <div className={styles.wrapper}>
          <form onSubmit={this.handleSubmit.bind(this)}>
            <input
              className={styles.input}
              type="text"
              value={question}
              onChange={this.handleTypingQuestion.bind(this)}
              placeholder="How can I help you? (or 'help')"
            />
            <div className={styles.getAnswer + ' ' + (answer||loading?styles.rotate:'')} title="getAnswer" onClick={this.handleSubmit.bind(this)}/>
          </form>
          <div id="answer" className={styles.answer + ` ${answer||loading?styles.ready:''}`}>
            {loading && <Loader className={styles.loader}/>}
            {!loading &&  <div className={styles.text}>{answer}</div> }
          </div>
        </div>
      </div>
    )
  }
}