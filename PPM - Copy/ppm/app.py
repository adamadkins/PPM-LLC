import os
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.application import MIMEApplication
from flask import Flask, render_template, request, jsonify
from werkzeug.utils import secure_filename

app = Flask(__name__)

UPLOAD_FOLDER = 'uploads'

# Configure email settings
EMAIL_ADDRESS = 'adkins.adam04@gmail.com'
EMAIL_PASSWORD = 'fjro wqqk tbak mevb'


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/submit_quote', methods=['POST'])
def submit_quote():
    name = request.form['name']
    email = request.form['email']
    message = request.form['message']
    image = request.files['image']

    # Validate form fields
    if not (name and email and message):
        return jsonify({'message': 'Please fill in all required fields.'}), 400

    # Send email with the form data
    try:
        # Create an SMTP object for sending the email
        smtp = smtplib.SMTP('smtp.gmail.com', 587)  # Replace with your SMTP server and port
        smtp.starttls()
        smtp.login(EMAIL_ADDRESS, EMAIL_PASSWORD)

        # Compose the email
        msg = MIMEMultipart()
        msg['From'] = EMAIL_ADDRESS
        msg['To'] = EMAIL_ADDRESS  # Send the email to your business email address
        msg['Subject'] = 'New Quote Request'

        msg.attach(MIMEText(f'Name: {name}\nEmail: {email}\nMessage: {message}'))

        if image:
            filename = secure_filename(image.filename)
            image_path = os.path.join(UPLOAD_FOLDER, filename)
            image.save(image_path)
            with open(image_path, "rb") as attachment:
                part = MIMEApplication(attachment.read(), Name=filename)
                part['Content-Disposition'] = f'attachment; filename="{filename}"'
                msg.attach(part)

        # Send the email
        smtp.sendmail(EMAIL_ADDRESS, EMAIL_ADDRESS, msg.as_string())
        smtp.quit()

        return jsonify({'message': 'Quote submitted successfully'}), 200

    except smtplib.SMTPException as e:
        # Handle SMTP-related errors
        return jsonify({'message': f'An error occurred while sending the email: {str(e)}'}), 500
    except Exception as e:
        # Handle other exceptions
        return jsonify({'message': f'An error occurred: {str(e)}'}), 500


if __name__ == '__main__':
    app.run(debug=True)
