export type Util = {
  version: string;
  time: Date;
  stage: string;
}

export type User = {
  firstName: string;
  currentJobTitle: string;
  experienceYears: number;
  preferences: string;
  techstack: string[];
}

export type JobOffer = {
  uniqueKey: string;
  title: string;
  company: string;
  analyzedViaUrl: boolean;
  location: string;
  summary: string;
  techstack: string[];
  tasks: string;
  workingModel: string;
  experience: string;
  benefits: string;
  culture: string;
  salaryRange?: string;
  matchScore: number;
  matchReasoning: string;
  urlJob?: string;
  urlCompany?: string;
  urlCompanyLogo?: string;
  urlKununu?: string;
  urlLinkedin?: string;
  status: string;
  comment: string;
  timeline?: Timeline[];
}

export type Timeline = {
  status: string,
  changedAt: Date,
}

export type JobAnalysis = {
  uniqueKey: string;
  title: string;
  company: string;
  analyzedViaUrl: boolean;
  location: string;
  summary: string;
  techstack: string[];
  tasks: string;
  workingModel: string;
  experience: string;
  benefits: string;
  culture: string;
  salaryRange: string;
  matchScore: number;
  matchReasoning: string;
  urlJob?: string;
}

export type RegistrationPayload = {
  firstName: string;
  currentJobTitle: string;
  experienceYears: number;
  preferences: string;
}
