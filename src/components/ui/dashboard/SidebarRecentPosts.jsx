import React from "react";
import { Table, TableBody, TableRow, TableCell } from "../../shadcn/table";
import { recentPosts } from "../../../lib/data/siteData";

const SidebarRecentPosts = () => {
  return (
    <div className="p-4 pb-16">
      <h3 className="font-medium text-lg mb-3">최신 글 목록</h3>
      <Table>
        <TableBody>
          {recentPosts.map((post) => (
            <TableRow
              key={post.id}
              className="hover:bg-slate-100/20 cursor-pointer"
            >
              <TableCell className="py-2">
                <div className="flex flex-col">
                  <h4 className="text-base font-medium">{post.title}</h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    {post.description}
                  </p>
                  <span className="text-xs text-muted-foreground mt-1">
                    {post.date}
                  </span>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default SidebarRecentPosts;
