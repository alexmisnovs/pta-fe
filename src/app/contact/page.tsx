import apolloClient from "@/lib/apollo-client";
import { ContactPageDocument } from "@/gql/graphql";

import ContactForm from "@/components/ContactForm";

export default async function Page() {
  const { data } = await apolloClient.query({
    query: ContactPageDocument,
    context: {
      fetchOptions: {
        next: { revalidate: 600 },
      },
    },
    // variables: {
    //   slug: "pta-school-disco",
    // },
  });
  const pageData = data.contactPage;
  // console.log(pageData);

  return (
    <div className="container">
      <h1 className="text-4xl mb-6 font-bold text-gray-700"> {pageData?.heading}</h1>
      <p> {pageData?.description}</p>

      <ContactForm />
    </div>
  );
}
