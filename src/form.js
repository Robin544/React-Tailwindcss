import { useEffect, useState } from "react";

export default function Form({
    handleSubmit = () => { },
    handleDelete = () => { },
    index
}) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    useEffect(() => {
        if (index != undefined, index != null) {
            getUser();
        }

        return () => {
            setName("");
            setEmail("");
        }
    }, [index]);

    const getUser = () => {
        let users = localStorage.getItem("users");
        if (users) {
            users = JSON.parse(users);
            setName(users[index].name);
            setEmail(users[index].email);
        }
    }

    const onSubmit = () => {
        if (!name || !email) return;
        if (index != undefined && index != null) {
            handleSubmit({ name, email }, index);
        } else {
            handleSubmit({ name, email });
        }
        setName("");
        setEmail("");
    }

    return (
        <div className="border-solid rounded-lg border-black p-5 border-t-8 border-opacity-50 shadow-2xl">
            <h4 className="text-4xl font-bold text-center uppercase">{(index != undefined && index != null) ? "Update" : "Add"} User</h4>
            <div className="mt-8 block">
                <label className="font-semibold">Name:</label>
                <input
                    type="text"
                    className="w-full mt-1 px-3 py-1 outline-none active:outline-none border-black border-2 border-opacity-50 rounded-full"
                    placeholder="Name"
                    name="name"
                    value={name}
                    onChange={({ target: { value } }) => setName(value)}
                />
            </div>
            <div className="mt-3 block">
                <label className="font-semibold">Email:</label>
                <input
                    type="email"
                    className="w-full mt-1 px-3 py-1 outline-none active:outline-none border-black border-2 border-opacity-50 rounded-full"
                    placeholder="Email"
                    name="email"
                    value={email}
                    onChange={({ target: { value } }) => setEmail(value)}
                />
            </div>
            <button
                type="button"
                onClick={onSubmit}
                className="border-2 border-black mt-8 px-8 py-1  border-opacity-50 rounded-full uppercase font-semibold hover:bg-black hover:text-white"
            >
                {(index != undefined && index != null) ? "Update" : "Add"}
            </button>
            {(index != undefined && index != null) && (
                <button
                    type="button"
                    onClick={() => handleDelete(index)}
                    className="border-2 border-black mt-8 px-8 py-1 float-right border-opacity-50 rounded-full uppercase font-semibold hover:bg-red-600 hover:border-red-600 hover:text-white"
                >
                    Delete
                </button>
            )}
        </div >
    );
}