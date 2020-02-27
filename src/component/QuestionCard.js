import React, { Component } from 'react'

export class QuestionCard extends Component {
    
    render() {
        return (
            <div className="container-fluid">
                <div className="card mt-5 p-3 min-100">
                    <h2 className="card-title">Q{this.props.qno}) {this.props.question}</h2>
                    <div className="card-body">
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item"><input type="radio" name="answer" value={this.props.answers[0]} onChange={this.props.answerQuestion}/>{this.props.answers[0]}</li>
                            <li className="list-group-item"><input type="radio" name="answer" value={this.props.answers[1]} onChange={this.props.answerQuestion}/>{this.props.answers[1]}</li>
                            <li className="list-group-item"><input type="radio" name="answer" value={this.props.answers[2]} onChange={this.props.answerQuestion}/>{this.props.answers[2]}</li>
                            <li className="list-group-item"><input type="radio" name="answer" value={this.props.answers[3]} onChange={this.props.answerQuestion}/>{this.props.answers[3]}</li>
                        </ul>
                    </div>
                    <div className="card-footer text-center">
                        <button className="btn btn-primary m-2 mr-4" onClick={()=>this.props.changeQuestion(this.props.qno-1)} disabled={this.props.qno === 1}><h3>Prev</h3></button>
                        <button className="btn btn-danger m-2" onClick={this.props.saveResponse}><h3>Save</h3></button>
                        <button className="btn btn-primary ml-4 m-2" onClick={()=>this.props.changeQuestion(this.props.qno+1)} disabled={this.props.qno === 90}><h3>Next</h3></button>
                    </div>
                </div>
            </div>
        )
    }
}

export default QuestionCard;
