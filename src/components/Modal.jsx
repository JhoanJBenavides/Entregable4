import { IconX } from "@tabler/icons-react"


const Modal = ({handleSubmit, userToUpdate, formRef, showModal, handleOpenModal, onCloseModal}) => {
  console.log(showModal)
  
  
    return (
    <section className={`fixed bg-black/50 top-0 left-0 right-0 h-screen flex justify-center items-center transition-all ${showModal ? "visible opacity-100" : "invisible opacity-0"}`} >
        <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="bg-white p-4 max-w-[300px] mx-auto grid gap-2 relative"
      >
        <label className="grid gap-1 text-black">
          <span>
            Nombre <span className="text-red-500">*</span>
          </span>
          <input name="first_name" type="text" className="text-black border rounded-md p-1 outline-none" required />
        </label>

        <label className="grid gap-1 text-black border-black">
          <span>
            Apellido <span className="text-red-500">*</span>
          </span>
          <input name="last_name" type="text" className="text-black border rounded-md p-1 outline-none" required />
        </label>

        <label className="grid gap-1 text-black border-black">
          <span>
            Correo <span className="text-red-500">*</span>
          </span>
          <input name="email" type="text" className="text-black border rounded-md p-1 outline-none" required />
        </label>

        <label className="grid gap-1 text-black border-black">
          <span>
            Contraseña <span className="text-red-500">*</span>
          </span>
          <input name="password" type="number" className="text-black border rounded-md p-1 outline-none" required />
        </label>

        <label className="grid gap-1 text-black border-black">
          <span>
            Fecha de nacimiento
          </span>
          <input name="birthday" type="date" className="text-black border rounded-md p-1 outline-none" />
        </label>

        <button onClick={handleOpenModal} className="bg-blue-500 mt-2 p-1 hover:bg-blue-600 transition-colors">
          {userToUpdate ? "Guardar cambios del usuario" : "Agregar nuevo usuario"}
        </button>

        <button onClick={onCloseModal} className="absolute top-2 right-2 text-black">
            <IconX size={25} />
        </button>

        
      </form>
    </section>
  )
}
export default Modal