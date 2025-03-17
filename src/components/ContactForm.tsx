"use client";

import HCaptcha from "@hcaptcha/react-hcaptcha";

// Step 1: Import necessary modules
import { useMutation, gql } from "@apollo/client";
import React, { useState } from "react";
// import { CreateVolunteerDocument, CreateVolunteerMutationVariables } from "@/gql/graphql";

// Step 2: Define the GraphQL mutation
const SUBMIT_CONTACT_FORM = gql`
  mutation CreateContactFormEntry($input: ContactFormEntryInput!) {
    createContactFormEntry(data: $input) {
      name
      email
      message
      captcha
    }
  }
`;

const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const [captcha, setCaptcha] = useState<string | null>("");

  // const [returnedName, setReturnedName] = useState("");
  // const [returnedEmail, setReturnedEmail] = useState("");

  const [createContactFormEntry, { loading, error }] = useMutation(SUBMIT_CONTACT_FORM, {
    // onCompleted: data => {
    //   // console.log(data);
    //   setReturnedName(data.createContactFormEntry.name);
    //   setReturnedEmail(data.createContactFormEntry.email);
    // },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // verify captcha straight away
    if (!captcha) {
      return alert("Captcha token required");
    }

    // try {
    //   const result = await fetch(`http://localhost:1337/contact-forms`, {
    //     method: "POST",
    //     body: JSON.stringify({
    //       name: name,
    //       email:email,
    //       message: message,
    //       captcha: captcha,
    //     }),
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   });

    //   if (result) {
    //     console.log(result);
    //     alert("Message sent! :D");
    //   }
    // } catch (error) {
    //   console.log(error);
    // }

    try {
      await createContactFormEntry({ variables: { input: { name, email, message, captcha } } });
      // Handle successful submission (e.g., show a success message)
      setSubmitted(true);
    } catch (e) {
      // Handle error (e.g., show an error message)
      console.log(e);
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
          />
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Submitting..." : "Send Message"}
          </button>
          {error && <p>Error sending form: {error.message}</p>}
          <br />
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
