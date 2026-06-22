export const headerLinks = [
  {
    label: "Home",
    route: "/",
  },
  {
    label: "Create Event",
    route: "/events/create",
  },
  // {
  //   label: "My Events",
  //   route: "/events",
  // },
  {
    label: "My Profile",
    route: "/profile",
  },
];

export const eventDefaultValues = {
  title: "",
  description: "",
  location: "",
  imageUrl: "",
  startDate: undefined,
  startTime: "",
  endDate: undefined,
  endTime: "",
  categoryId: "",
  price: "",
  capacity: "",
  isFree: true,
  url: "",
};
