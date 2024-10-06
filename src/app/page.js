// // src/app/page.js
// 'use client'; 

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// export default function Home() {
//   const [users, setUsers] = useState([]);
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [userId, setUserId] = useState(null); 

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const response = await axios.get('/api/users'); 
//         setUsers(response.data); 
//       } catch (error) {
//         console.error('Error fetching users:', error);
//       }
//     };

//     fetchUsers();
//   }, []);


  
//   const addUser = async (e) => {
//     e.preventDefault();
//     const response = await axios.post('/api/users', { name, email });
//     setUsers((prev) => [...prev, response.data]); 
//     setName('');
//     setEmail(''); 
//   };
//  // to get data for user we want update
//  const editUser = (user) => {
//   setUserId(user.id); // تعيين ID المستخدم
//   setName(user.name); // تعيين الاسم
//   setEmail(user.email); // تعيين البريد الإلكتروني
// };

// // update data
// const updateUser = async (e) => {
//   e.preventDefault();
//   await axios.put(`/api/users/${userId}`, { name, email }); // إرسال البيانات المحدثة
//   setUsers((prev) =>
//     prev.map((user) => (user.id === userId ? { ...user, name, email } : user))
//   ); // update list
//   setUserId(null); 
//   setName(''); 
//   setEmail(''); 
// };
// // return (
// //   <div>
// //     <h1>Users</h1>
// //     <form onSubmit={addUser}>
// //       <input
// //         type="text"
// //         placeholder="Name"
// //         value={name}
// //         onChange={(e) => setName(e.target.value)}
// //         required
// //       />
// //       <input
// //         type="email"
// //         placeholder="Email"
// //         value={email}
// //         onChange={(e) => setEmail(e.target.value)}
// //         required
// //       />
// //       <button type="submit">Add User</button>
// //     </form>
// //     <ul>
// //       {users.map((user) => (
// //         <li key={user.id}>{user.name} - {user.email}</li>
// //       ))}
// //     </ul>
// //   </div>
// // );
// // }
// return (
//   <div>
//     <h1>Users</h1>
//     <form onSubmit={userId ? updateUser : addUser}>
//       <input
//         type="text"
//         placeholder="Name"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//         required
//       />
//       <input
//         type="email"
//         placeholder="Email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         required
//       />
//       <button type="submit">{userId ? 'Update User' : 'Add User'}</button>
//     </form>
//     <ul>
//       {users.map((user) => (
//         <li key={user.id} onClick={() => editUser(user)}>
//           {user.name} - {user.email}
//         </li>
//       ))}
//     </ul>
//   </div>
// );
// }
'use client'; 

import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [userId, setUserId] = useState(null); 

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/api/users'); 
        setUsers(response.data); 
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const addUser = async (e) => {
    e.preventDefault();
    const response = await axios.post('/api/users', { name, email });
    setUsers((prev) => [...prev, response.data]); 
    setName('');
    setEmail(''); 
  };

  // دالة لتحميل بيانات المستخدم للتحديث
  const editUser = (user) => {
    setUserId(user.id); // تعيين ID المستخدم
    setName(user.name); // تعيين الاسم
    setEmail(user.email); // تعيين البريد الإلكتروني
  };
  

  // دالة لتحديث بيانات المستخدم
  const updateUser = async (e) => {
    e.preventDefault();
    await axios.put(`/api/users/${userId}`, { name, email }); // إرسال البيانات المحدثة
    setUsers((prev) =>
      prev.map((user) => (user.id === userId ? { ...user, name, email } : user))
    ); // تحديث القائمة
    setUserId(null); // إعادة تعيين ID المستخدم
    setName(''); // إعادة تعيين حقل الاسم
    setEmail(''); // إعادة تعيين حقل البريد الإلكتروني
  };

  return (
    <div>
      <h1>Users</h1>
      <form onSubmit={userId ? updateUser : addUser}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">{userId ? 'Update User' : 'Add User'}</button>
      </form>
      <ul>
        {users.map((user) => (
          <li key={user.id} onClick={() => editUser(user)}>
            {user.name} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}
