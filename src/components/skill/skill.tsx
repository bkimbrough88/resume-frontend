import * as React from 'react';
import "./skill.css"

export type SkillModel = {
    name:                   string
    years_of_experience?:   number
}

export class Skill extends React.Component<SkillModel, any> {

    render() {
        let skill
        if (this.props.years_of_experience === undefined) {
            skill = <p>{this.props.name}: {this.props.years_of_experience}</p>
        } else {
            skill = <p>{this.props.name}</p>
        }
        return (
            <div>
                {skill}
            </div>
        );
    }
}