# API Contracts

This directory contains OpenAPI specifications for all API endpoints in the EKOI corporate website.

## Files

### contact-api.yaml

OpenAPI 3.0 specification for the contact form submission endpoint.

**Endpoint:** `POST /api/contact`

**Purpose:** Handle contact form submissions with bot prevention and Slack integration

**Key Features:**
- Multi-layer bot prevention (honeypot, reCAPTCHA v3, rate limiting)
- Input validation with detailed error messages
- Slack webhook notification
- Localized responses (EN/JA)

**Security Measures:**
1. **Honeypot Field:** Hidden field that bots typically fill
2. **reCAPTCHA v3:** Invisible bot detection with score-based validation
3. **Rate Limiting:** Max 5 submissions per IP per hour
4. **Input Sanitization:** All inputs validated and sanitized

## Usage

### Viewing the Specification

You can view the OpenAPI specification using:

1. **Swagger UI:**
   ```bash
   npx @apidevtools/swagger-cli serve contracts/contact-api.yaml
   ```

2. **Online Viewer:**
   - Visit https://editor.swagger.io/
   - Copy/paste the YAML content

3. **VS Code Extension:**
   - Install "OpenAPI (Swagger) Editor" extension
   - Open the YAML file

### Generating Client Code

If needed, you can generate client code:

```bash
# Install OpenAPI Generator
npm install @openapitools/openapi-generator-cli -g

# Generate TypeScript client
openapi-generator-cli generate \
  -i contracts/contact-api.yaml \
  -g typescript-fetch \
  -o src/generated/contact-api
```

### Validation

Validate the OpenAPI spec:

```bash
npx @apidevtools/swagger-cli validate contracts/contact-api.yaml
```

## Implementation Reference

### Server Action Implementation

```typescript
// app/api/contact/route.ts
import {NextRequest, NextResponse} from 'next/server';
import {z} from 'zod';
import {contactFormSchema} from '@/lib/validations';
import {sendSlackNotification} from '@/lib/slack';
import {verifyRecaptcha} from '@/lib/recaptcha';
import {checkRateLimit} from '@/lib/rate-limit';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // 1. Honeypot check
    if (body.website) {
      return NextResponse.json(
        {success: false, error: 'Invalid submission'},
        {status: 400}
      );
    }
    
    // 2. Validate input
    const data = contactFormSchema.parse(body);
    
    // 3. reCAPTCHA verification
    const recaptchaValid = await verifyRecaptcha(body.recaptchaToken);
    if (!recaptchaValid) {
      return NextResponse.json(
        {success: false, error: 'Security verification failed'},
        {status: 403}
      );
    }
    
    // 4. Rate limiting
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    if (checkRateLimit(ip)) {
      return NextResponse.json(
        {success: false, error: 'Too many submissions'},
        {status: 429}
      );
    }
    
    // 5. Send to Slack
    const slackSuccess = await sendSlackNotification(data);
    if (!slackSuccess) {
      console.error('Failed to send Slack notification');
      // Continue anyway - don't fail user submission
    }
    
    // 6. Return success
    return NextResponse.json({
      success: true,
      message: data.language === 'ja'
        ? 'お問い合わせありがとうございます。24時間以内にご返信いたします。'
        : "Thank you for contacting us. We'll respond within 24 hours.",
    });
    
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation failed',
          details: error.errors.map(e => ({
            field: e.path.join('.'),
            message: e.message,
          })),
        },
        {status: 400}
      );
    }
    
    console.error('Contact form error:', error);
    return NextResponse.json(
      {success: false, error: 'Internal server error'},
      {status: 500}
    );
  }
}
```

### Client Implementation

