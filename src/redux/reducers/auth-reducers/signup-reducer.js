import * as TYPES from "../../actions/types";

const initialState = {
 loading: false,
 screen: "",
 signUpObj: {
  username: "", //aepistle
  firstName: "", //"John",
  lastName: "", //"Smith",
  email: "", //"john@example.com",
  password: "", //"Aepistle"
  bioDetail: "Here is the dummy bio", //"details"
  dateOfBirth: "", //"dd/mm/yyyy" 2020-08-13T21:03:54.700Z
  phoneNumber: "", //03077633011
  profileBlobUrl: "", //emty string
  preferredPronounsTypeSettingId: "", //id of gender
 },
 registerID: "2923518e-7166-4c7d-8faf-ca8f36810172",
 userInfo: null,
 error: null,
 isSuccess: false,
 isFailure: false,
 showPostModal: false,
};
const signUpReducer = (state = initialState, actions) => {
 switch (actions.type) {
  case TYPES.SIGNUP_REQUEST:
   return {
    ...state,
    loading: true,
    registerID: "",
    isSuccess: false,
    isFailure: false,
   };
  case TYPES.SIGNUP_SUCCESS:
   return {
    ...state,
    loading: false,
    registerID: actions.data,
    isSuccess: true,
    isFailure: false,
   };
  case TYPES.SIGNUP_FAILURE:
   return {
    ...state,
    loading: false,
    registerID: "",
    error: actions.error,
    isSuccess: false,
    isFailure: true,
   };
  case TYPES.SAVE_INFO_SUCCESS:
   return {
    ...state,
    loading: false,
    registerID: "",
    userInfo: actions.data,
    isSuccess: false,
    isFailure: true,
   };
  case TYPES.SAVE_INFO_REQUEST:
   return {
    ...state,
    loading: true,
    registerID: "",
    isSuccess: false,
    isFailure: true,
   };
  case TYPES.SAVE_INFO_FAILURE:
   return {
    ...state,
    loading: false,
    registerID: "",
    error: actions.error,
    isSuccess: false,
    isFailure: true,
   };
  default:
   return state;
 }
};
export default signUpReducer;
