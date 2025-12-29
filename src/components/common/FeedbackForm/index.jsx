import React from 'react';
import './FeedbackForm.css';

const FeedbackForm = () => {
  return (
    <section className="feedback-section">
      <div className="feedback-form">
        {/* Header: Text + Line */}
        <div className="feedback-form__header">
          <span className="feedback-form__label-text">FEEDBACK FORM</span>
          <div className="feedback-form__rule" aria-hidden="true"></div>
        </div>

        {/* Title */}
        <h3 className="feedback-form__title">
          Have any questions, clarifications, or comments? Send us a message through the form below
        </h3>

        {/* Form Body */}
        <form className="feedback-form__body" onSubmit={(e) => { e.preventDefault(); alert('Message sent!'); }}>
          
          <div className="feedback-form__group">
            <label className="feedback-form__field-label" htmlFor="email">Email Address:</label>
            <input 
              id="email"
              className="feedback-form__input" 
              type="email" 
              name="email" 
              required 
            />
          </div>

          <div className="feedback-form__group">
            <label className="feedback-form__field-label" htmlFor="message">Message:</label>
            <textarea 
              id="message"
              className="feedback-form__textarea" 
              name="message" 
              required
            ></textarea>
          </div>

          <div className="feedback-form__actions">
            <button type="submit" className="feedback-form__btn">Send Message</button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default FeedbackForm;