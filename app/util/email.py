from flask import current_app
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail, Email, To, Content
from app import sg

def send_contact_form_email(form_data):
    """
    Send contact form submission via SendGrid
    """
    try:
        if sg is None:
            raise Exception("SendGrid client not initialized")

        # Use a simple Mail construction with minimal parameters
        message = Mail(
            from_email=Email(
                email='kira@kirajiaevents.com',  # Update this to your verified sender
                name='Kira Jia Weddings'
            ),
            to_emails='kira@kirajiaevents.com',
            subject=f'New Wedding Inquiry from {form_data.get("firstName")} {form_data.get("lastName")}',
            plain_text_content=f"""
            New Wedding Inquiry

            Name: {form_data.get('firstName', '')} {form_data.get('lastName', '')}
            Email: {form_data.get('email', '')}
            Phone: {form_data.get('phone', 'Not provided')}
            Wedding Date: {form_data.get('weddingDate', 'Not specified')}
            
            Vision:
            {form_data.get('vision', '')}
            """
        )

        # Add detailed logging
        current_app.logger.info(f"Attempting to send email using SendGrid")
        current_app.logger.info(f"Using API key ending in: ...{current_app.config['SENDGRID_API_KEY'][-4:]}")
        
        # Send email
        response = sg.send(message)
        
        # Log response details
        current_app.logger.info(f"SendGrid response status code: {response.status_code}")
        
        if response.status_code >= 200 and response.status_code < 300:
            current_app.logger.info('Contact form email sent successfully')
            return True
        else:
            raise Exception(f"SendGrid API returned status code {response.status_code}")

    except Exception as e:
        current_app.logger.error(f'Failed to send contact form email: {str(e)}')
        # Add more detailed error logging
        import traceback
        current_app.logger.error(f'Error details: {traceback.format_exc()}')
        return False