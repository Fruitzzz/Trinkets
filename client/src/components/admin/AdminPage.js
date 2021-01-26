import { React, useCallback, useEffect, useState } from "react";
import { useHttp } from "../../hooks/http.hook";
import Loader from "../technical/Loader";
import SubjectTools from "./SubjectTools";
import UserTools from "./UserTools";
import { useTranslation } from "react-i18next";
const AdminPage = () => {
  const {t} = useTranslation()
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
              <th>{t("name")}</th>
              <th>{t("role")}</th>
              <th>{t("status")}</th>
              <th>{t("actions")}</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{user.name}</td>
                <td>{user.isAdmin ? t("admin") : t("user")}</td>
                <td>{user.isBlocked ? t("blocked") : t("active")}</td>
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
