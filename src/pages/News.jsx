import React, {useEffect, useState } from "react";
import {  useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import Comment from "../components/Comment";
import {dateFormate} from '../components/NewsItem'
export default function News() {
  SwiperCore.use([Navigation]);
  const [news, setnews] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  
  const params = useParams();

  useEffect(() => {
    const fetchnews = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `https://hn.algolia.com/api/v1/items/${params.newsId}`
        );
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setnews(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchnews();
  }, [params.newsId]);

  console.log(news);

  return (
    <main>
      {loading && <p className="text-center my-7 text-2xl">Loading...</p>}
      {error && (
        <p className="text-center my-7 text-2xl">Something went wrong!</p>
      )}
      {news && !loading && !error && (
        <div>
          <Swiper navigation>
            <SwiperSlide>
              <div
                className="h-[550px]"
                style={{
                  background: `url(https://res.cloudinary.com/mae-com-in/image/upload/v1702217597/0x0_bmiacc.webp) center no-repeat`,
                  backgroundSize: "cover",
                }}
              ></div>
            </SwiperSlide>
          </Swiper>

          <div className="grid grid-cols-2">
            <div className="flex flex-col max-w-xl mx-auto p-3 my-7 gap-4">
              <p className="text-2xl font-semibold">Title : {news?.title}</p>
              <p className="text-slate-800">
                <span className="font-semibold text-black">Summary - </span>
                {news?.text}
              </p>
              <div className="grid grid-cols-2 justify-center items-center">
                <p className="flex items-center gap-2 text-slate-600  text-sm">
                  <span className="  text-black  font-semibold">
                    Posted At:{" "}
                  </span>
                  {dateFormate(news?.created_at)}
                </p>
                <p className="text-slate-800">
                  <span className="font-semibold text-black">Author - </span>
                  {news?.author}
                </p>
              </div>
              <p className="text-slate-800">
                <span className="font-semibold text-black">Points - </span>
                {news?.points}
              </p>
            </div>

            <section class=" dark:bg-gray-900 py-8 lg:py-16 antialiased">
              <div class="w-full mx-auto px-4">
                <div class="flex justify-between items-center mb-6">
                  <h2 class="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
                    Discussion ({`${news?.children.length}`})
                  </h2>
                </div>
                {news?.children?.map((comment, index) => (
                  <Comment comment={comment} key={comment.id} />
                ))}
              </div>
            </section>
          </div>
        </div>
      )}
    </main>
  );
}
