import React from 'react';
import {
    Card, CardText, CardBody,
    CardTitle, CardSubtitle, Button
} from 'reactstrap';
import { Link } from 'react-router-dom';

const InfoPage = (props) => {
    return (
        <div>
            <Card>
                <CardTitle style={{ fontWeight: '800', fontSize: '180%' }}>Instructions for Candidates :</CardTitle>
                <CardBody style={{ backgroundColor: '#f1f1f1', margin: '0px 20px 10px 20px', padding: '3px 5px 3px 5px' }}>
                    <div className="m-5 p-5">
                    <CardSubtitle style={{ backgroundColor: '#f1f1f1', margin: '0', color: 'red', fontWeight: '600', padding: '0px 0px 5px 0px' }}>***NOTE: All candidates appearing for the test, must read the instructions carefully before starting with the exam***</CardSubtitle>

                    <CardText style={{ margin: '1', }}><b>(1)</b> This is an objective based examination with four options to each question.</CardText>
                    <CardText style={{ margin: '1' }}><b>(2) </b> Login is for single use only. It will be deactivated automatically after first use.</CardText>
                    <CardText style={{ margin: '1' }}><b>(3) </b> There's is no restriction in order to attempt questions.</CardText>
                    <CardText style={{ margin: '1' }}><b>(4) </b> A timer on the right-top will indicate you on how much time is left. Button-convension are as follows :</CardText>
                    <CardText style={{ margin: '1' }}><Button outline color="primary">1</Button> => This is for unattempted question</CardText>
                    <CardText style={{ margin: '1' }}><Button color="primary" >1</Button> => This is for current question</CardText>
                    <CardText style={{ margin: '1' }}><Button color="success">1</Button> => This is for saved question</CardText>
                    <CardText style={{ margin: '1' }}><b>(5) </b>Always remember to save the response after selecting the option using <Button color="danger"> SAVE </Button> , else your response won't be considered.</CardText>
                    <CardText style={{ margin: '1' }}><b>(6) </b>For final submission of all responses, select <Button color="danger"> END TEST </Button> on the right bottom of the screen. The result score will not be shown to the candidate.</CardText>
                    <CardText style={{ margin: '1' }}><b>(7) </b>If theres any problem like fault in computer-setting, internet-connection etc, please contact the support team ASAP.</CardText>
                    </div>
                    <CardText style={{ backgroundColor: 'skyblue', padding: '10px 0px 10px 0px', "text-align" : "center"}}><Button tag={Link} to={"/test"} color="primary">START TEST >> </Button></CardText>

                </CardBody>
            </Card>
        </div>
    );
};

export default InfoPage;