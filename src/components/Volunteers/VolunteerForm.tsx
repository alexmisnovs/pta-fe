"use client";
import HCaptcha from "@hcaptcha/react-hcaptcha";

import React, { useState } from "react";

interface VolunteerFormProps {
  className?: string;
}

const VolunteerForm = ({ className }: VolunteerFormProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [yearGroup, setYearGroup] = useState("");

  const [captcha, setCaptcha] = useState<string | null>("");

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!captcha) {
      return alert("Captcha token required");
    }

    setLoading(true);
    // using fetch doesn't work for some reason..
    try {
      const result = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/volunteers`, {
        method: "POST",
        body: JSON.stringify({
          data: {
            name: name,
            email: email,
            phoneNumber: phoneNumber,
            yearGroup: yearGroup,
            captcha: captcha,
          },
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (result.ok) {
        setSubmitted(true);
        setLoading(false);
        // console.log(result);
      } else {
        const data = await result.json();
        const errors = data.error.details.errors;

        const errorMessage = errors[0].name + " " + data.error.message + ": " + errors[0].path[0];

        setLoading(false);
        setSubmitted(false);
        setError(new Error(errorMessage));
      }
    } catch (error) {
      // setError(error);
      console.log(error);
    }
  };

  if (submitted) {
    return (
      <div className="max-w-lg mx-auto card bg-base-100 shadow-xl mt-4">
        <div className="card-body">
          Dear {name}, Thank you for signing up as a volunteer. We will get in touch with you soon
          via {email} or {phoneNumber}
        </div>
      </div>
    );
  }

  return (
    <div className={`w-full ${className || ""}`}>
      <div className="card bg-base-100">
        <div className="card-body">
          <h2 className="text-3xl font-bold text-center mb-8">Volunteer Signup</h2>{" "}
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

            <input
              className="input input-bordered w-full"
              type="text"
              value={phoneNumber}
              onChange={e => setPhoneNumber(e.target.value)}
              placeholder="Your Phone"
              required
            />
            <input
              className="input input-bordered w-full"
              type="text"
              value={yearGroup}
              onChange={e => setYearGroup(e.target.value)}
              placeholder="Year group of your child"
              required
            />
            <br />
            <HCaptcha
              sitekey={process.env.NEXT_PUBLIC_REACT_APP_SITEKEY ?? ""}
              onVerify={setCaptcha}
              onError={() => setCaptcha(null)}
              onExpire={() => setCaptcha(null)}
              theme="light"
              size="compact"
            />

            {/* <button type="submit" className="btn btn-primary w-full" > </button> */}
            <button
              type="submit"
              className="btn bg-custom-red hover:bg-custom-blue text-white font-bold py-2 px-4 rounded border-inherit"
            >
              {loading ? "Signing up..." : "Sign Up"}
            </button>
            {/* todo: handle errors properly */}
            {/* {error && <p>Error submitting form: {error.message}</p>} */}
          </form>
          {error && <p className="text-red-500 text-center">{error.message}</p>}
        </div>
      </div>
    </div>
  );
};

export default VolunteerForm;
