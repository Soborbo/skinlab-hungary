/**
 * Review form API endpoint
 * POST /api/review
 *
 * Az /ertekeles/ oldal "írd meg nekünk" űrlapja. Szöveges (és opcionálisan
 * videós) véleményt fogad; a csapatnak e-mailben megy (Resend), a videó
 * mellékletként. Szándékosan NEM lead: nem megy a CRM-be, a Sheets-be és a
 * konverziókövetésbe sem.
 *
 * Videó: max. REVIEW_VIDEO_MAX_BYTES (a Resend 40 MB-os e-mail-korlátja és a
 * base64-többlet miatt). Nagyobb videóhoz az oldal linket vagy WhatsAppot kínál.
 */
import type { APIRoute } from 'astro';
import { readEnv } from '@/lib/env';
import { verifyTurnstile } from '@/lib/forms/turnstile';
import { isFormRateLimited, recordFormSubmission } from '@/lib/forms/rate-limit';
import { errorResponse } from '@/lib/errors/respond';

export const prerender = false;

const REVIEW_VIDEO_MAX_BYTES = 25 * 1024 * 1024;

export const GET: APIRoute = async () => {
  return errorResponse('FORM-METHOD-001', {
    userMessage: 'Ez a végpont csak POST kéréseket fogad (értékelés beküldés).',
    context: { endpoint: '/api/review', method: 'GET' },
    extraHeaders: { Allow: 'POST' },
  });
};

const str = (v: FormDataEntryValue | null, max: number) =>
  typeof v === 'string' ? v.trim().slice(0, max) : '';

const escapeHtml = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function toBase64(buf: ArrayBuffer): string {
  const bytes = new Uint8Array(buf);
  let binary = '';
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunk));
  }
  return btoa(binary);
}

export const POST: APIRoute = async ({ request, clientAddress }) => {
  try {
    if (isFormRateLimited(clientAddress, 'review')) {
      return errorResponse('HTTP-429-001', {
        userMessage: 'Túl sok beküldés érkezett erről a címről. Kérjük, próbáld újra később.',
        context: { endpoint: '/api/review', ip: clientAddress },
        extraHeaders: { 'Retry-After': '3600' },
      });
    }

    const form = await request.formData();

    // Honeypot: csendes hamis siker.
    if (str(form.get('website'), 200)) {
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const name = str(form.get('name'), 120);
    const salon = str(form.get('salon'), 160);
    const email = str(form.get('email'), 200);
    const rating = Math.min(5, Math.max(0, parseInt(str(form.get('rating'), 2), 10) || 0));
    const message = str(form.get('message'), 5000);
    const videoLink = str(form.get('videoLink'), 500);
    const publishConsent = form.get('publishConsent') === 'true';
    const gdprConsent = form.get('gdprConsent') === 'true';
    const video = form.get('video');
    const hasVideo = video instanceof File && video.size > 0;

    const errors: Record<string, string[]> = {};
    if (name.length < 2) errors.name = ['Kérjük, add meg a neved.'];
    if (!message && !hasVideo && !videoLink) errors.message = ['Írj pár sort, vagy csatolj videót.'];
    if (videoLink && !/^https?:\/\//i.test(videoLink)) errors.videoLink = ['A videó linkje http(s)://-sel kezdődjön.'];
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = ['Érvénytelen e-mail-cím.'];
    if (!gdprConsent) errors.gdprConsent = ['Az adatkezelési tájékoztató elfogadása kötelező.'];
    if (hasVideo) {
      if (!video.type.startsWith('video/')) errors.video = ['Csak videófájl csatolható.'];
      else if (video.size > REVIEW_VIDEO_MAX_BYTES) errors.video = ['A videó túl nagy (max. 25 MB). Küldd el linkként vagy WhatsAppon.'];
    }
    if (Object.keys(errors).length > 0) {
      return errorResponse('FORM-ZOD-002', {
        userMessage: 'Kérjük, ellenőrizd a megadott adatokat.',
        errors,
        context: { formId: 'review', fieldName: Object.keys(errors).join(',') },
      });
    }

    const turnstileResult = await verifyTurnstile(str(form.get('cf-turnstile-response'), 4096), clientAddress);
    if (!turnstileResult.success) {
      return errorResponse('TURN-VERIFY-001', {
        userMessage: 'CAPTCHA ellenőrzés sikertelen - kérjük, végezd el újra.',
        errors: { 'cf-turnstile-response': ['CAPTCHA ellenőrzés sikertelen'] },
        context: { formId: 'review', errorCodes: turnstileResult.error ?? '' },
      });
    }

    const resendApiKey = readEnv('RESEND_API_KEY');
    const notifyEmail = readEnv('NOTIFY_EMAIL') || 'hello@skinlabhungary.hu';
    if (!resendApiKey) throw new Error('RESEND_API_KEY not configured');

    const stars = rating ? '★'.repeat(rating) + '☆'.repeat(5 - rating) : '–';
    const row = (k: string, v: string) =>
      `<tr><td style="padding:6px 12px 6px 0;color:#666;vertical-align:top">${k}</td><td style="padding:6px 0">${v}</td></tr>`;
    const html = `
      <h2 style="font-family:Arial,sans-serif;color:#ce2252">Új vélemény érkezett az /ertekeles/ oldalról</h2>
      <table style="font-family:Arial,sans-serif;font-size:14px;border-collapse:collapse">
        ${row('Név', escapeHtml(name))}
        ${row('Szalon', escapeHtml(salon) || '–')}
        ${row('E-mail', escapeHtml(email) || '–')}
        ${row('Értékelés', stars)}
        ${row('Vélemény', escapeHtml(message).replace(/\n/g, '<br>') || '–')}
        ${row('Videó', hasVideo ? `csatolva (${escapeHtml(video.name)}, ${(video.size / 1048576).toFixed(1)} MB)` : videoLink ? `<a href="${escapeHtml(videoLink)}">${escapeHtml(videoLink)}</a>` : '–')}
        ${row('Megjelentethető a weboldalon', publishConsent ? '<b>IGEN</b> (névvel)' : 'nem')}
      </table>`;

    const body: Record<string, unknown> = {
      from: 'Skinlab Forms <forms@skinlabhungary.hu>',
      to: [notifyEmail],
      subject: `Új vélemény: ${name}${rating ? ` (${rating}★)` : ''}${hasVideo || videoLink ? ' + videó' : ''}`,
      html,
    };
    if (email) body.reply_to = email;
    if (hasVideo) {
      body.attachments = [{ filename: video.name || 'velemeny-video.mp4', content: toBase64(await video.arrayBuffer()) }];
    }

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${resendApiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      throw new Error(`Resend ${response.status}: ${(await response.text()).slice(0, 300)}`);
    }

    recordFormSubmission(clientAddress, 'review');
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error('Review form error:', error);
    return errorResponse('FORM-SUBMIT-001', {
      userMessage: 'Váratlan hiba történt a beküldés közben. Kérjük, próbáld újra később, vagy írj nekünk e-mailt.',
      context: { formId: 'review', errorMessage: message },
    });
  }
};
