import { Outlet } from "react-router-dom";

import Header from "./Header";
import Heading from "./Heading";
import MainBody from "./MainBody";

function SideBarPage() {
  return (
    <div className="flex h-screen bg-slate-100 overflow-hidden">

      {/* Sidebar */}

      <aside className="w-64 bg-white border-r flex flex-col">

        <Header />

        <MainBody />

      </aside>

      {/* Main Content */}

      <section className="flex-1 flex flex-col bg-slate-100">

        <Heading />

        <main className="flex-1 overflow-y-auto">

          <div className="p-8 min-h-full">
            <Outlet />
          </div>

        </main>

      </section>

    </div>
  );
}

export default SideBarPage;