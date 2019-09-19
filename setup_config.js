module.exports.config = {
  region: "us-east-1",
  serviceName: "uportlandia",
  ssmParam:{
    issuers: "/uportlandia/${opt:stage}/issuers"
  },
  s3Bucket: {
    stage: "cleverland-stage",
    prod: "cleverland-prod"
  },
  domain: {
    stage: "uportlandia.uport.space",
    prod: "uportlandia.uport.me"
  },
  cors: true
};

module.exports.ISSUER_PROFILES = [{
  id: "DRIVERS_LICENSE",
  name: "Vericheck Identity Verifier",
  url: {
    stage: "https://uportlandia.uport.space/drivers_license",
    prod: "https://uportlandia.uport.me/drivers_license"
  },
  profileImage: "src/images/drivers-license-logo.png"
}, {
  id: "SAFE_DRIVER",
  name: "Mappe Maps & Navigation",
  url: {
    stage: "https://uportlandia.uport.space/safe_driver",
    prod: "https://uportlandia.uport.me/safe_driver"
  },
  profileImage: "src/images/safe-driver-logo.png"
}, {
  id: "CAR_LOAN",
  name: "Simple Fund Bank",
  url: {
    stage: "https://uportlandia.uport.space/car_loan",
    prod: "https://uportlandia.uport.me/car_loan"
  },
  profileImage: "src/images/company-logo.png"
}, {
  id: "CAR_DEALER",
  name: "McQuinn Car Dealership",
  url: {
    stage: "https://uportlandia.uport.space/car_dealer",
    prod: "https://uportlandia.uport.me/car_dealer"
  },
  profileImage: "src/images/car-dealer-logo.png"
}, {
  id: "INSURANCE",
  name: "Better Safe Insurance Company",
  url: {
    stage: "https://uportlandia.uport.space/insurance",
    prod: "https://uportlandia.uport.me/insurance"
  },
  profileImage: "src/images/insurance-logo.png"
}, {
  id: "RIDE_SHARING",
  name: "Ride Away Ride-Sharing App",
  url: {
    stage: "https://uportlandia.uport.space/ride_sharing",
    prod: "https://uportlandia.uport.me/ride_sharing"
  },
  profileImage: "src/images/ride-sharing-logo.png"
}, {
  id: "INVESTMENT",
  name: "Globe Capital Investments",
  url: {
    stage: "https://uportlandia.uport.space/investments",
    prod: "https://uportlandia.uport.me/investments"
  },
  profileImage: "src/images/investments-logo.png"
}];
