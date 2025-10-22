# Cloudflare Email Routing Setup Guide

This guide will help you set up Cloudflare Email Routing for your contact form to send emails to `jobs@suwityarat.com`.

## Prerequisites

- Cloudflare account with `suwityarat.me` domain
- Domain must be using Cloudflare as authoritative nameserver
- Access to Cloudflare dashboard

## Step 1: Enable Email Routing

1. **Log into Cloudflare Dashboard**
   - Go to [dash.cloudflare.com](https://dash.cloudflare.com)
   - Select your `suwityarat.me` domain

2. **Navigate to Email Routing**
   - In the left sidebar, click **"Email"** → **"Email Routing"**
   - Click **"Get Started"** if not already enabled

3. **Configure Email Routing**
   - Cloudflare will automatically configure DNS records
   - Set up your destination email: `jobs@suwityarat.com`
   - Verify the setup is working

## Step 2: Create Email Worker

1. **Create the Email Worker**
   ```bash
   npx wrangler create email-consumer-worker
   cd email-consumer-worker
   ```

2. **Copy the Email Consumer Code**
   - Copy the contents of `workers/email-consumer.ts` to your new worker
   - Update the worker's `wrangler.toml` with the queue configuration:
   ```toml
   [[queues.consumers]]
   queue = "suwityaratme"
   max_batch_size = 10
   max_batch_timeout = 30
   ```

3. **Deploy the Email Worker**
   ```bash
   npx wrangler deploy
   ```

## Step 3: Configure Queue

✅ **Queue Already Exists**
   - Your existing queue `suwityaratme` (ID: 8771cd59f0f04795ba5f087bf5d55c25) is already configured
   - The queue configuration in `wrangler.jsonc` has been updated to use your existing queue

## Step 4: Deploy Main Application

1. **Deploy the updated application**
   ```bash
   npm run deploy
   ```

2. **Verify Queue Binding**
   - Check that the queue is properly bound in your worker
   - Monitor the queue in Cloudflare dashboard

## Step 5: Test the Contact Form

1. **Test Modal Form**
   - Visit any page on your site
   - Click the floating contact button (bottom right)
   - Fill out and submit the form

2. **Test Contact Page Form**
   - Visit `/contact` page
   - Click "Open Contact Form" button
   - Fill out and submit the form

3. **Check Email Delivery**
   - Check `jobs@suwityarat.com` for the test email
   - Verify the email contains all form data

## Troubleshooting

### Email Not Received
- Check Cloudflare Email Routing is enabled
- Verify DNS records are properly configured
- Check worker logs in Cloudflare dashboard
- Ensure queue is processing messages

### Queue Not Processing
- Verify queue consumer is deployed
- Check queue binding in wrangler.jsonc
- Monitor queue metrics in dashboard

### Form Submission Errors
- Check browser console for JavaScript errors
- Verify API endpoint is accessible
- Check worker logs for processing errors

## Email Format

The contact form will send emails with this format:

```
Subject: Contact Form Submission

New Contact Form Submission

From: [Name]
Email: [email@example.com]
Subject: [Optional subject]
Source: Website Modal / Contact Page
Submitted: [timestamp]
IP: [user IP]

Message:
[User's message]

---
This message was sent via the contact form on suwityarat.me
User Agent: [browser info]
```

## Security Features

- **Input Validation**: All form fields are validated and sanitized
- **Rate Limiting**: Queue processing prevents spam
- **IP Tracking**: User IP is logged for security
- **User Agent Tracking**: Browser information is captured
- **Source Tracking**: Distinguishes between modal and page submissions

## Monitoring

- **Queue Metrics**: Monitor in Cloudflare dashboard
- **Email Delivery**: Check destination email regularly
- **Worker Logs**: Review logs for any processing issues
- **Analytics**: Form submissions are tracked in your analytics system

## Next Steps

After successful setup:
1. Monitor email delivery for a few days
2. Set up email filters/rules in your email client
3. Consider adding auto-reply functionality
4. Monitor queue performance and adjust batch settings if needed
