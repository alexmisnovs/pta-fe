import Link from "next/link";
import Image from "next/image"; // Add this import
import apolloClient from "@/lib/apollo-client";
import { ProjectsDocument } from "@/gql/graphql";

export default async function Page() {
  const { data } = await apolloClient.query({
    query: ProjectsDocument,
    context: {
      fetchOptions: {
        next: { revalidate: 60 },
      },
    },
    // variables: {
    //   slug: "pta-school-disco",
    // },
  });
  const projects = data.projects;
  // console.log(data.articles);
  // return <h1>articles will go here</h1>;

  return (
    <div className="container">
      <h1 className="text-4xl mb-6 font-bold text-gray-700">Projects PTA is working on</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {projects.map(project => {
          if (!project) return null;
          if (!project?.coverImage) return null;
          return (
            <Link
              className="group grid grid-cols-[140px_1fr] bg-white shadow rounded-lg overflow-hidden relative hover:bg-gradient-to-r from-white to-amber-50"
              key={project.slug}
              href={`/projects/${project.slug}`}
            >
              <div className="relative overflow-hidden">
                <Image
                  className="transition duration-300 group-hover:scale-125 group-hover:rotate-12"
                  src={project.coverImage.url}
                  alt={project.heading || "Project image"}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  style={{ objectFit: "cover" }}
                  priority={false}
                />
              </div>

              <div className="p-4">
                <p className="text-xl text-gray-600 font-bold group-hover:text-gray-700">
                  {project.heading}
                </p>
                <p className="text-sm text-gray-500 leading-6">{project.description}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
