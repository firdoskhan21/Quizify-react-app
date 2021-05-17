import axios from "axios";
const QuizService = {
  getQuestionsData: async function (type) {
    var urlStr =
      "https://opentdb.com/api.php?amount=10&category=" +
      (type === "Art"
        ? "25"
        : type === "Sports"
        ? "21"
        : type === "History"
        ? "23"
        : type === "Geography"
        ? "22"
        : type === "Politics"
        ? "24"
        : "");
    return await axios.get(urlStr);
  },
};

export default QuizService;
