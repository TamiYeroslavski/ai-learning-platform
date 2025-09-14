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
    <div style={{ maxWidth: 600, margin: 'auto', fontFamily: 'Arial' }}>
      <h2>מערכת למידה מבוססת GPT</h2>
      <p style={{ background: '#f0f0f0', padding: '8px', borderRadius: '6px' }}>
        בחר תחום לימוד (למשל חשבון או אנגלית), בחר תת-נושא, כתוב שאלה או נושא שתרצה ללמוד, ולחץ שלח. המערכת תביא תשובה לימודית מ-GPT.
      </p>
      <form onSubmit={handleSubmit} style={{ marginBottom: '1em', display: 'flex', gap: '8px', alignItems: 'center' }}>
        <select value={categoryId} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setCategoryId(e.target.value)} required>
          <option value="">בחר תחום לימוד</option>
          {categories.map((c: any) => <option key={c._id} value={c._id}>{c.name}</option>)}
        </select>
        <select value={subCategoryId} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSubCategoryId(e.target.value)} required>
          <option value="">בחר תת-נושא</option>
          {subCategories.map((sc: any) => <option key={sc._id} value={sc._id}>{sc.name}</option>)}
        </select>
        <input type="text" placeholder="מה תרצה ללמוד?" value={prompt} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPrompt(e.target.value)} required style={{ flex: 1 }} />
        <button type="submit">שלח</button>
      </form>
      {response && <div style={{ background: '#e6ffe6', padding: '8px', borderRadius: '6px', marginBottom: '1em' }}><h3>תשובת GPT:</h3><p>{response}</p></div>}
      <h3>היסטוריית שאלות</h3>
      <ul>
        {history.map((h: any, i: number) => (
          <li key={i}>{h.prompt} - <span style={{ color: '#007700' }}>{h.response}</span></li>
        ))}
      </ul>
      <hr />
      <h4>הוסף תחום לימוד חדש</h4>
      <form onSubmit={handleAddCategory} style={{ marginBottom: '1em', display: 'flex', gap: '8px', alignItems: 'center' }}>
        <input
          type="text"
          placeholder="שם תחום לימוד"
          value={newCategory}
          onChange={e => setNewCategory(e.target.value)}
          required
        />
        <button type="submit">הוסף תחום</button>
      </form>
      {categoryError && <div style={{ color: 'red' }}>{categoryError}</div>}
      <h4>הוסף תת-נושא חדש</h4>
      <form onSubmit={handleAddSubCategory} style={{ marginBottom: '1em', display: 'flex', gap: '8px', alignItems: 'center' }}>
        <select value={subCategoryCategoryId} onChange={e => setSubCategoryCategoryId(e.target.value)} required>
          <option value="">בחר תחום לימוד</option>
          {categories.map((c: any) => <option key={c._id} value={c._id}>{c.name}</option>)}
        </select>
        <input
          type="text"
          placeholder="שם תת-נושא"
          value={newSubCategory}
          onChange={e => setNewSubCategory(e.target.value)}
          required
        />
        <button type="submit">הוסף תת-נושא</button>
      </form>
      {subCategoryError && <div style={{ color: 'red' }}>{subCategoryError}</div>}
    </div>
  );
}
export default Dashboard;
