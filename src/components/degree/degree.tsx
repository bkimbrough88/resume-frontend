import * as React from 'react';
import "./degree.css"

export type DegreeModel = {
    degree:     string
    major:      string
    school:     string
    start_year: number
    end_year?:   number
}

export class Degree extends React.Component<DegreeModel, any> {

    render() {
        let years
        if (this.props.end_year !== undefined) {
            years = <p>{this.props.start_year} - Present</p>
        } else {
            years = <p>{this.props.start_year} - {this.props.end_year}</p>
        }
        return (
            <div>
                <h3>{this.props.school}</h3>
                <h4>{this.props.degree} in {this.props.major}</h4>
                {years}
            </div>
        );
    }
}