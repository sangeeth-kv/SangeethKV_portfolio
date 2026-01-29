// // api/sendEmail.js
// import emailjs from 'emailjs-com';

// export default async function handler(req, res) {
//   if (req.method !== "POST") {
//     return res.status(405).json({ error: "Method not allowed" });
//   }

//   const { name, email, subject, message } = req.body;

//   try {
//     await emailjs.send(
//       process.env.EMAILJS_SERVICE_ID,
//       process.env.EMAILJS_TEMPLATE_ID,
//       { name, email, subject, message, time: new Date().toLocaleString() },
//       process.env.EMAILJS_PRIVATE_KEY
//     );
//     res.status(200).json({ success: true });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Email send failed' });
//   }
// }


// export default async function handler(req, res) {
//   if (req.method !== "POST") {
//     return res.status(405).json({ error: "Method not allowed" });
//   }

//   const { name, email, subject, message } = req.body;

//   try {
//     const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify({
//         service_id: process.env.EMAILJS_SERVICE_ID,
//         template_id: process.env.EMAILJS_TEMPLATE_ID,
//         user_id: process.env.EMAILJS_PUBLIC_KEY, // still required
//         accessToken: process.env.EMAILJS_PRIVATE_KEY, // PRIVATE KEY
//         template_params: {
//           name,
//           email,
//           subject,
//           message,
//           time: new Date().toLocaleString()
//         }
//       })
//     });

//     if (!response.ok) {
//       throw new Error("EmailJS API failed");
//     }

//     return res.status(200).json({ success: true });
//   } catch (error) {
//     console.error("Email error:", error);
//     return res.status(500).json({ error: "Email send failed" });
//   }
// }


export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ success: false, message: "Missing fields" });
  }

  try {
    const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        service_id: process.env.EMAILJS_SERVICE_ID,
        template_id: process.env.EMAILJS_TEMPLATE_ID,
        user_id: process.env.EMAILJS_PUBLIC_KEY,
        template_params: {
          name,
          email,
          subject,
          message,
          time: new Date().toLocaleString()
        }
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText);
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("EmailJS Error:", error);
    return res.status(500).json({ success: false, message: "Email failed" });
  }
}