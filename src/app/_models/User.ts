export interface User {
  id?: string;
  name: string;
  surname: string;
  gender: string;
  country: string;
  city: string;
  likes?: number;
  dislikes?: number;
  created?: Date;
  photoUrl?: string;
  dateOfBirth?: Date;
  introduction?: string;
  interests?: string;
  knownLanguages?: string[];
  wantedLanguages?: string[];
  visitedCountries?: string[];
  countriesToVisit?: string[];
  facebookLink?: string;
  instagramLink?: string;
  email?: string;
}
