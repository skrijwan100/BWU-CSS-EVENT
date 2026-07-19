import nodemailer from 'nodemailer'
import util from 'util'

const sendAcceptanceEmail = async (sendtoemail, eventName) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL,      // Your email
            pass: process.env.PASSWORD    // App password (not your real password)
        }
    });

    const acceptanceEmailTemplateHTML = (eventName) => `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Application Accepted</title>

<style>
*{
    margin:0;
    padding:0;
    box-sizing:border-box;
}

body{
    background:#0b0b0b;
    font-family:Arial, Helvetica, sans-serif;
    color:#fff;
    padding:30px 15px;
}

.wrapper{
    max-width:650px;
    margin:auto;
}

.card{
    background:#151515;
    border:1px solid #2b2b2b;
    border-radius:18px;
    overflow:hidden;
}

.header{
    background:linear-gradient(135deg,#ff7a00,#ffb000);
    padding:35px;
    text-align:center;
}

.logo{
    font-size:34px;
    font-weight:800;
    letter-spacing:2px;
    color:#fff;
}

.tagline{
    margin-top:8px;
    font-size:14px;
    color:rgba(255,255,255,.9);
}

.body{
    padding:45px 35px;
    text-align:center;
}

.icon{
    width:90px;
    height:90px;
    line-height:90px;
    margin:auto;
    font-size:46px;
    background:rgba(255,122,0,.12);
    border:2px solid #ff7a00;
    border-radius:50%;
}

h1{
    margin-top:25px;
    font-size:32px;
    color:#fff;
}

.subtitle{
    margin-top:18px;
    font-size:17px;
    color:#d6d6d6;
    line-height:1.8;
}

.event-box{
    margin:35px 0;
    padding:22px;
    background:#1f1f1f;
    border:1px solid #333;
    border-radius:14px;
}

.event-title{
    color:#999;
    font-size:13px;
    text-transform:uppercase;
    letter-spacing:2px;
}

.event-name{
    margin-top:10px;
    font-size:28px;
    color:#ffb000;
    font-weight:bold;
}

.status{
    display:inline-block;
    margin-top:30px;
    padding:14px 40px;
    border-radius:50px;
    background:linear-gradient(90deg,#ff7a00,#ffb000);
    color:#fff;
    font-weight:bold;
    font-size:18px;
    letter-spacing:2px;
}

.info-card{
    margin-top:40px;
    background:#101010;
    border:1px solid #2e2e2e;
    border-radius:14px;
    padding:25px;
    text-align:left;
}

.info-card h3{
    color:#ffb000;
    margin-bottom:18px;
}

.info-card ul{
    padding-left:20px;
}

.info-card li{
    margin-bottom:12px;
    color:#d3d3d3;
    line-height:1.7;
}

.note{
    margin-top:35px;
    color:#bdbdbd;
    font-size:15px;
    line-height:1.8;
}

.footer{
    padding:25px;
    text-align:center;
    color:#888;
    border-top:1px solid #2c2c2c;
    font-size:13px;
}

.footer strong{
    color:#ffb000;
}

@media(max-width:600px){

.body{
    padding:30px 22px;
}

h1{
    font-size:27px;
}

.event-name{
    font-size:22px;
}

.status{
    font-size:16px;
    padding:12px 28px;
}

}
</style>
</head>

<body>

<div class="wrapper">

<div class="card">

<div class="header">

<div class="logo">🚀 CSSEVENT</div>

<div class="tagline">
Code. Compile. Conque
</div>

</div>

<div class="body">

<div class="icon">
🎉
</div>

<h1>Congratulations!</h1>

<p class="subtitle">
Your application has been successfully reviewed, and we're excited to let you know that you've been <strong>selected</strong> to participate in our upcoming event.
</p>

<div class="event-box">

<div class="event-title">
Selected Event
</div>

<div class="event-name">
${eventName}
</div>

</div>

<div class="status">
✅ ACCEPTED
</div>

<div class="info-card">

<h3>What's Next?</h3>

<ul>
<li>Practice coding problems on <strong>HackerRank</strong>.</li>

<li>Stay updated with all announcements regarding the event.</li>

<li>Keep checking our offical website for update.</li>

<li>Be ready to showcase your coding skills and creativity.</li>

</ul>

</div>

<p class="note">
We were impressed with your profile and are delighted to welcome you to <strong>${eventName}</strong>. We look forward to seeing your innovative ideas and wish you the very best for the competition.
</p>

</div>

<div class="footer">

<strong>CSSEVENT Team</strong><br><br>

© 2026 CSSEVENT • Code. Compile. Conquer.

</div>

</div>

</div>

</body>
</html>
`;

    const mailOptions = {
        from: process.env.EMAIL,
        to: sendtoemail,
        subject: `Congratulations! You've been selected for ${eventName}`,
        html: acceptanceEmailTemplateHTML(eventName),
    };

    // Convert sendMail to return a promise
    const sendMailAsync = util.promisify(transporter.sendMail.bind(transporter));

    try {
        const info = await sendMailAsync(mailOptions);
        console.log(`✅ Acceptance email sent for ${eventName}:`, info.response);
        return info.response;
    } catch (error) {
        console.error("❌ Error sending acceptance email:", error);
        throw error;
    }
}

export default sendAcceptanceEmail;