import { useEffect, useState } from "react";
import { users } from "../../service/getUsers";

interface User {
  id: string;
  title: string;
  firstName: string;
  lastName: string;
  picture: string;
}

const Users = () => {
  const [user, setUser] = useState<User[]>([]);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    loadUsers();
  }, [page]);

  const loadUsers = () => {
    users(page).then((response) => {
      setUser(response.data.data);
      console.log(response.data.data);
    });
  };

  const handlePrevPage = () => {
    setPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <>
      <div className="bg-white p-8 rounded-md w-full">
        <div>
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal">
                {/* Table Headers */}
                <thead>
                  <tr>
                    {/* Table Header Cells */}
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Name
                    </th>
                    {/* Add more header cells as needed */}
                  </tr>
                </thead>
                {/* Table Body */}
                <tbody>
                  {/* Map over users array and render table rows */}
                  {user.map((user) => (
                    <tr key={user.id}>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 w-10 h-10">
                            <img
                              className="w-full h-full rounded-full"
                              src={user.picture}
                              alt={`${user.firstName} ${user.lastName}`}
                            />
                          </div>
                          <div className="ml-3">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {user.firstName} {user.lastName}
                            </p>
                          </div>
                        </div>
                      </td>
                      {/* Add more table cells for other user data */}
                    </tr>
                  ))}
                </tbody>
              </table>
              {/* Pagination */}
              <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between">
                <div className="inline-flex mt-2 xs:mt-0">
                  {/* Button to go to previous page */}
                  <button
                    onClick={handlePrevPage}
                    disabled={page === 1}
                    className={`text-sm text-indigo-50 transition duration-150 hover:bg-indigo-500 bg-indigo-600 font-semibold py-2 px-4 rounded-l ${page === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    \\\
                  </button>
                  {/* Button to go to next page */}
                  <button
                    onClick={handleNextPage}
                    className="text-sm text-indigo-50 transition duration-150 hover:bg-indigo-500 bg-indigo-600 font-semibold py-2 px-4 rounded-r"
                  >
                    ///
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Users;
