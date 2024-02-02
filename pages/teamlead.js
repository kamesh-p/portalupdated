import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import clientPromise from "../lib/mongodb";
import Link from "next/link";

import { useRouter } from "next/router";

const Teamleaddashboard = ({ forms }) => {
  const [meetings, setmeeting] = useState([]);
  const [leave, setleave] = useState([]);
  const details = forms[0].projects;

  const user = useSelector((state) => state.user);

  // const [command, setCommand] = useState("");
  // const [selectedUser, setSelectedUser] = useState(null);
  // const [isModalOpen, setIsModalOpen] = useState(false);
  const email = user?.user?.user?.email;
  const name = user?.user?.user?.name;
  const iduser = user?.user?.user?.id;
  // console.log(iduser);
  const router = useRouter();

  const assistArray = user?.user?.user?.trainee || [];
  // console.log("selected user", selectedUser);
  // const selectiontrainee = selectedUser?.userName;
  // console.log("User", Users);
  // const surveylist = Users.filter((e) => {
  //   return e.user?.user?.user.name === selectiontrainee;
  // });
  // console.log("survey:", surveylist);
  // let leaverequest = leave.filter((i) => {
  //   return i.mentor === name;
  // });
  // console.log("leave detils...", leaverequest.length);
  // const leavefilter = leave.filter((f)=>{
  //   le
  // })
  const handleProjectClick = (project) => {
    router.push({
      pathname: "/project",
      query: {
        project: JSON.stringify(project),
        trainee: JSON.stringify(assistArray),
        user: name,
        userid: iduser,
      },
    });
  };
  const [isUsersAccordionOpen, setUsersAccordionOpen] = useState(false);
  const [isprojectAccordionOpen, setprojectAccordionOpen] = useState(false);

  // Function to toggle the visibility of the "Users" section
  const toggleUsersAccordion = () => {
    setUsersAccordionOpen(!isUsersAccordionOpen);
  };
  const toggleProjectAccordion = () => {
    setprojectAccordionOpen(!isprojectAccordionOpen);
  };
  const handlesurveyclick = () => {
    router.push({
      pathname: "/leadsurvey",
      query: {
        userid: iduser,
      },
    });
  };
  console.log("meeting", assistArray);
  const handlemeetingClick = () => {
    router.push({
      pathname: "/meetings",
      query: {
        id: iduser,
        user: name,
        meetings: JSON.stringify(meetings),
      },
    });
  };
  // const meetingsscheduled = meetings.filter((meet) => {
  //   return meet.user === name;
  // });
  // console.log("fil", meetingsscheduled?.length);
  const handleleaverequest = () => {
    router.push({
      pathname: "/leaverequest",
      query: {
        user: name,
        // leave: JSON.stringify(leave),
        id: iduser,
      },
    });
  };
  const handletimesheet = () => {
    router.push({
      pathname: "/leadtimesheet",
      query: {
        user: name,
        id: iduser,
      },
    });
  };

  let filteredUsers = details.filter((user) => {
    return user.assigned === name;
  });
  console.log("asssis", leave);

  // meeting

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `/api/teamlead/meetingscheduled?id=${iduser}`
        );
        if (response.ok) {
          const data = await response.json();
          console.log("Fetched data:", data);
          setmeeting(data);
        } else {
          console.error("Failed to fetch data:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [iduser]);

  // LEAVE

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `/api/teamlead/leavescheduled?id=${iduser}`
        );
        if (response.ok) {
          const data = await response.json();
          console.log("Fetched data:", data);
          setleave(data);
        } else {
          console.error("Failed to fetch data:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [iduser]);

  // console.log("asssis fsf", assistArray);

  // const handleUserButtonClick = (userName, id) => {
  //   setIsModalOpen(true);
  //   console.log("id", id);
  //   setSelectedUser({ userName, id });
  // };

  // const handleCommandChange = (e) => {
  //   setCommand(e.target.value);
  // };
  // const userid = selectedUser?.id;
  // console.log("sele", surveylist);
  const handlechangepassword = () => {
    router.push({
      pathname: "/changepassword",
      query: {
        user: name,

        userid: iduser,
      },
    });
  };

  // const handleExecuteCommand = async () => {
  //   try {
  //     // Make a POST request to the API route
  //     const response = await fetch("/api/updateCommand", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         userid,
  //         command,
  //       }),
  //     });

  //     if (response.ok) {
  //       console.log("Command executed successfully");
  //     } else {
  //       console.error("Failed to execute command:", response.statusText);
  //     }
  //   } catch (error) {
  //     console.error("Error executing command:", error);
  //   }
  //   console.log("user", userid, command);
  //   setIsModalOpen(false);
  // };

  // const matchingUsers = assistArray.map((assistUserName) => {
  //   const user = Users.find(
  //     (u) => u?.user?.user?.user?.name === assistUserName
  //   );
  //   console.log("matchinguser", user);

  //   if (user) {
  //     console.log("kkkkkkk", user._id);
  //     return (
  //       <>
  //         <div key={assistUserName} className="ml-4 w-full h-10">
  //           <div>
  //             <button
  //               onClick={() =>
  //                 handleUserButtonClick(
  //                   assistUserName,

  //                   user._id
  //                 )
  //               }
  //               className="bg-teal-500 text-white px-6 py-3 rounded-full shadow-md hover:bg-teal-600"
  //               type="button"
  //             >
  //               <p className=""> {assistUserName}</p>
  //             </button>
  //             <></>
  //             {isModalOpen && (
  //               <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center">
  //                 <div className="absolute inset-0 bg-gray-500 opacity-75 blur"></div>
  //                 <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
  //                   <div className="modal-content py-4 text-left px-6">
  //                     <div className="flex justify-between  items-center pb-3">
  //                       <p className="text-2xl text-center  text-teal-700 font-bold">
  //                         General Survey
  //                       </p>
  //                       <button
  //                         className="modal-close cursor-pointer z-50"
  //                         onClick={() => setIsModalOpen(false)}
  //                       >
  //                         <span className="text-3xl">×</span>
  //                       </button>
  //                     </div>
  //                     {surveylist.map((survey, index) => (
  //                       <div key={index}>
  //                         {Object.entries(survey)
  //                           .filter(([key, value]) =>
  //                             ["your rating", "How do you", "Describe"].some(
  //                               (prefix) => key.startsWith(prefix)
  //                             )
  //                           )
  //                           .map(([key, value]) => (
  //                             <p
  //                               className="my-3"
  //                               key={key}
  //                             >{`${key}: ${value}`}</p>
  //                           ))}
  //                       </div>
  //                     ))}

  //                     <div className="space-y-4">
  //                       <div className="mb-6">
  //                         <textarea
  //                           id="command"
  //                           className="border rounded w-full h-20 p-2 resize-none"
  //                           value={command}
  //                           onChange={handleCommandChange}
  //                         />
  //                       </div>

  //                       <button
  //                         className="bg-teal-700 w-full text-white px-4 py-2  mb-5 rounded"
  //                         onClick={handleExecuteCommand}
  //                       >
  //                         Execute Command
  //                       </button>
  //                     </div>
  //                   </div>
  //                 </div>
  //               </div>
  //             )}
  //           </div>
  //         </div>
  //       </>
  //     );
  //   }

  //   return null;
  // });

  return (
    <>
      <div className="min-h-screen flex ">
        <div className="">
          <div className="flex">
            <div
              id="docs-sidebar"
              className="hs-overlay hs-overlay-open:translate-x-0 -translate-x-full transition-all duration-300 transform hidden fixed top-0 start-0 bottom-0  w-64 bg-white border-e border-gray-200 pt-7 pb-10 overflow-y-auto lg:block lg:translate-x-0 lg:end-auto lg:bottom-0 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-slate-700 dark:[&::-webkit-scrollbar-thumb]:bg-slate-500 dark:bg-gray-800 dark:border-gray-700 mt-20"
            >
              <span className="my-5 w-full mx-10 font-extrabold text-teal-700 text-xl">
                LEAD PORTAL
              </span>
              <nav
                className="hs-accordion-group p-6 w-full flex flex-col flex-wrap"
                data-hs-accordion-always-open
              >
                <ul className="space-y-1.5">
                  <li className="hs-accordion" id="users-accordion">
                    <button
                      type="button"
                      onClick={toggleUsersAccordion}
                      className="hs-accordion-toggle my-2 hs-accordion-active:text-blue-600 hs-accordion-active:hover:bg-transparent w-full text-start flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700 rounded-lg hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-900 dark:text-slate-400 dark:hover:text-slate-300 dark:hs-accordion-active:text-white dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                    >
                      <svg
                        className="w-4 h-4"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                      </svg>
                      About
                      <svg
                        className="hs-accordion-active:block ms-auto hidden w-4 h-4 text-gray-600 group-hover:text-gray-500 dark:text-gray-400"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path d="m18 15-6-6-6 6" />
                      </svg>
                      <svg
                        className="hs-accordion-active:hidden ms-auto block w-4 h-4 text-gray-600 group-hover:text-gray-500 dark:text-gray-400"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                        ></path>
                      </svg>
                    </button>

                    <div
                      id="users-accordion"
                      className={`hs-accordion-content w-full overflow-hidden transition-all duration-300 ${
                        isUsersAccordionOpen ? "block" : "hidden"
                      }`}
                    >
                      <ul
                        className="hs-accordion-group ps-3 pt-2"
                        data-hs-accordion-always-open
                      >
                        <div className="px-6 bg-gray-100">
                          <p className="mb-2  font-semibold">{name}</p>
                          <p className="text-sm text-gray-600">{email}</p>
                          {/* <p className="text-sm text-gray-600">{type}</p> */}
                        </div>
                      </ul>
                    </div>
                  </li>

                  <li onClick={handlechangepassword}>
                    <p className="flex my-2 items-center gap-x-3.5 py-2 px-2.5  text-sm text-slate-700 rounded-lg hover:bg-gray-100 dark:bg-gray-900 dark:text-white dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                      <svg
                        className="w-4 h-4"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <circle cx="18" cy="15" r="3" />
                        <circle cx="9" cy="7" r="4" />
                        <path d="M10 15H6a4 4 0 0 0-4 4v2" />
                        <path d="m21.7 16.4-.9-.3" />
                        <path d="m15.2 13.9-.9-.3" />
                        <path d="m16.6 18.7.3-.9" />
                        <path d="m19.1 12.2.3-.9" />
                        <path d="m19.6 18.7-.4-1" />
                        <path d="m16.8 12.3-.4-1" />
                        <path d="m14.3 16.6 1-.4" />
                        <path d="m20.7 13.8 1-.4" />
                      </svg>
                      Change Password
                    </p>
                  </li>

                  <li onClick={handlesurveyclick}>
                    <p className="flex  items-center gap-x-3.5 py-2 px-2.5  text-sm text-slate-700 rounded-lg hover:bg-gray-100 dark:bg-gray-900 dark:text-white dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                      <svg
                        className="w-4 h-4"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                      </svg>
                      Survey
                    </p>
                  </li>

                  <li className="hs-accordion" id="projects-accordion">
                    <button
                      type="button"
                      onClick={toggleProjectAccordion}
                      className="hs-accordion-toggle my-2 hs-accordion-active:text-blue-600 hs-accordion-active:hover:bg-transparent w-full text-start flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700 rounded-lg hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-900 dark:text-slate-400 dark:hover:text-slate-300 dark:hs-accordion-active:text-white dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                    >
                      <svg
                        className="w-4 h-4"
                        xmlns="ƒhttp://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path d="M15.5 2H8.6c-.4 0-.8.2-1.1.5-.3.3-.5.7-.5 1.1v12.8c0 .4.2.8.5 1.1.3.3.7.5 1.1.5h9.8c.4 0 .8-.2 1.1-.5.3-.3.5-.7.5-1.1V6.5L15.5 2z" />
                        <path d="M3 7.6v12.8c0 .4.2.8.5 1.1.3.3.7.5 1.1.5h9.8" />
                        <path d="M15 2v5h5" />
                      </svg>
                      Actions
                      <svg
                        className="hs-accordion-active:block ms-auto hidden w-4 h-4 text-gray-600 group-hover:text-gray-500 dark:text-gray-400"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path d="m18 15-6-6-6 6" />
                      </svg>
                      <svg
                        className="hs-accordion-active:hidden ms-auto block w-4 h-4 text-gray-600 group-hover:text-gray-500 dark:text-gray-400"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                        ></path>
                      </svg>
                    </button>

                    <div
                      id="projects-accordion"
                      className={`hs-accordion-content w-full overflow-hidden transition-all duration-300 ${
                        isprojectAccordionOpen ? "block" : "hidden"
                      }`}
                    >
                      <ul className="pt-2 ps-2">
                        <li onClick={handletimesheet}>
                          <p className="flex  items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 dark:text-slate-400 dark:hover:text-slate-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                            <svg
                              className="w-4 h-4"
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            >
                              <rect
                                width="18"
                                height="18"
                                x="3"
                                y="4"
                                rx="2"
                                ry="2"
                              />
                              <line x1="16" x2="16" y1="2" y2="6" />
                              <line x1="8" x2="8" y1="2" y2="6" />
                              <line x1="3" x2="21" y1="10" y2="10" />
                              <path d="M8 14h.01" />
                              <path d="M12 14h.01" />
                              <path d="M16 14h.01" />
                              <path d="M8 18h.01" />
                              <path d="M12 18h.01" />
                              <path d="M16 18h.01" />
                            </svg>
                            Timesheet
                          </p>
                        </li>
                        <li onClick={handleleaverequest}>
                          <p className="flex  items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 dark:text-slate-400 dark:hover:text-slate-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                            <svg
                              className="w-4 h-4"
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            >
                              <rect
                                width="18"
                                height="18"
                                x="3"
                                y="4"
                                rx="2"
                                ry="2"
                              />
                              <line x1="16" x2="16" y1="2" y2="6" />
                              <line x1="8" x2="8" y1="2" y2="6" />
                              <line x1="3" x2="21" y1="10" y2="10" />
                              <path d="M8 14h.01" />
                              <path d="M12 14h.01" />
                              <path d="M16 14h.01" />
                              <path d="M8 18h.01" />
                              <path d="M12 18h.01" />
                              <path d="M16 18h.01" />
                            </svg>
                            Leave Request
                            <sup className="bg-teal-500 text-white text-xs rounded-full p-1">
                              {leave.length}
                            </sup>
                          </p>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li
                    onClick={() => {
                      handlemeetingClick();
                    }}
                  >
                    <p className="flex  items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 dark:text-slate-400 dark:hover:text-slate-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                      <svg
                        className="w-4 h-4"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <rect
                          width="18"
                          height="18"
                          x="3"
                          y="4"
                          rx="2"
                          ry="2"
                        />
                        <line x1="16" x2="16" y1="2" y2="6" />
                        <line x1="8" x2="8" y1="2" y2="6" />
                        <line x1="3" x2="21" y1="10" y2="10" />
                        <path d="M8 14h.01" />
                        <path d="M12 14h.01" />
                        <path d="M16 14h.01" />
                        <path d="M8 18h.01" />
                        <path d="M12 18h.01" />
                        <path d="M16 18h.01" />
                      </svg>
                      Meetings
                      <sup className="p-1 bg-teal-500 font-sm rounded-lg text-xs text-white">
                        {meetings?.length}
                      </sup>
                    </p>
                  </li>

                  <Link href="/chat">
                    <li>
                      <p className="flex my-2 items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 dark:text-slate-400 dark:hover:text-slate-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                        <svg
                          className="w-4 h-4"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                        </svg>
                        Message
                      </p>
                    </li>
                  </Link>
                </ul>
              </nav>
            </div>
            {/* <div className="">
              <div className=" w-52p-4 rounded-lg shadow-md">
                {email && name && (
                  <div>
                    <div className="bg-gray-200  text-black font-semibold py-6">
                      <h2 className="text-teal-700 text-lg mb-5 text-center font-extrabold">
                        PERSONAL INFO
                      </h2>
                      <span className="font-bold  ">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          className="h-6 w-6 inline-block mr-2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 13c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"
                          />
                        </svg>
                      </span>
                      <span className="text-center">{name}</span> <br />
                      <br />
                      <span className="font-bold">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          className="h-6 w-6 inline-block mr-2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 3l7 7L19 3"
                          />
                        </svg>
                      </span>
                      <span className="">{email}</span> <br /> <br />
                      <span className="  text-gray-700">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          className="h-6 w-6 inline-block mr-2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 21l-7-7M19 21l-7-7m7 7H5M6 3h14a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V5a2 2 0 012-2z"
                          />
                        </svg>
                        <span>
                          Number of Trainees: <span></span>
                        </span>
                        <br />
                      </span>
                    </div>
                  </div>
                )}
              </div>

              <div className="bg-gray-200 w-56 p-4 h-full border-r text-gray-600 border-gray-300">
                <ul className="list-none pl-0">
                  <h2 className="text-teal-700 text-xl text-center mb-10 font-extrabold">
                    DETAILS
                  </h2>
                  <li className="text-lg font-semibold mb-9 flex items-center">
                    <span>Employee Data 📊</span>
                  </li>
                  <li
                    onClick={() => {
                      handlemeetingClick();
                    }}
                    className="text-lg font-semibold mb-9 flex items-center"
                  >
                    <span>
                      Meeting ⏰
                      <sup className="p-1 bg-red-600 font-sm h-4 rounded-lg text-white">
                        {meetingsscheduled?.length}
                      </sup>
                    </span>
                  </li>
                  <li className="text-lg font-semibold  mb-9 flex items-center">
                    <span>Performance Metrics 🚀</span>
                  </li>
                  <li
                    onClick={handleleaverequest}
                    className="text-base  mb-9 flex items-center cursor-pointer"
                  >
                    <span className="text-lg font-semibold">
                      Leave Requests
                      <sup className="bg-red-500 text-white mb-3 rounded-full p-1">
                        {leaverequest.length}
                      </sup>
                    </span>
                  </li>
                  <li
                    onClick={handletimesheet}
                    className="text-base  mb-9 flex items-center cursor-pointer"
                  >
                    <span className="text-lg font-semibold">Timesheet</span>
                  </li>
                  <li
                    onClick={handlesurveyclick}
                    className="text-base  mb-9 flex items-center cursor-pointer"
                  >
                    <span className="text-lg font-semibold">Survey</span>
                  </li>
                  <li
                    className="text-lg font-semibold  mb-9 flex items-center cursor-pointer"
                    onClick={handlechangepassword}
                  >
                    Changepassword
                  </li>
                  <Link href="/chat">
                    <p className="text-lg font-semibold">Message </p>
                  </Link>
                </ul>
              </div>
            </div> */}

            <div className="w-full ">
              {/* <div className="container bg-white rounded-lg shadow-md mx-auto px-4 py-6">
                <h3 className="text-teal-700 text-center font-extrabold text-2xl mb-6">
                  TRAINEE DETAILS
                </h3>
                <p className="mb-6 ml-4  pr-10 text-gray-700 tracking-wide">
                  The Trainee Details container showcases trainees' general
                  surveys, offering insights into their performance. It serves
                  as a vital platform for team members and leads to review and
                  provide essential feedback, promoting continuous improvement
                  and collaboration within the team.
                </p>
                <div className="flex">{matchingUsers}</div>
              </div> */}
              <div className="mx-auto mt-20 container rounded-lg bg-gray-50 p-6 text-lg text-gray-700 tracking-wide shadow- leading-relaxed w-3/4 ml-64">
                {filteredUsers.length === 0 ? (
                  <h2 className="text-2xl text-teal-700 font-semibold text-center w-full">
                    NO PROJECT FOUND
                  </h2>
                ) : (
                  <>
                    <h1 className="text-2xl text-teal-700 ml-10 font-extrabold  mb-10 w-full">
                      PROJECT DETAILS
                    </h1>
                    {/* <p className="mb-6 ml-4  pr-10 text-gray-700 tracking-wide">
                      Explore diverse projects that fuel creativity and
                      collaboration. Each project tells a unique story,
                      fostering innovation and teamwork. Join us in the exciting
                      journey of transforming ideas into impactful solutions.
                    </p> */}
                  </>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-full">
                  {filteredUsers.map((project) => (
                    <div
                      key={project.id}
                      className="max-w-xs mx-auto bg-teal-500 ml-3 border rounded-lg shadow overflow-hidden"
                      onClick={() => handleProjectClick(project)}
                    >
                      <a>
                        <img
                          className="w-full h-28 object-cover rounded-t-lg"
                          src={project.img}
                          alt={project.name}
                        />
                      </a>
                      <div className="bg-teal-500 text-white h-24 p-4  shadow-md ">
                        <h2 className="text-lg font-semibold mb-2">
                          {project.name}
                        </h2>
                        <hr className="my-3" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export async function getServerSideProps() {
  try {
    const client = await clientPromise;
    const db = client.db("projects");
    // const ds = client.db("form");
    const leave = client.db("leave");
    const answers = client.db("questions");
    // const Meetings = client.db("Meetings");

    const product = await db.collection("details").find({}).limit(20).toArray();
    // const products = await ds
    //   .collection("members")
    //   .find({})
    //   .limit(20)
    //   .toArray();
    const membersleave = await leave
      .collection("details")
      .find({})
      .limit(20)
      .toArray();
    const answersproject = await answers
      .collection("project")
      .find({})
      .limit(20)
      .toArray();
    // const events = await Meetings.collection("events")
    //   .find({})
    //   .limit(20)
    //   .toArray();

    return {
      props: {
        forms: JSON.parse(JSON.stringify(product)),
        // Users: JSON.parse(JSON.stringify(products)),
        leave: JSON.parse(JSON.stringify(membersleave)),
        questions: JSON.parse(JSON.stringify(answersproject)),
        // meetings: JSON.parse(JSON.stringify(events)),
      },
    };
  } catch (e) {
    console.error(e);
    return {
      props: {
        Users: [],
        forms: [],
      },
    };
  }
}
export default Teamleaddashboard;
