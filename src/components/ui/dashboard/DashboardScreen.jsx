"use client";
import DashboardContent from "@/components/ui/dashboard/DashboardContent";
import DashboardHeader from "@/components/ui/dashboard/DashboardHeader";
import DashboardList from "@/components/ui/dashboard/DashboardList";
import DashboardSideBar from "@/components/ui/dashboard/DashboardSideBar";
import DashboardPostNav from "./DashboardPostNav";
import DashboardPostList from "./DashboardPostList";
function PostListScreen({ posts }) {
  return (
    <div className="container flex-col mx-auto max-w-8xl">
      <section className="flex gap-4">
        <div className="flex flex-col">
          <DashboardHeader />
          <DashboardContent />
        </div>
        <DashboardSideBar />
      </section>
      <DashboardList />
      <section className="flex gap-4 mt-12 w-full">
        <DashboardPostNav />
        <DashboardPostList />
      </section>
    </div>
  );
}

export default PostListScreen;
