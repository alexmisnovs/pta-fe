// import Link from "next/link";
import apolloClient from "@/lib/apollo-client";
import { VolunteerPageDocument } from "@/gql/graphql";
// import Image from "next/image";

// import VolunteerForm from "@/components/Volunteers/VolunteerForm";
import VolunteerJobs from "@/components/Volunteers/VolunteerJobs";
import { Block } from "@/types/blocks";
import BlockRenderer from "@/components/utility/BlockRenderer";

export default async function Page() {
  // keeo this for page content what doesn't change often
  const { data } = await apolloClient.query({
    query: VolunteerPageDocument,
    context: {
      fetchOptions: {
        next: { revalidate: 5 },
      },
    },
  });
  const volunteerPage = data.volunteerPage;
  // console.log(volunteerPage);
  // return <h1>Events will go here</h1>;
  const processedBlocks = volunteerPage?.blocks?.map(block => ({
    __typename: block?.__typename, // Ensure this exists in response
    ...block,
  })) as Block[]; // Type assertion here if needed

  // console.log(processedBlocks);
  return (
    <>
      <section className="bg-white">
        <div className="container">
          {/* <h1 className="text-4xl mb-6 text-center font-bold text-gray-700">Volunteers</h1> */}

          {processedBlocks && processedBlocks.length > 0 ? (
            <>
              <BlockRenderer blocks={processedBlocks} className="space-y-8" />
            </>
          ) : (
            <div>No blocks to display</div>
          )}
        </div>
      </section>
      <div>
        <section className="px-4 bg-white">
          <div className="flex flex-col md:flex-row gap-8">
            {/* only display if not volunteerId present in localstorage */}
            {/* <div className="flex-1">
            <VolunteerForm />
          </div> */}
            <div className="flex-1">
              <VolunteerJobs />
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
