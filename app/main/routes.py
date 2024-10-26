from flask import jsonify, request, current_app, render_template
from app.main import bp
from app.util.email import send_contact_form_email

@bp.route('/index', methods=['GET'])
@bp.route('/', methods=['GET'])
def index():
    return render_template('index.html')

@bp.route('/submit_contact', methods=['POST'])
def submit_contact():
    try:
        data = request.get_json()
        if not data:
            raise ValueError("No form data received")
            
        # Log the incoming request
        current_app.logger.info(f"Received contact form submission for {data.get('firstName')} {data.get('lastName')}")
        
        if send_contact_form_email(data):
            return jsonify({
                "success": True,
                "message": "Thank you for your message. We'll be in touch soon!"
            }), 200
        else:
            raise Exception("Failed to send email")
            
    except Exception as e:
        current_app.logger.error(f"Contact form submission error: {str(e)}")
        return jsonify({
            "success": False,
            "message": "There was an error submitting your message. Please try again later."
        }), 500