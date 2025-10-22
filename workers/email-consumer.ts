import { EmailMessage } from 'cloudflare:email';

interface ContactMessage {
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: string;
  source: string;
  ip: string;
  userAgent: string;
}

export default {
  async queue(batch: MessageBatch<ContactMessage>, env: any, ctx: ExecutionContext): Promise<void> {
    console.log(`Processing ${batch.messages.length} contact form messages`);
    
    for (const message of batch.messages) {
      try {
        const contactData = message.body;
        
        // Create email content
        const emailContent = createEmailContent(contactData);
        
        // Create EmailMessage
        const emailMessage = new EmailMessage(
          'noreply@suwityarat.me', // From address (must be your domain)
          'jobs@suwityarat.com',   // To address
          emailContent
        );
        
        // Send email using Email Routing
        await env.SEND_EMAIL.send(emailMessage);
        
        console.log(`Email sent successfully for contact from ${contactData.name} (${contactData.email})`);
        
        // Acknowledge the message
        message.ack();
        
      } catch (error) {
        console.error(`Failed to send email for message ${message.id}:`, error);
        
        // Retry the message (will be retried according to queue settings)
        message.retry();
      }
    }
  }
};

function createEmailContent(contactData: ContactMessage): string {
  const timestamp = new Date(contactData.timestamp).toLocaleString('en-US', {
    timeZone: 'America/New_York',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
  
  return `New Contact Form Submission

From: ${contactData.name}
Email: ${contactData.email}
Subject: ${contactData.subject}
Source: ${contactData.source === 'modal' ? 'Website Modal' : 'Contact Page'}
Submitted: ${timestamp}
IP: ${contactData.ip}

Message:
${contactData.message}

---
This message was sent via the contact form on suwityarat.me
User Agent: ${contactData.userAgent}`;
}
