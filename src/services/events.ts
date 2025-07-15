import { _get } from "@/utils/crudService";

export const fetchEventTimelineDetails = (id: string) =>{
    const res = _get(`/events/${id}/timeline`);
    return res
}