import { Client } from "@langchain/langgraph-sdk";

export async function useGraph({
  question,
  answer,
  userAnswer,
  context,
  options,
  questionAnswered,
  chatMessage,
  setSendMessages,
}: {
  question: string;
  answer: string;
  userAnswer: string;
  context: string;
  options: string[];
  questionAnswered: boolean;
  chatMessage: string;
  setSendMessages: (updater: (prev: string) => string) => void;
}) {
  const client = new Client({ apiUrl: process.env.NEXT_PUBLIC_AI_SERVER });
  console.log(
    question,
    answer,
    userAnswer,
    questionAnswered,
    context,
    options,
    chatMessage
  );

  // Using the graph deployed with the name "agent"
  const assistantID = "fe096781-5601-53d2-b2f6-0d3403f7e9ca";

  // create a thread
  const thread = await client.threads.create();
  //   console.log(thread)
  const threadID = thread["thread_id"];
  //   console.log(threadID);

  // create a streaming run
  const streamResponse = client.runs.stream(threadID, assistantID, {
    input: {
      messages: [
        {
          role: "human",
          content: chatMessage,
        },
      ],
      context: context,
      question: question,
      answer: answer,
      userAnswer: userAnswer,
      questionAnswered: questionAnswered || false,
      options: options,

      // Medical information arrays
      medications: [""],
      allergies: [""],
      familyHistory: [""],
      labResults: [""],

      // Vital signs and examination data
      bloodPresure: "50 bpm", // Fixed typo from bloodPresure
      respirations: "10 bpm",
      pulse: "10 bpm",
      physicalExamination: "50 bpm",
      temperature: "40 c",
      history: "None",
      demographics: "Not Relevant",

      // Note: Removed duplicate fields that were listed twice in your original structure
      // (familyHistory, allergies, medications were both arrays and strings)
    },
    streamMode: "messages-tuple",
  });

  for await (const chunk of streamResponse) {
    console.log(chunk);
    if (Array.isArray(chunk?.data) && chunk.data[0]?.content) {
      setSendMessages((prev) => prev + chunk.data[0].content);
    }
  }
}
