<template>
  <div class="email-test-container">
    <h1>Email Test Page</h1>
    <p>Use this page to set up EmailJS and send a test email to felix.seeger@taktzeit.com</p>
    
    <div class="setup-instructions">
      <h2>Setup Instructions</h2>
      <ol>
        <li>
          <a href="https://www.emailjs.com/docs/sdk/installation/" target="_blank">Sign up for EmailJS</a> (it's free for up to 200 emails per month)
        </li>
        <li>Create a new service (e.g., Gmail, Outlook, or custom SMTP)</li>
        <li>Create a new email template</li>
        <li>Get your EmailJS public key from the dashboard</li>
        <li>Enter your EmailJS credentials below</li>
      </ol>
    </div>
    
    <div class="email-form">
      <h2>Send Test Email</h2>
      <div class="form-group">
        <label for="serviceId">EmailJS Service ID:</label>
        <input type="text" id="serviceId" v-model="serviceId" placeholder="e.g., service_xxxxxxx">
      </div>
      
      <div class="form-group">
        <label for="templateId">EmailJS Template ID:</label>
        <input type="text" id="templateId" v-model="templateId" placeholder="e.g., template_xxxxxxx">
      </div>
      
      <div class="form-group">
        <label for="publicKey">EmailJS Public Key:</label>
        <input type="text" id="publicKey" v-model="publicKey" placeholder="e.g., xxxxxxxxxxxxxxxx">
      </div>
      
      <div class="form-group">
        <label for="testName">Your Name:</label>
        <input type="text" id="testName" v-model="testName" placeholder="Your Name">
      </div>
      
      <div class="form-group">
        <label for="testEmail">Your Email:</label>
        <input type="email" id="testEmail" v-model="testEmail" placeholder="your.email@example.com">
      </div>
      
      <div class="form-group">
        <label for="testMessage">Test Message:</label>
        <textarea id="testMessage" v-model="testMessage" placeholder="This is a test message"></textarea>
      </div>
      
      <button @click="sendTestEmail" :disabled="isSending" class="send-button">
        {{ isSending ? 'Sending...' : 'Send Test Email' }}
      </button>
      
      <div v-if="result" class="result" :class="{ 'success': isSuccess, 'error': !isSuccess }">
        {{ result }}
      </div>
      
      <div v-if="isSuccess" class="update-instructions">
        <h3>Update Your Contact Form</h3>
        <p>Now that you've successfully sent a test email, update your ContactSection.vue file with these credentials:</p>
        <pre>
// In the submitForm method, replace these lines:
const response = await emailjs.send(
  '{{ serviceId }}', // Your EmailJS service ID
  '{{ templateId }}', // Your EmailJS template ID
  templateParams,
  '{{ publicKey }}' // Your EmailJS public key
);
        </pre>
      </div>
    </div>
  </div>
</template>

<script>
import emailjs from '@emailjs/browser';

export default {
  name: 'EmailTestView',
  data() {
    return {
      serviceId: '',
      templateId: '',
      publicKey: '',
      testName: '',
      testEmail: '',
      testMessage: 'This is a test message from the TAKTZEIT website',
      isSending: false,
      result: '',
      isSuccess: false
    };
  },
  methods: {
    async sendTestEmail() {
      if (!this.serviceId || !this.templateId || !this.publicKey || !this.testName || !this.testEmail) {
        this.result = 'Please fill in all required fields';
        this.isSuccess = false;
        return;
      }
      
      this.isSending = true;
      this.result = '';
      
      try {
        // Prepare the template parameters for EmailJS
        const templateParams = {
          to_email: 'felix.seeger@taktzeit.com', // The recipient email
          from_name: this.testName,
          from_email: this.testEmail,
          company: 'Test Company',
          subject: 'Test Email from TAKTZEIT Website',
          message: this.testMessage,
          reply_to: this.testEmail
        };
        
        // Send the email using EmailJS
        const response = await emailjs.send(
          this.serviceId,
          this.templateId,
          templateParams,
          this.publicKey
        );
        
        console.log('Email sent successfully:', response);
        this.result = `Email sent successfully! Status: ${response.status}, Text: ${response.text}`;
        this.isSuccess = true;
      } catch (error) {
        console.error('Error sending email:', error);
        this.result = `Error sending email: ${error.message}`;
        this.isSuccess = false;
      } finally {
        this.isSending = false;
      }
    }
  }
};
</script>

<style scoped>
.email-test-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  font-family: Arial, sans-serif;
}

h1, h2, h3 {
  color: #333;
}

.setup-instructions {
  margin-bottom: 2rem;
  padding: 1rem;
  background-color: #f5f5f5;
  border-radius: 4px;
}

.setup-instructions ol {
  padding-left: 1.5rem;
}

.setup-instructions li {
  margin-bottom: 0.5rem;
}

.email-form {
  background-color: #fff;
  padding: 1.5rem;
  border-radius: 4px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
}

input, textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

textarea {
  min-height: 100px;
  resize: vertical;
}

.send-button {
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.send-button:hover {
  background-color: #45a049;
}

.send-button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.result {
  margin-top: 1rem;
  padding: 1rem;
  border-radius: 4px;
}

.success {
  background-color: #dff0d8;
  color: #3c763d;
}

.error {
  background-color: #f2dede;
  color: #a94442;
}

.update-instructions {
  margin-top: 2rem;
  padding: 1rem;
  background-color: #d9edf7;
  border-radius: 4px;
  color: #31708f;
}

pre {
  background-color: #f8f8f8;
  padding: 1rem;
  border-radius: 4px;
  overflow-x: auto;
  white-space: pre-wrap;
}

a {
  color: #337ab7;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}
</style>
