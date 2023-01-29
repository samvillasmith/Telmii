const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireTokens = require('../middlewares/requireTokens');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');
const _ = require('lodash');
const { URL } = require('url');
const { Path } = require('path-parser');

const Survey = mongoose.model('surveys');




module.exports = app => {
    app.get('/api/surveys', requireLogin, async (req, res) => { 
        const surveys = await Survey.find({ _user: req.user.id })
            .select({ 
                recipients: false 
            });
        res.send(surveys);
    });

    app.get('/api/surveys/:surveyId/:choice', (req, res)=>{   
        res.send('Thank you for your feedback! Your thoughts are very important to us and we greatly appreciate your time in answering.');
    });
    app.post('/api/surveys/webhooks', (req, res) => { 
        const parsePath = new Path('/api/surveys/:surveyId/:choice');
        _.chain(req.body)
            .map(({ email, url }) => { 
                const match = parsePath.test(new URL(url).pathname);
                if(match){
                    return { email, surveyId: match.surveyId, choice: match.choice };
                }
            })
            .compact()
            .uniqBy('email', 'surveyId')
            .each(({ surveyId, email, choice }) => { 
                Survey.updateOne(
                {
                    _id: surveyId,
                    recipients: {
                    $elemMatch: { email: email, responded: false }
                    }
                },
                {
                    $inc: { [choice]: 1 },
                    $set: { 'recipients.$.responded': true },
                    lastResponded: new Date()
                }
            ).exec();
            })
            .value();

        res.send({})
    });
    

    app.post('/api/surveys', requireLogin, requireTokens, async (req, res) => {
        console.log(req.body);

        const { title, from, subject, body, recipients } = req.body;

        const survey = new Survey({ 
            title,
            subject,
            from,
            body,
            recipients: recipients.split(',').map(email => ({ email: email.trim() })),
            _user: req.user.id,
            dateSent: Date.now()
        });
        //Send the emails
        try{
        const mailer = new Mailer(survey, surveyTemplate(survey));
        await mailer.send();
        await survey.save();
        req.user.tokens -= 1;
        const user = await req.user.save();
        res.send(user);
        } catch(err){
            res.status(422).send(err);
        }
    });
};