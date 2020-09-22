module.exports = (survey) => {
    return `
        <html>
        <bod>
            <div style="text-align: center;
            background: whitesmoke;
            padding: 50px;
            height: 100%;">
                <h3>HELLO DEAR COSTUMER!</h3>
                <p>Please answer the following question. This will help us understand your needs and interest better.</p>
                <p style="margin-top: 50px; font-weight: bold; font-size: 18px;">${survey.body}</p>

                <a style="text-decoration: none; color: green; margin-right: 10px; font-weight: bold"
                    href="http://localhost:5000/api/surveys/${survey.id}/yes">YES</a>
                <a style="text-decoration: none; color: red; font-weight: bold" href="http://localhost:5000/api/surveys/${survey.id}/no">NO</a>

            </div>
            </body>

        </html>
    `;
};