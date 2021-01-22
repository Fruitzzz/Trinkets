import { React, useCallback, useEffect, useState } from "react";
import { useHttp } from "../../hooks/http.hook";
import Loader from "../technical/Loader";
import SubjectTools from "./SubjectTools";
import UserTools from "./UserTools";
const AdminPage = () => {
  const { request } = useHttp();
  const [users, setUsers] = useState();
  const fetchUsers = useCallback(async () => {
    try {
      const fetched = await request("/api/admin/users");
      setUsers(fetched);
    } catch (e) {}
  }, [request]);
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);
  if (!users) {
    return <Loader />;
  }
  return (
    <div className="row content">
      <div className="col s12 l8">
        <table className=" centered">
          <thead>
            <tr>
              <th>Имя</th>
              <th>Роль</th>
              <th>Статус</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{user.name}</td>
                <td>{user.isAdmin ? "Администратор" : "Пользователь"}</td>
                <td>{user.isBlocked ? "Заблокирован" : "Активный"}</td>
                <UserTools user={user} setUsers={setUsers} />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <SubjectTools/>
    </div>
  );
};
export default AdminPage;
