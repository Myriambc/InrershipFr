import IsBoolean from "./isBoolean";

const validateOnUpdate = (obj, code) => {
  let bool = true;
  var size = Object.keys(obj).length;
  // console.log(obj);
  // console.log(code);
  switch (code) {
    case 1:
      if (
        size < 4 ||
        !obj?.text1 ||
        !obj?.text2 ||
        obj?.wordList?.length < 1 ||
        obj?.wordList?.includes("")
      ) {
        return (bool = false);
      }
      break;
    case 3:
      if (!obj?.imageUrl) bool = false;
      break;
    case 4:
      if (!obj?.audioUrl) bool = false;
    case 7:
      if (!obj.text1 || !obj.text2 || !IsBoolean(obj?.answer)) {
        return (bool = false);
      }
      break;
    case 8:
      if (
        !obj?.correctAnswerId ||
        obj?.answers?.length < 1 ||
        obj?.answers?.includes("")
      )
        bool = false;
      for (let i = 0; i <= obj?.answers?.length; i++) {
        const content = obj?.answers[i]?.content;
        if (content == "") {
          bool = false;
        }
      }
      break;
    case 9:
      if (obj?.sentences?.length < 1 || obj?.sentences?.includes("")) {
        bool = false;
      }
      for (let i = 0; i <= obj?.sentences?.length; i++) {
        const content = obj?.sentences[i]?.content;
        if (content == "") {
          bool = false;
        }
      }
      break;
    case 10:
    case 15:
      bool = true;
    case 11:
    case 12:
      if (obj?.words?.length < 1 || obj?.words?.includes("")) {
        bool = false;
      }
      for (let i = 0; i <= obj?.words?.length; i++) {
        const content = obj?.words[i]?.content;
        if (content == "") {
          bool = false;
        }
      }
      break;
    default:
      if (!obj?.text1) bool = false;
      break;
  }
  return bool;
};

export default validateOnUpdate;
