import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    const { from, to, subject, body } = await request.json();
    
    // Validate inputs
    if (!from || !to || !subject || !body) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Create a transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: from,
        pass: process.env.EMAIL_PASSWORD // This should be set in your .env.local file
      }
    });

    // Format the body with HTML
    const htmlBody = body
      .replace(/\n\n/g, '</p><p>')
      .replace(/\n/g, '<br>')
      .replace(/\[Insert Link to Increw's Online Interview Platform Homepage\]/g, 
               '<a href="https://increw.app/interview" style="color: #4f46e5; text-decoration: none; font-weight: 500;">https://increw.app/interview</a>');
    
    // Email options
    const mailOptions = {
      from: `"Increw Recruitment" <${from}>`,
      to,
      subject,
      text: body,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
          <div style="text-align: center; margin-bottom: 20px;">
            <img src="https://via.placeholder.com/150x50?text=Increw" alt="Increw Logo" style="max-width: 150px;">
          </div>
          <p>${htmlBody}</p>
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #666;">
            <p>This email was sent from the Increw Recruitment Platform. Please do not reply to this email.</p>
          </div>
        </div>
      `
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    
    console.log('Email sent successfully:', info.messageId);

    // Return success response
    return NextResponse.json({
      success: true,
      message: 'Email sent successfully',
      messageId: info.messageId
    });
    
  } catch (error) {
    console.error('Error sending email:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to send email', 
        error: error.message 
      }, 
      { status: 500 }
    );
  }
}