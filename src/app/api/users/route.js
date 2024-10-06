// src/app/api/users/route.js
import pool from '../../../../database'; // استيراد pool

export async function GET(req) { // function in  API Next.jsto handel get requsit 
  try {
    const { rows } = await pool.query('SELECT * FROM users'); // استعلام لجلب المستخدمين
    return new Response(JSON.stringify(rows), { status: 200 });
  } catch (error) {
    console.error('Error fetching users:', error);
    return new Response('Failed to fetch users', { status: 500 });
  }
}


export async function POST(req) {
  try {
    const { name, email } = await req.json(); // استلام البيانات من الطلب
    const result = await pool.query('INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *', [name, email]); // استعلام لإضافة مستخدم
    return new Response(JSON.stringify(result.rows[0]), { status: 201 }); // إرجاع المستخدم المضاف
  } catch (error) {
    console.error('Error adding user:', error);
    return new Response('Failed to add user', { status: 500 });
  }
}


// export async function PUT(req, { params }) {
//   const userId = params.id; // الحصول على ID المستخدم من المعاملات
//   try {
//     const { name, email } = await req.json(); // استلام البيانات الجديدة من الطلب
//     const result = await pool.query('UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *', [name, email, userId]); // استعلام لتحديث المستخدم
//     if (result.rowCount === 0) {
//       return new Response('User not found', { status: 404 });
//     }
//     return new Response(JSON.stringify(result.rows[0]), { status: 200 }); // إرجاع المستخدم المحدث
//   } catch (error) {
//     console.error('Error updating user:', error);
//     return new Response('Failed to update user', { status: 500 });
//   }
// }