import * as React from 'react';
import "./user.css"

import {CertificationModel, Certifications} from "../certifications/certifications";
import {DegreeModel, Degrees} from "../degrees/degrees";
import {ExperienceModel, Experience} from "../experience/experience";
import {SkillModel, Skills} from "../skills/skills";

type UserModel = {
    user_id:            string
    email?:             string
    certifications:     CertificationModel[]
    degrees:            DegreeModel[]
    experience:         ExperienceModel[]
    github?:            string
    given_name?:        string
    location?:          string
    linkedin?:          string
    phone_number?:      string
    skills:             SkillModel[]
    summary?:           string
    sur_name?:          string
}

type ResponseModel = {
    error?: string
    user?:  UserModel
}

type UserPropsModel = {
    domain: string
}

type UserStateModel = {
    user:           UserModel
    errorMessage?:  string
}

class User extends React.Component<UserPropsModel, UserStateModel> {
    constructor(props: UserPropsModel | Readonly<UserPropsModel>) {
        super(props);

        // Get the first part of the subdomain, such as 'brandon' from 'brandon.thekimbroughs.net'
        const userId: string = props.domain.split('.')[0] === 'localhost' ? 'brandon' : props.domain.split('.')[0]

        this.state = {
            user: {
                user_id: userId,
                certifications: [],
                degrees: [],
                experience: [],
                skills: []
            }
        }
    }

    componentDidMount() {
        const userId: string = this.state.user.user_id
        document.title = userId.charAt(0).toUpperCase() + userId.slice(1) + "'s Resume"

        fetch('https://resume-api.thekimbroughs.net/v1/user/' + userId)
            .then(async response => {
                const data: ResponseModel = await response.json()

                if (!response.ok) {
                    const error = (data && data.error) || response.statusText
                    return Promise.reject(error)
                }

                if (data.user === undefined) {
                    return Promise.reject("Got back an empty response")
                }

                this.setState({user: data.user})
            })
            .catch(error => {
                this.setState({ errorMessage: error.toString() })
                console.error('There was an error!', error)
            })
    }

    getUrlDisplayName(url: string) {
        const split = url.split("/")
        if (url.endsWith("/")) {
            return split[split.length-2]
        }
        else {
            return split[split.length-1]
        }
    }

    render() {
        const user : UserModel = this.state.user

        let summary
        if (user.summary !== undefined) {
            summary = <p id="Summary" className="summary-text">{user.summary}</p>
        }

        let email
        if (user.email !== undefined) {
            email = <p id="email" className="contact-info-text"><a href={"mailto:" + user.email}>{user.email} <img alt="email" src="https://img.icons8.com/color/24/000000/send-mass-email.png"/></a></p>
        }

        let phone
        if (user.phone_number !== undefined) {
            phone = <p id="phone" className="contact-info-text"> {user.phone_number} <img alt="phone" src="https://img.icons8.com/color/24/000000/phone-message.png"/> </p>
        }

        let location
        if (user.location !== undefined) {
            location = <p id="location" className="contact-info-text"> {user.location} <img alt="location" src="https://img.icons8.com/ultraviolet/24/000000/marker.png"/> </p>
        }

        let linkedin
        if (user.linkedin !== undefined) {
            linkedin = <p id="linkedin" className="contact-info-text"> <a href={user.linkedin}> {this.getUrlDisplayName(user.linkedin)} <img alt="linkedin" src="https://img.icons8.com/color/24/000000/linkedin.png"/> </a> </p>
        }

        let github
        if (user.github !== undefined) {
            github = <p id="github" className="contact-info-text"> <a href={user.github}> {this.getUrlDisplayName(user.github || "")} <img alt="github" src="https://img.icons8.com/color/24/000000/github--v1.png"/> </a> </p>
        }

        let certifications
        if (user.certifications !== undefined && user.certifications.length > 0)
            certifications = <Certifications certs={user.certifications} />

        let degrees
        if (user.degrees !== undefined && user.degrees.length > 0)
            degrees = <Degrees degrees={user.degrees} />

        let experience
        if (user.experience !== undefined && user.experience.length > 0)
            experience = <Experience experience={user.experience} />

        let skills
        if (user.skills !== undefined && user.skills.length > 0)
            skills = <Skills skills={user.skills} />

        return (
            <div id="Margin" className="margin">
                <div id="Summary" className="grid-container-3">
                    <div id="Margin" className="grid-child">
                        <div id="Block" className="block"/>
                    </div>
                    <div id="NameAndDescription" className="grid-child">
                        <p id="Name" className="name-text">{user.given_name || ""} {user.sur_name || ""}</p>
                        {summary}
                    </div>
                    <div id="ContactInfo" className="grid-child contact-info-area">
                        {email}
                        {phone}
                        {location}
                        {linkedin}
                        {github}
                    </div>
                </div>
                {certifications}
                {degrees}
                {experience}
                {skills}
            </div>
        );
    }
}

export default User;