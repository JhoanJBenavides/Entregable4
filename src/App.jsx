import axios from "axios"
import { useRef, useState } from "react"
import { useEffect } from "react"
import UserList from "./components/UserList"

const BASE_URL = "https://users-crud.academlo.tech"

function App() {
  const [users, setUsers] = useState([])
  const [userToUpdate, setUserToUpdate] = useState(null)

  const formRef = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const currentUser = Object.fromEntries(formData)
    if (userToUpdate) {
      //? Aqui estamos en modo actualizar
      currentUser.id = userToUpdate.id
      updateUser(currentUser)
    } else {
      //? Aqui estamos en modo crear
      createUser(currentUser, e.target)
    }
  }

  const createUser = (newUser, form) => {
    axios
      .post(BASE_URL + "/users/", newUser)
      .then(({ data: newUser }) => {
        form.reset()
        alert("Auto creado correctamente")
        setUsers([...users, newUser])
      })
      .catch((err) => console.log(err))
  }

  const deleteUser = (idUser) => {
    axios
      .delete(BASE_URL + `/users/${idUser}/`)
      .then(() => {
        const newUsers = users.filter((user) => user.id !== idUser)
        setUsers(newUsers)
        alert("Auto eliminado correctamente")
      })
      .catch((err) => console.log(err))
  };

  const updateUser = (userInfo) => {
    axios
      .put(BASE_URL + `/users/${userToUpdate.id}/`, userInfo)
      .then(() => {
        //? Necesitamos una lógica para modificar en el estado el auto que cambió y sobreescribir sus datos
        const newUsers = users.map((user) =>
          user.id === userToUpdate.id ? userInfo : user
        )
        setUsers(newUsers)
        formRef.current.reset()
        setUserToUpdate(null)
        alert("El usuario se actualizó correctamente")
      })
      .catch((err) => console.log(err))
  }

  const handleClickUpdate = (user) => {
    setUserToUpdate(user);
  }

  useEffect(() => {
    axios
      .get(BASE_URL + "/users/")
      .then(({ data }) => setUsers(data))
      .catch((err) => console.log(err))
  }, [])

  useEffect(() => {
    if (userToUpdate !== null) {
      //? Tengo la certeza de que en el estado hay informacion de un auto
      //TODO Montar la informacion en el formulario
      formRef.current.first_name.value = userToUpdate.first_name
      formRef.current.last_name.value = userToUpdate.last_name
      formRef.current.email.value = userToUpdate.email
      formRef.current.password.value = userToUpdate.password
      formRef.current.birthday.value = userToUpdate.birthday
    }
  }, [userToUpdate])
  return (
    <main className="bg-black text-white min-h-screen font-semibold text-lg p-4">
      <h2 className="text-center">CRUD Usuarios</h2>
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="max-w-[300px] mx-auto grid gap-2"
      >
        <label className="grid gap-1">
          <span>
            Nombre <span className="text-red-500">*</span>
          </span>
          <input name="first_name" type="text" className="text-black" required />
        </label>

        <label className="grid gap-1">
          <span>
            Apellido <span className="text-red-500">*</span>
          </span>
          <input name="last_name" type="text" className="text-black" required />
        </label>

        <label className="grid gap-1">
          <span>
            Correo <span className="text-red-500">*</span>
          </span>
          <input name="email" type="text" className="text-black" required />
        </label>

        <label className="grid gap-1">
          <span>
            Contraseña <span className="text-red-500">*</span>
          </span>
          <input name="password" type="number" className="text-black" required />
        </label>

        <label className="grid gap-1">
          <span>
            Fecha de nacimiento
          </span>
          <input name="birthday" type="number" className="text-black" />
        </label>

        <button className="bg-blue-500 rounded-md mt-2 p-1 hover:bg-blue-600 transition-colors">
          {userToUpdate ? "Guardar cambios del usuario" : "Crear usuario"}
        </button>
      </form>
      <UserList
        users={users}
        deleteUser={deleteUser}
        handleClickUpdate={handleClickUpdate}
      />
    </main>
  )
}

export default App

/* <div className="grid">
  <label htmlFor="first_name">Nombre</label>
  <input id="first_name" type="text" className="text-black" />
</div> */

//   forma alternativa de crear el Usuario

//  const newUser = {
//   first_name: e.target.first_name.value,
//   last_name: e.target.last_name.value,
//   email: e.target.email.value,
//   password: e.target.password.value,
//   brithday: e.target.brithday.value,
// }
