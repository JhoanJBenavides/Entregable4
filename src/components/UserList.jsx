import { IconEdit, IconTrashFilled } from "@tabler/icons-react";

const UserList = ({ users, deleteUser, handleClickUpdate }) => {
  return (
    <section className="justify-center grid grid-cols-[repeat(auto-fill,_280px)] gap-6 py-10">
      {users.map((user) => (
        <article key={user.id}>
          <h4 className="text-center capitalize p-3 ">
            {user.first_name} {user.last_name}
          </h4>
          <ul className="grid bg-white text-black rounded-xl p-3 border-2 hover:shadow-lg transition-shadow">
            <li className="line-clamp-1"><span className="capitalize font-bold">Nombre: </span>{user.first_name}</li>
            <li className="line-clamp-1"><span className="capitalize font-bold">Apellido: </span> {user.last_name}</li>
            <li className="line-clamp-1"><span className="capitalize font-bold">Correo: </span> {user.email}</li>
            <li className="line-clamp-1"><span className="capitalize font-bold">Fecha de nacimiento: </span> {user.birthday}</li>
          <div className="flex gap-2 p-3 justify-column">
            <button
              onClick={() => handleClickUpdate(user)}
              className="rounded-md p-1 text-white bg-blue-500"
            >
              <IconEdit />
            </button>
            
            <button
              onClick={() => deleteUser(user.id)}
              className="rounded-md p-1 text-white bg-red-500"
            >
              <IconTrashFilled />
            </button>
          </div>
          </ul>
        </article>
      ))}
    </section>
  );
};
export default UserList;
