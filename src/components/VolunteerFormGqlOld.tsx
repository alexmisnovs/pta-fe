"use client";
import HCaptcha from "@hcaptcha/react-hcaptcha";

// import { useMutation, gql } from "@apollo/client";
import React, { useState } from "react";

// const SUBMIT_VOLUNTEER = gql`
//   mutation SubmitVolunteer($input: VolunteerInput!) {
//     createVolunteer(data: $input) {
//       name
//       email
//     }
//   }
// `;

const VolunteerForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [yearGroup, setYearGroup] = useState("");

  const [captcha, setCaptcha] = useState<string | null>("");

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  // const [error, setError] = useState(null);
  // const [createVolunteer, { loading, error }] = useMutation(SUBMIT_VOLUNTEER, {
  //   // onCompleted: data => {
  //   //   // console.log(data);
  //   //   setReturnedName(data.createVolunteer.name);
  //   //   setReturnedEmail(data.createVolunteer.email);
  //   // },
  // });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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

      if (result) {
        setSubmitted(true);
        setLoading(false);
        // console.log(result);
      }
    } catch (error) {
      // setError(error);
      console.log(error);
    }

    // try {
    //   await createVolunteer({
    //     variables: { input: { name, email, phoneNumber, yearGroup, captcha } },
    //   });
    //   // Handle successful submission (e.g., show a success message)
    //   setSubmitted(true);
    //   // console.log("something happened" + data);
    // } catch (e) {
    //   // Handle error (e.g., show an error message)
    //   console.log(e);
    // }
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
    <div className="max-w-lg mx-auto card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title text-2xl mb-4">Become a Volunteer</h2>
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
          />

          {/* <button type="submit" className="btn btn-primary w-full" > </button> */}
          <button type="submit" className="btn btn-primary w-full">
            {loading ? "Submitting..." : "Join Us"}
          </button>
          {/* {error && <p>Error submitting form: {error.message}</p>} */}
        </form>
      </div>
    </div>
  );
};

export default VolunteerForm;
