import React, { Component } from 'react';
import { axiosWithAuth, baseURL } from '../../../config/axiosWithAuth';
import { getHours } from 'date-fns';

class CreateReport extends Component {
  state = {
    // Main Report State
    reportName: '',
    schedule: [],
    scheduleTime: `${getHours(new Date()) + 1}:00`,
    message: '',
    questions: [],
    slackChannelId: null,
    // Temporary State
    channels: [],
    question: '',
    week: [ 'Monday', 'Tueday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday' ]
  }

  componentDidMount() {
    this.fetchSlackChannels()
  }

  changeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  fetchSlackChannels = () => {
    const endpoint = `${baseURL}/slack/channels`;
    axiosWithAuth()
      .get(endpoint)
      .then(res => {
        this.setState({
          channels: res.data,
          slackChannelId: res.data[0].id || ''
        });
      })
      .catch(err => console.log(err));
  }

  questionsHandler = e => {
    e.preventDefault();
    this.setState(prevState => ({
        questions: [...prevState.questions, this.state.question],
        question: ''
    }));
  };

  removeQuestion = (e, question) => {
    e.preventDefault();
    this.setState(prevState => ({
      questions: prevState.questions.filter(q => q !== question)
    }));
  }

  
  updateSchedule = (day) => {
    const { schedule } = this.state;
    const includes = schedule.includes(day);
    this.setState({
      schedule: includes ? schedule.filter(d => d !== day) : [...schedule, day]
    });
  }

  addReport = e => {
    e.preventDefault()
    let slackChannelName
    this.state.channels.forEach(channel => {
      if (channel.id === this.state.slackChannelId) slackChannelName = channel.name
    });
    const { reportName, schedule, scheduleTime, message, questions, slackChannelId } = this.state;
    const report = {
      reportName,
      schedule: JSON.stringify(schedule),
      scheduleTime,
      message,
      questions: JSON.stringify(questions),
      slackChannelId,
      slackChannelName,
      created_at: new Date(),
    }
    const endpoint = `${baseURL}/reports`;
    axiosWithAuth()
      .post(endpoint, report)
      .then(res => {
        this.props.setResponseAsState(res.data)
        this.props.history.push('/dashboard/reports');
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <form>
        <section>
          <input
            type="text"
            onChange={this.changeHandler}
            name="reportName"
            placeholder="Report Name"
            value={this.state.reportName}
          />
          <select
            name="slackChannelId"
            onChange={this.changeHandler}
          >
          {
            this.state.channels.map(channel => (
              <option
                key={channel.id}
                value={channel.id}
              >
                {channel.name}
              </option>
            ))
          }
          </select>
        </section>
        <section>
          <input
            type="text"
            onChange={this.changeHandler}
            name="message"
            placeholder="Message to be sent with each report"
            value={this.state.message}
          />
        </section>
        <section>
          {
            this.state.week.map(day => (
              <div key={day}>
                <input
                  type="checkbox"
                  onChange={e => this.updateSchedule(day)}
                  name={day}
                />
                <label htmlFor={day}>{day}</label>
              </div>
            ))
          }
          <input
            type="time"
            onChange={this.changeHandler}
            name="scheduleTime"
            step="1800"
            value={this.state.scheduleTime}
          />
        </section>
        <section>
          {
            this.state.questions.map(question => (
              <article key={question}>
                <p>{question}</p>
                <button onClick={e => this.removeQuestion(e, question)}>X</button>
              </article>
            ))
          }
        </section>
        <section>
          <input
            type="text"
            onChange={e => {
              const { value } = e.target;
              this.setState({
                question: value
              });
            }}
            name="question"
            placeholder="Ask a question..."
            value={this.state.question}
          />
          <button onClick={this.questionsHandler}>Add Question to Report</button>
        </section>
        <section>
          <button onClick={this.addReport}>Create Report</button>
        </section>
      </form>
    )
  }
}

export default CreateReport;