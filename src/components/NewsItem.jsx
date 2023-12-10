import { Link } from "react-router-dom";

export default function NewsItem({ hit }) {
  console.log(hit);
  return (
    <div className="bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg  sm:w-[330px]">
      <Link to={`/news/${hit.story_id}`}>
        <img
          src={
            "https://res.cloudinary.com/mae-com-in/image/upload/v1702217597/0x0_bmiacc.webp"
          }
          alt="news image"
          className="h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300"
        />
        <div className="p-3 flex flex-col gap-2 w-full">
          <p className="truncate text-lg font-semibold capitalize text-slate-700">
            Title : {hit?.title}
          </p>

          <p className="text-sm text-gray-600 capitalize line-clamp-2">
            Auther: {hit?.author}
          </p>
          <div className="items-center gap-1 grid grid-cols-2 py-5">
            <p className="text-sm text-gray-600 font-semibold ">Posted At:</p>
            <p className="text-sm text-gray-600 truncate w-full">
              {hit?.created_at}
            </p>
          </div>
             <p className="text-slate-500 mt-2 font-semibold ">
            Comments: {hit?.num_comments}
          </p>
        </div>
      </Link>
    </div>
  );
}
