"use client";

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
    }
  }
`;

const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
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
    try {
      await createContactFormEntry({ variables: { input: { name, email, message } } });
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

          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Submitting..." : "Send Message"}
          </button>
          {error && <p>Error sending form: {error.message}</p>}
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
