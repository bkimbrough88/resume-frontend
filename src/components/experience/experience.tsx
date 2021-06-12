import * as React from 'react';
import "./experience.css"

export type ExperienceModel = {
    company:            string
    job_title:          string
    start_month:        string
    start_year:         number
    end_month?:         string
    end_year?:          number
    responsibilities?:  string[]
}

type ExperiencePropModel = {
    experience: ExperienceModel[]
}

export class Experience extends React.Component<ExperiencePropModel, any> {

    render() {
        return (
            <div>
                <h1>Work Experience</h1>
            </div>
        );
    }
}