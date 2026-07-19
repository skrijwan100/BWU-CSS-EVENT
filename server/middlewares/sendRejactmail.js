import nodemailer from 'nodemailer'
import util from 'util'

const sendRejectionEmail = async (sendtoemail, eventName) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL,      // Your email
            pass: process.env.PASSWORD    // App password (not your real password)
        }
    });

    const rejectionEmailTemplateHTML = (eventName) => `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<style>

*{
margin:0;
padding:0;
box-sizing:border-box;
}

body{
background:#0b0b0b;
font-family:Arial,Helvetica,sans-serif;
padding:30px 15px;
color:#ffffff;
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
margin:auto;
line-height:90px;
font-size:46px;
background:rgba(255,255,255,.06);
border:2px solid #555;
border-radius:50%;
}

h1{
margin-top:25px;
font-size:30px;
color:#fff;
}

.subtitle{
margin-top:18px;
font-size:17px;
line-height:1.8;
color:#d3d3d3;
}

.event-box{
margin:35px 0;
padding:22px;
background:#1f1f1f;
border:1px solid #333;
border-radius:14px;
}

.event-title{
font-size:13px;
letter-spacing:2px;
text-transform:uppercase;
color:#999;
}

.event-name{
margin-top:10px;
font-size:28px;
font-weight:bold;
color:#ffb000;
}

.status{
display:inline-block;
margin-top:30px;
padding:14px 38px;
border-radius:50px;
background:#2d2d2d;
border:1px solid #555;
font-size:18px;
font-weight:bold;
letter-spacing:2px;
color:#cccccc;
}

.message-card{
margin-top:40px;
padding:25px;
background:#101010;
border:1px solid #2d2d2d;
border-radius:14px;
text-align:left;
}

.message-card h3{
color:#ffb000;
margin-bottom:18px;
}

.message-card p{
color:#d0d0d0;
line-height:1.8;
margin-bottom:15px;
}

.quote{
margin-top:30px;
padding:20px;
background:rgba(255,176,0,.08);
border-left:4px solid #ffb000;
border-radius:8px;
font-style:italic;
color:#e7e7e7;
line-height:1.8;
}

.footer{
padding:25px;
border-top:1px solid #2c2c2c;
text-align:center;
font-size:13px;
color:#888;
}

.footer strong{
color:#ffb000;
}

@media(max-width:600px){

.body{
padding:30px 22px;
}

h1{
font-size:26px;
}

.event-name{
font-size:22px;
}

.status{
font-size:16px;
padding:12px 24px;
}

}

</style>

</head>

<body>

<div class="wrapper">

<div class="card">

<div class="header">

<div class="logo">
🚀 CSSEVENT
</div>

<div class="tagline">
Build • Code • Innovate
</div>

</div>

<div class="body">

<div class="icon">
📩
</div>

<h1>Application Update</h1>

<p class="subtitle">
Thank you for registering for <strong>${eventName}</strong>. We truly appreciate your interest and the effort you put into your application.
</p>

<div class="event-box">

<div class="event-title">
Event
</div>

<div class="event-name">
${eventName}
</div>

</div>

<div class="status">
Not Selected
</div>

<div class="message-card">

<h3>Selection Result</h3>

<p>
After carefully reviewing all registrations, we received an overwhelming number of applications from talented students.
</p>

<p>
Unfortunately, your application could not be selected for this edition of the contest.
</p>

<p>
Please remember that this decision does not reflect your potential as a programmer. We encourage you to continue practicing and improving your coding skills.
</p>

</div>

<div class="quote">

💡 <strong>Keep Coding!</strong><br><br>

Every great programmer has faced rejection at some point. Continue learning, solving problems, and participating in future contests. We look forward to seeing you in our upcoming events.

</div>

</div>

<div class="footer">

<strong>CSSEVENT Team</strong><br><br>

© 2026 CSSEVENT • Code. Learn. Grow.

</div>

</div>

</div>

</body>
</html>
`;

    const mailOptions = {
        from: process.env.EMAIL,
        to: sendtoemail,
        subject: `Update regarding your application for ${eventName}`,
        html: rejectionEmailTemplateHTML(eventName),
    };

    const sendMailAsync = util.promisify(transporter.sendMail.bind(transporter));

    try {
        const info = await sendMailAsync(mailOptions);
        console.log(`✅ Rejection email sent for ${eventName}:`, info.response);
        return info.response;
    } catch (error) {
        console.error("❌ Error sending rejection email:", error);
        throw error;
    }
}

export default sendRejectionEmail;