// api/invite.js — Invia email di invito al prospect (via Resend)

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { Resend }       = require('resend');
    const { createClient } = require('@supabase/supabase-js');

    const resend   = new Resend(process.env.RESEND_API_KEY);
    const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);

    const { prospect_id } = req.body || {};
    if (!prospect_id) return res.status(400).json({ error: 'prospect_id obbligatorio' });

    const { data: prospect, error } = await supabase
      .from('prospects')
      .select('*')
      .eq('id', prospect_id)
      .single();

    if (error || !prospect) return res.status(404).json({ error: 'Prospect non trovato', detail: error?.message });
    if (!prospect.email)    return res.status(400).json({ error: 'Prospect senza email' });

    const inviteUrl   = `https://levacso.vercel.app/invite.html?token=${prospect.invite_token}`;
    const pianoLabel  = prospect.piano === 'guided_pro' ? 'Guided Pro — €599/mese' : 'Guided Base — €399/mese';
    const pianoColor  = prospect.piano === 'guided_pro' ? '#FF6B2B' : '#3D5AFE';
    const nomeAzienda = prospect.azienda || prospect.nome || 'la tua azienda';
    const nomePersona = prospect.referente ? prospect.referente.split(' ')[0] : (prospect.nome || '');

    const html = `<!DOCTYPE html>
<html lang="it">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#F0F1F5;">
  <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:560px;margin:0 auto;padding:40px 20px;">
    <div style="text-align:center;margin-bottom:32px;">
      <span style="font-size:28px;font-weight:700;color:#1a1a2e;letter-spacing:-0.5px;"><span style="color:#3D5AFE;">L</span>eva</span>
    </div>
    <div style="background:#ffffff;border-radius:20px;padding:36px 32px;box-shadow:0 2px 16px rgba(0,0,0,0.07);margin-bottom:16px;">
      <h1 style="font-size:22px;color:#1a1a2e;margin:0 0 8px;font-weight:700;">Ciao ${nomePersona},</h1>
      <p style="font-size:15px;color:#6B6B80;line-height:1.6;margin:0 0 28px;">
        Un consulente commerciale ha preparato un percorso su misura per <strong style="color:#1a1a2e;">${nomeAzienda}</strong>.
      </p>
      <div style="background:#F8F8FB;border-radius:14px;padding:20px 24px;margin-bottom:28px;border-left:4px solid ${pianoColor};">
        <div style="font-size:11px;font-weight:600;letter-spacing:.6px;text-transform:uppercase;color:${pianoColor};margin-bottom:6px;">Il tuo piano</div>
        <div style="font-size:20px;font-weight:700;color:#1a1a2e;">${pianoLabel}</div>
      </div>
      <div style="text-align:center;margin-bottom:28px;">
        <a href="${inviteUrl}" style="display:inline-block;background:#3D5AFE;color:#ffffff;text-decoration:none;font-size:15px;font-weight:600;padding:14px 36px;border-radius:12px;">
          Accedi alla tua dashboard →
        </a>
      </div>
      <p style="font-size:13px;color:#9B9BAA;line-height:1.6;margin:0;">
        Se il bottone non funziona, copia questo link:<br>
        <a href="${inviteUrl}" style="color:#3D5AFE;word-break:break-all;">${inviteUrl}</a>
      </p>
    </div>
    <div style="text-align:center;padding:0 16px;">
      <p style="font-size:12px;color:#B0B0BF;line-height:1.6;margin:0;">
        Hai ricevuto questa email perché un consulente Leva ha avviato un percorso per la tua azienda.<br>
        Se non ti aspettavi questa email, ignorala.
      </p>
    </div>
  </div>
</body>
</html>`;

    const { error: emailError } = await resend.emails.send({
      from:    'Leva <onboarding@resend.dev>',
      to:      prospect.email,
      subject: `${nomePersona}, il tuo piano commerciale è pronto`,
      html,
    });

    if (emailError) {
      return res.status(502).json({ error: 'Errore invio email', detail: emailError.message });
    }

    await supabase
      .from('prospects')
      .update({ invite_sent_at: new Date().toISOString() })
      .eq('id', prospect_id);

    return res.status(200).json({ ok: true });

  } catch (err) {
    return res.status(500).json({
      error: err.message,
      stack: err.stack,
      env_check: {
        has_supabase_url: !!process.env.SUPABASE_URL,
        has_supabase_key: !!process.env.SUPABASE_SERVICE_KEY,
        has_resend_key:   !!process.env.RESEND_API_KEY,
      }
    });
  }
};
