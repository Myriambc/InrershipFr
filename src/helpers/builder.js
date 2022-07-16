const builder = (types, setValues, formik) => {
  switch (types[types.length - 1]?.label) {
    case "descriptionBlock":
    case "titleBlock":
    case "textBlock":
      setValues((prevData) => [...prevData, { text1: "" }]);
      // formik.setFieldValue("questionBlocks", [
      //   ...formik?.values,
      //   { text1: "" },
      // ]);

      break;
    case "imageBlock":
      setValues((prevData) => [...prevData, { imageUrl: "" }]);
      break;
    case "dragAndDrop":
      setValues((prevData) => [
        ...prevData,
        {
          questions: [{ content: "", id: "" }],
          answers: [{ content: "", id: "" }],
          correctAnswers: [],
        },
      ]);
      break;
    case "audioBlock":
      setValues((prevData) => [...prevData, { audioUrl: "" }]);
      break;
    case "phraseBuilder":
      setValues((prevData) => [
        ...prevData,
        { sentences: [{ content: "", position: 1 }] },
      ]);
      break;
    case "oneCorrectChoice":
      setValues((prevData) => [
        ...prevData,
        { answers: [{ id: "", content: "" }] },
      ]);
      break;
    case "trueFalseBlock":
      setValues((prevData) => [
        ...prevData,
        { text1: "", text2: "", answer: "" },
      ]);
      break;
    case "tipBlock":
      setValues((prevData) => [
        ...prevData,
        { text1: "", text2: "", wordList: [""] },
      ]);
      break;
    case "fillInTheBlanks":
    case "writeInTheBlanks":
      setValues((prevData) => [
        ...prevData,
        { words: [{ content: "", position: 1, isHidden: false }] },
      ]);
      break;
    case "conversationBlock":
      setValues((prevData) => [
        ...prevData,
        { text1: "", persons: [], speeches: [] },
      ]);
      break;
    case "secondDialogBlock":
      setValues((prevData) => [
        ...prevData,
        { text1: "", persons: [], speeches2: [] },
      ]);
      break;
    case "dialogBuilderBlock":
      setValues((prevData) => [
        ...prevData,
        { text1: "", persons: [], speeches3: [] },
      ]);
      break;
  }
};

export default builder;
