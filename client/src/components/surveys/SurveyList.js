import React from 'react';
import { connect } from 'react-redux';
import { fetchSurveys } from '../../actions/index';

class SurveyList extends React.Component {
  componentDidMount() {
    this.props.fetchSurveys();
  }
  renderSurveys() {
    return this.props.surveys.reverse().map((survey) => {
      return (
        <div className="card blue-grey darken-2" key={survey._id}>
          <div className="card-content whit-text">
            <span className="card-title right-align">{survey.title}</span>
            <p className="right-align">{survey.body}</p>
            <p>Sent On: {new Date(survey.dateSent).toLocaleDateString()}</p>
          </div>
          <div className="right-align card-action">
            <a>Yes: {survey.yes}</a>
            <a>No: {survey.no}</a>
          </div>
        </div>
      );
    });
  }
  render() {
    return <div>{this.renderSurveys()}</div>;
  }
}

const mapStateToProps = (state) => {
  return { surveys: state.surveys };
};
export default connect(mapStateToProps, { fetchSurveys })(SurveyList);
