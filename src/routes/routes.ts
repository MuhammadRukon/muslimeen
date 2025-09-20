export interface NestedRoute {
  name: string;
  children: { name: string; path: string; description: string }[];
}
export interface Route {
  name: string;
  path: string;
}

export const routes: (Route | NestedRoute)[] = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Quran",
    path: "/quran",
  },
  {
    name: "Hadith",
    path: "/hadith",
  },
  {
    name: "Calculator",
    children: [
      {
        name: "Inheritance",
        path: "/calculator/inheritance",
        description: "Calculate the inheritance of a deceased person",
      },
      {
        name: "Zakat",
        path: "/calculator/zakat",
        description:
          "Calculate the zakat of a person based on their income and assets",
      },
    ],
  },
];

export enum ApiRoutes {
  Quran = "/api/quran",
  Hadith = "/api/hadith",
  Health = "/api/health",
}
