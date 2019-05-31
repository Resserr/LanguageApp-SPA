import { SocialMedia } from './SocialMedia';

export interface User {
  id?: string;
  name: string;
  surname: string;
  gender: string;
  created?: Date;
  country: string;
  city: string;
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
