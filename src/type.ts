export interface EventItem {
  studentId: number,
    name: string,
    surname: string,
    image: string,
    courseId: string[]
}

export interface StudentItem {
  id: number
  name: string
  surname: string
  image: string
  dept: string
  advisorId: string
}

export interface CommentItem {
  comment: string
}

export interface Advisor {
  id: string;
  name: string;
  surname: string;
  dept: string;
  position: string;
  images: string;
  ownStudent: StudentItem[];
}

export interface AnnouncementItem {
  id: string,
  message: string;
  file: string;
  advisor: string;
}