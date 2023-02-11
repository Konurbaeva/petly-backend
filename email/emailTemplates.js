const recoveryTemplate = (recoveryToken) => {
    return `
    <div>
        <h1> Click this link below to update your password</h1>
        <a href="http://localhost:3000/api/users/verify/${recoveryToken}" target="_blank" 
        style="border: solid 1px #3498db; border-radius: 5px; box-sizing: border-box; 
        cursor: pointer; display: inline-block; font-size: 14px; font-weight: bold; margin: 0; 
        padding: 12px 25px; text-decoration: none; text-transform: capitalize; 
        background-color: #3498db; border-color: #3498db; color: #ffffff;">Click</a>
    </div>
    `
}

module.exports = {
    recoveryTemplate
}