module.exports.config = {
  region: "ap-northeast-2",
  serviceName: "did-on-fido",
  ssmParam:{
    issuers: "/did-on-fido/${opt:stage}/issuers"
  },
  s3Bucket: {
    stage: "did-on-fido",
    prod: "did-on-fido"
  },
  domain: {
    stage: "",
    prod: ""
  },
  cors: true
};

module.exports.ISSUER_PROFILES = [{
  id: "CITY_ID",
  name: "국민건강보험공단",
  url: {
    stage: "https://uportlandia.uport.space/city",
    prod: "https://uportlandia.uport.me/city"
  },
  //profileImage: "src/images/city-logo.png"
  profileImage: "src/images/NHIS_logo.png"
}/*, {
  id: "DIPLOMA",
  name: "The University of uPortlandia",
  url: {
    stage: "https://uportlandia.uport.space/university",
    prod: "https://uportlandia.uport.me/university"
  },
  profileImage: "src/images/university-logo.png"
}, {
  id: "COMPANY",
  name: "Dream Job LLC.",
  url: {
    stage: "https://uportlandia.uport.space/company",
    prod: "https://uportlandia.uport.me/company"
  },
  profileImage: "src/images/company-logo.png"
}, {
  id: "INSURANCE",
  name: "People Care LLC.",
  url: {
    stage: "https://uportlandia.uport.space/insurance",
    prod: "https://uportlandia.uport.me/insurance"
  },
  profileImage: "src/images/insurance-logo.png"
}, {
  id: "PHARMACY",
  name: "Your Health Medical Center",
  url: {
    stage: "https://uportlandia.uport.space/pharmacy",
    prod: "https://uportlandia.uport.me/pharmacy"
  },
  profileImage: "src/images/pharmacy-logo.png"
}, {
  id: "TRANSPORT",
  name: "uPortlandia City Transit",
  url: {
    stage: "https://uportlandia.uport.space/transport",
    prod: "https://uportlandia.uport.me/transport"
  },
  profileImage: "src/images/transport-logo.png"
}, {
  id: "MUSEUM",
  name: "uPortlandia Museum of Modern Art",
  url: {
    stage: "https://uportlandia.uport.space/museum",
    prod: "https://uportlandia.uport.me/museum"
  },
  profileImage: "src/images/museum-logo.png"
}*/];
