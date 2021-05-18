const Auth_payload = {
  username: "applicant",
  password: "applicant@123",
  isVisited: false,
};
const QtnList = [
  { type: "Art", istestTaken: false },
  { type: "Sports", istestTaken: false },
  { type: "History", istestTaken: false },
  { type: "Geography", istestTaken: false },
  { type: "Politics", istestTaken: false },
];

localStorage.setItem("qtn_details", JSON.stringify(QtnList));
export default Auth_payload;
