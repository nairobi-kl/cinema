const moviesData = [
  {
    id: 1,
    title: "Щоденник пам'яті",
    posterUrl: "https://sparkmedia.com.ua/wp-content/uploads/2020/04/romantic-movies.jpg",
    genre: ["Драма", "Мелодрама"],
    duration: 123,
    rating: 4.9,
    releaseDate: "2025-06-10",
    description: "Зворушлива історія кохання, що долає роки та перешкоди.",
    showtimes: [
      { id: 101, movieId: 1, time: "13:00", date: "2024-06-12", hall: 1 },
      { id: 102, movieId: 1, time: "17:30", date: "2024-06-12", hall: 2 }
    ]
  },
  {
    id: 2,
    title: "Пліткарка: Нове покоління",
    posterUrl: "https://novy.tv/wp-content/uploads/sites/96/2020/05/Gossip-Girl.png",
    genre: ["Драма", "Молодіжний"],
    duration: 110,
    rating: 4.4,
    releaseDate: "2026-04-01",
    description: "Світ елітної молоді, де плітки керують життями.",
    showtimes: [
      { id: 201, movieId: 2, time: "16:30", date: "2024-06-18", hall: 3 },
      { id: 202, movieId: 2, time: "20:00", date: "2024-06-18", hall: 2 }
    ]
  },
  {
    id: 3,
    title: "Барбі",
    posterUrl: "https://uaserial.me/images/serials/64/64ad468011806973336367.webp",
    genre: ["Фентезі", "Комедія"],
    duration: 114,
    rating: 4.3,
    releaseDate: "2025-07-21",
    description: "Барбі вирушає з Барбіленду в реальний світ у пошуках сенсу життя.",
    showtimes: [
      { id: 301, movieId: 3, time: "14:00", date: "2024-06-19", hall: 1 },
      { id: 302, movieId: 3, time: "18:30", date: "2024-06-19", hall: 3 }
    ]
  },
  {
    id: 4,
    title: "Диявол носить Prada",
    posterUrl: "https://www.rbc.ua/static/img/_/4/_440e239ec166245d35abe64332d229f2_1200x675.jpg",
    genre: ["Комедія", "Драма"],
    duration: 109,
    rating: 4.6,
    releaseDate: "2025-06-30",
    description: "Молода журналістка влаштовується працювати до суворої редакторки модного журналу.",
    showtimes: [
      { id: 401, movieId: 4, time: "15:45", date: "2024-06-20", hall: 2 },
      { id: 402, movieId: 4, time: "20:00", date: "2024-06-20", hall: 1 }
    ]
  },
  {
    id: 5,
    title: "Гордість і упередження",
    posterUrl: "https://uakino.me/uploads/posts/2019-08/1566418684-2.jpg",
    genre: ["Історичний", "Мелодрама"],
    duration: 129,
    rating: 4.8,
    releaseDate: "2025-09-16",
    description: "Класична історія Елізабет Беннет та містера Дарсі — зіткнення гордості та почуттів.",
    showtimes: [
      { id: 601, movieId: 6, time: "14:45", date: "2024-06-22", hall: 1 },
      { id: 602, movieId: 6, time: "19:30", date: "2024-06-22", hall: 2 }
    ]
  },
  {
    id: 6,
    title: "Їсти. Молитися. Кохати",
    posterUrl: "https://cdn-ksvod.kyivstar.ua/content/HLS/VOD/IMAGE/5c6d7030e4b0f1f293d3b63d/IMAGE_16_9_XL.jpg",
    genre: ["Біографія", "Драма"],
    duration: 133,
    rating: 4.5,
    releaseDate: "2025-08-13",
    description: "Жінка вирушає в подорож навколо світу в пошуках себе після розлучення.",
    showtimes: [
      { id: 701, movieId: 7, time: "12:30", date: "2024-06-23", hall: 2 },
      { id: 702, movieId: 7, time: "18:00", date: "2024-06-23", hall: 3 }
    ]
  },
  {
    id: 7,
    title: "Паперові міста",
    posterUrl: "https://uakino.me/uploads/posts/2017-10/PaperTowns/npuhug3y.jpg",
    genre: ["Молодіжний", "Драма"],
    duration: 109,
    rating: 4.2,
    releaseDate: "2025-07-23",
    description: "Хлопець вирушає на пошуки загадкової сусідки після її зникнення.",
    showtimes: [
      { id: 801, movieId: 8, time: "16:00", date: "2024-06-24", hall: 1 },
      { id: 802, movieId: 8, time: "19:45", date: "2024-06-24", hall: 2 }
    ]
  },
  {
    id: 8,
    title: "Інтерстеллар",
    posterUrl: "https://sm.ign.com/t/ign_ap/articlepage/t/this-is-ho/this-is-how-interstellar-originally-ended_spam.1280.jpg",
    genre: ["Фантастика", "Драма"],
    duration: 169,
    rating: 4.9,
    releaseDate: "2025-08-07",
    description: "Наукова експедиція вирушає через простір і час, щоб врятувати людство.",
    showtimes: [
      { id: 901, movieId: 9, time: "13:00", date: "2024-06-25", hall: 3 },
      { id: 902, movieId: 9, time: "18:30", date: "2024-06-25", hall: 1 }
    ]
  }
];

export const useMovies = () => {
  return {
    movies: moviesData,
    loading: false
  };
};
