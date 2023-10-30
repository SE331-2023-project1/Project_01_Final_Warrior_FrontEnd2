import axios from 'axios';
import type { AxiosResponse } from 'axios';
import type { AnnouncementItem } from '@/type';
import apiClient from './AxiosClient'

export default {
  addAnnouncement(announcement: AnnouncementItem): Promise<AxiosResponse<void>> {
    return apiClient.post<void>('/announcements', announcement);
  },
  getAnnouncementsAll(): Promise<AxiosResponse<AnnouncementItem[]>> {
   return apiClient.get<AnnouncementItem[]>('/announcements');
 },
  getAnnouncements(advisorId: number): Promise<AxiosResponse<AnnouncementItem[]>> {
    return apiClient.get<AnnouncementItem[]>('/announcements/'+advisorId);
  },
  getAnnouncementById(id: number): Promise<AxiosResponse<AnnouncementItem>>{
    return apiClient.get<AnnouncementItem>('/announcement/'+id)
}
};