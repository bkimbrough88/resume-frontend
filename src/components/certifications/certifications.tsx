import * as React from 'react';
import "./certifications.css"

export type CertificationModel = {
    name:           string
    date_achieved:  string
    badge_link?:    string
    date_expires?:  string
}

type CertPropModel = {
    certs: CertificationModel[]
}

export class Certifications extends React.Component<CertPropModel, any> {

    render() {
        return (
            <div>
                <h1>Certifications</h1>
            </div>
        );
    }
}