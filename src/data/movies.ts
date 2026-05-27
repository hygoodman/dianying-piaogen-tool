import type { Movie } from "@/types";
import { catalogMovies } from "./movieCatalog";

const legacyMovies: Movie[] = [
  {
    id: "starbound",
    title: "星际归途",
    originalTitle: "Starbound",
    posterUrl: "/posters/starbound.svg",
    releaseYear: 2024,
    releaseDate: "2024-01-01",
    genre: ["科幻", "冒险"],
    country: "中国",
    director: "林诺",
    description: "一支深空返航小队穿越失联星门，在陌生星海中寻找回家的坐标。",
    rating: 9.1,
    duration: 142,
    sourceUrl: "",
    isCatalogVisible: false
  },
  {
    id: "echoes",
    title: "深海回声",
    originalTitle: "Echoes",
    posterUrl: "/posters/echoes.svg",
    releaseYear: 2024,
    releaseDate: "2024-01-01",
    genre: ["剧情", "悬疑"],
    country: "中国",
    director: "陈默",
    description: "潜水员在海底遗址中听见十年前失踪者的求救声，真相随潮汐浮出水面。",
    rating: 8.7,
    duration: 136,
    sourceUrl: "",
    isCatalogVisible: false
  },
  {
    id: "mist-city",
    title: "迷雾之城",
    originalTitle: "Mist City",
    posterUrl: "/posters/mist-city.svg",
    releaseYear: 2024,
    releaseDate: "2024-01-01",
    genre: ["悬疑", "犯罪"],
    country: "中国",
    director: "赵舟",
    description: "雨夜城市里连续出现的红光线索，将一名刑警带回未结旧案。",
    rating: 8.3,
    duration: 128,
    sourceUrl: "",
    isCatalogVisible: false
  },
  {
    id: "last-confession",
    title: "最后的告白",
    originalTitle: "The Last Confession",
    posterUrl: "/posters/last-confession.svg",
    releaseYear: 2024,
    releaseDate: "2024-01-01",
    genre: ["爱情", "剧情"],
    country: "中国",
    director: "苏念",
    description: "一封迟到的信，把两段人生重新推到同一座城市的晨光里。",
    rating: 8.0,
    duration: 118,
    sourceUrl: "",
    isCatalogVisible: false
  },
  {
    id: "moon-letter",
    title: "月球来信",
    originalTitle: "Moon Letters",
    posterUrl: "/posters/moon-letter.svg",
    releaseYear: 2024,
    releaseDate: "2024-01-01",
    genre: ["科幻", "爱情"],
    country: "中国",
    director: "沈一",
    description: "月面基地最后一名工程师，用无线电向地球发送没有收件人的情书。",
    rating: 7.8,
    duration: 125,
    sourceUrl: "",
    isCatalogVisible: false
  },
  {
    id: "homebound-train",
    title: "归途列车",
    originalTitle: "Homebound Train",
    posterUrl: "/posters/homebound-train.svg",
    releaseYear: 2023,
    releaseDate: "2023-01-01",
    genre: ["剧情", "家庭"],
    country: "中国",
    director: "周南",
    description: "一趟跨年列车上，几位陌生人把没说出口的告别讲给了彼此。",
    rating: 7.6,
    duration: 109,
    sourceUrl: "",
    isCatalogVisible: false
  }
];

export const movies: Movie[] = [...catalogMovies, ...legacyMovies];

export const featuredMovies = movies.filter((movie) => movie.isCatalogVisible).slice(0, 4);

export const categories = ["热门", "动画", "喜剧", "剧情", "动作", "犯罪", "科幻", "爱情", "纪录", "悬疑"];
