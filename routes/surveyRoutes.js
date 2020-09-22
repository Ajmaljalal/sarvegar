const mongoose = require('mongoose');
const _ = require('lodash');
const { URL } = require('url');
const { Path } = require('path-parser');

const requestLogin = require('../middlewares/requestLogin');
const checkCredits = require('../middlewares/checkCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');
const Survey = mongoose.model('surveys');


module.exports = app => {

    // Getting all the surveys for the current user
    app.get('/api/surveys', requestLogin, async (req, res) => {
        const surveys = await Survey.find({ _user: req.user.id })
            .select({ recipients: false });

        res.send(surveys);
    })
    // Sending thank you message after feedback is submitted
    app.get('/api/surveys/:surveyId/:choice', (req, res) => {
        Survey.updateOne({
            _id: req.params.surveyId,
        }, {
            $inc: { [req.params.choice]: 1 },
            lastResponded: new Date()
        }).exec()
        res.send("Thank you for your feedback!");
    });


    // hadlig feedback
    app.post('/api/surveys/webhooks', (req, res) => {
        console.log('api hit')
        const p = new Path('/api/surveys/:surveyId/:choice');
        _.chain(req.body)
            .map((event) => {
                const pathname = new URL(event.url).pathname;
                const match = p.test(pathname);
                if (match) {
                    return {
                        email: event.email,
                        surveyId: match.surveyId,
                        choice: match.choice
                    }
                }
            })
            .compact()
            .uniqBy('email', 'surveyId')
            .each(({ surveyId, email, choice }) => {
                console.log('response', email, choice)
                Survey.updateOne({
                    _id: surveyId,
                    recipients: {
                        $elemMatch: { email: email, responded: false }
                    }
                }, {
                    $inc: { [choice]: 1 },
                    $set: { 'recipients.$.responded': true },
                    lastResponded: new Date()
                }
                ).exec();
            })
            .value();
        res.send({});
    });


    // creatig and sending survey
    app.post('/api/surveys', requestLogin, checkCredits, async (req, res) => {
        //grab the data from the request body
        const { title, subject, body, recipients } = req.body;

        // create a new survey object
        const survey = new Survey({
            title,
            subject,
            body,
            recipients: recipients.split(',').map(email => ({ email: email.trim() })),
            _user: req.user.id,
            dateSent: Date.now(),
        });

        //create the email with the survey and a template
        const mailer = new Mailer(survey, surveyTemplate(survey));

        try {
            //send the email
            await mailer.send();

            // save the survey object to the DB
            await survey.save();

            // subtract credits from the user
            req.user.credits -= 1;

            // save the user with updated credits
            const user = await req.user.save();

            // send the updated saved user 
            res.send(user);
        } catch (err) {
            res.status(422).send(err);
        }

    })
}