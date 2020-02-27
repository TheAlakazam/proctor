import React, { Component } from 'react';
import TimerCountDown from './Timer';
import QuestionCard from './QuestionCard';
import QuestionCircle from './QuestionCircle';
import axios from 'axios';

export class MainPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            user: {
                user_id: "",
                user_name: "",
                user_dob: "",
                exam_subject: ""
            },
            questions: [],
            next_page_link: "",
            prev_page_link: "",
            questionsLoaded: false,
            currentQuestion: "",
            currentAnswers: [],
            currentQuestionID: 1,
            currentResponse: "",
            responses: {},
        };

        this.currentQButton = React.createRef();
        this.parseLinkData = this.parseLinkData.bind(this);
        this.fetchQuestions = this.fetchQuestions.bind(this);
        this.tableGen = this.tableGen.bind(this);
        this.setQuestion = this.setQuestion.bind(this);
        this.changeQuestion = this.changeQuestion.bind(this);
        this.answerQuestion = this.answerQuestion.bind(this);
        this.saveResponse = this.saveResponse.bind(this);
        this.onChangeFullscreen = this.onChangeFullscreen.bind(this)
    }

    componentDidMount() {
        axios.get('http://localhost:3001/users/1')
            .then(res => {
                let user = {};
                user.user_id = res.data.id;
                user.user_name = res.data.name;
                user.user_dob = res.data.dob;
                user.exam_subject = res.data.subject;
                user.image = res.data.image;
                this.setState({ user: user });
                console.log(res);
            });
        this.fetchQuestions();
    }

    onChangeFullscreen = () => {
        window.alert("You cannot exit fullscreen!!!");
    }
    setQuestion = (id, question, answers) => {
        this.refs['question-' + this.state.currentQuestionID].currentQuestion();
        this.refs['question-' + id].currentQuestion();
        this.setState({ currentQuestionID: id, currentQuestion: question, currentAnswers: answers });
    }

    answerQuestion = (e) => {
        const { value } = e.target;
        this.setState({ currentResponse: value });
    }

    saveResponse = (e, qid = this.state.currentQuestionID) => {
        e.preventDefault();
        let responses = this.state.responses;
        responses[this.state.questions[qid - 1].questionId] = this.state.currentResponse;
        this.setState({ responses }, () => {
            this.setState({ currentResponse: "" });
            this.refs['question-' + qid].attemptQuestion();
            console.log(this.state.responses);
        });
    }
    changeQuestion = (qid = this.state.currentQuestionID) => {
        this.setState({ currentQuestion: this.state.questions[qid - 1].question, currentAnswers: this.state.questions[qid - 1].options, currentQuestionID: this.state.questions[qid - 1].id });
    }
    fetchQuestions = (link = 'http://localhost:3001/questions') => {
        axios.get(link)
            .then(res => {
                let data = res.data;
                let i = 1;
                data.map(n => {
                    n['id'] = i;
                    i++;
                });
                this.setState({ ...this.state, questions: data }, () => {
                    this.setState({ questionsLoaded: true });
                    this.changeQuestion();
                });
                console.log(this.state);
            });
    }

    tableGen = (questions) => {
        let rows = [];
        if (this.state.questionsLoaded) {
            let k = 1;
            for (let i = 1; i <= 18; i++) {
                let c = [];
                for (let j = 1; j <= 5; j++) {
                    c.push(<td><QuestionCircle ref={"question-" + this.state.questions[k - 1].id} key={questions[k - 1].id} qno={questions[k - 1].id} question={questions[k - 1].question} answers={questions[k - 1].options} setQuestion={this.setQuestion} /></td>)
                    k += 1;
                }
                rows.push(<tr>{c}</tr>);
            }
        }
        return rows;
    }

    parseLinkData = (data) => {
        const linkRegex = /<([^>]+)/g;
        const relRegex = /rel="([^"]+)/g;
        let linkArray = [];
        let relArray = [];
        let finalResult = {};
        let temp;
        while ((temp = linkRegex.exec(data)) != null) {
            linkArray.push(temp[1]);
        }
        while ((temp = relRegex.exec(data)) != null) {
            relArray.push(temp[1]);
        }

        finalResult = relArray.reduce((object, value, index) => {
            object[value] = linkArray[index];
            return object;
        }, {});

        if (finalResult.hasOwnProperty('prev')) {
            this.setState({ prev_page_link: finalResult.prev })
        }
        else {
            this.setState({ prev_page_link: "" })
        }

        if (finalResult.hasOwnProperty('next')) {
            this.setState({ next_page_link: finalResult.next })
        }
        else {
            this.setState({ next_page_link: "" })
        }
    }


    render() {
        return (
                <div onContextMenu={e => e.preventDefault()} onCopy={e => e.preventDefault()} onCut={e => e.preventDefault()} className="container-fluid d-flex min-100 flex-column">
                    <div className="row">
                        <div className="col-9 nav-bar">
                            <div className="container d-flex flex-row justify-content-between">
                                <img className="navbar-brand" src={this.state.user.image} alt="Candidate" />
                                <table className="table table-borderless">
                                    <tbody>
                                        <tr>
                                            <th>Name</th>
                                            <td>{this.state.user.user_name}</td>
                                            <th>ID</th>
                                            <td>{this.state.user.user_id}</td>
                                        </tr>
                                        <tr>
                                            <th>Subject</th>
                                            <td>{this.state.user.exam_subject}</td>
                                            <th>Date</th>
                                            <td>{this.state.user.user_dob}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="col p-0 m-0">
                            <TimerCountDown />
                        </div>
                    </div>
                    <div className='row flex-grow-1 h-100'>
                        <div className="col-9 min-100">
                            {this.state.currentQuestion !== "" ? <QuestionCard qno={this.state.currentQuestionID} question={this.state.currentQuestion} answers={this.state.currentAnswers} changeQuestion={this.changeQuestion} answerQuestion={this.answerQuestion} saveResponse={this.saveResponse} /> : null}
                        </div>
                        <div className="col-3">
                            <div className="container">
                                <div className="card mt-5 p-3 min-100">
                                    <div className="card-body p-2">
                                        <table className="table table-borderless table-wrapper">
                                            <tbody>
                                                {this.tableGen(this.state.questions)}
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="card-footer text-center">
                                        <button className="btn btn-danger"><h3>End Test</h3></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        )
    }
}

export default MainPage
