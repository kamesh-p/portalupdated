import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { format } from "date-fns";

const LeadSurveyComponent = () => {
  const [existingQuestions, setExistingQuestions] = useState([]);
  const [selectedSurvey, setSelectedSurvey] = useState(null);
  const [commandText, setCommandText] = useState("");
  const router = useRouter();
  const { userid } = router.query;
  const currentDate = format(new Date(), "yyyy-MM-dd HH:mm:ss");
  const loginId = userid;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/leadSurveyApi?loginId=${loginId}`);
        if (response.ok) {
          const data = await response.json();
          setExistingQuestions(data);
        } else {
          console.error("Failed to fetch data:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [existingQuestions]);

  const handleSurveyClick = (survey) => {
    setSelectedSurvey(survey);
    setCommandText("");
  };

  const handleCloseDialog = () => {
    setSelectedSurvey(null);
  };

  const handleExecuteCommand = async () => {
    let Feedbacktime = currentDate;
    try {
      const userId = selectedSurvey._id;

      const response = await fetch("/api/updateCommand", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userid: userId,
          command: commandText,
          Feedbacktime,
        }),
      });

      if (response.ok) {
        console.log("Command executed successfully");
      } else {
        console.error("Failed to execute command:", response.statusText);
      }
    } catch (error) {
      console.error("Error executing command:", error);
    }

    setSelectedSurvey(null);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-teal-700 text-center my-5">
        Lead Survey Responses
      </h2>

      {selectedSurvey && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white w-3/4 p-4 rounded max-h-screen overflow-y-auto">
            <button
              className="float-right text-lg font-bold text-teal-700"
              onClick={handleCloseDialog}
            >
              X
            </button>
            <h2 className="text-xl font-bold mb-2 text-center text-teal-700">
              Survey Details
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-lg font-bold mb-2 text-teal-700">Name:</p>
                <p className="mb-2">{selectedSurvey.user}</p>
              </div>
              <div>
                <p className="text-lg font-bold mb-2 text-teal-700">Title:</p>
                <p className="mb-2">{selectedSurvey.title}</p>
              </div>
              <p className="text-lg font-bold mb-2 text-teal-700">Status:</p>
              <p className="mb-4">
                {selectedSurvey.status
                  ? selectedSurvey.command === ""
                    ? "Pending"
                    : "Completed"
                  : "Not Filled Yet"}
              </p>
            </div>
            {selectedSurvey?.responses?.map((response, index) => (
              <div key={index} className="my-4">
                <button
                  className="text-lg font-bold mb-2 text-teal-700 focus:outline-none"
                  onClick={() => {
                    const answerElement = document.getElementById(
                      `answer-${index}`
                    );
                    if (answerElement) {
                      answerElement.classList.toggle("hidden");
                    }
                  }}
                >
                  {response.question}:
                </button>
                <p id={`answer-${index}`} className="hidden">
                  {response.answer.join(", ")}
                </p>
              </div>
            ))}
            <textarea
              className="w-full h-20 my-4 p-2 border rounded"
              placeholder="Enter your command..."
              value={commandText}
              onChange={(e) => setCommandText(e.target.value)}
            />
            <button
              className="bg-teal-500 hover:bg-teal-700 text-white py-2 px-4 rounded"
              onClick={() => handleExecuteCommand()}
            >
              Submit Command
            </button>
          </div>
        </div>
      )}

      <table className="min-w-full bg-white border border-gray-300 my-4">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Title</th>
            <th className="py-2 px-4 border-b">Status</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {existingQuestions.map((response, index) => (
            <tr
              key={index}
              className={
                response.status
                  ? response.command === ""
                    ? "bg-yellow-50"
                    : "bg-teal-50"
                  : "bg-red-50"
              }
            >
              <td className="py-2 px-4 text-center">{response.user}</td>
              <td className="py-2 px-4 text-center">{response.title}</td>
              <td className="py-2 px-4 text-center">
                {response.status
                  ? response.command === ""
                    ? "Pending"
                    : "Completed"
                  : "Not Filled Yet"}
              </td>
              <td className="py-2 px-4 text-center">
                {response.responses.length === 0 ? (
                  <p>No Response</p>
                ) : response.status ? (
                  response.command === "" ? (
                    <button
                      className="bg-yellow-500 hover:bg-yellow-700 text-white py-2 px-4 rounded"
                      onClick={() => handleSurveyClick(response)}
                    >
                      View Survey
                    </button>
                  ) : (
                    response.command
                  )
                ) : (
                  "Not Filled Yet"
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeadSurveyComponent;
