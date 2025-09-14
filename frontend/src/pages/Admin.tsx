import * as React from 'react';
import axios from 'axios';

const Admin = () => {
  const [users, setUsers] = React.useState<any[]>([]);
  const [prompts, setPrompts] = React.useState<any[]>([]);
  const [categoryName, setCategoryName] = React.useState("");
  const [subCategoryName, setSubCategoryName] = React.useState("");
  const [categories, setCategories] = React.useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = React.useState("");
  const [message, setMessage] = React.useState("");

  React.useEffect(() => {
    axios.get('/api/users').then((res: any) => setUsers(res.data as any[]));
    axios.get('/api/prompts/all').then((res: any) => setPrompts(res.data as any[]));
    axios.get('/api/categories').then((res: any) => setCategories(res.data as any[]));
  }, []);

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('/api/categories', { name: categoryName });
      setMessage('קטגוריה נוספה בהצלחה');
      setCategoryName("");
  const res = await axios.get('/api/categories');
  setCategories(res.data as any[]);
    } catch {
      setMessage('שגיאה בהוספת קטגוריה');
    }
  };

  const handleAddSubCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('/api/subcategories', { name: subCategoryName, category_id: selectedCategory });
      setMessage('תת-קטגוריה נוספה בהצלחה');
      setSubCategoryName("");
    } catch {
      setMessage('שגיאה בהוספת תת-קטגוריה');
    }
  };

  return (
    <React.Fragment>
      <div>
        <h2>דשבורד מנהל</h2>
        <div style={{ marginBottom: 30 }}>
          <h3>הוספת תחום חדש</h3>
          <form onSubmit={handleAddCategory}>
            <input
              type="text"
              placeholder="שם תחום"
              value={categoryName}
              onChange={e => setCategoryName(e.target.value)}
            />
            <button type="submit" style={{ marginLeft: "10px" }}>הוסף תחום</button>
          </form>
        </div>
        <div style={{ marginBottom: 30 }}>
          <h3>הוספת תת-תחום חדש</h3>
          <form onSubmit={handleAddSubCategory}>
            <input
              type="text"
              placeholder="שם תת-תחום"
              value={subCategoryName}
              onChange={e => setSubCategoryName(e.target.value)}
            />
            <select
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
              style={{ marginLeft: "10px" }}
            >
              <option value="">בחר תחום</option>
              {categories.map((cat: any) => (
                <option key={cat._id} value={cat._id}>{cat.name}</option>
              ))}
            </select>
            <button type="submit" style={{ marginLeft: "10px" }}>הוסף תת-תחום</button>
          </form>
        </div>
        {message && <p style={{ color: "green" }}>{message}</p>}
        <h3>היסטוריית משתמשים</h3>
        <ul>
          {users.map((u: any) => <li key={u._id}>{u.name} ({u.phone})</li>)}
        </ul>
        <h3>כל הפרומפטים</h3>
        <ul>
          {prompts.map((p: any, i: number) => (
            <li key={i}>{p.user_id?.name}: {p.prompt} - {p.response}</li>
          ))}
        </ul>
      </div>
    </React.Fragment>
  );
};

export default Admin;
