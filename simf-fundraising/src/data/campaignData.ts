export interface CampaignUpdate {
  id:       string;
  date:     string;
  title:    string;
  content:  string;
  postedBy: string;
}

export interface Donor {
  id:          string;
  name:        string;
  amount:      number;
  message:     string;
  isAnonymous: boolean;
  timeAgo:     string;
}

export interface Campaign {
  id:                string;
  patientName:       string;
  age:               number;
  condition:         string;
  conditionDetail:   string;
  hospital:          string;
  location:          string;
  bannerImage:       string;
  patientImage:      string;
  raisedAmount:      number;
  goalAmount:        number;
  donorCount:        number;
  daysLeft:          number;
  verified:          boolean;
  urgencyNote:       string;
  shortBio:          string;
  story:             string[];
  organizer:         string;
  organizerRelation: string;
  updates:           CampaignUpdate[];
  recentDonors:      Donor[];
  reportImages:      string[];
}

export const campaignData: Campaign = {
  id:              'siddhant-agarwal-kidney-2026',
  patientName:     'Siddhant Agarwal',
  age:             26,
  condition:       'Kidney Failure',
  conditionDetail: 'Siddhant is suffering from chronic kidney failure requiring urgent dialysis, continuous medication, and possible kidney transplant to survive.',
  hospital:        'Naraina Hospital and Research Centre',
  location:        'Kanpur, Uttar Pradesh',
  bannerImage:     '/images/banner.jpeg',
  patientImage:    '/images/patient.jpg',
  raisedAmount:    40000,
  goalAmount:      4000000,
  donorCount:      8,
  daysLeft:        7,
  verified:        true,
  urgencyNote:     'Siddhant requires immediate dialysis and ongoing medical care. Without continued financial support, his treatment cannot be sustained. Every contribution matters.',
  shortBio:        'Siddhant is a 26-year-old young man whose life has been turned upside down by kidney failure. His family is doing everything possible to keep him alive, but the medical costs have exceeded what they can bear alone.',
  story: [
    'Siddhant Agarwal, 26 years old, from Kanpur has been diagnosed with kidney failure — a life-threatening condition that demands continuous medical attention. His kidneys are no longer able to function independently, making dialysis and daily medication an unavoidable necessity.',
    'His family, though completely devoted to his recovery, is financially overwhelmed by the mounting hospital bills, dialysis costs, and medication expenses. Despite exhausting their savings and seeking help from relatives, they are unable to sustain his treatment on their own.',
    'Siddhant was a young man with dreams and a future ahead of him. Today, his only focus is survival — and his family\'s only hope is the generosity of people like you. No matter how small, your contribution can make a life-changing difference for him and his family.',
    'All funds raised will go directly toward his dialysis sessions, prescribed medications, hospital charges at Naraina Hospital and Research Centre, Kanpur, and any further medical procedures advised by his doctors. SIMF Foundation is overseeing this campaign to ensure complete transparency in how every rupee is used.',
  ],
  organizer:         'SIMF Foundation',
  organizerRelation: 'Supporting Siddhant in his recovery',
  updates: [
    {
      id:       'u1',
      date:     'March 19, 2026',
      title:    'Campaign Officially Launched',
      content:  'SIMF Foundation has launched this campaign to support Siddhant Agarwal and his family. All medical documents have been reviewed and the case has been verified. Your support is needed immediately to help Siddhant continue his treatment.',
      postedBy: 'SIMF Team',
    },
  ],
  recentDonors: [],
  reportImages: [
    '/images/reports/report-1.jpeg',
    '/images/reports/report-2.jpeg',
    '/images/reports/report-3.jpeg',
  ],
};