```typescript
// components/forms/ContactForm.tsx
'use client';

import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {contactFormSchema} from '@/lib/validations';
import {useToast} from '@/components/ui/use-toast';

export function ContactForm() {
  const {toast} = useToast();
  const {register, handleSubmit, formState: {errors, isSubmitting}} = useForm({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data) => {
    try {
      // Get reCAPTCHA token
      const token = await window.grecaptcha.execute(
        process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
        {action: 'submit'}
      );

      // Submit form
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          ...data,
          recaptchaToken: token,
          language: 'en', // or get from context
        }),
      });

      const result = await response.json();

      if (result.success) {
        toast({
          title: 'Success',
          description: result.message,
        });
        // Reset form
      } else {
        toast({
          title: 'Error',
          description: result.error,
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to submit form. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Form fields */}
    </form>
  );
}
```

## Testing

### Manual Testing

Use curl or a tool like Postman:

```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "company": "Test Company",
    "inquiryType": "product",
    "message": "This is a test message",
    "language": "en",
    "recaptchaToken": "test_token"
  }'
```

### Automated Testing

```typescript
// __tests__/api/contact.test.ts
import {POST} from '@/app/api/contact/route';
import {NextRequest} from 'next/server';

describe('POST /api/contact', () => {
  it('should reject submission with honeypot filled', async () => {
    const request = new NextRequest('http://localhost/api/contact', {
      method: 'POST',
      body: JSON.stringify({
        name: 'Bot',
        email: 'bot@spam.com',
        website: 'http://spam.com', // Honeypot
        // ... other fields
      }),
    });

    const response = await POST(request);
    expect(response.status).toBe(400);
  });

  it('should accept valid submission', async () => {
    const request = new NextRequest('http://localhost/api/contact', {
      method: 'POST',
      body: JSON.stringify({
        name: 'Valid User',
        email: 'user@example.com',
        company: 'Test Co',
        inquiryType: 'product',
        message: 'Valid message here',
        language: 'en',
        recaptchaToken: 'valid_token',
      }),
    });

    const response = await POST(request);
    expect(response.status).toBe(200);
  });
});
```

## Slack Webhook Payload

The Slack notification uses Block Kit format:

```json
{
  "blocks": [
    {
      "type": "header",
      "text": {
        "type": "plain_text",
        "text": "🔔 New Contact Form Submission"
      }
    },
    {
      "type": "section",
      "fields": [
        {"type": "mrkdwn", "text": "*Name:*\nTaro Yamada"},
        {"type": "mrkdwn", "text": "*Email:*\ntaro.yamada@company.co.jp"},
        {"type": "mrkdwn", "text": "*Company:*\nTech Innovations Inc"},
        {"type": "mrkdwn", "text": "*Type:*\nproduct"}
      ]
    },
    {
      "type": "section",
      "text": {
        "type": "mrkdwn",
        "text": "*Message:*\nI'm interested in the H100 8-GPU server..."
      }
    }
  ]
}
```

## Environment Variables Required

```bash
# reCAPTCHA
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_site_key_here
RECAPTCHA_SECRET_KEY=your_secret_key_here

# Slack
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/YOUR/WEBHOOK/URL
```

## Rate Limiting

- **Limit:** 5 submissions per IP per hour
- **Storage:** In-memory Map (single instance) or Vercel KV for production
- **Reset:** Automatic after 1 hour
- **Response:** 429 Too Many Requests

## Security Considerations

1. **Input Validation:** All inputs validated with Zod schemas
2. **Sanitization:** HTML entities escaped, no script injection
3. **Rate Limiting:** Prevents abuse
4. **reCAPTCHA:** Bot prevention
5. **Honeypot:** Catches simple bots
6. **HTTPS Only:** Enforced by Vercel
7. **CORS:** Configured for same-origin only
8. **No Sensitive Data Storage:** Submissions go directly to Slack

## Monitoring

Monitor these metrics:
- Submission success rate
- Bot prevention trigger rate
- Slack notification success rate
- Response times
- Error rates

Set up alerts for:
- Error rate > 5%
- Slack notification failures
- Unusual submission patterns

