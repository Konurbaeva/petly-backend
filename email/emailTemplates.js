// const SERVER = 'https://goit-project-petly-backend.onrender.com'
// const SERVER = 'http://localhost:3000';
const FRONT_END = 'https://kl0filinj.github.io/goit-project-petly'

const recoveryTemplate = (recoveryToken) => {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Petly</title>
    </head>
    <body>
        <table style="width: 100%;">
            <tr style="text-align: center;">
                <td>
                    <h1 style="font-size: 1.5rem;"> Hi there, <br> This is Petly!</h1>
                    <p> Click this link below to reset your password</p>
                </td>
             </tr>
             <td>
                <div style="text-align: center;">
                    <a href="${FRONT_END}/recovery?token=${recoveryToken}" target="_blank" style="border: solid 1px #3498db; border-radius: 5px; box-sizing: border-box; 
                                    cursor: pointer; display: inline-block; font-size: 14px; font-weight: bold; margin: 0; 
                                    padding: 12px 25px; text-decoration: none; text-transform: capitalize; 
                                    background-color: #3498db; border-color: #3498db; color: #ffffff;">Click</a>
                </div>
             </td>
        </table>
    </body>
</html>`
}

module.exports = {
    recoveryTemplate
}