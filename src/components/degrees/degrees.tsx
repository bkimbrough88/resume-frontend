import * as React from 'react';
import "./degrees.css"

export type DegreeModel = {
    degree:     string
    major:      string
    school:     string
    start_year: number
    end_year:   number
}

type DegreePropModel = {
    degrees: DegreeModel[]
}

export class Degrees extends React.Component<DegreePropModel, any> {

    render() {
        return (
            <div>
                <h1>Degrees</h1>
            </div>
        );
    }
}