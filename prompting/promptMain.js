class TestQuestionGenerator {
    constructor() {
      this.messageTemplate = {
        "Multiple Choice": {
          description: "You are a specialized AI for generating educational test questions, specifically multiple-choice questions that encompass both conceptual understanding and mathematical calculations.",
          ratio: "For every conceptual question, have a ratio of two mathematical questions.",
          details: `Your task is to create questions that align with a specified Course, Unit, Difficulty, and Number of Questions. The questions may require the application of formulas, problem-solving techniques, or theoretical principles. Ensure the questions are formatted in accordance with the course's expected problem structure.`,
          questionFormat: {
            question: "The text of the question.",
            options: "An array of answer choices without letters in front.",
            correct_answer: "The letter corresponding to the correct answer option (e.g., 'A', 'B', 'C', 'D')."
          },
          additionalInfo: "The questions could be in simple question/answer format or fill-in-the-blank with options as values. They might also include mathematical expressions, diagrams, or graphs as needed.",
          accuracy: "Accuracy is paramount. Ensure each question is crafted with precision and that the correct answer is indeed correct, whether it's a conceptual question or a calculative problem."
        },
        "Manual Input": {
          description: "You are a specialized AI for generating educational test questions, specifically questions that require type-in responses, encompassing both conceptual understanding and mathematical calculations.",
          priority: "Prioritize mathematical questions.",
          details: `Your task is to create questions that align with a specified Course, Unit, Difficulty, and Number of Questions. The questions may require the application of formulas, problem-solving techniques, or theoretical principles. Ensure the questions are formatted in accordance with the course's expected problem structure and include relevant units within the text.`,
          questionFormat: {
            question: "The text of the question, including any relevant units.",
            options: "An array of correct answers representing different variations of the response. Typically, around 6 to 7 variations with and without units.",
            answer: "Randomly pick one of the options as a reference, though it's not pivotal."
          },
          additionalInfo: "The questions could be in simple question/answer format or fill-in-the-blank with the answer as the value. They might also include mathematical expressions, diagrams, or graphs as needed.",
          accuracy: "Accuracy is paramount. Ensure each question is crafted with precision and that the correct answer variations are indeed correct, whether it's a conceptual question or a calculative problem."
        }
      };
    }
  
    _generatePromptTemplate(format) {
      if (!this.messageTemplate[format]) {
        throw new Error(`Invalid format: ${format}. Please provide a valid format.`);
      }
      const selectedTemplate = this.messageTemplate[format];
      let systemMessage = `${selectedTemplate.description}\n${selectedTemplate.ratio || ''}\n${selectedTemplate.details}\n`;
      for (const [key, value] of Object.entries(selectedTemplate.questionFormat)) {
        systemMessage += `- "${key}": ${value}\n`;
      }
      systemMessage += `${selectedTemplate.additionalInfo}\n${selectedTemplate.accuracy}`;
      return systemMessage;
    }
  
    generatePrompt(format) {
      return this._generatePromptTemplate(format);
    }
  }

  
  module.exports = { TestQuestionGenerator };
  