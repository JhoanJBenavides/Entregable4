import axios from "axios";
import { useEffect, useRef, useState } from "react";
import UserList from "./components/UserList";
import Modal from "./components/Modal";

const BASE_URL = "https://users-crud.academlo.tech"

function App() {
  const [users, setUsers] = useState([])
  const [userToUpdate, setUserToUpdate] = useState(null)

  const formRef = useRef(null)

  const [showModal, setShowModal] = useState(false)

  const handleOpenModal = () => {
    setShowModal(true)

  }

  const handleCloseModal = () => {
    setShowModal(false)
  }

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
      .post("https://users-crud.academlo.tech/users/", newUser)
      .then(({ data: newUser }) => {
        form.reset()
        alert("Usuario creado correctamente")
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
      //? Tengo la certeza de que en el estado hay informacion de un usuario
      //TODO Montar la informacion en el formulario
      formRef.current.first_name.value = userToUpdate.first_name
      formRef.current.last_name.value = userToUpdate.last_name
      formRef.current.email.value = userToUpdate.email
      formRef.current.password.value = userToUpdate.password
      formRef.current.birthday.value = userToUpdate.birthday
    }
  }, [userToUpdate])
  return (
    <main className="bg-white text-white min-h-screen font-semibold text-lg p-4">
      <h2 className="text-center">CRUD Usuarios</h2>

      <button onClick={handleOpenModal} className="bg-green-500 rounded-md mt-2 p-1 hover:bg-green-600 transition-colors">
          {userToUpdate ? "Editar datos del usuario" : "Crear usuario"}
        </button>

      <Modal 
        handleSubmit={handleSubmit}
        userToUpdate={userToUpdate}
        formRef={formRef}
        showModal={showModal}
        onCloseModal={handleCloseModal}
      />
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
