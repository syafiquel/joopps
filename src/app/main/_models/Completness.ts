export type ProfileCompleteness = {
  AboutMe: boolean
  Assessment: boolean
  CV: boolean
  Portfolio: boolean
  ProfileImage: boolean
  Videome: boolean
};

export type Completeness = {
  percentage: number
  profileCompletenessMap: ProfileCompleteness
};
