const CAMPUS_DATA = [

  // ── COUNTRY ──────────────────────────────────────────────────────
  {
    level: "country",
    name: "Nigeria",
    lat: 9.082,
    lng: 8.675,
    count: 39
  },

  // ── STATES ───────────────────────────────────────────────────────
  { level: "state", name: "Abia State",        lat: 5.4527,  lng: 7.5248,  country: "Nigeria" },
  { level: "state", name: "Adamawa State",     lat: 9.3266,  lng: 12.3984, country: "Nigeria" },
  { level: "state", name: "Akwa Ibom State",   lat: 5.0377,  lng: 7.9128,  country: "Nigeria" },
  { level: "state", name: "Bayelsa State",     lat: 4.6608,  lng: 6.2745,  country: "Nigeria" },
  { level: "state", name: "Borno State",       lat: 11.8333, lng: 13.1500, country: "Nigeria" },
  { level: "state", name: "Cross River State", lat: 5.9631,  lng: 8.3317,  country: "Nigeria" },
  { level: "state", name: "Delta State",       lat: 5.7059,  lng: 5.9563,  country: "Nigeria" },
  { level: "state", name: "Ebonyi State",      lat: 6.2649,  lng: 8.0137,  country: "Nigeria" },
  { level: "state", name: "Enugu State",       lat: 6.4402,  lng: 7.4943,  country: "Nigeria" },
  { level: "state", name: "FCT Abuja",         lat: 9.0765,  lng: 7.3986,  country: "Nigeria" },
  { level: "state", name: "Gombe State",       lat: 10.2897, lng: 11.1671, country: "Nigeria" },
  { level: "state", name: "Imo State",         lat: 5.4897,  lng: 7.0289,  country: "Nigeria" },
  { level: "state", name: "Kaduna State",      lat: 10.5264, lng: 7.4388,  country: "Nigeria" },
  { level: "state", name: "Kwara State",       lat: 8.4966,  lng: 4.5421,  country: "Nigeria" },
  { level: "state", name: "Lagos State",       lat: 6.5244,  lng: 3.3792,  country: "Nigeria" },
  { level: "state", name: "Niger State",       lat: 9.9309,  lng: 5.5983,  country: "Nigeria" },
  { level: "state", name: "Ogun State",        lat: 6.9980,  lng: 3.4737,  country: "Nigeria" },
  { level: "state", name: "Ondo State",        lat: 7.2502,  lng: 5.2081,  country: "Nigeria" },
  { level: "state", name: "Rivers State",      lat: 4.8427,  lng: 6.9119,  country: "Nigeria" },
  { level: "state", name: "Yobe State",        lat: 12.2939, lng: 11.4390, country: "Nigeria" },
  { level: "state", name: "Zamfara State",     lat: 12.1666, lng: 6.6572,  country: "Nigeria" },

  // ── UNIVERSITIES ─────────────────────────────────────────────────

  // Abia State (4)
  { level: "university", name: "Abia State University, Uturu",                          lat: 5.8167,  lng: 7.4333,  state: "Abia State" },
  { level: "university", name: "Clifford University, Owerrinta",                        lat: 5.4667,  lng: 7.3667,  state: "Abia State" },
  { level: "university", name: "Michael Okpara University of Agriculture, Umudike",     lat: 5.4500,  lng: 7.5400,  state: "Abia State" },
  { level: "university", name: "Rhema University, Aba",                                 lat: 5.1073,  lng: 7.3672,  state: "Abia State" },

  // Adamawa State (2)
  { level: "university", name: "Adamawa State University, Mubi",                        lat: 10.2667, lng: 13.2667, state: "Adamawa State" },
  { level: "university", name: "Modibbo Adamawa University of Technology, Yola",        lat: 9.2340,  lng: 12.4570, state: "Adamawa State" },

  // Akwa Ibom State (1)
  { level: "university", name: "University of Uyo",                                     lat: 5.0102,  lng: 7.9392,  state: "Akwa Ibom State" },

  // Bayelsa State (1)
  { level: "university", name: "Federal University, Otuoke",                            lat: 4.9667,  lng: 6.1333,  state: "Bayelsa State" },

  // Borno State (2)
  { level: "university", name: "Borno State College of Health Technology, Maiduguri",   lat: 11.8480, lng: 13.1550, state: "Borno State" },
  { level: "university", name: "Nigerian Army University, Biu",                         lat: 10.6167, lng: 12.1917, state: "Borno State" },

  // Cross River State (2)
  { level: "university", name: "Cross River University of Technology (CRUTECH)",        lat: 4.9757,  lng: 8.3417,  state: "Cross River State" },
  { level: "university", name: "University of Calabar",                                 lat: 4.9543,  lng: 8.3570,  state: "Cross River State" },

  // Delta State (1)
  { level: "university", name: "Delta State University, Abraka",                        lat: 5.7667,  lng: 6.0833,  state: "Delta State" },

  // Ebonyi State (2)
  { level: "university", name: "Alex Ekwueme Federal University, Ndufu-Alike",          lat: 6.0333,  lng: 8.1000,  state: "Ebonyi State" },
  { level: "university", name: "Evangel University Akaeze, Okpoto",                    lat: 5.8833,  lng: 7.9333,  state: "Ebonyi State" },

  // Enugu State (6)
  { level: "university", name: "Caritas University, Amorji-Nike",                       lat: 6.4840,  lng: 7.5540,  state: "Enugu State" },
  { level: "university", name: "Coal City University, Enugu",                           lat: 6.4400,  lng: 7.5000,  state: "Enugu State" },
  { level: "university", name: "Enugu State College of Education (Technical)",          lat: 6.4500,  lng: 7.4700,  state: "Enugu State" },
  { level: "university", name: "Enugu State University of Science and Technology (ESUT)", lat: 6.3500, lng: 7.5500, state: "Enugu State" },
  { level: "university", name: "University of Nigeria, Enugu Campus (UNEC)",            lat: 6.4269,  lng: 7.5096,  state: "Enugu State", students: 450 },
  { level: "university", name: "University of Nigeria, Nsukka (UNN)",                   lat: 6.8702,  lng: 7.3929,  state: "Enugu State" },

  // FCT Abuja (2)
  { level: "university", name: "FCT College of Health Technology, Gwagwalada",          lat: 8.9439,  lng: 7.0878,  state: "FCT Abuja" },
  { level: "university", name: "National Open University of Nigeria (NOUN)",             lat: 9.0730,  lng: 7.3700,  state: "FCT Abuja" },

  // Gombe State (1)
  { level: "university", name: "Federal College of Education (Technical), Gombe",       lat: 10.2920, lng: 11.1730, state: "Gombe State" },

  // Imo State (1)
  { level: "university", name: "Imo State University, Owerri",                          lat: 5.4898,  lng: 7.0297,  state: "Imo State" },

  // Kaduna State (1)
  { level: "university", name: "Kaduna State College of Nursing and Midwifery",         lat: 10.5260, lng: 7.4398,  state: "Kaduna State" },

  // Kwara State (1)
  { level: "university", name: "University of Ilorin",                                  lat: 8.4799,  lng: 4.6776,  state: "Kwara State" },

  // Lagos State (3)
  { level: "university", name: "Caleb University",                                      lat: 6.6333,  lng: 3.6833,  state: "Lagos State" },
  { level: "university", name: "Lagos State University (LASU)",                         lat: 6.4714,  lng: 3.1904,  state: "Lagos State" },
  { level: "university", name: "University of Lagos (UNILAG)",                          lat: 6.5158,  lng: 3.3913,  state: "Lagos State" },

  // Niger State (2)
  { level: "university", name: "Federal University of Technology, Minna",               lat: 9.6139,  lng: 6.5569,  state: "Niger State" },
  { level: "university", name: "School of Nursing, Bida",                               lat: 9.0833,  lng: 6.0167,  state: "Niger State" },

  // Ogun State (3)
  { level: "university", name: "College of Nursing Sciences, Ijebu-Ode",               lat: 6.8189,  lng: 3.9176,  state: "Ogun State" },
  { level: "university", name: "Ogun State College of Health Technology, Ilese-Ijebu",  lat: 6.7333,  lng: 3.8000,  state: "Ogun State" },
  { level: "university", name: "Tai Solarin University of Education, Ijagun",           lat: 6.8967,  lng: 3.9283,  state: "Ogun State" },

  // Ondo State (1)
  { level: "university", name: "Elizade University, Ilara-Mokin",                       lat: 7.3500,  lng: 5.1000,  state: "Ondo State" },

  // Rivers State (1)
  { level: "university", name: "University of Port Harcourt",                           lat: 4.8980,  lng: 6.9050,  state: "Rivers State" },

  // Yobe State (1)
  { level: "university", name: "Yobe State University, Damaturu",                      lat: 11.7500, lng: 11.9600, state: "Yobe State" },

  // Zamfara State (1)
  { level: "university", name: "Zamfara State University, Talata Mafara",               lat: 12.5500, lng: 6.0667,  state: "Zamfara State" },
];
