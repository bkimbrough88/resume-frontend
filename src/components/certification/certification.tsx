import * as React from 'react';
import "./certification.css"

export type CertificationModel = {
    name:           string
    date_achieved:  string
    badge_image?:   string
    badge_link?:    string
    date_expires?:  string
}

export class Certification extends React.Component<CertificationModel, any> {
    render() {
        const cert: CertificationModel = this.props

        let badge
        if (cert.badge_image !== undefined && cert.badge_link !== undefined) {
            badge = <a href={cert.badge_link}><img alt="badge" src={cert.badge_image}/></a>
        } else if (cert.badge_image !== undefined) {
            badge = <img alt="badge" src={cert.badge_image}/>
        } else if (cert.badge_link !== undefined) {
            badge = <a href={cert.badge_link}>badge</a>
        }

        let expires
        if (cert.date_expires !== undefined) {
            expires = <p>Expires: {cert.date_expires}</p>
        }

        return (
            <div>
                <p>{cert.name}: {cert.date_achieved}</p>
                {badge}
                {expires}
            </div>
        );
    }
}