import React, { useEffect, useState } from "react";
import axios from "axios";

interface User {
    id: number;
    name: string;
    email: string;
    role: string;
}

const App: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [newUser, setNewUser] = useState({ name: "", email: "", role: "student" });

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get("https://userapp6.onrender.com/users");
            console.log(response)
            setUsers(response.data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const handleAddUser = async () => {
        try {
            const response = await axios.post("https://userapp6.onrender.com/users", newUser);
            setUsers([...users, response.data]);
            setNewUser({ name: "", email: "", role: "student" });
        } catch (error) {
            console.error("Error adding user:", error);
        }
    };

    const handleDeleteUser = async (id: number) => {
        try {
            await axios.delete(`https://userapp6.onrender.com/users/${id}`);
            setUsers(users.filter((user) => user.id !== id));
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    const handleEditUser = (id: number) => {
        alert(`Edit functionality for user with ID ${id} is not implemented yet.`);
    };

    return (
        <div>
            <h1>User Management</h1>
            <div>
                <h2>Add User</h2>
                <input
                    type="text"
                    placeholder="Name"
                    value={newUser.name}
                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                />
                <select
                    value={newUser.role}
                    onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                >
                    <option value="student">Student</option>
                    <option value="teacher">Teacher</option>
                    <option value="admin">Admin</option>
                </select>
                <button onClick={handleAddUser}>Add User</button>
            </div>
            <table border="1" style={{ marginTop: "20px", width: "100%", textAlign: "left" }}>
                <thead>
                    <tr>
                        <th>Sr.No.</th>
                        <th>User Email</th>
                        <th>User Name</th>
                        <th>User Role</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={user.id}>
                            <td>{index + 1}</td>
                            <td>{user.email}</td>
                            <td>{user.name}</td>
                            <td>{user.role}</td>
                            <td>
                                <button onClick={() => handleEditUser(user.id)}>Edit</button>
                                <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default App;