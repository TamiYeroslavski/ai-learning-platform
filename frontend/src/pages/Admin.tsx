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
    <div className="container py-5">
      <div className="card shadow mx-auto" style={{ maxWidth: 700 }}>
        <div className="card-body">
          <h2 className="mb-4 text-center">דשבורד מנהל</h2>
          <div className="row mb-4">
            <div className="col-md-6">
              <h4>הוספת תחום חדש</h4>
              <form onSubmit={handleAddCategory} className="d-flex gap-2 mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="שם תחום"
                  value={categoryName}
                  onChange={e => setCategoryName(e.target.value)}
                  required
                />
                <button type="submit" className="btn btn-primary">הוסף תחום</button>
              </form>
            </div>
            <div className="col-md-6">
              <h4>הוספת תת-תחום חדש</h4>
              <form onSubmit={handleAddSubCategory} className="d-flex gap-2 mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="שם תת-תחום"
                  value={subCategoryName}
                  onChange={e => setSubCategoryName(e.target.value)}
                  required
                />
                <select
                  className="form-select"
                  value={selectedCategory}
                  onChange={e => setSelectedCategory(e.target.value)}
                  required
                >
                  <option value="">בחר תחום</option>
                  {categories.map((cat: any) => (
                    <option key={cat._id} value={cat._id}>{cat.name}</option>
                  ))}
                </select>
                <button type="submit" className="btn btn-secondary">הוסף תת-תחום</button>
              </form>
            </div>
          </div>
          {message && <div className="alert alert-success text-center">{message}</div>}
          <h4 className="mt-4">היסטוריית משתמשים</h4>
          <ul className="list-group mb-3">
            {users.map((u: any) => <li key={u._id} className="list-group-item">{u.name} ({u.phone})</li>)}
          </ul>
          <h4>כל הפרומפטים</h4>
          <ul className="list-group mb-3">
            {prompts.filter((p: any) => p.response !== 'AI response error').map((p: any, i: number) => (
              <li key={i} className="list-group-item">
                <strong>{p.user_id?.name}</strong>: {p.prompt} <span className="text-success">- {p.response}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Admin;
