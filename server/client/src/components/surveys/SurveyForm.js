// SurveyForm
import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import SurveyField from './SurveyField';
import validateEmails from '../../utils/validateEmails';
import formFields from './formFields';

class SurveyForm extends Component {
    renderFields() {
        return _.map(formFields, ({label, name}) => {
            return <Field key={name} component={SurveyField} type="text" label={label} name={name}  />
        });
    }

    render() {
        return (
            <div>
                <form onSubmit={this.props.handleSubmit( this.props.onSurveySubmit )} >
                    {this.renderFields()}
                    <Link to="/surveys" className="waves-effect waves-light btn red left">
                        Cancel
                        <i className="material-icons right">cancel</i>
                    </Link>
                    <button type="submit" className="waves-effect waves-light btn red right">
                        Next
                        <i className="material-icons right">done</i>
                    </button>
                </form>
            </div>
        ); 
    }
}

function validate(values) {
    const errors = {};

    errors.recipients = validateEmails(values.recipients || '');

    // if(!values && values.emails.charAt(values.emails.length() -1) === ',') {
    //     errors.emails = ', at the end is not allowed';
    // }

    _.each(formFields, ({ name }) => {
        if (!values[name]) {
            errors[name] = `You must provide a ${name}`;
        }
    });

    return errors;
}

export default reduxForm({
    validate,
    form: 'surveyForm',
    destroyOnUnmount: false
})(SurveyForm);