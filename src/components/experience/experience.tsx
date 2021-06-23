import * as React from 'react';
import "./experience.css"

export type ExperienceModel = {
    company:            string
    job_title:          string
    start_month?:        string
    start_year:         number
    end_month?:         string
    end_year?:          number
    responsibilities?:  string[]
}

export class Experience extends React.Component<ExperienceModel, any> {


    render() {
        const exp = this.props

        let timeframe
        if (exp.start_month !== undefined && exp.end_year !== undefined && exp.end_month !== undefined) {
            timeframe = ": " + exp.start_month + " " + exp.start_year + " - " + exp.end_month + " " + exp.end_year
        } else if (exp.end_year !== undefined && exp.end_month === undefined) {
            timeframe = ": " + exp.start_year + " - " + exp.end_year
        } else if (exp.start_month !== undefined && exp.end_year === undefined) {
            timeframe = ": " + exp.start_month + " " + exp.start_year + " - Present"
        } else if (exp.end_year === undefined) {
            timeframe = ": " + exp.start_year + " - Present"
        }

        let responsibilities
        if (exp.responsibilities !== undefined) {
            responsibilities = <ul>{exp.responsibilities.map(responsibility => {
                return <li>{responsibility}</li>
            })}</ul>
        }

        return (
            <div>
                <h2>{exp.company} - {exp.job_title}{timeframe}</h2>
                {responsibilities}
            </div>
        );
    }
}