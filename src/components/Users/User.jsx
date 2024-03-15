/* eslint-disable react/prop-types */
import { useState } from "react";
import { updateRole, deleteUser } from "../../services/api";

const User = ({ user, updateUsers }) => {
  const [editRole, setEditRole] = useState(false);
  const [selectedRole, setSelectedRole] = useState(user?.role);

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
  };

  const handleRoleSubmit = async () => {
    await updateRole(user.email, selectedRole);
    await updateUsers();
    setEditRole(false);
  };

  const handleEditRole = () => {
    setEditRole(!editRole);
  };

  const handleDeleteUser = async () => {
    await deleteUser(user.email);
    await updateUsers();
  };

  return (
    <div>
      <p>
        Nombre: {user.name} | Correo: {user.email} | Role: {user.role}
      </p>
      <button onClick={handleDeleteUser}>Eliminar usuario</button>
      {editRole ? (
        <>
          <select value={selectedRole} onChange={handleRoleChange}>
            <option value="USER">USER</option>
            <option value="PREMIUM">PREMIUM</option>
            <option value="ADMIN">ADMIN</option>
          </select>
          <button onClick={handleRoleSubmit}>Guardar</button>
          <button onClick={handleEditRole}>Cancelar</button>
        </>
      ) : (
        <button onClick={handleEditRole}>Actualizar contacto</button>
      )}
      <hr />
    </div>
  );
};

export default User;
