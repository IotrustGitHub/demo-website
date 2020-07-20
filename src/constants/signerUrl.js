import SIGNER_STAGE from "./signer.stage";
import SIGNER_PROD from "./signer.prod";

//const _DEFAULT_SIGNER = "http://localhost:8001/"
const _DEFAULT_SIGNER = SIGNER_STAGE

const getSignerUrl = () => process.env.REACT_APP_TARGET_ENV === "prod"
  ? SIGNER_PROD
  : process.env.REACT_APP_TARGET_ENV === "stage"
    ? SIGNER_STAGE
    : _DEFAULT_SIGNER;

export default getSignerUrl;
