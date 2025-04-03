import Link from "next/link";
import Image from "next/image";

type EventJobItemParams = {
  __typename?: "Event";
  documentId?: string;
  heading?: string | null;
  slug?: string | null;
  featuredImage?: {
    __typename?: "UploadFile";
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    formats?: any | null;
  } | null;
  volunteer_jobs?: Array<{
    __typename?: "VolunteerJob";
    documentId?: string;
    name?: string | null;
    volunteer?: {
      __typename?: "Volunteer";
      name?: string | null;
      email?: string | null;
    } | null;
  } | null>;
} | null;

const VolunteerEventJobItem = (event: EventJobItemParams) => {
  const thumbnailUrl = event?.featuredImage?.formats?.thumbnail?.url || "/placeholder-image.jpg";

  const availableJobs = event?.volunteer_jobs?.filter(job => !job?.volunteer);

  return (
    <div className="w-full md:w-1/2 lg:w-1/3 p-4">
      <div className="card bg-base-100 h-full">
        <figure className="relative w-[150px] h-[150px] mx-auto mt-4">
          <Image
            src={thumbnailUrl}
            alt={event?.heading || "Event image"}
            fill
            className="object-cover rounded-lg"
            sizes="150px"
          />
        </figure>
        <div className="card-body">
          <h3 className="card-title">{event?.heading}</h3>

          {!availableJobs?.length ? (
            <p>No available jobs</p>
          ) : (
            <div className="space-y-2">
              {availableJobs.map(job => (
                <div key={job?.documentId} className="border-b pb-2 last:border-b-0">
                  <p className="text-gray-700 font-medium">{job?.name}</p>
                  <p className="text-gray-500 text-sm">Available</p>
                </div>
              ))}
            </div>
          )}

          <div className="card-actions justify-end mt-4">
            <Link
              href={`/events/${event?.slug}`}
              className="btn text-white hover:bg-custom-red bg-custom-blue btn-sm"
            >
              View Event
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VolunteerEventJobItem;
