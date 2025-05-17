// src/app/api/send-registration-email/route.ts
import { type NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { z } from 'zod';

// Define the expected input schema
const RegistrationDataSchema = z.object({
  fullName: z.string(),
  email: z.string().email(),
  organization: z.string().optional(),
  ticketType: z.string(),
  language: z.string().optional().default('en'), // To select email template language
});

type RegistrationData = z.infer<typeof RegistrationDataSchema>;

// Helper function to get email content based on language
// This is a simplified version. In a real app, you might use i18next or a templating engine.
const getEmailContent = (data: RegistrationData) => {
  const isCroatian = data.language === 'hr';

  const subject = isCroatian 
    ? `Potvrda registracije za CLARC 2025: ${data.fullName}` 
    : `CLARC 2025 Registration Confirmation: ${data.fullName}`;

  const ticketTypeTranslations: Record<string, Record<string, string>> = {
    en: {
      student: "Student Ticket ($99)",
      professional: "Professional Ticket ($299)",
      vip: "VIP Ticket ($499 - includes workshop access)",
    },
    hr: {
      student: "Studentska ulaznica (99 USD)",
      professional: "Profesionalna ulaznica (299 USD)",
      vip: "VIP ulaznica (499 USD - uključuje pristup radionicama)",
    }
  };
  
  const translatedTicketType = ticketTypeTranslations[data.language || 'en']?.[data.ticketType] || data.ticketType;

  const body = `
${isCroatian ? `Poštovani/a ${data.fullName},` : `Dear ${data.fullName},`}

${isCroatian 
  ? `Hvala Vam što ste se registrirali za CLARC 2025! Izuzetno nam je drago što ćete nam se pridružiti na ovom uzbudljivom događaju.`
  : `Thank you for registering for CLARC 2025! We are thrilled to have you join us for this exciting event.`
}

${isCroatian ? `Ovdje su detalji Vaše registracije:` : `Here are your registration details:`}
- ${isCroatian ? `Puno ime` : `Full Name`}: ${data.fullName}
- ${isCroatian ? `E-mail` : `Email`}: ${data.email}
${data.organization ? `- ${isCroatian ? `Organizacija` : `Organization`}: ${data.organization}` : ''}
- ${isCroatian ? `Vrsta ulaznice` : `Ticket Type`}: ${translatedTicketType}

${isCroatian ? `Podaci za uplatu (Predračun):` : `Payment Details (Proforma Invoice):`}
- ${isCroatian ? `Uplata za:` : `Payable to:`} Filozofski fakultet (Faculty of Humanities and Social Sciences), Sveučilišna avenija 4, HR-51000 Rijeka, Croatia
- IBAN: HR9123600001101536455 (Zagrebačka banka d.d.)
- ${isCroatian ? `POZIV NA BROJ:` : `Reference Number:`} OIB | ID number-26
- ${isCroatian ? `OPIS PLAĆANJA:` : `Payment Description:`} CLARC 2025 ${data.fullName}

${isCroatian 
  ? `U kotizaciju su uključeni troškovi konferencijskih materijala za sudionike te osvježenja u stankama.`
  : `The registration fee includes conference materials for participants and refreshments during breaks.`
}
${isCroatian 
  ? `Nije moguća uplata kotizacije na licu mjesta.`
  : `On-site payment is not possible.`
}

${isCroatian ? `Radujemo se Vašem dolasku u Opatiju!` : `We look forward to welcoming you to Opatija!`}

${isCroatian ? `Srdačan pozdrav,\nOrganizacijski tim CLARC 2025` : `Sincerely,\nThe CLARC 2025 Organizing Team`}
  `;
  return { subject, text: body.trim() };
};


export async function POST(request: NextRequest) {
  try {
    const rawData = await request.json();
    const validationResult = RegistrationDataSchema.safeParse(rawData);

    if (!validationResult.success) {
      return NextResponse.json({ error: 'Invalid input data', details: validationResult.error.flatten() }, { status: 400 });
    }

    const registrationData = validationResult.data;
    const { subject, text } = getEmailContent(registrationData);

    // --- NODEMAILER CONFIGURATION ---
    // IMPORTANT: Replace with your actual email sending configuration.
    // You might use environment variables for sensitive data.
    // Example using SMTP:
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SMTP_HOST, // e.g., 'smtp.example.com'
      port: Number(process.env.EMAIL_SMTP_PORT) || 587, // e.g., 587 or 465
      secure: (process.env.EMAIL_SMTP_PORT === '465'), // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_SMTP_USER, // e.g., 'your-email@example.com'
        pass: process.env.EMAIL_SMTP_PASS, // e.g., 'your-email-password'
      },
      // If using a service like Gmail, you might need to enable "Less secure app access"
      // or use an App Password. For production, consider a dedicated email service.
    });

    // Example for SendGrid (using API key - install '@sendgrid/mail' or use nodemailer with SMTP relay)
    // if (process.env.SENDGRID_API_KEY) {
    //   transporter = nodemailer.createTransport({
    //     host: 'smtp.sendgrid.net',
    //     port: 587,
    //     auth: {
    //       user: 'apikey', // This is literal string 'apikey'
    //       pass: process.env.SENDGRID_API_KEY
    //     }
    //   });
    // }

    if (!process.env.EMAIL_SMTP_HOST && !process.env.SENDGRID_API_KEY) {
        console.warn("Email sending is not configured. EMAIL_SMTP_HOST or SENDGRID_API_KEY not set.");
        // For prototyping, we can return success even if email isn't actually sent.
        // In production, you'd want to return an error or ensure configuration.
        return NextResponse.json({ message: 'Registration successful, email sending skipped (not configured).' }, { status: 200 });
    }
    
    // --- SEND MAIL ---
    await transporter.sendMail({
      from: process.env.EMAIL_FROM_ADDRESS || '"CLARC 2025" <no-reply@example.com>', // Sender address
      to: registrationData.email, // List of receivers
      subject: subject, // Subject line
      text: text, // Plain text body
      // html: "<b>Hello world?</b>", // You can also send HTML body
    });

    return NextResponse.json({ message: 'Email sent successfully!' }, { status: 200 });

  } catch (error) {
    console.error('Failed to send email:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ error: 'Failed to send email', details: errorMessage }, { status: 500 });
  }
}
