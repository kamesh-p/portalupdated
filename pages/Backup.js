import React, { useEffect, useState } from "react";

const Backup = () => {
  const [surveyData, setservey] = useState([]);
  const [selectedSurveyId, setSelectedSurveyId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/servey/backup");
        if (response.ok) {
          const data = await response.json();
          setservey(data);
        } else {
          console.error("Failed to fetch data:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [surveyData]);

  const handleContainerClick = (surveyId) => {
    setSelectedSurveyId((prevSelectedId) =>
      prevSelectedId === surveyId ? null : surveyId
    );
  };
  const Handlebackup = async (id) => {
    console.log("id", id);
    try {
      const response = await fetch("/api/servey/backupreturn", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("data", data);
      } else {
        console.error("Failed to fetch data:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-center text-teal-700 font-extrabold text-2xl mb-4">
        Backup
      </h2>
      <div className="grid grid-cols-3 gap-4">
        {surveyData.map((data) => (
          <div key={data._id} className="mb-4">
            <div
              className={`block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100`}
            >
              <div className="flex justify-between ">
                <div
                  className={`cursor-pointer ${
                    selectedSurveyId === data._id ? "bg-gray-100" : ""
                  }`}
                  onClick={() => {
                    handleContainerClick(data._id);
                  }}
                >
                  {data.title}
                </div>
                <div>
                  <button
                    onClick={() => {
                      Handlebackup(data._id);
                    }}
                    className="bg-red-500 rounded-md p-1 text-white"
                  >
                    Cancel
                  </button>
                </div>
              </div>
              {selectedSurveyId === data._id && (
                <div className="mt-4 p-4 bg-white shadow-md rounded-md">
                  {/* <p className="text-teal-700 font-semibold mb-2">Dialog</p> */}
                  {data.questions.map((ques) => (
                    <div key={ques._id} className="mb-2">
                      <div className="text-gray-700 my-2">
                        Type: {ques.type}
                      </div>
                      <div className="text-black my-2">
                        Question: {ques.question}
                      </div>
                      Option:
                      <div className="text-black grid grid-cols-2">
                        {ques.options.map((op) => {
                          return (
                            <div>
                              <p>{op}</p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Backup;
