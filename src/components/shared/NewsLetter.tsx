"use client";
// import HCaptcha from "@hcaptcha/react-hcaptcha";

import React, { useState } from "react";

interface NewsLetterFormProps {
  className?: string;
}

const NewsLetterForm = ({ className }: NewsLetterFormProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // const [captcha, setCaptcha] = useState<string | null>("");

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // if (!captcha) {
    //   return alert("Captcha token required");
    // }

    setLoading(true);
    // using fetch doesn't work for some reason..
    try {
      const result = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/newsletter-signups`,
        {
          method: "POST",
          body: JSON.stringify({
            data: {
              name: name,
              email: email,
              // captcha: captcha,
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
        // console.log(result);
      }
    } catch (error) {
      // setError(error);
      console.log(error);
    }
  };

  if (submitted) {
    return (
      <div className="max-w-lg mx-auto card bg-base-100 shadow-xl mt-4">
        <div className="card-body">Dear {name}, thank you for signing up for our newsletter!</div>
      </div>
    );
  }

  return (
    <div className={`w-full ${className || ""}`}>
      {/* <div className="card bg-base-100 shadow-xl"> */}
      <div className="card bg-base">
        <div className="card-body">
          <h2 className="card-title text-3xl mb-4 justify-center">Newsletter</h2>
          <p className="text-center py-2">
            Signup for our newsletter to stay in the loop of what the PTA are up to.
          </p>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col md:flex-row gap-4 items-center justify-center"
          >
            <div className="w-full md:w-48">
              <input
                className="input input-bordered w-full"
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Your Name"
                required
              />
            </div>
            <div className="w-full md:w-64">
              <input
                className="input input-bordered w-full"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Your Email"
                required
              />
            </div>
            <div className="w-full md:w-32">
              <button
                type="submit"
                className="btn bg-custom-red hover:bg-custom-blue text-white font-bold w-full py-2 px-4 rounded border-inherit"
              >
                {loading ? "Submitting..." : "Join Us"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewsLetterForm;
