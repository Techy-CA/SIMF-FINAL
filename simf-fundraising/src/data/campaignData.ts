export interface Donor {
  id:          string;
  name:        string;
  amount:      number;
  message?:    string;
  timeAgo:     string;
  isAnonymous: boolean;
}

export interface CampaignUpdate {
  id:       string;
  date:     string;
  title:    string;
  content:  string;
  postedBy: string;
}

export interface Campaign {
  id:                  string;
  patientName:         string;
  age:                 number;
  gender:              'male' | 'female' | 'other';
  condition:           string;
  conditionDetail:     string;
  hospital:            string;
  location:            string;
  goalAmount:          number;
  raisedAmount:        number;
  donorCount:          number;
  daysLeft:            number;
  organizer:           string;
  organizerRelation:   string;
  bannerImage:         string;
  patientImage:        string;
  shortBio:            string;
  story:               string[];
  urgencyNote:         string;
  verified:            boolean;
  documentsVerified:   boolean;
  updates:             CampaignUpdate[];
  recentDonors:        Donor[];
}

export const campaignData: Campaign = {
  id:                'rahul-heart-surgery-2026',
  patientName:       'Rahul Sharma',
  age:               8,
  gender:            'male',
  condition:         'Congenital Heart Disease',
  conditionDetail:   'Ventricular Septal Defect (VSD) — requires open-heart surgery',
  hospital:          'Narayana Health, Mumbai',
  location:          'Nashik, Maharashtra',
  goalAmount:        350000,
  raisedAmount:      214500,
  donorCount:        312,
  daysLeft:          18,
  organizer:         'Sunita Sharma',
  organizerRelation: 'Mother',
  bannerImage:       'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1400&q=80',
  patientImage:      'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=80',
  shortBio:          '8-year-old Rahul needs open-heart surgery for a congenital heart defect. His family cannot afford the cost. Every rupee you donate brings him closer to a normal life.',

  story: [
    "Rahul was just 2 months old when doctors discovered a hole in his heart — a condition called Ventricular Septal Defect (VSD). His parents, daily wage workers from Nashik, were told the surgery could wait. But as Rahul grew older, the condition started silently stealing his childhood.",
    "At 8 years old, Rahul can barely walk 100 metres without breathlessness. He hasn't been able to play with other children or attend school regularly. His cardiologist at Narayana Health has confirmed that if surgery doesn't happen in the next few weeks, the condition could become permanently irreversible.",
    "Rahul's father, Suresh Sharma, earns ₹400/day as a daily labourer. His mother Sunita works as a domestic helper. Together, they have sold their small piece of land and borrowed from relatives — raising ₹80,000. But the surgery costs ₹3.5 lakh.",
    "SIMF volunteers have personally visited Rahul's family and Narayana Health. All medical documents, hospital estimates, and income proof have been reviewed and verified. Every rupee donated goes directly to the hospital.",
    "A single surgery can give Rahul a completely normal life. He dreams of becoming a cricketer. Help us make that dream possible.",
  ],

  urgencyNote: 'Surgery must be done within 3 weeks. Further delay may cause permanent pulmonary hypertension.',
  verified:          true,
  documentsVerified: true,

  updates: [
    {
      id:       'u3',
      date:     'Mar 16, 2026',
      title:    'Surgery Confirmed for April 2nd',
      content:  "We are grateful to announce that Narayana Health has confirmed April 2nd as Rahul's surgery date. The surgical team is ready. We need to arrange the remaining ₹1,35,500 before March 30th. Please share this campaign with everyone you know.",
      postedBy: 'SIMF Team',
    },
    {
      id:       'u2',
      date:     'Mar 10, 2026',
      title:    '₹2 Lakh Milestone Crossed — Thank You!',
      content:  "Thanks to 280+ generous donors, Rahul's campaign has crossed ₹2 lakh. His mother Sunita broke down in tears when we shared the news. \"I didn't know so many strangers would care for my son,\" she said.",
      postedBy: 'SIMF Team',
    },
    {
      id:       'u1',
      date:     'Mar 1, 2026',
      title:    'Campaign Officially Launched',
      content:  'After a thorough verification of medical records, hospital estimates, and family background, SIMF has officially launched this campaign. Our volunteers have visited the family and the hospital firsthand.',
      postedBy: 'SIMF Team',
    },
  ],

  recentDonors: [
    { id: 'd1', name: 'Priya Mehta',    amount: 2000,  message: 'Get well soon Rahul! 💙',              timeAgo: '2 hours ago', isAnonymous: false },
    { id: 'd2', name: 'Anonymous',      amount: 5000,  message: undefined,                              timeAgo: '5 hours ago', isAnonymous: true  },
    { id: 'd3', name: 'Amit Kulkarni',  amount: 1000,  message: 'Praying for your quick recovery. 🙏', timeAgo: '8 hours ago', isAnonymous: false },
    { id: 'd4', name: 'Sneha Patil',    amount: 500,   message: 'Small contribution, big prayers.',     timeAgo: '1 day ago',   isAnonymous: false },
    { id: 'd5', name: 'Rajan Shah',     amount: 10000, message: 'Be strong little one!',                timeAgo: '1 day ago',   isAnonymous: false },
    { id: 'd6', name: 'Anonymous',      amount: 2000,  message: undefined,                              timeAgo: '2 days ago',  isAnonymous: true  },
    { id: 'd7', name: 'Deepa Nair',     amount: 1500,  message: 'Sending love from Kerala. 💚',         timeAgo: '2 days ago',  isAnonymous: false },
    { id: 'd8', name: 'Vikram Joshi',   amount: 3000,  message: undefined,                              timeAgo: '3 days ago',  isAnonymous: false },
  ],
};
