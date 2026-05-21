export const headerLinks = [
  {
    label: "Home",
    route: "/",
  },
  {
    label: "Create Event",
    route: "/events/create",
  },
  {
    label: "My Events",
    route: "/events",
  },
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
  startDate: new Date(),
  startTime: "",
  endDate: new Date(),
  endTime: "",
  categoryId: "",
  price: "",
  capacity: "",
  isFree: false,
  url: "",
};
