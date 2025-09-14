import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
function Dashboard() {
  const { userId } = useParams<{ userId: string }>();
  const [categories, setCategories] = React.useState<any[]>([]);
  const [subCategories, setSubCategories] = React.useState<any[]>([]);
  const [categoryId, setCategoryId] = React.useState('');
  const [subCategoryId, setSubCategoryId] = React.useState('');
  const [prompt, setPrompt] = React.useState('');
  const [response, setResponse] = React.useState('');
  const [history, setHistory] = React.useState<any[]>([]);
  const [newCategory, setNewCategory] = useState('');
  const [categoryError, setCategoryError] = useState('');
  const [newSubCategory, setNewSubCategory] = useState('');
  const [subCategoryError, setSubCategoryError] = useState('');
  const [subCategoryCategoryId, setSubCategoryCategoryId] = useState('');
  React.useEffect(() => {
    axios.get('/api/categories').then((res: any) => setCategories(res.data as any[]));
  }, []);
  React.useEffect(() => {
    if (categoryId) {
      axios.get('/api/subcategories').then((res: any) => {
        setSubCategories((res.data as any[]).filter((sc: any) => sc.category_id._id === categoryId));
      });
    }
  }, [categoryId]);
  React.useEffect(() => {
    if (userId) {
      axios.get(`/api/prompts/user/${userId}`).then((res: any) => setHistory(res.data as any[]));
    }
  }, [userId]);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await axios.post('/api/prompts', {
      user_id: userId,
      category_id: categoryId,
      sub_category_id: subCategoryId,
      prompt,
    });
    setResponse((res as any).data.response);
    setHistory([...history, (res as any).data]);
  };
  const handleAddCategory = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCategoryError('');
    try {
      const res = await axios.post('/api/categories', { name: newCategory });
      setCategories([...categories, res.data]);
      setNewCategory('');
    } catch (err: any) {
      setCategoryError(err?.response?.data?.error || 'Error adding category');
    }
  };
  // הוספת תת-קטגוריה
  const handleAddSubCategory = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubCategoryError('');
    try {
      const res = await axios.post('/api/subcategories', { name: newSubCategory, category_id: subCategoryCategoryId });
      // אם תת-הקטגוריה שייכת לקטגוריה שנבחרה, נוסיף אותה לרשימה
      if (subCategoryCategoryId === categoryId) {
        setSubCategories([...subCategories, res.data]);
      }
      setNewSubCategory('');
      setSubCategoryCategoryId('');
    } catch (err: any) {
      setSubCategoryError(err?.response?.data?.error || 'Error adding sub-category');
    }
  };

  return (
    <div className="container py-5">
      <div className="card shadow mx-auto" style={{ maxWidth: 650 }}>
        <div className="card-body">
          <h2 className="mb-3 text-center">מערכת למידה מבוססת GPT</h2>
          <p className="alert alert-info text-center">
            בחר תחום לימוד (למשל חשבון או אנגלית), בחר תת-נושא, כתוב שאלה או נושא שתרצה ללמוד, ולחץ שלח. המערכת תביא תשובה לימודית מ-GPT.
          </p>
          <form onSubmit={handleSubmit} className="row g-2 align-items-center mb-4">
            <div className="col-md-4">
              <select className="form-select" value={categoryId} onChange={e => setCategoryId(e.target.value)} required>
                <option value="">בחר תחום לימוד</option>
                {categories.map((c: any) => <option key={c._id} value={c._id}>{c.name}</option>)}
              </select>
            </div>
            <div className="col-md-4">
              <select className="form-select" value={subCategoryId} onChange={e => setSubCategoryId(e.target.value)} required>
                <option value="">בחר תת-נושא</option>
                {subCategories.map((sc: any) => <option key={sc._id} value={sc._id}>{sc.name}</option>)}
              </select>
            </div>
            <div className="col-md-4 d-flex">
              <input type="text" className="form-control me-2" placeholder="מה תרצה ללמוד?" value={prompt} onChange={e => setPrompt(e.target.value)} required />
              <button type="submit" className="btn btn-success">שלח</button>
            </div>
          </form>
          {response && <div className="alert alert-success"><h5>תשובת GPT:</h5><p>{response}</p></div>}
          <h4 className="mt-4">היסטוריית שאלות</h4>
          <ul className="list-group mb-3">
            {history.map((h: any, i: number) => (
              <li key={i} className="list-group-item">
                <strong>{h.prompt}</strong> <span className="text-success">- {h.response}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
export default Dashboard;
