"use client";

import HCaptcha from "@hcaptcha/react-hcaptcha";

// Step 1: Import necessary modules

import React, { useState } from "react";

const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const [captcha, setCaptcha] = useState<string | null>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // verify captcha straight away
    if (!captcha) {
      return alert("Captcha token required");
    }

    try {
      const result = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/contact-form-entries`,
        {
          method: "POST",
          body: JSON.stringify({
            data: {
              name: name,
              email: email,
              message: message,
              captcha: captcha,
            },
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (result) {
        setSubmitted(true);
        setLoading(false);
        console.log(result);
      }
    } catch (error) {
      // setError(error);
      console.log(error);
    }
  };
  if (loading) {
    return "sending...";
  }
  if (submitted) {
    return (
      <div className="mx-auto card bg-base-100 shadow-xl mt-4 w-xl">
        <div className="card-body">
          Dear {name}, thank you for contacting us. We will get back to you soon to your email{" "}
          {email}
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto card bg-base-100 shadow-xl mt-4 w-xl">
      <div className="card-body">
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="input input-bordered w-full"
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Your Name"
            required
          />
          <input
            className="input input-bordered w-full"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Your Email"
            required
          />
          <textarea
            className="textarea textarea-bordered textarea-lg w-full"
            placeholder="Your message here"
            rows={10}
            value={message}
            onChange={e => setMessage(e.target.value)}
          ></textarea>
          <br />
          <HCaptcha
            sitekey={process.env.NEXT_PUBLIC_REACT_APP_SITEKEY ?? ""}
            onVerify={setCaptcha}
            onError={() => setCaptcha(null)}
            onExpire={() => setCaptcha(null)}
            theme="light"
            size="compact"
          />
          <button
            type="submit"
            className="btn bg-custom-red hover:bg-custom-blue text-white font-bold py-2 px-4 rounded border-inherit"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Send Message"}
          </button>
          {/* {error && <p>Error sending form: {error.message}</p>} */}
          <br />
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
