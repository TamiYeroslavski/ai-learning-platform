import * as React from 'react';
import axios from 'axios';

const Admin = () => {
  const [users, setUsers] = React.useState<any[]>([]);
  const [prompts, setPrompts] = React.useState<any[]>([]);

  React.useEffect(() => {
    axios.get('/api/users').then((res: any) => setUsers(res.data as any[]));
    axios.get('/api/prompts/all').then((res: any) => setPrompts(res.data as any[]));
  }, []);

  return (
    <React.Fragment>
      <div>
        <h2>Admin Dashboard</h2>
        <h3>Users</h3>
        <ul>
          {users.map((u: any) => <li key={u._id}>{u.name} ({u.phone})</li>)}
        </ul>
        <h3>All Prompts</h3>
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
