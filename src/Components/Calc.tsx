import { stringify } from "querystring";
import { useEffect, useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";

const Home = () => {
  interface icourse {
    name: string;
    cred: number;
    grade: number;
  }
  const [semesters, setSemesters] = useState<{ [key: number]: icourse[] }>(
    JSON.parse(
      localStorage?.getItem("semesters") ||
        JSON.stringify({
          1: [],
          2: [],
          3: [],
          4: [],
          5: [],
          6: [],
          7: [],
          8: [],
        })
    )
  );
  const [sem, setSem] = useState(1);
  const [courses, setCourses] = useState<icourse[]>(semesters[sem]);
  const [gpa, setGpa] = useState<{ [key: number]: number }>({
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
  });
  const [cgpa, setCgpa] = useState(0);
  useEffect(() => {
    setCourses(semesters[sem]);
  }, [sem]);

  useEffect(() => {
    let c = 0,
      n = 0;
    for (let s = 1; s <= sem; s++) {
      let cum = 0;
      let num = 0;
      for (let i = 0; i < semesters[s].length; i++) {
        if (semesters[s][i].grade !== -1) {
          cum += semesters[s][i].cred * semesters[s][i].grade;
          num += semesters[s][i].cred;
        }
      }
      c += cum;
      n += num;
      gpa[s] = cum / num;
      setGpa(gpa);
    }
    setCgpa(c / n);
    semesters[sem] = courses;
    setSemesters(semesters);
    localStorage.setItem("semesters", JSON.stringify(semesters));
    Refresh();
  }, [courses, semesters]);
  //add refresh
  const [refresh, setRefresh] = useState(false);
  const Refresh = () => {
    setRefresh(!refresh);
  };
  return (
    <div className=" flex flex-col justify-evenly grow dark:bg-gray-800 text-black">
      <div className="overflow-hidden">
        <div className="justify-center mx-2 my-3 flex flex-cols scale-125  object-contain">
          <div className="font-xl font-semibold ring-1 ring-gray-200 dark:ring-gray-500  inline-block py-2 px-3 mx-2 rounded text-gray-900 dark:text-white bg-gray-200 dark:bg-gray-700 border-gray-300 dark:border-gray-600 uppercase last:mr-0 mr-1">
            Choose Semester
          </div>
          <div className="flex flex-cols mx-4 justify-center align-center">
            <select
              title="Grade"
              value={sem}
              onChange={(e) => {
                setSem(parseInt(e.target.value));
              }}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
              placeholder="Grade"
            >
              <option value="8">Sem - 8</option>
              <option value="7">Sem - 7</option>
              <option value="6">Sem - 6</option>
              <option value="5">Sem - 5</option>
              <option value="4">Sem - 4</option>
              <option value="3">Sem - 3</option>
              <option value="2">Sem - 2</option>
              <option value="1">Sem - 1</option>
            </select>
          </div>
        </div>
      </div>
      {courses.map((course) => (
        <div className="flex justify-center ">
          <div className="flex justify-end container">
            <div className="relative">
              <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-black">
                Course Name
              </label>
              <input
                type="name"
                value={course.name}
                onChange={(e) => {
                  course.name = e.target.value;
                  setCourses([...courses]);
                }}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                placeholder="Course Name"
              ></input>
            </div>
          </div>

          <div className="flex justify-center container">
            <div className="relative">
              <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-black">
                Credits
              </label>
              <input
                type="number"
                value={course.cred}
                onChange={(e) => {
                  course.cred = parseFloat(e.target.value);
                  setCourses([...courses]);
                }}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                placeholder="Credits"
              ></input>
            </div>
          </div>

          <div className="flex justify-start container">
            <div className="relative">
              <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-black">
                Grade
              </label>
              <div className="flex flex-cols justify-center align-center">
                <select
                  title="Grade"
                  value={course.grade}
                  onChange={(e) => {
                    course.grade = parseInt(e.target.value);
                    setCourses([...courses]);
                  }}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                  placeholder="Grade"
                >
                  <option value="10">A</option>
                  <option value="9">A-</option>
                  <option value="8">B</option>
                  <option value="7">B-</option>
                  <option value="6">C</option>
                  <option value="5">C-</option>
                  <option value="4">D</option>
                  <option value="3">E</option>
                  <option value="0">NC</option>
                  <option value="-1">W</option>
                </select>
                <button
                  title="delete"
                  onClick={() => {
                    courses.splice(courses.indexOf(course), 1);
                    setCourses([...courses]);
                  }}
                  className="text-white align-center justify-center items-center my-auto ml-3"
                >
                  <FaMinus size={12} />
                </button>
              </div>
            </div>
            <div></div>
          </div>
        </div>
      ))}

      <div className="flex justify-center mt-2 ">
        <div className="flex flex-row gap-4 justify-center -mr-[25%] container">
          <div className="flex gap-2 justify-center items-center">
            <div className=" font-semibold ring-1 ring-gray-200 dark:ring-gray-500  inline-block py-2 px-3 rounded text-gray-900 dark:text-white bg-gray-200 dark:bg-gray-700 border-gray-300 dark:border-gray-600 uppercase last:mr-0 mr-1">
              SGPA
            </div>
            <p className="tracking-normal text-gray-500 md:text-lg dark:text-gray-50">
              {Number.isNaN(gpa[sem]) || gpa[sem] === 0
                ? "-"
                : gpa[sem].toFixed(2)}
            </p>
          </div>
          <div className="flex gap-2 justify-center items-center">
            <div className=" font-semibold ring-1 ring-gray-200 dark:ring-gray-500  inline-block py-2 px-3 rounded text-gray-900 dark:text-white bg-gray-200 dark:bg-gray-700 border-gray-300 dark:border-gray-600 uppercase last:mr-0 mr-1">
              CGPA
            </div>
            <p className="tracking-normal text-gray-500 md:text-lg dark:text-gray-50">
              {Number.isNaN(cgpa) || cgpa === 0 ? "-" : cgpa.toFixed(2)}
            </p>
          </div>
        </div>

        <div className="flex justify-center items-center -ml-[25%] container">
          <button
            type="button"
            onClick={() => {
              setCourses([...courses, { name: "", cred: 0, grade: -1 }]);
            }}
            className="text-gray-900 gap-2 ring-1 ring-gray-200 dark:ring-gray-500  items-center text-center inline-flex bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:border-gray-500 dark:focus:ring-gray-500"
          >
            Add Course
            <span className="align-center -mr-1">
              <FaPlus />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
