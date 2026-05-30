import os
import logging
from typing import Dict
from resend import Resend

logger = logging.getLogger(__name__)

RESEND_API_KEY = os.getenv("RESEND_API_KEY", "")
SENDER_EMAIL = os.getenv("SENDER_EMAIL", "no-reply@dcxsecuritywizards.com")
COMPANY_NAME = os.getenv("COMPANY_NAME", "DCX Security Wizards")
COMPANY_PHONE = os.getenv("COMPANY_PHONE", "09971795961")
COMPANY_WHATSAPP = os.getenv("COMPANY_WHATSAPP", "919971795961")
WEBSITE_URL = os.getenv("WEBSITE_URL", "https://www.dcxsecuritywizards.com")
OWNER_EMAIL = os.getenv("OWNER_EMAIL", "owner@dcxsecuritywizards.com")

client = Resend(api_key=RESEND_API_KEY)


def _build_owner_email_html(payload: Dict[str, str]) -> str:
    return f"""
    <html>
      <body style="margin:0;padding:0;background:#020712;color:#e6f7ff;font-family:Inter,system-ui,sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
          <tr>
            <td align="center" style="padding:32px 16px;">
              <table width="600" cellpadding="0" cellspacing="0" style="background:#07121f;border-radius:24px;overflow:hidden;box-shadow:0 24px 80px rgba(0,0,0,0.25);">
                <tr>
                  <td style="padding:32px 40px;">
                    <h1 style="margin:0;font-size:24px;color:#00d9ff;">New Contact Inquiry - {COMPANY_NAME}</h1>
                    <p style="color:#94a3b8;font-size:14px;line-height:24px;margin:12px 0 24px;">
                      A new contact request arrived from your website.
                    </p>
                    <table width="100%" cellpadding="0" cellspacing="0" style="color:#f8fafc;font-size:14px;line-height:24px;">
                      <tr><td style="padding:8px 0;"><strong>Full Name:</strong></td><td style="padding:8px 0;">{payload['full_name']}</td></tr>
                      <tr><td style="padding:8px 0;"><strong>Phone:</strong></td><td style="padding:8px 0;">{payload['phone']}</td></tr>
                      <tr><td style="padding:8px 0;"><strong>Email:</strong></td><td style="padding:8px 0;">{payload['email']}</td></tr>
                      <tr><td style="padding:8px 0;"><strong>Request Type:</strong></td><td style="padding:8px 0;">{payload['request_type']}</td></tr>
                      <tr><td style="padding:8px 0;"><strong>Message:</strong></td><td style="padding:8px 0;">{payload['message']}</td></tr>
                      <tr><td style="padding:8px 0;"><strong>Submitted:</strong></td><td style="padding:8px 0;">{payload['created_at']}</td></tr>
                    </table>
                    <div style="margin-top:28px;display:flex;gap:12px;flex-wrap:wrap;">
                      <a href="tel:{payload['phone']}" style="display:inline-block;padding:12px 20px;border-radius:999px;background:#00d9ff;color:#04111a;text-decoration:none;font-weight:700;">Call Customer</a>
                      <a href="mailto:{payload['email']}" style="display:inline-block;padding:12px 20px;border-radius:999px;border:1px solid rgba(0,217,255,0.16);color:#e6f7ff;text-decoration:none;font-weight:700;">Reply Email</a>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
    """


def _build_user_email_html(payload: Dict[str, str]) -> str:
    return f"""
    <html>
      <body style="margin:0;padding:0;background:#020712;color:#f8fafc;font-family:Inter,system-ui,sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
          <tr>
            <td align="center" style="padding:32px 16px;">
              <table width="600" cellpadding="0" cellspacing="0" style="background:#07121f;border-radius:24px;overflow:hidden;box-shadow:0 24px 80px rgba(0,0,0,0.25);">
                <tr>
                  <td style="padding:32px 40px;text-align:center;">
                    <img src="https://assets.emergent.sh/dcx-logo-white.png" alt="{COMPANY_NAME}" width="120" style="margin-bottom:24px;" />
                    <h1 style="margin:0;font-size:28px;color:#ffffff;">Thank you for contacting {COMPANY_NAME}</h1>
                    <p style="margin:16px auto 24px;max-width:460px;color:#94a3b8;font-size:15px;line-height:26px;">
                      We have received your request and our team will reach out shortly to discuss your security requirements.
                    </p>
                    <div style="padding:20px 24px;border-radius:20px;background:rgba(0,217,255,0.08);border:1px solid rgba(0,217,255,0.12);text-align:left;">
                      <p style="margin:0 0 10px;color:#cbd5e1;font-size:14px;">Your request summary:</p>
                      <p style="margin:0;font-size:14px;color:#e2e8f0;"><strong>Name:</strong> {payload['full_name']}</p>
                      <p style="margin:6px 0 0;font-size:14px;color:#e2e8f0;"><strong>Request:</strong> {payload['request_type']}</p>
                    </div>
                    <div style="margin-top:28px;display:flex;justify-content:center;gap:12px;flex-wrap:wrap;">
                      <a href="tel:{COMPANY_PHONE}" style="display:inline-block;padding:12px 20px;border-radius:999px;background:#00d9ff;color:#04111a;text-decoration:none;font-weight:700;">Call {COMPANY_PHONE}</a>
                      <a href="https://wa.me/{COMPANY_WHATSAPP}" style="display:inline-block;padding:12px 20px;border-radius:999px;border:1px solid rgba(0,217,255,0.16);color:#e6f7ff;text-decoration:none;font-weight:700;">WhatsApp Support</a>
                    </div>
                    <p style="margin:24px 0 0;color:#94a3b8;font-size:13px;line-height:22px;">
                      For fast support, visit <a href="{WEBSITE_URL}" style="color:#00d9ff;text-decoration:none;">{WEBSITE_URL}</a>.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
    """


def send_owner_notification(payload: Dict[str, str]) -> None:
    try:
        client.emails.send(
            from_=SENDER_EMAIL,
            to=[OWNER_EMAIL],
            subject="New Contact Inquiry - DCX Security Wizards",
            html=_build_owner_email_html(payload),
        )
        logger.info("Owner notification email sent")
    except Exception as exc:
        logger.error(f"Failed to send owner notification: {exc}")


def send_user_confirmation(payload: Dict[str, str]) -> None:
    try:
        client.emails.send(
            from_=SENDER_EMAIL,
            to=[payload["email"]],
            subject="Your Request Has Been Received | DCX Security Wizards",
            html=_build_user_email_html(payload),
        )
        logger.info("User confirmation email sent")
    except Exception as exc:
        logger.error(f"Failed to send user confirmation email: {exc}")
