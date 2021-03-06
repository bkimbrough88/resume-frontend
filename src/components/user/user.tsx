import * as React from 'react';
import "./user.css"

import {CertificationModel, Certification} from "../certification/certification";
import {DegreeModel, Degree} from "../degree/degree";
import {ExperienceModel, Experience} from "../experience/experience";
import {SkillModel, Skill} from "../skill/skill";

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
            email = <p id="email" className="contact-info-text"><img alt="email" src="https://img.icons8.com/color/24/000000/send-mass-email.png"/> <a href={"mailto:" + user.email}>{user.email}</a></p>
        }

        let phone
        if (user.phone_number !== undefined) {
            phone = <p id="phone" className="contact-info-text"><img alt="phone" src="https://img.icons8.com/color/24/000000/phone-message.png"/> {user.phone_number}</p>
        }

        let location
        if (user.location !== undefined) {
            location = <p id="location" className="contact-info-text"><img alt="location" src="https://img.icons8.com/ultraviolet/24/000000/marker.png"/> {user.location}</p>
        }

        let linkedin
        if (user.linkedin !== undefined) {
            linkedin = <p id="linkedin" className="contact-info-text"><img alt="linkedin" src="https://img.icons8.com/color/24/000000/linkedin.png"/> <a href={user.linkedin}> {this.getUrlDisplayName(user.linkedin)}</a> </p>
        }

        let github
        if (user.github !== undefined) {
            github = <p id="github" className="contact-info-text"><img alt="github" src="https://img.icons8.com/color/24/000000/github--v1.png"/> <a href={user.github}> {this.getUrlDisplayName(user.github || "")}</a> </p>
        }

        let certifications
        if (user.certifications !== undefined) {
            certifications = <div id="Certifications">
                <h1>Certifications</h1>
                {
                    user.certifications.map(((cert, index) => {
                        return <Certification
                            key={index}
                            name={cert.name}
                            date_achieved={cert.date_achieved}
                            badge_image={cert.badge_image}
                            badge_link={cert.badge_link}
                            date_expires={cert.date_expires}
                        />
                    }))
                }
            </div>
        }


        let degrees
        if (user.degrees !== undefined) {
            degrees = <div id="Degrees">
                <h1>Degrees</h1>
                {
                    user.degrees.map(((degree, index) => {
                        return <Degree
                            key={index}
                            school={degree.school}
                            degree={degree.degree}
                            major={degree.major}
                            start_year={degree.start_year}
                            end_year={degree.end_year}
                        />
                    }))}
            </div>
        }

        let experience
        if (user.experience !== undefined) {
            experience = <div id="Experience">
                <h1>Experience</h1>
                {
                    user.experience.map(((exp, index) => {
                        return <Experience
                            key={index}
                            company={exp.company}
                            job_title={exp.job_title}
                            start_month={exp.start_month}
                            start_year={exp.start_year}
                            responsibilities={exp.responsibilities}
                            end_month={exp.end_month}
                            end_year={exp.end_year}
                        />
                    }))
                }
            </div>
        }

        let skills
        if (user.skills !== undefined) {
            skills = <div id="Skills">

                <h1>Skills</h1>
                {
                    user.skills.map(((skill, index) => {
                        return <Skill
                            key={index}
                            name={skill.name}
                            years_of_experience={skill.years_of_experience}
                        />
                    }))
                }
            </div>
        }

        return (
            <div id="Margin" className="margin">
                <h1 id="Name" className="name-text">{user.given_name || ""} {user.sur_name || ""}</h1>
                <div id="Summary" className="grid-container-3">
                    <div id="Margin" className="grid-child">
                        <div id="Block" className="block"/>
                    </div>
                    <div id="Description" className="grid-child">
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
                {experience}
                {degrees}
                {certifications}
                {skills}
            </div>
        );
    }
}

export default User;