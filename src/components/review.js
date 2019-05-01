import React, { Component } from 'react';
import {connect} from "react-redux";
import {submitReview} from '../actions/movieActions';
import { Form, Col, FormGroup, FormControl, Button, ControlLabel} from 'react-bootstrap';


class Review extends Component {
    constructor(info){
        super(info);
        this.updateDetails = this.updateDetails.bind(this);
        this.review = this.review.bind(this);
        this.state = {
            details:{
                movie: info.movie.title,
                review: '',
                reviewer: '',
                rating: 0
            }
        };

    }

    updateDetails(event){
        let updateDetails = Object.assign({}, this.state.details);

        if(event.target.id === 'ratingSelector') {
            updateDetails.rating = event.target.value;
        }
        else {
            updateDetails[event.target.id] = event.target.value;
        }
        this.setState({
            details: updateDetails
        });
    }

    review() {
        const {dispatch} = this.props;
        dispatch(submitReview(this.state.details, this.props.movie._id));
    }

    render() {
        return(
            <Form horizontal>
                <FormGroup controlId="ratingSelector">
                    <Col componentClass={ControlLabel} sm={2}>
                        Rating
                    </Col>
                    <Col sm={10}>
                        <FormControl componentClass='select' onChange={this.updateDetails} value={this.state.details.rating} required>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                        </FormControl>
                    </Col>
                </FormGroup>
                <FormGroup controlId="review">
                    <Col componentClass={ControlLabel} sm={2}>
                        Review
                    </Col>
                    <Col sm={10}>
                        <FormControl as="textarea" rows="3" required onChange={this.updateDetails} value={this.state.details.review}/>
                    </Col>
                </FormGroup>
                <FormGroup>
                    <Col smOffset={2} sm={10}>
                        <Button onClick={this.review}>Post Review</Button>
                    </Col>
                </FormGroup>
            </Form>
        );
    }

}

const mapStateToProps = state => {
    return{
    }
};

export default connect(mapStateToProps)(Review);