import {File} from '@app/main/_models/File';

export type Portfolio = {
  extraLink:	string
  link:	string
  id:	number
  userProfileId:	number
  files:	File[]
};
