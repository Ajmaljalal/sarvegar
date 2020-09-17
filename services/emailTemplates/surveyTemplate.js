module.exports = (survey)=>{
    return `
        <html>
            <bod>
                <div style = "text-align: center;">
                    <h3>Hi dear costumer!</h3>
                    <p>Please answer the following question!</p>
                    <p>${survey.body}</p>
                    <div>
                        <a href="https://ancient-harbor-70338.herokuapp.com/api/surveys/${survey.id}/yes">Yes</a>
                    </div>
                    <div>
                        <a href="https://ancient-harbor-70338.herokuapp.com/api/surveys/${survey.id}/no">No</a>
                    </div>
                </div>
            </body>

        </html>
    `;
};