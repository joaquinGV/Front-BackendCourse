import { useEffect } from "react";
import { useState } from "react";
import { deleteNoActive, getAllUsers } from "../../services/api";
import User from "./User";
import { useCallback } from "react";

const UpdateUsers = () => {
  const [authorized, setAuthorized] = useState(false);
  const [users, setUsers] = useState([]);
  const [usersDeleted, setUsersDeleted] = useState(false);

  const updateUserList = useCallback(async () => {
    const response = await getAllUsers();
    if (response) {
      setUsers(response);
      setAuthorized(true);
    }
  }, []); // No hay dependencias, ya que la función no depende de nada externo

  useEffect(() => {
    updateUserList();
  }, [updateUserList]);

  const handleDelete = async () => {
    const response = await deleteNoActive();
    if (response) {
      setUsersDeleted(true);
      setTimeout(() => {
        setUsersDeleted(false);
      }, 5000);
      await updateUserList();
    }
  };

  return (
    <>
      {authorized ? (
        <div>
          {users.map((user) => {
            return (
              <User key={user.email} user={user} updateUsers={updateUserList} />
            );
          })}
          <button onClick={handleDelete}>Eliminar Inactivos</button>
          {usersDeleted ? <p>Usuarios inactivos eliminados</p> : ""}
        </div>
      ) : (
        <div>No tienes acceso para ver la información.</div>
      )}
    </>
  );
};

export default UpdateUsers;
