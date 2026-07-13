// src/services/botmaker.js
// Serviço responsável por acionar a Botmaker via trigger-intent
// após a aprovação da vistoria na webview.

const BOTMAKER_TOKEN = process.env.BOTMAKER_TOKEN;
const INTENT_NAME    = process.env.INTENT_NAME || 'iniciar_cobranca_zurich';
const API_URL        = 'https://api.botmaker.com/v2.0/chats-actions/trigger-intent';

/**
 * Dispara a intent no bot da Botmaker para retomar a conversa
 * com o cliente após a vistoria ser aprovada.
 *
 * @param {Object} params
 * @param {string} params.cid         contactId (telefone com DDI, ex: 5511999999999)
 * @param {string} params.ch          channelId do canal WhatsApp na Botmaker
 * @param {Object} params.variables   variáveis a serem populadas no bot (todas viram string)
 * @returns {Promise<{ok: boolean, status: number, error?: string}>}
 */
export async function triggerIntent({ cid, ch, variables = {} }) {
  if (!BOTMAKER_TOKEN) {
    return { ok: false, status: 500, error: 'BOTMAKER_TOKEN não configurado' };
  }
  if (!cid || !ch) {
    return { ok: false, status: 400, error: 'cid ou ch ausentes' };
  }

  // Botmaker exige que todas as variáveis sejam strings
  const vars = {};
  for (const [key, value] of Object.entries(variables)) {
    vars[key] = String(value ?? '');
  }

  const body = {
    chat: { channelId: ch, contactId: cid },
    intentIdOrName: INTENT_NAME,
    variables: vars
  };

  try {
    const r = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'access-token': BOTMAKER_TOKEN
      },
      body: JSON.stringify(body)
    });

    if (r.status === 202) {
      return { ok: true, status: 202 };
    }

    const text = await r.text();
    console.error('[botmaker] trigger-intent falhou', r.status, text);
    return { ok: false, status: r.status, error: text };
  } catch (e) {
    console.error('[botmaker] erro na chamada trigger-intent:', e);
    return { ok: false, status: 500, error: e.message };
  }
}
