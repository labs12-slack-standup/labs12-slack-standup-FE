import React, { Component } from 'react';
import { axiosWithAuth, baseURL } from '../../../config/axiosWithAuth';
import './Report.css';

class EditReport extends Component {
  state = {
    // Main Report State
    reportName: '',
    schedule: [],
    scheduleTime: '',
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
    const endpoint = `${baseURL}/reports/${this.props.match.params.reportId}`;
    axiosWithAuth()
      .get(endpoint)
      .then(res => {
        const { reportName, schedule, scheduleTime, message, questions, slackChannelId } = res.data.report;
        this.setState({ reportName, schedule, scheduleTime, message, questions, slackChannelId });
      })
      .catch(err => {
        console.log(err);
      })
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

  updateReport = e => {
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
    }
    const endpoint = `${baseURL}/reports/${this.props.match.params.reportId}`;
    axiosWithAuth()
      .put(endpoint, report)
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
            value={this.state.slackChannelId}
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
        <section className="days-flex">
        {
            this.state.week.map(day => (
              <div
                key={day}
                onClick={e => this.updateSchedule(day)}
                className={`day ${this.state.schedule.includes(day) ? 'selected': ''}`}
              >
               {day.charAt(0)}
              </div>
            ))
          }
        </section>
        <section>
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
              <article className="question-flex" key={question}>
                <p className="question">{question}</p>
                <button
                  className="question-button"
                  onClick={e => this.removeQuestion(e, question)}
                >X</button>
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
          <button onClick={this.updateReport}>Update Report</button>
        </section>
      </form>
    )
  }
}

export default EditReport;