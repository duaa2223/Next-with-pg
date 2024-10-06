import pool from '../../../../../database'; // تأكد من مسار الاستيراد الصحيح

// التعامل مع الطلبات GET و PUT و DELETE بناءً على الـ ID
export async function GET(req, { params }) {
  const { id } = params; // الحصول على الـ ID من المعلمات
  try {
    const { rows } = await pool.query('SELECT * FROM users WHERE id = $1', [id]); // استعلام لجلب مستخدم محدد
    if (rows.length === 0) {
      return new Response('User not found', { status: 404 });
    }
    return new Response(JSON.stringify(rows[0]), { status: 200 });
  } catch (error) {
    console.error('Error fetching user:', error);
    return new Response('Failed to fetch user', { status: 500 });
  }
}

export async function PUT(req, { params }) {
  const { id } = params; // الحصول على الـ ID من المعلمات
  const { name, email } = await req.json(); // الحصول على البيانات من الطلب

  try {
    const { rowCount } = await pool.query(
      'UPDATE users SET name = $1, email = $2 WHERE id = $3',
      [name, email, id]
    );
    if (rowCount === 0) {
      return new Response('User not found', { status: 404 });
    }
    return new Response('User updated successfully', { status: 200 });
  } catch (error) {
    console.error('Error updating user:', error);
    return new Response('Failed to update user', { status: 500 });
  }
}
