const keys = require('../../config/keys');

module.exports = survey => {
    return `
        <html>
            <body>
                <div style="text-align: center;">
                    <h3>Thanks for being one of our VIP users!</h3>
                    <p>Would you like to help us to improve by answering a quick question?</p>
                    <p>From: ${survey.from}</p>
                    <p>${survey.body}</p>
                    <div>
                        <a href="${keys.redirectDomain}/api/surveys/${survey.id}/yes">Yes</a>
                    </div>
                    <div>
                        <a href="${keys.redirectDomain}/api/surveys/${survey.id}/no">No</a>
                    </div>
                </div>
            </body>
        </html>
`;
}
