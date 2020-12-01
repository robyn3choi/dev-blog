import React from 'react';
import './style.scss';

export default function EmailSubscribe({ isInFooter }) {
  React.useEffect(() => {
    const script2 = document.createElement('script');
    script2.src = 'https://emailoctopus.com/bundles/emailoctopuslist/js/1.6/form-embed.js';
    script2.async = true;

    document.body.appendChild(script2);

    return () => {
      document.body.removeChild(script2);
    };
  }, []);
  return (
    <div
      className={`email-subscribe ${
        isInFooter ? 'email-subscribe--in-footer' : null
      } emailoctopus-form-wrapper emailoctopus-form-default`}
      style={{ fontFamily: 'Arial, Helvetica Neue, Helvetica, sans-serif', color: 'rgb(26, 26, 26)' }}
    >
      <link
        rel="stylesheet"
        type="text/css"
        href="https://emailoctopus.com/bundles/emailoctopuslist/css/1.6/form.css"
      />
      <h2 className="email-subscribe__heading emailoctopus-heading">Subscribe for updates</h2>
      <p className="emailoctopus-success-message" />
      <p className="emailoctopus-error-message" />
      <form
        action="https://emailoctopus.com/lists/f4ccf81f-32a3-11eb-a3d0-06b4694bee2a/members/embedded/1.3/add"
        method="post"
        data-message-success="Thanks for subscribing!"
        data-message-missing-email-address="Your email address is required."
        data-message-invalid-email-address="Your email address looks incorrect, please try again."
        data-message-bot-submission-error="This doesn't look like a human submission."
        data-message-consent-required="Please check the checkbox to indicate your consent."
        data-message-invalid-parameters-error="This form has missing or invalid fields."
        data-message-unknown-error="Sorry, an unknown error has occurred. Please try again later."
        className="emailoctopus-form"
        data-sitekey="6LdYsmsUAAAAAPXVTt-ovRsPIJ_IVhvYBBhGvRV6"
      >
        <div className="emailoctopus-form-row">
          <label htmlFor="field_0" className="email-subscribe__input-label">
            Email address
          </label>
          <input
            id="field_0"
            className="email-subscribe__input"
            name="field_0"
            type="email"
            placeholder="Your email address"
            required="required"
          />
        </div>
        <div aria-hidden="true" className="emailoctopus-form-row-hp">
          <input type="text" name="hpc4b27b6e-eb38-11e9-be00-06b4694bee2a" tabIndex="-1" autoComplete="nope" />
        </div>
        <div className="emailoctopus-form-row-subscribe">
          <input type="hidden" name="successRedirectUrl" />
          <button type="submit" className="email-subscribe__button">
            Subscribe
          </button>
        </div>
      </form>
    </div>
  );
}
