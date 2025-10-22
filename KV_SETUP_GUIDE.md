# Cloudflare KV Storage Setup Guide

## Overview
Your admin page now has the ability to save and recall generated job applications using Cloudflare KV storage. This guide will help you set up the KV namespace and configure your project.

## Step 1: Get Your KV Namespace ID

Since you've already created the KV namespace in the Cloudflare dashboard, you need to get the namespace ID:

1. Go to your Cloudflare dashboard
2. Navigate to Workers & Pages → KV
3. Find your `APPLICATION_KV` namespace
4. Copy the namespace ID

## Step 2: Update wrangler.jsonc

Replace the placeholder ID in your `wrangler.jsonc` file with your actual namespace ID:

```jsonc
"kv_namespaces": [
  {
    "binding": "APPLICATIONS_KV",
    "id": "your-actual-namespace-id"
  }
]
```

## Step 3: Set Admin PIN (if not already done)

Set your admin PIN as a secret:

```bash
wrangler secret put ADMIN_PIN
```

When prompted, enter your 4-digit PIN.

## Step 4: Deploy

Deploy your updated application:

```bash
npm run deploy
```

## Features Added

### Save Applications
- Fill out job details and generate content
- Enter a name for your application
- Click "Save" to store it in KV storage

### View Saved Applications
- Click "View Saved" in Quick Actions
- See all your saved applications with company, position, and date
- Load any saved application back into the form
- Delete applications you no longer need

### API Endpoints
- `POST /api/applications` - Save a new application
- `GET /api/applications` - List all saved applications
- `GET /api/applications/:id` - Get a specific application
- `DELETE /api/applications/:id` - Delete an application

## Data Structure

Each saved application includes:
- Unique ID
- Application name
- Job details (company, position, requirements, etc.)
- Generated content (cover letter, email, LinkedIn message)
- Creation and update timestamps

## Security

- Admin page is protected by PIN authentication
- Page is marked as `noindex, nofollow` to prevent search engine indexing
- All API endpoints require authentication through the admin interface

## Usage Tips

1. **Naming**: Use descriptive names like "Microsoft Senior Engineer - Jan 2025"
2. **Organization**: Applications are sorted by creation date (newest first)
3. **Backup**: KV storage is persistent, but consider exporting important applications
4. **Cleanup**: Regularly delete old applications to keep your list manageable

## Troubleshooting

If you encounter issues:

1. **KV not working**: Verify the namespace IDs in `wrangler.jsonc` are correct
2. **Authentication issues**: Check that `ADMIN_PIN` secret is set correctly
3. **API errors**: Check the browser console and Cloudflare Workers logs

## Next Steps

Consider adding:
- Export/import functionality for applications
- Search and filter capabilities
- Application templates
- Bulk operations
