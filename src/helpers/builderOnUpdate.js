const builderOnUpdate = (questionBlocks, setValues, setPersons, persons) => {
  for (let i = 0; i <= questionBlocks?.length; i++) {
    switch (questionBlocks[i]?.questionBlockTypeId?.code) {
      case 6:
        setValues((prevData) => [...prevData, {}]);
        break;
      case 3:
        setValues((prevData) => [...prevData, {}]);
        break;
      case 10:
        setValues((prevData) => [
          ...prevData,
          {
            questions: questionBlocks[i]?.questions,
            answers: questionBlocks[i]?.answers,
            correctAnswers: questionBlocks[i]?.correctAnswers,
          },
        ]);
        break;
      case 4:
        setValues((prevData) => [...prevData, {}]);
        break;
      case 9:
        setValues((prevData) => [
          ...prevData,
          { sentences: questionBlocks[i]?.sentences },
        ]);
        break;
      case 8:
        setValues((prevData) => [
          ...prevData,
          {
            answers: questionBlocks[i]?.answers,
            correctAnswerId: questionBlocks[i]?.correctAnswerId,
          },
        ]);
        break;
      case 7:
        setValues((prevData) => [...prevData, {}]);
        break;
      case 2:
        setValues((prevData) => [...prevData, {}]);
        break;
      case 1:
        setValues((prevData) => [
          ...prevData,
          { wordList: questionBlocks[i]?.wordList },
        ]);
        break;
      case 5:
        setValues((prevData) => [...prevData, {}]);
        break;
      case 11:
        setValues((prevData) => [
          ...prevData,
          { words: questionBlocks[i]?.words },
        ]);
        break;
      case 12:
        setValues((prevData) => [
          ...prevData,
          { words: questionBlocks[i]?.words },
        ]);
        break;
      case 13:
        setValues((prevData) => [
          ...prevData,
          {
            persons: questionBlocks[i]?.persons,
            speeches: questionBlocks[i]?.speeches,
            text1: questionBlocks[i]?.text1,
          },
        ]);
        setPersons(questionBlocks[i]?.persons);
        break;
      case 14:
        setValues((prevData) => [
          ...prevData,
          {
            persons: questionBlocks[i]?.persons,
            speeches2: questionBlocks[i]?.speeches2,
            text1: questionBlocks[i]?.text1,
          },
        ]);
        setPersons(questionBlocks[i]?.persons);
        break;
      case 15:
        setValues((prevData) => [
          ...prevData,
          {
            persons: questionBlocks[i]?.persons,
            speeches3: questionBlocks[i]?.speeches3,
            text1: questionBlocks[i]?.text1,
          },
        ]);
        setPersons(questionBlocks[i]?.persons);
        break;
    }
  }
};

export default builderOnUpdate;
