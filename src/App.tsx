import { useState } from 'react';
import Post from './components/Post'
import DetailPost from './components/Post/DetailPost';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import Users from './components/Users';

function App () {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any>(null);

  const handleLoginSuccess = (response: any) => {
    setIsAuthenticated(true);
    setUser(response.profileObj);
  };

  const handleLoginFailure = (response: any) => {
    console.error('Login failed:', response);
  };

  return (
    <div>
      {/* <GoogleLoginComponent onSuccess={handleLoginSuccess} onFailure={handleLoginFailure} /> */}
      {/* {isAuthenticated && <p>Welcome, {user?.name}</p>} */}
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Post />} />
          <Route path="/post/:id" element={<DetailPost />} />
          <Route path="/users" element={<Users />} />
          {/* <ProtectedRoute path="/users" component={UserList} isAuthenticated={isAuthenticated} /> */}
        </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App
