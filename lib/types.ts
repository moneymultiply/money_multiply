export type Currency = "INR" | "USD" | "AED";

export type LeadSource = "news" | "wa" | "email" | "partner" | "investor";

export interface Listing {
  id: string;
  title: string;
  cat: string;
  loc: string;
  /** index into the default-artwork (PROPS) array */
  img: number;
  total: number;
  token: number;
  units: number;
  sold: number;
  roi: string;
  tenure?: string;
  size?: string;
  tag?: string;
  desc?: string;
  /** path to a bundled photo in /public/images */
  photo?: string;
  /** base64/data-URL uploaded by an admin (kept in localStorage) */
  customImg?: string;
}

export interface Lead {
  id: string;
  source: LeadSource;
  contact: string;
  detail: string;
  ts: number;
}

export type UserRole = "partner" | "investor";

export interface BankDetails {
  accountName?: string;
  accountNumber?: string;
  ifsc?: string;
  bankName?: string;
  upi?: string;
}

export interface AppUser {
  id: string;
  role: UserRole;
  name: string;
  email: string;
  phone: string;
  referralCode: string;
  referredBy: string;
  commission: number;
  status: string;
  saved: string[];
  bank: BankDetails;
  avatar: string;
  pan: string;
  aadhaar: string;
  resetRequested?: boolean;
  createdAt?: string;
}

export interface Payment {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  amount: number;
  reference: string;
  note: string;
  status: "submitted" | "acknowledged" | "rejected";
  ackNote: string;
  slipUrl?: string; // signed URL, admin only
  createdAt?: string;
  ackAt?: string;
}

export interface MicroContribution {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  amount: number;
  note: string;
  status: "pledged" | "funded" | "closed";
  adminNote: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Holding {
  id: string;
  userId: string;
  listingId: string;
  title: string;
  tokens: number;
  amount: number;
  status: string;
  createdAt?: string;
}

export interface ImagesManifest {
  emblem: string;
  fbLogo: string;
  props: string[];
  img: Record<string, string>;
  heroFrames: string[];
}
