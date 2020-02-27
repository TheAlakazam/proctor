import React, { Component } from 'react'

export class QuestionCircle extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             attempted: false,
             current: false,
        }

        this.fillCircle = this.fillCircle.bind(this);
        this.attemptQuestion = this.attemptQuestion.bind(this);
        this.currentQuestion = this.currentQuestion.bind(this);
    }

    fillCircle = () => {
        if(this.state.attempted) {
            return "btn button-2ch btn-success";
        }
        if(this.state.current) {
            return "btn button-2ch btn-primary";
        }

        return "btn button-2ch btn-outline-primary";
    }

    attemptQuestion = () => {
        this.setState({ attempted: true});
    }

    currentQuestion = () => {
        this.setState({ current: !this.state.current});
    }

    render() {
        return (
            <button className={this.fillCircle()} id={this.props.qno} onClick={() => this.props.setQuestion(this.props.qno, this.props.question, this.props.answers)}>{this.props.qno}</button>
        )
    }
};

export default QuestionCircle;
