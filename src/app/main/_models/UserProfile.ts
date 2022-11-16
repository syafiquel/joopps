import {File} from '@app/main/_models/File';

export type UserProfile = {
  description:	string
  educationLevel:	string
  email:	string
  employmentType:	string
  firstName:	string
  id:	number
  isPublic:	boolean
  lastName:	string
  linkedInLink:	string
  profileImage: File
  resume: File
  salary: string
  speciality: string
  startDate: string
  travelRequirements: string
  userId: number
  workLocation: string
};
