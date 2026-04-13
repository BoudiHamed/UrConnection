import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./GenealComponents/MainLayout";
import GroupList from "./features/groups/components/GroupList";
import CreateGroupForm from "./features/groups/components/CreateGroupForm";
import GroupDetail from "./features/groups/components/GroupDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          {/* Home Page */}
          <Route
            path="/"
            element={
              <>
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 transition-colors">
                    Discover Groups
                  </h2>
                </div>
                <GroupList />
              </>
            }
          />
          {/* Detail Page */}
          <Route path="/groups/:groupId" element={<GroupDetail />} />
          {/* Create Page */}
          <Route path="/create" element={<CreateGroupForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
