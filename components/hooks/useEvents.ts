import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import {
  createEvent,
  updateEvent,
  deleteEvent,
  getEventById,
  getAllEvents,
  getEventsByUser,
  getRelatedEventsByCategory,
} from "@/lib/actions/event.actions";
import {
  CreateEventParams,
  UpdateEventParams,
  DeleteEventParams,
  GetAllEventsParams,
  GetEventsByUserParams,
  GetRelatedEventsByCategoryParams,
} from "@/types";
import { toast } from "sonner";

// CREATE EVENT
export const useCreateEvent = () => {
  const queryClient = useQueryClient();

  const {
    mutate: createNewEvent,
    isPending: isCreatingEvent,
    isSuccess: isCreateEventSuccess,
    isError: isCreateEventError,
    error: createEventError,
  } = useMutation({
    mutationFn: createEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
      toast.success("Event created successfully!");
    },
  });

  return {
    createNewEvent,
    isCreatingEvent,
    isCreateEventSuccess,
    isCreateEventError,
    createEventError,
  };
};

// UPDATE EVENT
export const useUpdateEvent = () => {
  const queryClient = useQueryClient();

  const {
    mutate: updateExistingEvent,
    isPending: isUpdatingEvent,
    isSuccess: isUpdateEventSuccess,
    isError: isUpdateEventError,
    error: updateEventError,
  } = useMutation({
    mutationFn: updateEvent,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
      toast.success("Event updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["event", data?._id] });
    },
  });

  return {
    updateExistingEvent,
    isUpdatingEvent,
    isUpdateEventSuccess,
    isUpdateEventError,
    updateEventError,
  };
};

// DELETE EVENT
export const useDeleteEvent = () => {
  const queryClient = useQueryClient();

  const {
    mutate: deleteExistingEvent,
    isPending: isDeletingEvent,
    isSuccess: isDeleteEventSuccess,
    isError: isDeleteEventError,
    error: deleteEventError,
  } = useMutation({
    mutationFn: deleteEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
      toast.success("Event deleted successfully!");
    },
  });

  return {
    deleteExistingEvent,
    isDeletingEvent,
    isDeleteEventSuccess,
    isDeleteEventError,
    deleteEventError,
  };
};

// FETCH SINGLE EVENT BY ID
export const useGetEventById = (eventId: string) => {
  const {
    data: event,
    isLoading: isLoadingEvent,
    isSuccess: isGetEventSuccess,
    isError: isGetEventError,
    error: getEventError,
  } = useQuery({
    queryKey: ["event", eventId],
    queryFn: () => getEventById(eventId),
    enabled: !!eventId,
  });

  return {
    event,
    isLoadingEvent,
    isGetEventSuccess,
    isGetEventError,
    getEventError,
  };
};

// FETCH ALL EVENTS
export const useGetAllEvents = (params: GetAllEventsParams) => {
 const {
   data: eventsData,
   isLoading: isLoadingAllEvents,
   isSuccess: isGetAllEventsSuccess,
   isError: isGetAllEventsError,
   error: getAllEventsError,
 } = useQuery({
   queryKey: ["events", params],
   queryFn: () => getAllEvents(params),
 });

 return {
   eventsData,
   isLoadingAllEvents,
   isGetAllEventsSuccess,
   isGetAllEventsError,
   getAllEventsError,
 };
};

// FETCH EVENTS BY ORGANIZER
export const useGetEventsByUser = (params: GetEventsByUserParams) => {
const {
  data: userEvents,
  isLoading: isLoadingUserEvents,
  isSuccess: isGetUserEventsSuccess,
  isError: isGetUserEventsError,
  error: getUserEventsError,
} = useQuery({
  queryKey: ["events", "user", params.userId, params.page],
  queryFn: () => getEventsByUser(params),
  enabled: !!params.userId,
});

return {
  userEvents,
  isLoadingUserEvents,
  isGetUserEventsSuccess,
  isGetUserEventsError,
  getUserEventsError,
};
};

// FETCH RELATED EVENTS
export const useGetRelatedEvents = (
  params: GetRelatedEventsByCategoryParams,
) => {
 const {
   data: relatedEvents,
   isLoading: isLoadingRelatedEvents,
   isSuccess: isGetRelatedEventsSuccess,
   isError: isGetRelatedEventsError,
   error: getRelatedEventsError,
 } = useQuery({
   queryKey: ["events", "related", params.categoryId, params.eventId],
   queryFn: () => getRelatedEventsByCategory(params),
   enabled: !!params.categoryId,
 });

 return {
   relatedEvents,
   isLoadingRelatedEvents,
   isGetRelatedEventsSuccess,
   isGetRelatedEventsError,
   getRelatedEventsError,
 };
};
