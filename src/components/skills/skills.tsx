import * as React from 'react';
import "./skills.css"

export type SkillModel = {
    name:                   string
    years_of_experience?:   number
}

type SkillPropModel = {
    skills: SkillModel[]
}

export class Skills extends React.Component<SkillPropModel, any> {

    render() {
        return (
            <div>
                <h1>Skills</h1>
            </div>
        );
    }
}