import React, {  Suspense } from "react";
import { Navigation } from "swiper/modules";
import SwiperCore from "swiper";
import "swiper/css/bundle";
import Spinner from "../components/Spinner";
import CardLoader from "../components/CardLoader";
import { useSelector } from "react-redux";
import { selectAllNews } from "../redux/news/newsSlice";

const NewsItem = React.lazy(() => import("../components/NewsItem"));

export default function Home() {
  const { hits } = useSelector(selectAllNews);
  SwiperCore.use([Navigation]);
  return (
    <div>
      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10">
        {hits && hits.length > 0 ? (
          <div className="">
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">
                Top news
              </h2>
            </div>
            <div
              className="flex flex-wrap gap-4 "
              style={{ overflow: "auto", maxHeight: "400px" }}
            >
              {hits.map((hit) => (
                <Suspense key={hit.created_at_i} fallback={<CardLoader />}>
                  <NewsItem hit={hit} key={hit.created_at_i} />
                </Suspense>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center text-xl">Search for news</div>
        )}
      </div>
    </div>  
  );
}
